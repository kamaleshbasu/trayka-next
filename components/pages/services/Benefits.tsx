"use client"

import SectionHero from "@/components/common/SectionHero";
import StepCard, { StepCardProps } from "@/components/common/StepCard";
import Section from "@/components/layout/Section";
import { useTranslatedList, useTranslation } from "@/context/TranslationClientProvider";
import type { ReactNode } from "react";

type BenefitsProps = {
  title : string;
  header : string;
  children?: ReactNode;
  benefits: string;
  image? : string;
}

export default ({title, header, children, benefits} : BenefitsProps) => {
    const {t} = useTranslation();
    const benefitsMap = useTranslatedList<StepCardProps>(benefits);

    return (
        <Section className="border-t py-32 bg-gray-50">
            <SectionHero title={t(title)}
                header={t(header)}
                className="text-center"
                colorClass="bg-red-600"
            >
                {children}
            </SectionHero>
            <div className="mt-8 grid md:grid-cols-4 gap-6">
                {benefitsMap.map((s, i) => (
                    <StepCard {...s} key={i} theme={s.theme ?? "primary"}/>
                ))}
            </div>
        </Section>
    )
}