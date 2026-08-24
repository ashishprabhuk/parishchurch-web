import { env } from "@/lib/env"

export function useAppName() {
  return env.VITE_APP_NAME
}
