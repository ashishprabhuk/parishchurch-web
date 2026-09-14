import { addDays, formatISO } from "date-fns"

import type {
  ChronicleIssue,
  ClergyMember,
  MassTiming,
  OutreachItem,
  ParishAnnouncement,
  ParishAssociation,
  ParishCommunity,
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
  // General Weekday Timings
  { id: "m1", dayGroup: "weekday", label: "Morning Mass", time: "06:00 AM", intention: "GENERAL", language: "Marathi" },
  { id: "m2", dayGroup: "weekday", label: "Morning Mass", time: "06:45 AM", intention: "GENERAL", language: "Marathi" },
  { id: "m3", dayGroup: "weekday", label: "Evening Mass", time: "06:30 PM", intention: "GENERAL", language: "Marathi" },
  { id: "m4", dayGroup: "weekday", label: "Morning Mass", time: "07:00 AM", intention: "GENERAL", language: "English" },
  { id: "m5", dayGroup: "weekday", label: "Evening Mass", time: "05:30 PM", intention: "GENERAL", language: "English" },
  { id: "m6", dayGroup: "weekday", label: "Evening Mass", time: "07:00 PM", intention: "GENERAL", language: "English" },
  { id: "m7", dayGroup: "weekday", label: "Tuesday Special Mass", time: "06:00 PM", intention: "GENERAL", language: "Tamil", description: "Every Tuesday evening" },

  // General Sunday Timings
  { id: "m8", dayGroup: "sunday", label: "Early Morning Mass", time: "06:00 AM", intention: "GENERAL", language: "Marathi" },
  { id: "m9", dayGroup: "sunday", label: "Morning High Mass", time: "08:00 AM", intention: "GENERAL", language: "Marathi" },
  { id: "m10", dayGroup: "sunday", label: "Evening Mass", time: "05:15 PM", intention: "GENERAL", language: "Marathi" },
  { id: "m11", dayGroup: "sunday", label: "Family Sung Mass", time: "10:30 AM", intention: "GENERAL", language: "English" },
  { id: "m12", dayGroup: "sunday", label: "Youth & Evening Mass", time: "06:00 PM", intention: "GENERAL", language: "English" },
  { id: "m13", dayGroup: "sunday", label: "Tamil Mass", time: "09:15 AM", intention: "GENERAL", language: "Tamil" },
  { id: "m14", dayGroup: "sunday", label: "Afternoon Mass", time: "04:00 PM", intention: "GENERAL", language: "Tamil" },

  // Special Occasions
  {
    id: "m15",
    dayGroup: "today",
    label: "Parish Feast Thanksgiving Mass",
    time: "10:00 AM",
    intention: "CHURCH FEAST",
    language: "Marathi",
    image: "https://images.unsplash.com/photo-1548625361-1854483f12ef?auto=format&fit=crop&w=1200&q=80",
    description: "Solemn Pontifical Eucharistic Celebration with parish choir and procession.",
    date: "Annual Parish Feast Day",
  },
  {
    id: "m16",
    dayGroup: "today",
    label: "Perpetual Succour Novena & Mass",
    time: "06:00 PM",
    intention: "NOVEENA",
    language: "English",
    image: "https://images.unsplash.com/photo-1519491050282-cf00c82424b4?auto=format&fit=crop&w=1200&q=80",
    description: "Weekly Perpetual Novena prayers followed by Holy Mass.",
    date: "Every Wednesday",
  },
  {
    id: "m17",
    dayGroup: "today",
    label: "Easter Vigil Mass",
    time: "11:00 PM",
    intention: "EASTER",
    language: "Marathi",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=80",
    description: "Blessing of the Paschal Candle, Resurrection liturgy, and Eucharistic blessing.",
    date: "Holy Saturday Night",
  },
]

export const communitiesData: ParishCommunity[] = [
  {
    id: "com1",
    name: "St. Joseph SCC Community",
    zone: "Zone 1 - Hill Road",
    patron: "St. Joseph",
    leader: "Francis D'Souza",
    contact: "+91 98200 11223",
    meetingTime: "1st & 3rd Tuesday, 7:30 PM",
    description: "Small Christian Community uniting local families for Gospel sharing, rosary prayer, and neighborly support.",
  },
  {
    id: "com2",
    name: "Our Lady of Grace Community",
    zone: "Zone 2 - Chapel Road",
    patron: "Mother Mary",
    leader: "Maria Lobo",
    contact: "+91 98201 44556",
    meetingTime: "Alternate Wednesdays, 7:00 PM",
    description: "Active family cluster focusing on scripture study, elderly visitation, and liturgical assistance.",
  },
  {
    id: "com3",
    name: "St. Jude Fellowship Circle",
    zone: "Zone 3 - Bazar Road",
    patron: "St. Jude",
    leader: "Anthony Rodriques",
    contact: "+91 98202 77889",
    meetingTime: "Every Thursday, 8:00 PM",
    description: "Community focused on intercessory prayer and local parish outreach programs.",
  },
]

export const associationsData: ParishAssociation[] = [
  {
    id: "assoc1",
    name: "Legion of Mary",
    category: "Lay Apostolate",
    leader: "Sr. Teresa D'Silva",
    meetingTime: "Every Saturday, 5:00 PM",
    contact: "legion@stmaryparish.org",
    description: "Marian apostolate dedicated to spiritual works of mercy, home visits, and prayer ministry.",
  },
  {
    id: "assoc2",
    name: "Parish Choir Association",
    category: "Liturgical Music",
    leader: "Mark Alvares",
    meetingTime: "Every Friday, 7:00 PM",
    contact: "choir@stmaryparish.org",
    description: "Polyphonic and choir ministry leading Sunday Masses, feast days, and liturgical celebrations.",
  },
  {
    id: "assoc3",
    name: "Society of St. Vincent de Paul",
    category: "Outreach & Charity",
    leader: "Philip Fernandes",
    meetingTime: "1st & 3rd Sunday, 11:30 AM",
    contact: "svp@stmaryparish.org",
    description: "Charitable organization providing financial, medical, and educational relief to underprivileged families.",
  },
  {
    id: "assoc4",
    name: "Youth Movement",
    category: "Youth Ministry",
    leader: "Aaron Pereira",
    meetingTime: "Every Sunday, 5:00 PM",
    contact: "youth@stmaryparish.org",
    description: "Empowering young parishioners through faith formation, retreats, sports, and community service.",
  },
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
