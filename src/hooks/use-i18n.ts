import { useMemo } from "react"

import { t, type TranslationKey } from "@/lib/i18n"
import { useI18nStore } from "@/stores/i18n.store"

export function useI18n() {
  const lang = useI18nStore((state) => state.lang)
  const setLang = useI18nStore((state) => state.setLang)

  const translator = useMemo(
    () => ({
      t: (key: TranslationKey) => t(lang, key),
    }),
    [lang],
  )

  return {
    lang,
    setLang,
    t: translator.t,
  }
}
