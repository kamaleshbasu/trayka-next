import { createTranslator, langs } from "./i18n";

type MetadataProps = {
    path : string;
    locale: string;
    title: string;
    description: string;
    images?: string[]
};

export const canonical = async ({path, locale, title, description, images} : MetadataProps) => {

    const url = `/${locale}${path ? "/"+path : ""}`;
    const t = await createTranslator(locale);
    const titleDefault = t(title);
    const descDefault = t(description);

    return {
        title: titleDefault,
        description: descDefault,
        alternates: {
            canonical: url,
            languages: Object.fromEntries(
                langs.map(
                    lang => [lang.code, `/${lang.code}${path ? "/"+path : ""}`]
                )
            ),
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-image-preview": "large",
                "max-snippet": -1,
                "max-video-preview": -1,
            },
        },
        openGraph: {
            type: "website",
            url,
            siteName: "Trayka",
            locale,
            title: titleDefault,
            description: descDefault,
            images: images,
        },
        twitter: {
            card: "summary_large_image",
            title: titleDefault,
            description: descDefault,
            images: images,
            site: "@traykaai",
            creator: "@traykaai",
        },
    }
}