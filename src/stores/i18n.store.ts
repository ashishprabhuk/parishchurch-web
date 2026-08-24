import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { Lang } from "@/features/parish/types"

type I18nState = {
  lang: Lang
  setLang: (lang: Lang) => void
}

export const useI18nStore = create<I18nState>()(
  persist(
    (set) => ({
      lang: "en",
      setLang: (lang) => set({ lang }),
    }),
    { name: "parish-language" },
  ),
)
