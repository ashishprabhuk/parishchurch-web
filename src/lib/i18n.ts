import en from "@/locales/en.json"
import mr from "@/locales/mr.json"
import type { Lang } from "@/features/parish/types"

const dictionaries = { en, mr } as const

export type TranslationKey = keyof typeof en

export function t(lang: Lang, key: TranslationKey): string {
  const langDict = dictionaries[lang]
  const fallback = dictionaries.en[key]
  return (langDict[key] ?? fallback ?? key) as string
}
