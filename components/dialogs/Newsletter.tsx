"use client"

import { createContext, useCallback, useContext, useState, type FC, type ReactNode } from "react";
import type { GlobalDialogOptions } from "./dialogType";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Textarea } from "../ui/textarea";
import { useTranslation } from "@/context/TranslationClientProvider";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGoogleReCaptcha } from "@google-recaptcha/react";
import Icon from "../common/Icon";
import ThreeDots from "../common/ThreeDots/ThreeDots";
import CustomInput from "../common/CustomInput";
import { toast } from "sonner";
import { submitNewsletter } from "@/actions/submitNewsletter";

type NewsletterDialogArgs = {
  type?: "newsletter" | "project" | "case-studies";
  labels?: Record<string, any>;
};
type NewsletterDialogOptions = Omit<GlobalDialogOptions, "args"> & {args: NewsletterDialogArgs}
type NewsletterDialogContextValue = {
    openDialog: (opts: NewsletterDialogOptions) => void;
    closeDialog: () => void;
};
const NewsletterGlobalDialogContext = createContext<NewsletterDialogContextValue | undefined>(undefined);
export const useNewsletterDialog = (): NewsletterDialogContextValue => {
    const ctx = useContext(NewsletterGlobalDialogContext);
    if (!ctx) throw new Error("useGlobalDialog must be used within GlobalDialogProvider");
    return ctx;
};

const newsletterSchema = z.object({
    name: z.string().min(2, "errors.invalid_name"),
    email: z.email("errors.invalid_email"),
    newsletter: z.boolean().optional(),
    project: z.string().max(5000).optional(),
    nature: z.string(),
    token: z.string().optional()
});

type NewsletterSchema = z.infer<typeof newsletterSchema>;

export const NewsletterGlobalDialogProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const {t, locale} = useTranslation();
    const [opts, setOpts] = useState<NewsletterDialogOptions>({
        title: undefined,
        description: undefined,
        content: undefined,
        size: "md",
        confirmText: "OK",
        cancelText: "Cancel",
        closeOnConfirm: true,
        args: {
            labels: {},
            type: "newsletter"
        }
    });

    const handleConfirm = async () => {
        try {
            if (opts.onConfirm) await opts.onConfirm();
        } finally {
            if (opts.closeOnConfirm ?? true) closeDialog();
        }
    };

    const handleCancel = () => {
        if (opts.onCancel) opts.onCancel();
        closeDialog();
    };

    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting},
        setError,
        clearErrors,
        reset,
    } = useForm<NewsletterSchema>({
        resolver: zodResolver(newsletterSchema),
        mode: "onBlur",
        defaultValues: { name: "", email: "", newsletter: true, project: "", nature: "newsletter"},
    });

    const openDialog = useCallback((options: GlobalDialogOptions) => {
        reset();
        clearErrors();
        setOpts((prev) => ({ ...prev, ...options }));
        setIsOpen(true);
        console.log(locale, t("dialog.messages.confirm.generic"), t);
    }, [reset, clearErrors, locale, t]);

    const closeDialog = useCallback(() => {
        setIsOpen(false);
    }, [locale, t]);
    
    const googleReCaptcha = useGoogleReCaptcha();
    const preventCloseIfSubmitting = (e : Event) => {isSubmitting ? e.preventDefault() : null};
    const formName = "newsletter-form";
    const onSubmit = async (values: NewsletterSchema) => {
        clearErrors();
        //Check if Captcha Available
        if(!googleReCaptcha.executeV3)
        {
            setError("email" as any, { type: "server", message: t("dialog.messages.error.network") });
            return;
        }

        //Prepare Payload
        const token = await googleReCaptcha.executeV3("caseStudies");
        values.newsletter = opts.args?.type == "newsletter" ? true : values.newsletter;
        values.nature = opts.args?.type ?? "newsletter";
        const payload = { ...values, token };

        //Run Server Action
        const result = await submitNewsletter(payload);

        if(result && result.ok){
            setIsOpen(false);
            reset();
            handleConfirm();
            let message = "";
            switch(opts.args?.type)
            {
                case "case-studies":
                    message = "dialog.messages.confirm.case-studies"; break;
                case "project":
                    message = "dialog.messages.confirm.project"; break;
                default:
                case "newsletter":
            }
            toast.success(<div className="text-md">{t("dialog.messages.confirm.generic")} {t(message)}</div>);
        }
        else if(result){
            if(result.reason && result.reason == "captcha_failed")
            {
                toast.error(<div className="text-md">{t("dialog.messages.error.captcha")}</div>);
            }
            else {
                toast.error(<div className="text-md">{t("dialog.messages.error.generic")}</div>);
                if(Array.isArray(result.errors))
                {
                    for(const e of result.errors)
                    {
                        if(e.path && e.path != "id"){
                            const field = e.path as keyof NewsletterSchema;
                            setError(field, {message: e.message});
                        }
                    }
                }
            }
        }
    }

    const icon = (opts.args.type ?? "newsletter") === "project" ? "launch" : "mail";
    const title = opts.title ?? `dialog.${opts.args.type ?? "newsletter"}.title`;
    const description = opts.description ?? `dialog.${opts.args.type ?? "newsletter"}.desc`;

    return (
        <NewsletterGlobalDialogContext.Provider value={{ openDialog, closeDialog }}>
            {children}
            <Dialog open={isOpen} onOpenChange={(v) => setIsOpen(v)}>
                <DialogContent
                    className="sm:max-w-106.25"
                    onInteractOutside={preventCloseIfSubmitting}
                    onEscapeKeyDown={preventCloseIfSubmitting}
                >
                    <form onSubmit={handleSubmit(onSubmit)} id={formName}>
                        <DialogHeader>
                            <DialogTitle>
                                <div className="flex items-center mb-2">
                                    <div className={cn("col-start-1 row-start-1 flex size-10 items-center justify-center justify-self-start rounded-full mr-2", `bg-primary text-primary-foreground`)}>
                                        <Icon name={opts.icon ? (typeof opts.icon === "string" ? opts.icon : opts.icon.name) : icon} size={opts.icon && typeof opts.icon !== "string" ? opts.size : 20} />
                                    </div>
                                    <span>{typeof title === "string" ? t(title) : title}</span>
                                </div>
                            </DialogTitle>
                            <DialogDescription>
                                {typeof description === "string" ? t(description) : description}
                            </DialogDescription>
                        </DialogHeader>
                        <CustomInput<NewsletterSchema> 
                            name={"token"}
                            register={register}
                            error={errors.token}
                            type="hidden"
                            renderFieldOnly={true}
                        />
                        <CustomInput<NewsletterSchema> 
                            name={"nature"}
                            register={register}
                            error={errors.nature}
                            type="hidden"
                            value={opts.args.type ?? "newsletter"}
                            renderFieldOnly={true}
                        />
                        <div className="grid gap-4 my-3">
                            <CustomInput<NewsletterSchema> 
                                name={"name"}
                                label={opts?.args?.labels?.name ?? "dialog.name"}
                                disabled={isSubmitting}
                                error={errors.name}
                                register={register}
                                placeholder="Tendi Jones"
                                type="text"
                            />
                            <CustomInput<NewsletterSchema> 
                                name={"email"}
                                label={opts?.args?.labels?.email ?? "dialog.email"}
                                disabled={isSubmitting}
                                error={errors.email}
                                register={register}
                                placeholder="tendi@example.com"
                                type="email"
                            />
                            {opts?.args?.type == "project" && 
                                <CustomInput<NewsletterSchema> 
                                    name={"project"}
                                    label={opts?.args?.labels?.project ?? "dialog.project.title"}
                                    disabled={isSubmitting}
                                    error={errors.project}
                                    register={register}
                                    placeholder={t("dialog.brief")}
                                    Tag={Textarea}
                                />
                            }
                            {opts?.args?.type != "newsletter" && 
                                <CustomInput<NewsletterSchema> 
                                    name={"newsletter"}
                                    disabled={isSubmitting}
                                    error={errors.newsletter}
                                    control={control}

                                    wrapWithLabel={true}
                                    wrapperClasses="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-aria-checked:border-primary has-aria-checked:bg-blue-50 dark:has-aria-checked:border-blue-900 dark:has-aria-checked:bg-blue-950"

                                    Tag={Checkbox}
                                    className="data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white dark:data-[state=checked]:border-primary dark:data-[state=checked]:bg-primary"
                                >
                                    {opts?.args?.labels?.newsletter ?? <div className="grid gap-1.5 font-normal">
                                        <p className="text-sm leading-none font-medium">{t("dialog.newsletter_cta")}</p>
                                        <p className="text-muted-foreground text-sm">{t("dialog.newsletter_cta_desc")}</p>
                                    </div>}
                                </CustomInput>
                            }
                        </div>
                        <DialogFooter>
                            <Button variant="ghost" onClick={handleCancel} disabled={isOpen && isSubmitting} type="button">{t("cancel")}</Button>
                            <Button type="submit" >
                                {isOpen && isSubmitting ? <ThreeDots className="dark"/> :  t("submit")}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </NewsletterGlobalDialogContext.Provider>
    );
}
