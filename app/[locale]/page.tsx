import Ctas from "@/components/common/Ctas";
import Icon from "@/components/common/Icon";
import SectionHero from "@/components/common/SectionHero";
import SmoothScroll from "@/components/common/SmoothScroll";
import Section from "@/components/layout/Section";
import Faq from "@/components/pages/home/Faq";
import Services from "@/components/pages/home/Services";
import { createTranslator } from "@/lib/i18n";
import { canonical } from "@/lib/metadata";
import { Metadata } from "next";

export async function generateMetadata({ params }: {params: Promise<{ locale: string }>;}) {
  const { locale } = await params;
  return await canonical({
    path: "",
    locale: locale,
    title: "kb_and_zta", 
    description: "home.hero.description", 
    images: ["/og/rag-hero.png", "/og/zta-hero.png"]
  });
}

export default async ({params} : {params: Promise<{locale : string}>}) => {

  const {locale} = await params;
  const t = await createTranslator(locale);

  return (
  <>
    <Section className="relative pt-56 pb-44 -mt-12 text-center bg-[url('/media/hero.jpg')] bg-cover bg-no-repeat bg-center min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-white/40" />
      <div className="relative">
          <p className="text-primary text-4xl mb-4 max-w-3xl mx-auto font-semibold">{t("home.hero.slogan")}</p>
          <h1 className="text-7xl font-bold">{t("home.hero.title")}</h1>
          <p className=" text-xl mt-4 mb-8 max-w-3xl mx-auto">{t("home.hero.description")}</p>
          <Ctas isProject align="center"/>
      </div>
      <div className="absolute bottom-5 left-0 w-full text-center">
        <SmoothScroll  
          target="services"
          className="cursor-pointer bg-secondary/70 size-12 mx-auto flex justify-center items-center rounded-full">
          <Icon name="down" />
        </SmoothScroll>
      </div>
    </Section>

    <Section className="py-24 border-t bg-gray-50" id="services">
      <SectionHero
          title={t("home.solutions.title")}
          header={t("home.solutions.slogan")}
          className="text-center max-w-200 mx-auto mb-6"
      >
      </SectionHero>
      <div className="max-w-300 mx-auto grid md:grid-cols-2 grid-cols-1 gap-4">
          <Services />
      </div>
    </Section>

    <Section className="py-24 border-t">
        <SectionHero
            title={t("faqs.title")}
            colorClass="bg-pink-500"
            header={t("faqs.header")}
            className="text-center max-w-200 mx-auto"
        >
            <p className="text-gray-500 mt-2 mb-12">{t("faqs.description")}</p>
        </SectionHero>
        <Faq />
    </Section>
  </>
  );
}