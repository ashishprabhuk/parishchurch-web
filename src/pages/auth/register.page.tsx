import { Link } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RegisterPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="text-muted-foreground text-sm">
          Starter registration UI for new projects.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" placeholder="Jane Doe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="jane@company.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" />
      </div>
      <Button className="w-full">Create account</Button>
      <p className="text-muted-foreground text-sm">
        Already registered?{" "}
        <Link className="text-primary underline" to="/login">
          Sign in
        </Link>
      </p>
    </div>
  )
}
