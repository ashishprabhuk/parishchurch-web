import { useEffect } from "react"

import { applySeoMeta, type SeoMeta } from "@/lib/seo/meta"

export function useSeo(meta: SeoMeta) {
  useEffect(() => {
    applySeoMeta(meta)
  }, [meta])
}
