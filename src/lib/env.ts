import { z } from "zod"

const envSchema = z.object({
  VITE_API_URL: z.string().optional().default("/api"),
  VITE_APP_NAME: z.string().optional().default("Church Web App"),
  VITE_APP_ENV: z
    .enum(["development", "staging", "production"])
    .optional()
    .default("production"),
})

const parsedEnv = envSchema.safeParse({
  VITE_API_URL: import.meta.env.VITE_API_URL || undefined,
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME || undefined,
  VITE_APP_ENV: import.meta.env.VITE_APP_ENV || undefined,
})

if (!parsedEnv.success) {
  // Throwing early makes bad runtime configuration visible immediately.
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(parsedEnv.error.flatten().fieldErrors)}`,
  )
}

export const env = parsedEnv.data

