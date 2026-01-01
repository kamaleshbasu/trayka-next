"use client"
import AppButton from "@/components/common/AppButton";
import { useTranslation } from "@/context/TranslationClientProvider";

export default () => {
    const {t} = useTranslation();
    return <AppButton onClick={(e) => { e.preventDefault(); window.print(); }}>{t("print")}</AppButton>;
}