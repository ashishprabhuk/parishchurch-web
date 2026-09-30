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

export type ParishEventApiRecord = {
  id: number | string
  eventDate: string
  eventTime: string
  occasion: string
  preacherOrPriest: string
  coordinator: string
  day?: string
  month?: string
  year?: number
}

export type MassTiming = {
  id: string
  label: string
  dayOfWeek?: string
  dayGroup: "today" | "sunday" | "weekday"
  time: string
  intention?: "GENERAL" | "NOVEENA" | "GOOD FRIDAY" | "EASTER" | "CHURCH FEAST" | "CHRISTMAS" | string
  language?: string
  image?: string
  description?: string
  date?: string
}

export type MassTimingApiRecord = {
  id: number | string
  dayOfWeek: string
  timeSlot: string
  language: string
  venue: string
  intention: string
  isActive?: boolean
}

export type ParishCommunity = {
  id: string
  name: string
  zone?: number | string
  patronSaint?: string
  ppcPerson?: string
  minister?: string
  communityMembers?: Record<string, string>
  zoneDetails?: Record<string, number | string>
  description?: string
  /** Legacy fields kept for locally seeded records. */
  patron?: string
  leader?: string
  contact?: string
  meetingTime?: string
}

export type ParishAssociation = {
  id: string
  name: string
  category?: string
  leader?: string
  meetingTime?: string
  contact?: string
  description?: string
}

export type ParishAssociationApiRecord = {
  id: number | string
  name: string
  description?: string | null
  priestInCharge?: string | null
  coordinatorTitle?: string | null
  coordinatorName?: string | null
  meetingSchedule?: string | null
  cellMembers?: unknown
}

export type SacramentSection = {
  title?: string
  paragraphs: string[]
  items?: string[]
}

export type Sacrament = {
  id: string
  name: string
  description: string
  image: string
  pdfUrl?: string
  sections: SacramentSection[]
  generalRules: string[]
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
  issueDate?: string
  publishDate?: string
  expiryDate?: string
  body?: string
  coverImageId?: number
  cover?: string
  link?: string
  fileUrl?: string
  slug?: string
  status?: string
}

export type OutreachItem = {
  id: string
  title: string
  description: string
  image: string
}

export type LiveStream = {
  id: string
  youtubeVideoId: string
  title: string
  isLive: true
  startedAt: string
  endedAt?: string
  createdAt?: string
  updatedAt?: string
}

export type LiveStreamStatus = LiveStream | { isLive: false }
