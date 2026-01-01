"use client"
import { useTranslatedList } from "@/context/TranslationClientProvider";

export default () => {
    const details = useTranslatedList<string>("career.apply-details");
    return (
        <>
            {details.map((c, i) => <li key={i}>{c}</li>)}
        </>
    );
}