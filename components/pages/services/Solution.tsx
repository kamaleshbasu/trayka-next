"use client"

import SectionHero from "@/components/common/SectionHero";
import StepCard, { StepCardProps } from "@/components/common/StepCard";
import SvgLoader from "@/components/common/SvgLoader";
import Section from "@/components/layout/Section";
import { useTranslatedList, useTranslation } from "@/context/TranslationClientProvider";
import type { ReactNode } from "react";

type SolutionProps = {
  title : string;
  header : string;
  children?: ReactNode;
  steps: string;
  image : string;
  align? : "left" | "right";
}

export default ({title, header, children, steps, image, align="right"}: SolutionProps) => {

    const {t} = useTranslation();
    const stepsMap = useTranslatedList<StepCardProps>(steps);

    return(
        <Section className="py-16 border-t bg-white">
            <div className="grid md:grid-cols-2 gap-10 items-center">
                {align == "right" && <SvgLoader src={image} title={title}/>}
                <SectionHero title={t(title)} header={t(header)} color="#3c01ff">
                    {children}
                </SectionHero>
                {align == "left" && <SvgLoader src={image}  title={title}/>}
            </div>

            <div className="mt-8 grid md:grid-cols-3 gap-6">
                {stepsMap.map((s, i) => (
                    <StepCard {...s}  step={(i+1).toString().padStart(2, "0")+"."} key={i}/>
                ))}
            </div>
        </Section>
    )
}