import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { useSubmitFeedback } from "@/features/parish"
import { notify } from "@/lib/toast"

const feedbackSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email(),
  phone: z.string().min(8).max(15).optional(),
  category: z.enum([
    "General",
    "Prayer Request",
    "Complaint",
    "Suggestion",
    "Sacrament Query",
    "Donation Query",
  ]),
  message: z.string().min(12),
  anonymous: z.boolean(),
})

type FeedbackValues = z.infer<typeof feedbackSchema>

export function FeedbackForm() {
  const mutation = useSubmitFeedback()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FeedbackValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      email: "",
      category: "General",
      message: "",
      anonymous: false,
    },
  })

  const category = watch("category")
  const anonymous = watch("anonymous")

  const onSubmit = async (values: FeedbackValues) => {
    await mutation.mutateAsync(values)
    notify.success("Thank you. Your message has been received.")
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name (optional)</Label>
          <Input id="name" {...register("name")} />
          {errors.name ? (
            <p className="text-destructive mt-1 text-xs">{errors.name.message}</p>
          ) : null}
        </div>
        <div>
          <Label htmlFor="email">Email <span aria-hidden="true">*</span></Label>
          <Input id="email" type="email" required {...register("email")} />
          {errors.email ? (
            <p className="text-destructive mt-1 text-xs">
              {errors.email.message ?? "Enter a valid email address."}
            </p>
          ) : null}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Phone (optional)</Label>
          <Input id="phone" type="tel" inputMode="tel" {...register("phone")} />
          {errors.phone ? (
            <p className="text-destructive mt-1 text-xs">{errors.phone.message}</p>
          ) : null}
        </div>
        <div>
          <Label>Category <span aria-hidden="true">*</span></Label>
          <Select
            value={category}
            onValueChange={(value) =>
              setValue("category", value as FeedbackValues["category"])
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="General">General</SelectItem>
              <SelectItem value="Prayer Request">Prayer Request</SelectItem>
              <SelectItem value="Complaint">Complaint</SelectItem>
              <SelectItem value="Suggestion">Suggestion</SelectItem>
              <SelectItem value="Sacrament Query">Sacrament Query</SelectItem>
              <SelectItem value="Donation Query">Donation Query</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="message">Message <span aria-hidden="true">*</span></Label>
        <Textarea id="message" rows={5} required {...register("message")} />
        {errors.message ? (
          <p className="text-destructive mt-1 text-xs">
            {errors.message.message ?? "Please enter at least 12 characters."}
          </p>
        ) : null}
      </div>
      <div>
        <Label htmlFor="attachment">Optional attachment</Label>
        <Input id="attachment" type="file" />
      </div>
      <Label className="flex items-center gap-2 text-sm">
        <Checkbox
          checked={anonymous}
          onCheckedChange={(checked) => setValue("anonymous", checked === true)}
        />
        Anonymous prayer request
      </Label>
      <Button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Sending..." : "Share With Us"}
      </Button>
    </form>
  )
}
