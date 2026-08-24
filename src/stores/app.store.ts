import { create } from "zustand"
import { persist } from "zustand/middleware"

type ThemePreference = "light" | "dark" | "system"

type AppStore = {
  sidebarCollapsed: boolean
  sidebarOpenMobile: boolean
  themePreference: ThemePreference
  setThemePreference: (theme: ThemePreference) => void
  toggleSidebarCollapsed: () => void
  setSidebarOpenMobile: (open: boolean) => void
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      sidebarOpenMobile: false,
      themePreference: "system",
      setThemePreference: (themePreference) => set({ themePreference }),
      toggleSidebarCollapsed: () =>
        set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarOpenMobile: (sidebarOpenMobile) => set({ sidebarOpenMobile }),
    }),
    {
      name: "starter-ui-state",
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        themePreference: state.themePreference,
      }),
    },
  ),
)
