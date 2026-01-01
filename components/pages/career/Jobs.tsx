"use client"

import { useTranslatedList } from "@/context/TranslationClientProvider";
import Job, { JobProps } from "./Job";
import Section from "@/components/layout/Section";
import { cn } from "@/lib/utils";

export default () => {
    const jobs = useTranslatedList<JobProps>("career.jobs");
    return (
        <>
        {jobs.map((job : JobProps, i : number) => 
            <Section className={cn("py-16 border-t", i % 2 == 1 ? "bg-gray-50" : "")} key={i}>
                <div className="grid md:grid-cols-2 gap-10 items-start">
                    <Job {...job} />
                </div>
            </Section>
        )}
        </>
    );
}