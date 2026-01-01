import "./globals.css";
import Header from "@/components/layout/Header";
import { TranslationProvider } from "@/context/TranslationProvider";
import Footer from "@/components/layout/Footer";
import RecaptchaProvider from "@/components/layout/RecaptchaProvider";
import { Toaster } from "@/components/ui/sonner";
import { createTranslator } from "@/lib/i18n";

export async function generateMetadata({ params }: {params: Promise<{ locale: string; slug?: string[] }>;}) {
  const { locale, slug } = await params;
  const t = await createTranslator(locale);
  return {
    metadataBase: new URL("https://trayka.com"),
    title: {
      template: "%s | Trayka",
      default: t("kb_and_zta")
    },
    description: t("home.hero.description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        fr: "/fr",
        es: "/es",
        zh: "/zh",
        hi: "/hi",
      },
    },
    lang: locale,
    other: {
      locale,
    },
    icons: {
      apple: "/favicon/apple-touch-icon.png",
      icon: [
        { url: "/favicon/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      ],
    },
    manifest: "/favicon/site.webmanifest",
  };
}

export default async ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }>;}) => {
  const {locale} = await params;
  return (
    <html lang={locale}>
      <body>
        <div id="root">
          <div className="flex flex-col min-h-screen">
            <TranslationProvider locale={locale}>
              <RecaptchaProvider>
                <Header/>
                <main className="relative bg-white pt-12 flex-1">{children}</main>
                <Footer />
                <Toaster position="top-center" richColors expand={true} closeButton duration={3100} />
              </RecaptchaProvider>
            </TranslationProvider>
          </div>
        </div>
      </body>
    </html>
  );
}