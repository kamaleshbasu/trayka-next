"use client"

import Hero from "@/components/common/Hero";
import { useTranslation } from "@/context/TranslationClientProvider";
import type { JSX } from "react";

export default () : JSX.Element => {
    const {t} = useTranslation();

    return (
        <Hero
            title={t("404.title")}
            description={t("404.description")}
            slogan={t("404.slogan")}
            svgImage="/media/404.svg"
            is404={true}
            align="right"
        />
    );
};