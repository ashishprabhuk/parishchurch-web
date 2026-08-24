export type Lang = "en" | "mr"

export type ParishAnnouncement = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  image: string
  date: string
  content: string[]
}

export type ParishEvent = {
  id: string
  title: string
  category: string
  location: string
  date: string
  time: string
  description: string
}

export type MassTiming = {
  id: string
  label: string
  dayGroup: "today" | "sunday" | "weekday"
  time: string
}

export type Sacrament = {
  id: string
  name: string
  description: string
}

export type ClergyMember = {
  id: string
  name: string
  role: string
  image: string
  bio: string
}

export type ChronicleIssue = {
  id: string
  title: string
  issueDate: string
  cover: string
  fileUrl: string
}

export type OutreachItem = {
  id: string
  title: string
  description: string
  image: string
}
