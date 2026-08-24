export const APP_CONFIG = {
  name: "React Vite Master Starter",
  description:
    "Production-ready React foundation for serious web applications.",
  nav: [
    {
      title: "Overview",
      items: [{ label: "Home", href: "/", icon: "home" }],
    },
    {
      title: "Workspace",
      items: [
        { label: "Dashboard", href: "/dashboard", icon: "layout-dashboard" },
        { label: "Settings", href: "/settings", icon: "settings" },
      ],
    },
  ],
} as const

export type NavIconName = "home" | "layout-dashboard" | "settings"
