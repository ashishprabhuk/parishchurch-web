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
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email ? (
            <p className="text-destructive mt-1 text-xs">
              Valid email required.
            </p>
          ) : null}
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} />
        </div>
        <div>
          <Label>Category</Label>
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
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" rows={5} {...register("message")} />
        {errors.message ? (
          <p className="text-destructive mt-1 text-xs">
            Message should be meaningful.
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
