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

const sacramentGeneralRules = [
  "Proper preparation shall be provided according to the nature and requirements of each sacrament.",
  "The person receiving the sacrament must fulfil the requirements of the Catholic Church and the Diocese of Vasai.",
  "All required documents and certificates must be submitted to the Parish Office before the celebration of the sacrament.",
  "All sacraments shall be celebrated according to the approved liturgical books of the Catholic Church, the norms of the Diocese of Vasai and the pastoral guidelines of Our Lady of Fatima Church.",
  "The Parish Priest shall ensure that the person receiving the sacrament is properly instructed and suitably disposed to receive it.",
  "Parish registration and sacramental records shall be maintained accurately and carefully.",
  "No sacrament should be administered merely as a social, cultural or customary function. Its spiritual and ecclesial meaning must always be respected.",
  "Parents, godparents, sponsors and candidates shall participate in the prescribed catechetical and spiritual preparation programmes.",
  "Every sacramental celebration shall be conducted with dignity, reverence, prayerfulness and simplicity.",
  "Photography, video recording, decorations, music and other arrangements must not distract from or interfere with the sacredness of the liturgy.",
  "Any fees or offerings shall be in accordance with diocesan guidelines. Financial difficulty should never become an obstacle to receiving a sacrament.",
  "Any exceptional or special case shall be referred to the Parish Priest and, where necessary, to the Diocese, rather than being decided informally.",
]

