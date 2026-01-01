"use client"

import { useTranslation } from "@/context/TranslationClientProvider";

export default ({error} : {error? : string | string[]}) => {
    const {t} = useTranslation();
    if(!error) return <></>;
    const renderError = (e : string, key? : number) => <div className="text-sm text-destructive mb-0.5 validation error" key={key}>{t(e)}</div>;

    return(
        typeof error === "string" ? renderError(error)
            : error.map((e, i) => renderError(e, i))
    );
}