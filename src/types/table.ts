export type ProjectRow = {
  id: string
  name: string
  owner: string
  status: "active" | "paused" | "archived"
  health: number
  updatedAt: string
}
