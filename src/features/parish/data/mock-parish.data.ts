import { addDays, formatISO } from "date-fns"

import type {
  ChronicleIssue,
  ClergyMember,
  MassTiming,
  OutreachItem,
  ParishAnnouncement,
  ParishEvent,
  Sacrament,
} from "@/features/parish/types"

const placeholder = "https://images.unsplash.com"

export const announcements: ParishAnnouncement[] = [
  {
    id: "a1",
    slug: "parish-feast-celebration",
    title: "Parish Feast Celebration",
    excerpt:
      "Join us for a joyful day of Eucharistic celebration, fellowship, and community meals.",
    category: "Community",
    image: `${placeholder}/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=1400&q=80`,
    date: formatISO(addDays(new Date(), -3)),
    content: [
      "Our annual parish feast will begin with a solemn thanksgiving Mass followed by a cultural gathering in the parish courtyard.",
      "Families, youth groups, and seniors are invited to participate in service stalls, choir performances, and shared meals.",
      "Please register volunteers at the parish office by Friday evening.",
    ],
  },
  {
    id: "a2",
    slug: "youth-retreat-registration-open",
    title: "Youth Retreat Registration Open",
    excerpt:
      "A weekend retreat focused on prayer, scripture, and discipleship for young adults.",
    category: "Youth",
    image: `${placeholder}/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=80`,
    date: formatISO(addDays(new Date(), -7)),
    content: ["Registration is now open for all youth members aged 16 to 28."],
  },
  {
    id: "a3",
    slug: "new-catechism-batch",
    title: "New Catechism Batch Begins",
    excerpt:
      "Sunday catechism classes restart this month with new mentors and updated curriculum.",
    category: "Formation",
    image: `${placeholder}/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80`,
    date: formatISO(addDays(new Date(), -10)),
    content: [
      "Parents are requested to complete student forms before classes begin.",
    ],
  },
]

export const events: ParishEvent[] = [
  {
    id: "e1",
    title: "Sunday Family Mass",
    category: "Liturgy",
    location: "Main Church",
    date: formatISO(addDays(new Date(), 1)),
    time: "10:00 AM",
    description: "A special Mass with children and family participation.",
  },
  {
    id: "e2",
    title: "Evening Adoration",
    category: "Prayer",
    location: "Adoration Chapel",
    date: formatISO(addDays(new Date(), 3)),
    time: "7:30 PM",
    description: "Silent adoration and intercessory prayer.",
  },
  {
    id: "e3",
    title: "Community Service Drive",
    category: "Outreach",
    location: "Parish Hall",
    date: formatISO(addDays(new Date(), 6)),
    time: "9:00 AM",
    description: "Food and medicine support for neighboring communities.",
  },
]

export const massTimings: MassTiming[] = [
  { id: "m1", dayGroup: "today", label: "Morning Mass", time: "7:00 AM" },
  { id: "m2", dayGroup: "today", label: "Evening Mass", time: "6:30 PM" },
  { id: "m3", dayGroup: "sunday", label: "Sunday Mass", time: "8:00 AM" },
  { id: "m4", dayGroup: "sunday", label: "Sunday Mass", time: "10:00 AM" },
  { id: "m5", dayGroup: "sunday", label: "Sunday Mass", time: "6:00 PM" },
]

export const sacraments: Sacrament[] = [
  {
    id: "s1",
    name: "Baptism",
    description: "Welcoming new life into Christ and the Church.",
  },
  {
    id: "s2",
    name: "Confirmation",
    description: "Strengthened by the gifts of the Holy Spirit.",
  },
  {
    id: "s3",
    name: "Eucharist",
    description: "Nourishment through the Body and Blood of Christ.",
  },
  {
    id: "s4",
    name: "Reconciliation",
    description: "Healing and renewal through mercy.",
  },
  {
    id: "s5",
    name: "Marriage",
    description: "A covenant of love blessed in faith.",
  },
  {
    id: "s6",
    name: "Anointing of the Sick",
    description: "Prayerful comfort and strength in illness.",
  },
]

export const clergy: ClergyMember[] = [
  {
    id: "c1",
    name: "Fr. Anthony D'Souza",
    role: "Parish Priest",
    image: `${placeholder}/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=700&q=80`,
    bio: "Guiding the parish in liturgy, pastoral care, and outreach ministries.",
  },
  {
    id: "c2",
    name: "Fr. Michael Fernandes",
    role: "Associate Priest",
    image: `${placeholder}/photo-1542382257-80dedb725088?auto=format&fit=crop&w=700&q=80`,
    bio: "Serving youth and family ministries with a focus on catechesis.",
  },
]

export const outreach: OutreachItem[] = [
  {
    id: "o1",
    title: "Faith in Action",
    description:
      "Medical camps, meals, and dignity support for vulnerable families.",
    image: `${placeholder}/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=1300&q=80`,
  },
]

export const historyTimeline = [
  { year: "1985", text: "The parish begins as a small prayer community." },
  { year: "1995", text: "A larger church campus is inaugurated." },
  {
    year: "2010",
    text: "New ministries for youth and social outreach are launched.",
  },
  {
    year: "Today",
    text: "A vibrant, diverse parish rooted in prayer and service.",
  },
]

export const chronicleIssues: ChronicleIssue[] = [
  {
    id: "ch1",
    title: "The Parish Chronicle - August 2026",
    issueDate: formatISO(addDays(new Date(), -14)),
    cover: `${placeholder}/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80`,
    fileUrl: "#",
  },
]
