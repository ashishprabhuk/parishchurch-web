import { useState } from "react"
import {
  Ban,
  CalendarDays,
  CheckCircle2,
  Clock,
  Clock3,
  ExternalLink,
  Pencil,
  Plus,
  Radio,
  RotateCcw,
  Search,
  Trash2,
  Video,
} from "lucide-react"

import { ConfirmDialog } from "@/components/common/confirm-dialog"
import { EmptyState } from "@/components/feedback/empty-state"
import { ErrorState } from "@/components/feedback/error-state"
import { LoadingState } from "@/components/feedback/loading-state"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  formatChurchDateTime,
  formatCountdown,
  fromChurchDateTimeInput,
  toChurchDateTimeInput,
  useAdminLiveMasses,
  useCreateLiveMass,
  useDeleteLiveMass,
  useUpdateLiveMass,
  type LiveMassRecord,
  type LiveMassStatus,
} from "@/features/parish"
import { useSeo } from "@/hooks/use-seo"
import { extractYouTubeVideoId } from "@/lib/youtube"
import { notify } from "@/lib/toast"

export default function LiveStreamAdminPage() {
  useSeo({
    title: "Live Mass Management | Parish Admin",
    description: "Schedule, monitor, and manage parish YouTube Live Mass broadcasts.",
    canonicalPath: "/admin/live",
  })

  const {
    data: liveMasses = [],
    activeMass,
    upcomingMass,
    isLoading,
    isError,
    refetch,
  } = useAdminLiveMasses()

  const createMutation = useCreateLiveMass()
  const updateMutation = useUpdateLiveMass()
  const deleteMutation = useDeleteLiveMass()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingMass, setEditingMass] = useState<LiveMassRecord | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("ALL")

  // Form states
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [title, setTitle] = useState("")
  const [startsAtInput, setStartsAtInput] = useState("")
  const [durationMinutes, setDurationMinutes] = useState("60")
  const [isCancelled, setIsCancelled] = useState(false)
  const [formError, setFormError] = useState("")

  const videoId = extractYouTubeVideoId(youtubeUrl)
  const isUrlInvalid = youtubeUrl.trim().length > 0 && !videoId

  const openAddDialog = () => {
    setEditingMass(null)
    setYoutubeUrl("")
    setTitle("Holy Mass - Church of Our Lady of Fatima")
    setStartsAtInput(toChurchDateTimeInput(new Date()))
    setDurationMinutes("60")
    setIsCancelled(false)
    setFormError("")
    setDialogOpen(true)
  }

  const openEditDialog = (mass: LiveMassRecord) => {
    setEditingMass(mass)
    setYoutubeUrl(mass.youtubeUrl || (mass.youtubeVideoId ? `https://www.youtube.com/watch?v=${mass.youtubeVideoId}` : ""))
    setTitle(mass.title)
    setStartsAtInput(toChurchDateTimeInput(mass.startsAt))
    setDurationMinutes(String(mass.durationMinutes || 60))
    setIsCancelled(mass.isCancelled)
    setFormError("")
    setDialogOpen(true)
  }

  const handleSave = async () => {
    setFormError("")
    if (!videoId) {
      setFormError("Please enter a valid YouTube video or live-stream URL.")
      return
    }
    if (!title.trim()) {
      setFormError("Mass title is required.")
      return
    }
    const duration = Number(durationMinutes)
    if (!duration || duration <= 0) {
      setFormError("Please enter a positive duration in minutes.")
      return
    }
    if (!startsAtInput) {
      setFormError("Please select a scheduled start time.")
      return
    }

    const isoUtcStartsAt = fromChurchDateTimeInput(startsAtInput)

    try {
      if (editingMass) {
        await updateMutation.mutateAsync({
          id: editingMass.id,
          payload: {
            youtubeUrl: youtubeUrl.trim(),
            title: title.trim(),
            startsAt: isoUtcStartsAt,
            durationMinutes: duration,
            isCancelled,
          },
        })
        notify.success("Live Mass updated successfully.")
      } else {
        await createMutation.mutateAsync({
          youtubeUrl: youtubeUrl.trim(),
          title: title.trim(),
          startsAt: isoUtcStartsAt,
          durationMinutes: duration,
          isCancelled: false,
        })
        notify.success("Live Mass scheduled successfully.")
      }
      setDialogOpen(false)
    } catch {
      notify.error(editingMass ? "Failed to update Live Mass." : "Failed to create Live Mass.")
    }
  }

  const handleToggleCancel = async (mass: LiveMassRecord) => {
    try {
      await updateMutation.mutateAsync({
        id: mass.id,
        payload: {
          youtubeUrl: mass.youtubeUrl,
          title: mass.title,
          startsAt: mass.startsAt,
          durationMinutes: mass.durationMinutes,
          isCancelled: !mass.isCancelled,
        },
      })
      notify.success(mass.isCancelled ? "Mass uncancelled." : "Mass cancelled.")
    } catch {
      notify.error("Failed to update cancellation status.")
    }
  }

  const handleStartNow = async (mass: LiveMassRecord) => {
    try {
      await updateMutation.mutateAsync({
        id: mass.id,
        payload: {
          youtubeUrl: mass.youtubeUrl,
          title: mass.title,
          startsAt: new Date().toISOString(),
          durationMinutes: mass.durationMinutes,
          isCancelled: false,
        },
      })
      notify.success("Live Mass is live now.")
    } catch {
      notify.error("Failed to start Live Mass now.")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteMutation.mutateAsync(id)
      notify.success("Live Mass deleted successfully.")
    } catch {
      notify.error("Failed to delete Live Mass record.")
    }
  }

  if (isLoading) return <LoadingState label="Loading Live Mass broadcasts..." />
  if (isError) {
    return (
      <ErrorState
        title="Live Mass settings are unavailable"
        description="We could not load the Live Mass data from the server."
        onRetry={() => void refetch()}
      />
    )
  }

  // Filter masses
  const filteredMasses = liveMasses.filter((mass) => {
    if (statusFilter !== "ALL" && mass.computedStatus !== statusFilter) {
      return false
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      return (
        mass.title.toLowerCase().includes(q) ||
        mass.youtubeVideoId.toLowerCase().includes(q)
      )
    }
    return true
  })

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-primary text-xs font-semibold tracking-[0.16em] uppercase">
            Broadcast Control
          </p>
          <h1 className="font-heading mt-1 text-2xl sm:text-3xl text-walnut">
            Live Mass Management
          </h1>
          <p className="text-muted-foreground mt-1 max-w-2xl text-sm leading-relaxed">
            Schedule upcoming Holy Mass broadcasts, manage live streams, and monitor automatic expirations.
          </p>
        </div>
        <Button onClick={openAddDialog} className="w-fit gap-1.5 shrink-0">
          <Plus className="size-4" /> Add Live Mass
        </Button>
      </div>

      {/* Active Stream Alert Card */}
      {activeMass ? (
        <Card className="border-rose-500/50 bg-rose-500/5 shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-500 opacity-75" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-rose-600" />
                </span>
                <span className="text-xs font-bold tracking-wider text-rose-700 dark:text-rose-400 uppercase">
                  Active Live Mass
                </span>
              </div>
              <h2 className="font-heading text-xl sm:text-2xl text-walnut">
                {activeMass.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock3 className="size-3.5" /> Started: {formatChurchDateTime(activeMass.startsAt)}
                </span>
                <span>·</span>
                <span>Ends: {formatChurchDateTime(activeMass.endsAt)}</span>
                <span>·</span>
                <a
                  href={`https://www.youtube.com/watch?v=${activeMass.youtubeVideoId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary inline-flex items-center gap-1 font-medium hover:underline"
                >
                  YouTube <ExternalLink className="size-3" />
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={() => void handleStartNow(upcomingMass!)}
                className="gap-1.5"
              >
                <Radio className="size-3.5" /> Live now
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openEditDialog(activeMass)}
                className="gap-1.5"
              >
                <Pencil className="size-3.5" /> Edit
              </Button>
              <ConfirmDialog
                trigger={
                  <Button variant="destructive" size="sm" className="gap-1.5">
                    <Ban className="size-3.5" /> Cancel Stream
                  </Button>
                }
                title="Cancel active broadcast?"
                description="This will immediately mark the stream as cancelled and remove it from the public website player."
                onConfirm={() => void handleToggleCancel(activeMass)}
              />
            </div>
          </CardContent>
        </Card>
      ) : upcomingMass ? (
        <Card className="border-blue-500/40 bg-blue-500/5 shadow-sm">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-blue-500/60 text-blue-600 dark:text-blue-400 gap-1 uppercase tracking-wider text-[0.65rem]">
                  <Clock className="size-3" /> Upcoming Broadcast
                </Badge>
                <span className="text-xs font-semibold text-blue-700 dark:text-blue-300">
                  {formatCountdown(upcomingMass.startsAt)}
                </span>
              </div>
              <h2 className="font-heading text-lg sm:text-xl text-walnut">
                {upcomingMass.title}
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CalendarDays className="size-3.5" /> Scheduled: {formatChurchDateTime(upcomingMass.startsAt)}
                </span>
                <span>·</span>
                <span>Duration: {upcomingMass.durationMinutes}m</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => openEditDialog(upcomingMass)}
                className="gap-1.5"
              >
                <Pencil className="size-3.5" /> Edit
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {/* Broadcast History & Saved Masses */}
      <Card className="border-border/70">
        <CardHeader className="gap-4 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="font-heading text-xl">All Live Mass Records</CardTitle>
            <p className="text-muted-foreground text-xs mt-1">
              All dates and times are displayed in Church Local Time (Asia/Kolkata, IST).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[200px]">
              <Search className="text-muted-foreground absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2" />
              <Input
                placeholder="Search masses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 text-xs"
              />
            </div>

            <div className="flex rounded-md border border-border/80 bg-muted/40 p-0.5 text-xs">
              {(["ALL", "LIVE", "UPCOMING", "COMPLETED", "CANCELLED"] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setStatusFilter(filter)}
                  className={`rounded px-2.5 py-1 font-medium transition-colors ${
                    statusFilter === filter
                      ? "bg-background text-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {filter.charAt(0) + filter.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="overflow-x-auto p-0">
          {filteredMasses.length === 0 ? (
            <div className="p-8 text-center">
              <EmptyState
                title="No Live Mass records found"
                description={
                  searchQuery || statusFilter !== "ALL"
                    ? "Try adjusting your search or status filter."
                    : "Get started by adding your first Live Mass broadcast."
                }
                actionLabel={searchQuery || statusFilter !== "ALL" ? undefined : "Add Live Mass"}
                onAction={searchQuery || statusFilter !== "ALL" ? undefined : openAddDialog}
              />
            </div>
          ) : (
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide border-b border-border/60">
                <tr>
                  <th className="px-5 py-3 font-semibold">Title</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Starts At (IST)</th>
                  <th className="px-4 py-3 font-semibold">Ends At (IST)</th>
                  <th className="px-4 py-3 font-semibold">Duration</th>
                  <th className="px-4 py-3 font-semibold">YouTube Stream</th>
                  <th className="px-5 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredMasses.map((mass) => (
                  <tr key={mass.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-5 py-3.5 font-medium max-w-[240px]">
                      <div className="truncate font-semibold text-walnut">{mass.title}</div>
                      <div className="text-muted-foreground text-xs font-mono truncate">ID: {mass.id}</div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <StatusBadge status={mass.computedStatus} />
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-xs">
                      {formatChurchDateTime(mass.startsAt)}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-xs">
                      {formatChurchDateTime(mass.endsAt)}
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-xs">
                      {mass.durationMinutes} min
                    </td>
                    <td className="px-4 py-3.5 max-w-[180px] truncate text-xs">
                      {mass.youtubeVideoId ? (
                        <a
                          href={`https://www.youtube.com/watch?v=${mass.youtubeVideoId}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1 font-mono"
                        >
                          <Video className="size-3" />
                          {mass.youtubeVideoId}
                          <ExternalLink className="size-2.5" />
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={`Edit ${mass.title}`}
                          onClick={() => openEditDialog(mass)}
                        >
                          <Pencil className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label={mass.isCancelled ? "Uncancel Mass" : "Cancel Mass"}
                          onClick={() => void handleToggleCancel(mass)}
                          title={mass.isCancelled ? "Uncancel Mass" : "Cancel Mass"}
                        >
                          {mass.isCancelled ? (
                            <RotateCcw className="size-3.5 text-blue-600" />
                          ) : (
                            <Ban className="size-3.5 text-amber-600" />
                          )}
                        </Button>
                        <ConfirmDialog
                          trigger={
                            <Button
                              variant="ghost"
                              size="icon-sm"
                              aria-label={`Delete ${mass.title}`}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="size-3.5" />
                            </Button>
                          }
                          title="Delete this Live Mass record?"
                          description="This permanently deletes the saved Mass record from the database. This does not alter the YouTube video itself."
                          onConfirm={() => void handleDelete(mass.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      {/* Add / Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="w-[calc(100vw-2rem)] sm:max-w-lg max-h-[calc(100dvh-2rem)] overflow-y-auto p-5 sm:p-6 gap-4">
          <DialogHeader>
            <DialogTitle>
              {editingMass ? "Edit Live Mass" : "Schedule Live Mass"}
            </DialogTitle>
            <DialogDescription>
              Provide the YouTube stream URL and schedule. The Mass will automatically appear on the website during its active window.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            {formError ? (
              <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive">
                {formError}
              </div>
            ) : null}

            {/* YouTube URL */}
            <div className="grid gap-1.5">
              <Label htmlFor="live-form-url">YouTube URL</Label>
              <Input
                id="live-form-url"
                placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                aria-invalid={isUrlInvalid}
              />
              {videoId ? (
                <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="size-3.5" /> Valid YouTube ID: {videoId}
                </p>
              ) : isUrlInvalid ? (
                <p className="text-xs text-destructive">
                  Please enter a valid YouTube video or stream link.
                </p>
              ) : (
                <p className="text-muted-foreground text-xs">
                  Supports standard watch links, youtu.be, and live stream links.
                </p>
              )}
            </div>

            {/* Title */}
            <div className="grid gap-1.5">
              <Label htmlFor="live-form-title">Mass Title</Label>
              <Input
                id="live-form-title"
                placeholder="Holy Mass - Our Lady of Fatima"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Schedule & Duration */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="live-form-starts-at">
                  Scheduled Start (Church Time)
                </Label>
                <Input
                  id="live-form-starts-at"
                  type="datetime-local"
                  value={startsAtInput}
                  onChange={(e) => setStartsAtInput(e.target.value)}
                />
                <span className="text-muted-foreground text-[0.7rem]">
                  Asia/Kolkata (IST, UTC+5:30)
                </span>
              </div>

              <div className="grid gap-1.5">
                <Label htmlFor="live-form-duration">Duration (minutes)</Label>
                <Input
                  id="live-form-duration"
                  type="number"
                  min="1"
                  step="1"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(e.target.value)}
                />
                <span className="text-muted-foreground text-[0.7rem]">
                  Default: 60 minutes
                </span>
              </div>
            </div>

            {/* Cancellation Flag (shown on edit) */}
            {editingMass ? (
              <div className="flex items-center gap-2.5 rounded-lg border border-border/70 p-3 bg-muted/20">
                <Checkbox
                  id="live-form-cancelled"
                  checked={isCancelled}
                  onCheckedChange={(checked) => setIsCancelled(Boolean(checked))}
                />
                <div className="grid gap-0.5">
                  <Label htmlFor="live-form-cancelled" className="cursor-pointer font-medium text-sm">
                    Mark this Mass as cancelled
                  </Label>
                  <span className="text-muted-foreground text-xs">
                    Cancelled broadcasts are never presented as live on the public site.
                  </span>
                </div>
              </div>
            ) : null}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => void handleSave()}
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {createMutation.isPending || updateMutation.isPending
                ? "Saving..."
                : editingMass
                  ? "Update Mass"
                  : "Schedule Mass"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function StatusBadge({ status }: { status: LiveMassStatus }) {
  switch (status) {
    case "LIVE":
      return (
        <Badge className="bg-rose-600 text-white gap-1.5 font-semibold">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-200 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-white" />
          </span>
          <Radio className="size-3" /> Live
        </Badge>
      )
    case "UPCOMING":
      return (
        <Badge variant="outline" className="border-blue-500/60 text-blue-600 dark:text-blue-400 gap-1 font-medium">
          <Clock3 className="size-3" /> Upcoming
        </Badge>
      )
    case "CANCELLED":
      return (
        <Badge variant="destructive" className="gap-1 font-medium">
          <Ban className="size-3" /> Cancelled
        </Badge>
      )
    case "COMPLETED":
    default:
      return (
        <Badge className="border border-emerald-500/40 bg-emerald-100 text-emerald-800 font-medium dark:bg-emerald-950/60 dark:text-emerald-200">
          Completed
        </Badge>
      )
  }
}
