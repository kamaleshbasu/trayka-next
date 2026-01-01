"use client";

import { useMemo, createContext, useContext } from "react";

type TranslationValue = {
  locale: string;
  dict: Record<string, string>;
};

const TranslationContext = createContext<TranslationValue>({
  locale: "en",
  dict: {},
});

export function TranslationClientProvider({
  value,
  children,
}: {
  value: TranslationValue;
  children: React.ReactNode;
}) {
  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const { locale, dict } = useContext(TranslationContext);

  const t = (key: string): any => {
    const parts = key.split(".");
    let value: any = dict;

    for (const part of parts) {
      value = value?.[part];
      if (!value) return key;
    }

    return value;
  };

  return { locale, t };
}

export function useTranslatedList<T>(key: string): T[] {
  const { t } = useTranslation();
  const raw = t(key);

  return useMemo(() => {
    if (Array.isArray(raw)) return raw as T[];
    return [];
  }, [raw]);
}