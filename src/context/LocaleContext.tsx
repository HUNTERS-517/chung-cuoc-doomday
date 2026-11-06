import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Locale } from '../domain/types';
import { translator } from '../i18n';
import { loadLocale, saveLocale } from '../storage';

const numberLocales: Record<Locale, string> = {
  vi: 'vi-VN',
  en: 'en-US',
  th: 'th-TH',
  id: 'id-ID',
  zh: 'zh-CN',
};

/** Owns the locale state; only the Provider should call this. */
function useLocaleState() {
  const [locale, setLocale] = useState<Locale>(loadLocale);
  const t = useMemo(() => translator(locale), [locale]);
  const numberFormat = useMemo(
    () =>
      new Intl.NumberFormat(numberLocales[locale], {
        maximumFractionDigits: 0,
      }),
    [locale],
  );
  const format = useCallback(
    (value: number | null) =>
      value === null || !Number.isFinite(value)
        ? t('invalid')
        : numberFormat.format(value),
    [numberFormat, t],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = t('appTitle');
  }, [locale, t]);

  const changeLocale = (nextLocale: Locale) => {
    setLocale(nextLocale);
    saveLocale(nextLocale);
  };

  return { locale, changeLocale, t, format };
}

type LocaleContextValue = ReturnType<typeof useLocaleState>;

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const value = useLocaleState();
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useI18n must be used within a LocaleProvider');
  }
  return context;
}

export function useTranslation() {
  return useI18n().t;
}

export function useFormat() {
  return useI18n().format;
}
