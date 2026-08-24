import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import type { ProfileFormValues } from "@/features/example/schemas/profile.schema"
import { profileSchema } from "@/features/example/schemas/profile.schema"
import { notify } from "@/lib/toast"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function ProfileForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setValue,
    watch,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      role: "engineer",
      bio: "",
      receiveEmail: true,
      workspaceType: "saas",
    },
  })

  const receiveEmail = watch("receiveEmail")
  const role = watch("role")
  const workspaceType = watch("workspaceType")

  const onSubmit = async (values: ProfileFormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 700))
    notify.success(`Profile saved for ${values.fullName}`)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-2">
        <Label htmlFor="fullName">Name</Label>
        <Input
          id="fullName"
          placeholder="Taylor Morgan"
          {...register("fullName")}
        />
        {errors.fullName ? (
          <p className="text-destructive text-xs">{errors.fullName.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label>Role</Label>
        <Select
          value={role}
          onValueChange={(value) =>
            setValue("role", value as ProfileFormValues["role"], {
              shouldValidate: true,
            })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="founder">Founder</SelectItem>
            <SelectItem value="engineer">Engineer</SelectItem>
            <SelectItem value="designer">Designer</SelectItem>
            <SelectItem value="operator">Operator</SelectItem>
          </SelectContent>
        </Select>
        {errors.role ? (
          <p className="text-destructive text-xs">{errors.role.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label>Workspace type</Label>
        <RadioGroup
          value={workspaceType}
          onValueChange={(value) =>
            setValue(
              "workspaceType",
              value as ProfileFormValues["workspaceType"],
              {
                shouldValidate: true,
              },
            )
          }
          className="grid gap-2 sm:grid-cols-3"
        >
          {[
            { value: "saas", label: "SaaS" },
            { value: "internal", label: "Internal Tool" },
            { value: "portfolio", label: "Portfolio" },
          ].map((option) => (
            <Label
              key={option.value}
              htmlFor={option.value}
              className="border-input flex items-center gap-2 rounded-md border p-2"
            >
              <RadioGroupItem value={option.value} id={option.value} />
              {option.label}
            </Label>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" rows={4} {...register("bio")} />
        {errors.bio ? (
          <p className="text-destructive text-xs">{errors.bio.message}</p>
        ) : null}
      </div>

      <Label className="flex items-center gap-2">
        <Checkbox
          checked={receiveEmail}
          onCheckedChange={(checked) =>
            setValue("receiveEmail", checked === true, { shouldValidate: true })
          }
        />
        Receive weekly product updates
      </Label>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save profile"}
      </Button>

      {isSubmitSuccessful ? (
        <p className="text-xs text-emerald-600">Form submitted successfully.</p>
      ) : null}
    </form>
  )
}
