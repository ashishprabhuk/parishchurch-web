export type SeoMeta = {
  title: string
  description: string
  canonicalPath: string
  ogImage?: string
}

export function applySeoMeta(meta: SeoMeta) {
  document.title = meta.title

  const ensureMeta = (name: string, content: string, property = false) => {
    const selector = property
      ? `meta[property="${name}"]`
      : `meta[name="${name}"]`
    let element = document.head.querySelector(selector)

    if (!element) {
      element = document.createElement("meta")
      if (property) {
        element.setAttribute("property", name)
      } else {
        element.setAttribute("name", name)
      }
      document.head.appendChild(element)
    }

    element.setAttribute("content", content)
  }

  ensureMeta("description", meta.description)
  ensureMeta("og:title", meta.title, true)
  ensureMeta("og:description", meta.description, true)
  ensureMeta("og:type", "website", true)
  if (meta.ogImage) {
    ensureMeta("og:image", meta.ogImage, true)
  }

  const canonical = `${window.location.origin}${meta.canonicalPath}`
  let link = document.head.querySelector("link[rel='canonical']")
  if (!link) {
    link = document.createElement("link")
    link.setAttribute("rel", "canonical")
    document.head.appendChild(link)
  }
  link.setAttribute("href", canonical)
}
