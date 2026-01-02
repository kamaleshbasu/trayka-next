"use client"

import { cn } from "@/lib/utils";
import { useTranslation } from "@/context/TranslationClientProvider";
import AppButton from "./AppButton";
import { useNewsletterDialog } from "../dialogs/Newsletter";

export default ({is404 = false, className, isProject = false, align="start"} : {is404? : boolean, isProject? : boolean, className? : string, align?: "start" | "center" | "end"}) => {

    const {openDialog} = useNewsletterDialog();

    const {t, locale} = useTranslation();

    return (<>
        <div className={cn(`flex gap-4 justify-${align}`, className)}>
            <AppButton href={process.env.NEXT_PUBLIC_DEMO_LINK} target="__blank" theme="primary">{t("book")}</AppButton>
            <AppButton Tag="button" onClick={() => {
                openDialog({
                    args: {
                        type : isProject ? "project" : "case-studies"
                    }
                });
            }} className="cursor-pointer">{t(isProject ? "launch" : "case-studies")}</AppButton>
        </div>
        {is404 ? <div><a href={`/${locale}/`} className="inline-block px-1 py-3 rounded-md text-sm text-gray-500">{t("backtohome")}</a></div> : ""}
    </>);
}