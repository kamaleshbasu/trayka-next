import Hero from "@/components/common/Hero";
import Benefits from "@/components/pages/services/Benefits";
import Challenge from "@/components/pages/services/Challenge";
import Solution from "@/components/pages/services/Solution";
import { createTranslator } from "@/lib/i18n";
import { canonical } from "@/lib/metadata";

export async function generateMetadata({ params }: {params: Promise<{ locale: string }>;}) {
    const { locale } = await params;
    return await canonical({
        path: "",
        locale: locale,
        title: "zta", 
        description: "zta_desc", 
        images: ["/og/zta-hero.png"]
    });
}

export default async ({params} : {params: Promise<{locale : string}>}) => {
    const {locale} = await params;
    const t = await createTranslator(locale);

    return (
    <>
        <Hero
            title={t("ztas.hero.title")}
            description={t("ztas.hero.description")}
            slogan={t("ztas.hero.slogan")}
            svgImage="/media/zta-hero.svg"
            align="right"
        />
        <Challenge
            title="challenge"
            header="ztas.challenge.title"
            challenges="ztas.challenges"
        >
            <p className="mb-4 mt-8" key={1}>{t("ztas.challenge.desc1")}</p>
            <p className="mb-0" key={2}>{t("ztas.challenge.desc2")}</p>
        </Challenge>
        <Solution
            title="ztas.solution.title"
            header="ztas.solution.header"
            steps="ztas.steps"
            image="/media/zta-solution.svg"
            align="left"
        >
            <p className="mb-4 mt-8" key={1}>{t("ztas.solution.description")}</p>
        </Solution>
        <Benefits 
            benefits="ztas.benefits"
            title="ztas.benefit.title"
            header="ztas.benefit.header"
        >
            <p className="mt-2 text-gray-700">{t("ztas.benefit.description")}</p>
        </Benefits>
    </>
    );
}