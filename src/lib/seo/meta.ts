export const SITE_DOMAIN = "https://churchofourladyoffatima.com"

export const PARISH_ENTITY = {
  name: "Church of Our Lady of Fatima",
  officialName: "Church of Our Lady of Fatima, Chulne",
  alternateNames: [
    "Church of Our Lady of Fatima Chulne",
    "Our Lady of Fatima Church Chulne",
    "Fatima Church Chulne",
    "Fatima Church Chulna",
    "Our Lady of Fatima Church Chulna",
  ],
  locality: "Chulne",
  localityAlt: "Chulna",
  suburb: "Sandor",
  city: "Vasai West",
  region: "Maharashtra",
  postalCode: "401201",
  country: "IN",
  addressStreet: "Chulne Road, Sandor, Vasai West",
  fullAddress: "Church of Our Lady of Fatima, Chulne Road, Sandor, Vasai West, Maharashtra 401201, India",
  phone: "+91 250 238 0000",
  email: "office@churchoffatima.org",
  googleMapsUrl: "https://maps.google.com/?q=Church+of+Our+Lady+of+Fatima+Chulne+Vasai+West",
  socialProfiles: [
    "https://facebook.com/",
    "https://instagram.com/",
    "https://youtube.com/",
  ],
}

export type SeoBreadcrumb = {
  name: string
  item: string
}

export type SeoMeta = {
  title: string
  description: string
  canonicalPath: string
  ogImage?: string
  noindex?: boolean
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>
  breadcrumbs?: SeoBreadcrumb[]
}

export function applySeoMeta(meta: SeoMeta) {
  document.title = meta.title
  const shareImage = meta.ogImage ?? `${SITE_DOMAIN}/assets/fatima_church_logo.png`

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
  ensureMeta("og:image", shareImage, true)
  ensureMeta("og:site_name", PARISH_ENTITY.officialName, true)
  ensureMeta("twitter:card", "summary_large_image")
  ensureMeta("twitter:title", meta.title)
  ensureMeta("twitter:description", meta.description)
  ensureMeta("twitter:image", shareImage)

  let robotsMeta = document.head.querySelector("meta[name='robots']")
  if (meta.noindex) {
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta")
      robotsMeta.setAttribute("name", "robots")
      document.head.appendChild(robotsMeta)
    }
    robotsMeta.setAttribute("content", "noindex, nofollow")
  } else if (robotsMeta) {
    robotsMeta.setAttribute("content", "index, follow")
  }

  const canonical = `${SITE_DOMAIN}${meta.canonicalPath}`
  let link = document.head.querySelector("link[rel='canonical']")
  if (!link) {
    link = document.createElement("link")
    link.setAttribute("rel", "canonical")
    document.head.appendChild(link)
  }
  link.setAttribute("href", canonical)

  const existingScripts = document.head.querySelectorAll("script[data-seo-jsonld]")
  existingScripts.forEach((script) => script.remove())

  const schemas: Array<Record<string, unknown>> = []

  const churchSchema = {
    "@context": "https://schema.org",
    "@type": "Church",
    "@id": `${SITE_DOMAIN}/#church`,
    "name": PARISH_ENTITY.name,
    "legalName": PARISH_ENTITY.officialName,
    "alternateName": PARISH_ENTITY.alternateNames,
    "url": SITE_DOMAIN,
    "logo": `${SITE_DOMAIN}/assets/fatima_church_logo.png`,
    "image": `${SITE_DOMAIN}/assets/church_altar_new.JPG`,
    "telephone": PARISH_ENTITY.phone,
    "email": PARISH_ENTITY.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": PARISH_ENTITY.addressStreet,
      "addressLocality": PARISH_ENTITY.locality,
      "addressRegion": PARISH_ENTITY.region,
      "postalCode": PARISH_ENTITY.postalCode,
      "addressCountry": PARISH_ENTITY.country,
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Chulne" },
      { "@type": "AdministrativeArea", "name": "Chulna" },
      { "@type": "AdministrativeArea", "name": "Sandor" },
      { "@type": "AdministrativeArea", "name": "Vasai West" },
    ],
    "sameAs": PARISH_ENTITY.socialProfiles,
  }
  schemas.push(churchSchema)

  if (meta.breadcrumbs && meta.breadcrumbs.length > 0) {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": meta.breadcrumbs.map((b, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": b.name,
        "item": b.item.startsWith("http") ? b.item : `${SITE_DOMAIN}${b.item}`,
      })),
    }
    schemas.push(breadcrumbSchema)
  }

  if (meta.structuredData) {
    if (Array.isArray(meta.structuredData)) {
      schemas.push(...meta.structuredData)
    } else {
      schemas.push(meta.structuredData)
    }
  }

  schemas.forEach((data, i) => {
    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.setAttribute("data-seo-jsonld", `${i}`)
    script.text = JSON.stringify(data)
    document.head.appendChild(script)
  })
}
