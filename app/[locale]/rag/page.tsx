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
        title: "kb",
        description: "kb_desc", 
        images: ["/og/rag-hero.png"]
    });
}

export default async ({params} : {params: Promise<{locale : string}>}) => {
    const {locale} = await params;
    const t = await createTranslator(locale);

    return (
    <>
        <Hero
            title={t("rags.hero.title")}
            description={t("rags.hero.description")}
            slogan={t("rags.hero.slogan")}
            svgImage="/media/rag-hero.svg"
            align="right"
        />
        <Challenge
            title="challenge"
            header="rags.challenge.title"
            challenges="rags.challenges"
        >
            <p className="mb-4 mt-8" key={1}>{t("rags.challenge.desc1")}</p>
            <p className="mb-0" key={2}>{t("rags.challenge.desc2")}</p>
        </Challenge>
        <Solution
            title="rags.solution.title"
            header="rags.solution.header"
            steps="rags.steps"
            image="/media/rag-solution.svg"
            align="left"
        >
            <p className="mb-4 mt-8" key={1}>{t("rags.solution.description")}</p>
        </Solution>
        <Benefits 
            benefits="rags.benefits"
            title="rags.benefit.title"
            header="rags.benefit.header"
        >
            <p className="mt-2 text-gray-700">{t("rags.benefit.description")}</p>
        </Benefits>
    </>
    );
}