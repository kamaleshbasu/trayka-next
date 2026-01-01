import Hero from "@/components/common/Hero";
import Section from "@/components/layout/Section";
import Details from "@/components/pages/career/Details";
import Jobs from "@/components/pages/career/Jobs";
import { createTranslator } from "@/lib/i18n";
import { canonical } from "@/lib/metadata";

export async function generateMetadata({ params }: {params: Promise<{ locale: string }>;}) {
    const { locale } = await params;
    return await canonical({
        path: "",
        locale: locale,
        title: "career.label", 
        description: "career.description", 
        images: ["/og/careers.png"]
    });
}

export default async ({params} : {params: Promise<{locale : string}>}) => {

    const {locale} = await params;
    const t = await createTranslator(locale);
    const careersEmail = `mailto:${process.env.NEXT_PUBLIC_CAREERS_EMAIL}`;

    return (
        <>
            <Section className="bg-white">
                <Hero
                    title={t("career.title")}
                    description={t("career.description")}
                    slogan={t("career.slogan")}
                    svgImage="/media/careers.svg"
                    hasCta={false}
                />
            </Section>
            <Jobs />
            <Section className="bg-white border-t py-16">
                <div className="grid gap-10">
                    <section>
                        <h2 className="text-xl font-bold">{t("career.how-to-apply")}</h2>
                        <p className="mt-2 text-gray-700">
                            {t("career.apply-desc")} <a href={careersEmail} className="text-[#3c01ff] hover:underline">careers@trayka.com</a>
                        </p>
                        <ul className="mt-3 list-disc list-inside text-gray-700 space-y-1"><Details /></ul>
                        <p className="mt-3 text-sm text-gray-500">{t("career.review")}</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold">{t("career.equal.title")}</h2>
                        <p className="mt-2 text-gray-700">{t("career.equal.description")}</p>
                    </section>

                    <section className="pt-4 border-t border-gray-100">
                        <h2 className="text-lg font-semibold">{t("career.query.title")}</h2>
                        <p className="mt-2 text-gray-700">{t("career.query.description")} <a href={careersEmail} className="text-[#3c01ff] hover:underline">careers@trayka.com</a>.</p>
                    </section>
                </div>
          </Section>
        </>
    );
}