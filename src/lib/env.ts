import { z } from "zod"

const envSchema = z.object({
  VITE_API_URL: z.string().url().default("http://localhost:4000/api"),
  VITE_APP_NAME: z.string().min(1).default("React Vite Master Starter"),
  VITE_APP_ENV: z
    .enum(["development", "staging", "production"])
    .default("development"),
})

const parsedEnv = envSchema.safeParse({
  VITE_API_URL: import.meta.env.VITE_API_URL,
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  VITE_APP_ENV: import.meta.env.VITE_APP_ENV,
})

if (!parsedEnv.success) {
  // Throwing early makes bad runtime configuration visible immediately.
  throw new Error(
    `Invalid environment variables: ${JSON.stringify(parsedEnv.error.flatten().fieldErrors)}`,
  )
}

export const env = parsedEnv.data
