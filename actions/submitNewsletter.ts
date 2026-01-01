"use server";

import {NewsletterSchemaType, NewsletterSchema } from "@/models/newsletter";
import Mailchimp, { listId, subscriberHash } from "@/connect/mailchimp/mailchimp";
import { supabase } from "@/connect/supbase/server";

export async function submitNewsletter(formData: NewsletterSchemaType & {token?: string}) {
  try {
    const { token, ...payload } = formData;

    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        body: new URLSearchParams({
          secret: process.env.CAPTCHA_SECRET!,
          response: token!,
        }),
      }
    );

    const captchaData = await response.json();
    if (!captchaData.success || captchaData.score < 0.4) {
      return {
        ok: false,
        errors: [{ path: "token", message: "Captcha verification failed" }],
        reason: "captcha_failed"
      };
    }

    // Zod validation
    const parsed = NewsletterSchema.safeParse(payload);

    if (!parsed.success) {
      return {
        ok: false,
        errors: parsed.error.issues.map((i) => ({
          path: i.path[0],
          message: i.message,
        })),
      };
    }

    const db = supabase();
    // Upsert based on email
    const newNature = parsed.data.nature;
    const {data: user, error: userError} = await db.from("newsletters").select("*").eq("email", parsed.data.email).maybeSingle();
    if(user)
    {
      if(newNature != "project") parsed.data.project = user.project;

      const nature = user.nature;
      if(newNature != nature)
        parsed.data.nature = nature == "project" || (nature == "newsletter" && newNature != "project") ? nature : newNature;
    }

    const { data, error } = await db
      .from("newsletters")
      .upsert([parsed.data], { onConflict: "email" })
      .select()
      .single();

    if (error) {
      return {
        ok: false,
        errors: [{ path: "email", message: error.message }],
      };
    }

    //Mailchimp Update
    if(data && data.newsletter)
    {
      Mailchimp.lists.setListMember(
        listId, 
        subscriberHash(data.email), 
        {
            email_address: String(data.email),
            status_if_new: "subscribed", // for setListMember — creates or updates
            status: "subscribed",
            merge_fields: {
                FNAME: data.name || "",
                PROJECT: data.project || "",
            }
        }
      ).catch((err : any) => {
          console.error("Mailchimp sync failed for", err?.response?.body ?? err);
      });
    }

    return { ok: true };
  }
  catch (err) {
    console.error(err);
    return {
      ok: false,
      errors: [{ path: "base", message: "Unknown error" }],
    };
  }
}