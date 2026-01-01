export const langs : {code: string; lang: string;}[] = [ 
    {code : "en", lang : "English"},
    {code : "es", lang : "Español"},
    {code : "zh", lang: "中文"},
    {code : "hi", lang: "हिन्दी"},
    {code : "fr", lang: "Français"}
];

export type Locale = (typeof langs)[number]["code"];

export const dictionaries: Record<Locale, () => Promise<any>> = Object.fromEntries(
  langs.map(({ code }) => [
    code,
    () =>
      import(`../public/locales/${code}/common.json`).then(
        (mod) => mod.default
      ),
  ])
) as Record<Locale, () => Promise<any>>;

const fallbackLocale: Locale = "en";

export async function getDictionary(locale: string): Promise<any> {
  const isValidLocale = langs.some((l) => l.code === locale);
  const safeLocale = isValidLocale ? (locale as Locale) : fallbackLocale;
  return dictionaries[safeLocale]();
}

export async function createTranslator(locale: Locale) {
  const dict = await getDictionary(locale);

  return (key: string): any => {
    const parts = key.split(".");
    let value: any = dict;

    for (const part of parts) {
      value = value?.[part];
      if (!value) return key;
    }

    return value;
  };
}