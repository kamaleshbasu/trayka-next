import { getDictionary, Locale } from "@/lib/i18n";
import { TranslationClientProvider } from "./TranslationClientProvider";

export async function TranslationProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const dict = await getDictionary(locale);

  return (
    <TranslationClientProvider
      value={{ locale, dict }}
    >
      {children}
    </TranslationClientProvider>
  );
}
