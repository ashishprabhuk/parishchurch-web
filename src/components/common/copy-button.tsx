import { useState } from "react"
import { Check, Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { notify } from "@/lib/toast"

export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    notify.success("Copied to clipboard")
    window.setTimeout(() => setCopied(false), 1000)
  }

  return (
    <Button variant="outline" size="sm" onClick={onCopy}>
      {copied ? (
        <Check className="mr-2 size-4" />
      ) : (
        <Copy className="mr-2 size-4" />
      )}{" "}
      Copy
    </Button>
  )
}