export const sacraments: Sacrament[] = [
  {
    id: "s1",
    name: "Baptism",
    description: "Holy Baptism is the gateway to life in the Spirit and the foundation of the Christian life.",
    image: "/assets/sacraments_images/baptism.jpg",
    pdfUrl: "https://drive.google.com/file/d/14RatgAK3P-xhHV3U9Bupmx2n8zdydGGX/view?usp=sharing",
    sections: [{ paragraphs: ["Holy Baptism is the basis of the whole Christian life, the gateway to life in the Spirit (vitae spiritualis ianua), and the door which gives access to the other sacraments. Through Baptism we are freed from sin and reborn as sons of God; we become members of Christ, are incorporated into the Church and made sharers in her mission. (CCC 1213)", "Baptism is birth into the new life in Christ. In accordance with the Lord's will, it is necessary for salvation, as is the Church herself, which we enter by Baptism. (CCC 1277)"], title: "About Baptism" }],
    generalRules: sacramentGeneralRules,
  },
  {
    id: "s2",
    name: "Confirmation",
    description: "Confirmation strengthens the baptized with the Holy Spirit and equips them to witness to the faith.",
    image: "/assets/sacraments_images/confirmation.jpg",
    pdfUrl: "https://drive.google.com/file/d/1ZZV1VR03rwfGz-VDG8SeurM71c67RDxZ/view?usp=sharing",
    generalRules: sacramentGeneralRules,
    sections: [
      { title: "About Confirmation", paragraphs: ["The Sacrament of Confirmation is a vital component of Christian initiation, closely linked with Baptism and the Eucharist. It strengthens the baptized, enriching them with the Holy Spirit and imprinting an indelible character that binds them more firmly to the Church. (Code of Canon Law 879)", "Confirmation gives a special grace that empowers individuals to witness to their faith boldly and engage actively in the mission of the Church. It deepens one's relationship with Christ and completes Christian initiation, equipping believers to spread and defend the faith with courage and commitment. The importance of Confirmation lies in its role in completing the process of initiation, equipping believers to spread and defend the faith in their daily lives."] },
      {
        title: "Confirmation preparation",
        paragraphs: [
          "Candidates who have completed 15 years of age or have appeared for the SSC examination may register at the Parish Office for Confirmation preparation.",
          "Candidates must undergo one full year of catechetical preparation before receiving the Sacrament of Confirmation.",
          "Attendance at the Confirmation classes is compulsory. Candidates are expected to attend all prescribed classes regularly.",
          "Candidates will be required to appear for the prescribed examination or assessment as part of their preparation.",
          "The Parish shall verify the candidate's Baptism record and other required documents.",
          "Candidates should be properly instructed about the meaning, grace and responsibilities associated with the Sacrament of Confirmation.",
          "Candidates must attend the regular Saturday classes after Mass throughout the preparation year.",
          "Candidates should understand that Confirmation is not the completion of Christian life but a deeper commitment to living and witnessing to the faith.",
          "After Confirmation, candidates are encouraged to continue their Christian formation and active participation in parish life.",
        ],
      },
      {
        title: "Regular participation",
        paragraphs: [
          "Candidates are expected to participate regularly in:",
        ],
        items: [
          "Catechetical classes",
          "Sunday Eucharist",
          "Parish activities",
          "Prayer and spiritual formation",
        ],
      },
      {
        title: "Confirmation programme",
        paragraphs: [
          "The Confirmation programme shall include not only catechetical instruction but also:",
        ],
        items: [
          "Social visits and exposure programmes",
          "Service-oriented activities",
          "Presentations and talks on the lives of the saints",
          "Opportunities for personal prayer and spiritual growth",
        ],
      },
    ],
    
  },
  {
    id: "s3",
    name: "Eucharist",
    description: "The Eucharist is the source and summit of Christian life, nourishing the faithful through Christ's Body and Blood.",
    image: "/assets/sacraments_images/eucharist.jpg",
    pdfUrl: "https://drive.google.com/file/d/1H-4cwAjBTn4wj1EoXtL5nvSQb7pBMGDg/view?usp=sharing",
    sections: [{ title: "About the Eucharist", paragraphs: ["The Eucharist is central to the life of the Catholic Church, regarded as the source and summit of Christian life. (Lumen Gentium, no. 11) It represents the sacrificial offering of Christ's Body and Blood, instituted at the Last Supper, and is a profound encounter with Jesus that nourishes the faithful spiritually. (CCC 1407)", "Through the Eucharist, believers are united with Christ and with one another in charity and communion. This sacrament not only commemorates Christ's sacrifice but also anticipates the final coming of God's Kingdom, providing a foretaste of eternal life. The Eucharist is essential for the Church's mission, empowering the faithful to live out their commitment to love and service in the world."] }, { title: "First Holy Communion", paragraphs: ["First Holy Communion is administered to children of Std. IV. Parents of eligible candidates must fill in and submit the registration form in June and provide a copy of the child's Baptism Certificate for verification at the Parish Office."] }],
    generalRules: sacramentGeneralRules,
  },
  {
    id: "s4",
    name: "Reconciliation",
    description: "Through confession and absolution, Reconciliation brings pardon, peace, and renewed communion with God.",
    image: "/assets/sacraments_images/confession.jpg",
    pdfUrl: "https://drive.google.com/file/d/1kO4YxvgukfKmQkNN5rWger36DUCQ-OIS/view?usp=sharing",
    sections: [{ title: "About Reconciliation", paragraphs: ["It is called the sacrament of confession, since the disclosure or confession of sins to a priest is an essential element of this sacrament. In a profound sense it is also a confession - acknowledgment and praise - of the holiness of God and of his mercy toward sinful man.", "It is called the sacrament of forgiveness, since by the priest's sacramental absolution God grants the penitent pardon and peace.", "It is called the sacrament of Reconciliation because it imparts to the sinner the love of God who reconciles: 'Be reconciled to God.' He who lives by God's merciful love is ready to respond to the Lord's call: 'Go; first be reconciled to your brother.' (CCC 1424)"] }],
    generalRules: sacramentGeneralRules,
  },
  {
    id: "s5",
    name: "Matrimony",
    description: "Matrimony is a sacred, perpetual covenant of love reflecting Christ's relationship with the Church.",
    image: "/assets/sacraments_images/marriage.jpg",
    pdfUrl: "https://drive.google.com/file/d/19Dtu17KMGpOkokcajLULyuDU7cx3Y242/view?usp=sharing",
    sections: [{ title: "About Matrimony", paragraphs: ["The Sacrament of Matrimony is a sacred union between a man and woman, signifying the profound relationship between Christ and the Church. It bestows grace upon the spouses, enabling them to love each other with the same self-giving love that Christ has for His Church, perfecting their human love and strengthening their bond. (CCC 1661)", "This sacrament establishes a perpetual and exclusive bond that cannot be dissolved. It calls the couple to a life of holiness, mutual support, and responsible parenthood. Matrimony is not merely a social contract but a divine vocation that reflects God's love and serves as a witness to salvation within the Church community. (Amoris Laetitia, 72)"] }],
    generalRules: sacramentGeneralRules,
  },
  {
    id: "s6",
    name: "Anointing of the Sick",
    description: "Anointing of the Sick brings spiritual and physical healing, comfort, strength, and peace to those who are seriously ill or elderly.",
    image: "/assets/sacraments_images/anointing_of_the_sick.jpg",
    pdfUrl: "https://drive.google.com/file/d/1gTwz4k_sH_yzy0tVm30ey9NtdxKzM-Gs/view?usp=sharing",
    sections: [{ title: "About Anointing of the Sick", paragraphs: ["The Sacrament of Anointing of the Sick is a significant sacrament in the Catholic Church, instituted by Christ to provide spiritual and physical healing to those who are seriously ill or elderly. (CCC 1527) It involves the anointing of the sick person with blessed oil, accompanied by prayers from the priest, which invoke the grace of the Holy Spirit. ", "This sacrament serves multiple purposes: it unites the sick individual with the Passion of Christ, offers comfort and peace, provides strength to endure suffering, and can lead to the forgiveness of sins if the person is unable to confess. Additionally, it prepares the individual for the journey to eternal life, reinforcing the Church's commitment to care for the sick and suffering, reflecting Christ's compassion and healing ministry (CCC 1511, 1532)"] }],
    generalRules: sacramentGeneralRules,
  },
  {
    id: "s7",
    name: "Holy Orders",
    description: "Holy Orders consecrates bishops, priests, and deacons for service to the Church and her people.",
    image: "/assets/sacraments_images/priestly_ordination.jpg",
    sections: [{ title: "About Holy Orders", paragraphs: ["The Sacrament of Holy Orders is a vital sacrament in the Catholic Church through which men are ordained as bishops, priests, or deacons, enabling them to serve the Church and its faithful. This sacrament is conferred by the bishop through the imposition of hands and a solemn prayer of consecration, invoking the Holy Spirit to bestow the necessary graces for their ministry. (CCC 1597)", "Holy Orders continues Christ's mission by empowering ordained ministers to perform sacred duties, including administering the sacraments, particularly the Eucharist. The sacrament imprints an indelible spiritual character and signifies a commitment to serve in the name of Christ. (CCC 1536)"], items: ["For information on the Priesthood or Permanent Diaconate, please contact any of the parish fathers, who will be happy to guide you in discerning your vocation."] }],
    generalRules: [],
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
