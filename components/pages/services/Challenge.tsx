"use client"

import PointCard, { PointCardProps } from "@/components/common/PointCard";
import SectionHero from "@/components/common/SectionHero";
import Section from "@/components/layout/Section";
import { useTranslatedList, useTranslation } from "@/context/TranslationClientProvider";
import type { ReactNode } from "react";

type ChallengeProps = {
    title: string;
    header: string;
    challenges: string;
    children: ReactNode;
}

export default ({title, header, children, challenges} : ChallengeProps) => {

    const {t} = useTranslation();
    const challengeMaps = useTranslatedList<PointCardProps>(challenges);

    return(
        <Section className="py-16 border-t bg-gray-50">
            <div className="grid md:grid-cols-2 gap-10 items-center">
                <SectionHero title={t(title ?? "")}
                    header={t(header ?? "")}
                >
                    {children}
                </SectionHero>
                <ul className="space-y-4">
                    {challengeMaps.map((challenge, item) => <li key={item}><PointCard {...challenge}/></li>)}
                </ul>
            </div>
        </Section>
    );
}