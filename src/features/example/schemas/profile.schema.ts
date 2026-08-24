import { z } from "zod"

export const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  role: z.enum(["founder", "engineer", "designer", "operator"]),
  bio: z
    .string()
    .min(10, "Bio should be at least 10 characters.")
    .max(200, "Bio should be under 200 characters."),
  receiveEmail: z.boolean().default(true),
  workspaceType: z.enum(["saas", "internal", "portfolio"]),
})

export type ProfileFormValues = z.infer<typeof profileSchema>
