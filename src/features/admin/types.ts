export type AdminEntityType =
  | "announcements"
  | "events"
  | "mass-timings"
  | "sacraments"
  | "clergy"
  | "communities"
  | "associations"
  | "history"
  | "chronicle"
  | "outreach"

export type AdminField = {
  key: string
  label: string
  type?: "text" | "textarea" | "date" | "select"
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
    label: "Events",
    singular: "Event",
    description: "Parish gatherings shown on the Events and Calendar screens.",
    titleKey: "title",
    columns: [
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "date", label: "Date", type: "date" },
      { key: "time", label: "Time" },
      { key: "location", label: "Location" },
    ],
    fields: [
      { key: "title", label: "Title" },
      { key: "category", label: "Category" },
      { key: "date", label: "Date", type: "date" },
      { key: "time", label: "Time" },
      { key: "location", label: "Location" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    type: "mass-timings",
    label: "Mass Timings",
    singular: "Mass Timing",
    description: "Daily and Sunday Mass schedule.",
    titleKey: "label",
    columns: [
      { key: "label", label: "Label" },
      { key: "dayGroup", label: "Day group" },
      { key: "time", label: "Time" },
    ],
    fields: [
      { key: "label", label: "Label" },
      {
        key: "dayGroup",
        label: "Day group",
        type: "select",
        options: ["today", "sunday", "weekday"],
      },
      { key: "time", label: "Time" },
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
    description: "Parish communities and groups.",
    titleKey: "name",
    columns: [{ key: "name", label: "Name" }],
    fields: [{ key: "name", label: "Name" }],
  },
  {
    type: "associations",
    label: "Cells & Associations",
    singular: "Association",
    description: "Cells, associations, and lay movements.",
    titleKey: "name",
    columns: [{ key: "name", label: "Name" }],
    fields: [{ key: "name", label: "Name" }],
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
      { key: "issueDate", label: "Issue date", type: "date" },
    ],
    fields: [
      { key: "title", label: "Title" },
      { key: "issueDate", label: "Issue date", type: "date" },
      { key: "cover", label: "Cover image URL" },
      { key: "fileUrl", label: "File URL" },
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
