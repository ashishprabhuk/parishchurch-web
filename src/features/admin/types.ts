export type AdminEntityType =
  | "announcements"
  | "events"
  | "mass-timings"
  | "sacraments"
  | "clergy"
  | "communities"
  | "cell-associations"
  | "history"
  | "chronicle"
  | "outreach"

export type AdminField = {
  key: string
  label: string
  type?:
    | "text"
    | "textarea"
    | "date"
    | "time"
    | "number"
    | "key-value"
    | "member-list"
    | "select"
  options?: string[]
}

export type AdminEntityConfig = {
  type: AdminEntityType
  label: string
  singular: string
  description: string
  /** Fields shown as table columns, in order. */
  columns: AdminField[]
  /** Fields shown in the edit dialog, in order. */
  fields: AdminField[]
  /** Key used as the row title / primary display. */
  titleKey: string
}

export type AdminRecord = {
  id: string
  [key: string]: unknown
}

export const ADMIN_ENTITIES: AdminEntityConfig[] = [
  {
    type: "announcements",
    label: "Announcements",
    singular: "Announcement",
    description: "News and notices shown on the Announcements screen.",
    titleKey: "title",
    columns: [
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "date", label: "Date", type: "date" },
    ],
    fields: [
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "date", label: "Date", type: "date" },
      { key: "image", label: "Image URL" },
      { key: "excerpt", label: "Excerpt", type: "textarea" },
    ],
  },
  {
    type: "events",
    label: "Calendar Events",
    singular: "Calendar Event",
    description: "Liturgical and parish events shown on the Events screens.",
    titleKey: "occasion",
    columns: [
      { key: "occasion", label: "Occasion" },
      { key: "eventDate", label: "Date", type: "date" },
      { key: "eventTime", label: "Time" },
      { key: "preacherOrPriest", label: "Preacher / priest" },
      { key: "coordinator", label: "Coordinator" },
    ],
    fields: [
      { key: "eventDate", label: "Event date", type: "date" },
      { key: "eventTime", label: "Event time", type: "time" },
      { key: "occasion", label: "Occasion" },
      { key: "preacherOrPriest", label: "Preacher / priest" },
      { key: "coordinator", label: "Coordinator" },
    ],
  },
  {
    type: "mass-timings",
    label: "Mass Timings",
    singular: "Mass Timing",
    description: "Daily, Sunday, and special occasion Mass schedules.",
    titleKey: "timeSlot",
    columns: [
      { key: "dayOfWeek", label: "Day" },
      { key: "timeSlot", label: "Time" },
      { key: "venue", label: "Venue" },
      { key: "intention", label: "Intention" },
      { key: "language", label: "Language" },
    ],
    fields: [
      {
        key: "dayOfWeek",
        label: "Day of week",
        type: "select",
        options: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      },
      { key: "timeSlot", label: "Mass time", type: "time" },
      {
        key: "language",
        label: "Language",
        type: "select",
        options: ["English", "Marathi", "Tamil", "Hindi"],
      },
      { key: "intention", label: "Intention" },
      {
        key: "venue",
        label: "Venue",
        type: "select",
        options: ["Main Church", "Chulne", "Chapel", "Parish Hall"],
      },
      {
        key: "isActive",
        label: "Status",
        type: "select",
        options: ["true", "false"],
      },
    ],
  },
  {
    type: "sacraments",
    label: "Sacraments",
    singular: "Sacrament",
    description: "Sacraments listed on the Prayer & Liturgy screens.",
    titleKey: "name",
    columns: [
      { key: "name", label: "Name" },
      { key: "description", label: "Description" },
    ],
    fields: [
      { key: "name", label: "Name" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    type: "clergy",
    label: "Clergy",
    singular: "Clergy Member",
    description: "Priests and pastoral team shown on Who We Are.",
    titleKey: "name",
    columns: [
      { key: "name", label: "Name" },
      { key: "role", label: "Role" },
    ],
    fields: [
      { key: "name", label: "Name" },
      { key: "role", label: "Role" },
      { key: "image", label: "Image URL" },
      { key: "bio", label: "Bio", type: "textarea" },
    ],
  },
  {
    type: "communities",
    label: "Communities",
    singular: "Community",
    description: "Parish communities and Small Christian Communities.",
    titleKey: "name",
    columns: [
      { key: "name", label: "Name" },
      { key: "zone", label: "Zone" },
      { key: "patronSaint", label: "Patron saint" },
      { key: "description", label: "Description" },
      { key: "ppcPerson", label: "PPC person" },
      { key: "minister", label: "Minister" },
      { key: "communityMembers", label: "Community members", type: "key-value" },
      { key: "zoneDetails", label: "Zone details", type: "key-value" },
    ],
    fields: [
      { key: "name", label: "Community Name" },
      { key: "patronSaint", label: "Patron Saint" },
      { key: "zone", label: "Zone number", type: "number" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "ppcPerson", label: "PPC person" },
      { key: "minister", label: "Minister" },
      { key: "communityMembers", label: "Community members", type: "key-value" },
      { key: "zoneDetails", label: "Zone details", type: "key-value" },
    ],
  },
  {
    type: "cell-associations",
    label: "Cell Associations",
    singular: "Cell Association",
    description: "Parish cells and their coordinators and members.",
    titleKey: "name",
    columns: [
      { key: "name", label: "Name" },
      { key: "priestInCharge", label: "Priest in charge" },
      { key: "coordinatorName", label: "Coordinator" },
      { key: "meetingSchedule", label: "Meeting schedule" },
      { key: "cellMembers", label: "Cell members", type: "member-list" },
    ],
    fields: [
      { key: "name", label: "Cell name" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "priestInCharge", label: "Priest in charge" },
      { key: "coordinatorTitle", label: "Coordinator title" },
      { key: "coordinatorName", label: "Coordinator name" },
      { key: "meetingSchedule", label: "Meeting schedule" },
      { key: "cellMembers", label: "Cell members", type: "member-list" },
    ],
  },
  {
    type: "history",
    label: "History Timeline",
    singular: "Timeline Entry",
    description: "Milestones shown on the Parish History screen.",
    titleKey: "year",
    columns: [
      { key: "year", label: "Year" },
      { key: "text", label: "Text" },
    ],
    fields: [
      { key: "year", label: "Year" },
      { key: "text", label: "Text", type: "textarea" },
    ],
  },
  {
    type: "chronicle",
    label: "Chronicle Issues",
    singular: "Chronicle Issue",
    description: "Parish magazine issues.",
    titleKey: "title",
    columns: [
      { key: "title", label: "Title" },
      { key: "slug", label: "Slug" },
      { key: "body", label: "Body", type: "textarea" },
      { key: "coverImageId", label: "Cover image ID", type: "number" },
      { key: "publishDate", label: "Publish date", type: "date" },
      { key: "expiryDate", label: "Expiry date", type: "date" },
      { key: "link", label: "Link" },
    ],
    fields: [
      { key: "title", label: "Title" },
      { key: "slug", label: "Slug" },
      { key: "body", label: "Body", type: "textarea" },
      { key: "coverImageId", label: "Cover image ID", type: "number" },
      { key: "publishDate", label: "Publish date", type: "date" },
      { key: "expiryDate", label: "Expiry date", type: "date" },
      { key: "link", label: "Link" },
    ],
  },
  {
    type: "outreach",
    label: "Outreach",
    singular: "Outreach Item",
    description: "Reaching Out and outreach highlights.",
    titleKey: "title",
    columns: [
      { key: "title", label: "Title" },
      { key: "description", label: "Description" },
    ],
    fields: [
      { key: "title", label: "Title" },
      { key: "image", label: "Image URL" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
]

export function getAdminEntity(type: string): AdminEntityConfig | undefined {
  return ADMIN_ENTITIES.find((e) => e.type === type)
}
