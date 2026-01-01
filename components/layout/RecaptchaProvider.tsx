"use client";

import { GoogleReCaptchaProvider } from "@google-recaptcha/react";
import { NewsletterGlobalDialogProvider } from "../dialogs/Newsletter";

export default ({children}: {children: React.ReactNode;}) => {
  return (
    <GoogleReCaptchaProvider type="v3" siteKey={process.env.NEXT_PUBLIC_CAPTCHA!}>
        <NewsletterGlobalDialogProvider>
            {children}
        </NewsletterGlobalDialogProvider>
    </GoogleReCaptchaProvider>
  );
}