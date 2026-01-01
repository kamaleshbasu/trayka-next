"use client"

import AppButton from "@/components/common/AppButton";
import Icon from "@/components/common/Icon";
import { StepCardProps } from "@/components/common/StepCard";
import SvgLoader from "@/components/common/SvgLoader";
import { useNewsletterDialog } from "@/components/dialogs/Newsletter";
import { useTranslatedList, useTranslation } from "@/context/TranslationClientProvider";
import { cn } from "@/lib/utils";
import Image from "next/image";

type ServiceProps = {
    title: string;
    description: string;
    id: string;
    benefits: StepCardProps[];
    image: string;
}

export default () => {

    const {t, locale} = useTranslation();
    const {openDialog} = useNewsletterDialog();

    const services: ServiceProps[] = [
    {
        title: "zta",
        id: "zta",
        description: "home.solutions.zta",
        benefits: useTranslatedList<StepCardProps>("ztas.benefits"),
        image : "/media/zta-solution.svg"
    },
    {
        title: "kb",
        id: "rag",
        description: "home.solutions.kb",
        benefits: useTranslatedList<StepCardProps>("rags.benefits"),
        image : "/media/rag-solution.svg"
    },
  ];

  return(
    <>
        {services.map((s, i) => 
            <div className="p-6 border border-gray-200 rounded-md bg-white flex flex-col" key={i}>
                <div className="font-bold text-2xl mb-4">{t(s.title)}</div>
                <div className="mb-6 text-md text-gray-400">{t(s.description)}</div>
                <SvgLoader title={s.title} src={s.image} />
                <div className="flex-1">
                    {s.benefits.map((b, j) => 
                    <div key={j} className={cn("flex items-center", s.benefits.length != j+1 ? "mb-1.5" : "")}>
                        <div className="size-10 bg-white rounded-md border border-gray-200 text-secondary-foreground flex items-center justify-center">
                            <Icon name={b.iconData?.name ?? ""} size={20}/>
                        </div>
                        <div className="flex-1 ml-2 text-sm">{b.description}</div>
                    </div>)}
                </div>
                <div className={`flex gap-4 justify-center mt-4`}>
                    <AppButton href="/zta" theme="primary">{t("more")}</AppButton>
                    <AppButton onClick={() => {
                        openDialog({
                            args: {
                                type : "case-studies"
                            }
                        });
                    }}>{t("case-studies")}</AppButton>
                </div>
            </div>)
        }
    </>
  )
}