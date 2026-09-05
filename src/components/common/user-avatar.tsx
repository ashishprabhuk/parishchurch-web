import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function initialsFromName(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
}

export function UserAvatar({ name }: { name: string }) {
  return (
    <Avatar className="size-9">
      <AvatarFallback>{initialsFromName(name)}</AvatarFallback>
    </Avatar>
  )
}
