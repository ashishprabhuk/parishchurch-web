import { useEffect, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  getAnnouncementBySlug,
  getAnnouncements,
  getCellsAssociations,
  getCellsAssociationById,
  getChronicle,
  getChronicleBySlug,
  getClergy,
  getClergyById,
  getCommunities,
  getEventsCalendar,
  getUpcomingEvents,
  getHistoryTimeline,
  getMassTimings,
  getMassTimingById,
  getOutreach,
  getSacraments,
  postFeedback,
} from "@/features/parish/services/parish.service"
import {
  createLiveMass,
  deleteLiveMass,
  endLiveStream,
  getAdminLiveStream,
  getAdminLiveMasses,
  getLiveMasses,
  publishLiveStream,
  updateLiveMass,
  type CreateLiveMassPayload,
  type UpdateLiveMassPayload,
} from "@/features/parish/services/live-stream.service"
import type {
  LiveMassRecord,
  LiveStream,
  LiveStreamStatus,
} from "@/features/parish/types"
import {
  formatCountdown,
  selectActiveAndUpcomingMass,
} from "@/features/parish/utils/live-mass"

const keys = {
  announcements: ["parish", "announcements"] as const,
  announcement: (slug: string) => ["parish", "announcements", slug] as const,
  events: (from?: string, to?: string) => ["parish", "events", from, to] as const,
  upcomingEvents: ["parish", "events", "upcoming"] as const,
  mass: ["parish", "mass"] as const,
  sacraments: ["parish", "sacraments"] as const,
  clergy: ["parish", "clergy"] as const,
  communities: ["parish", "communities"] as const,
  associations: ["parish", "associations"] as const,
  history: ["parish", "history"] as const,
  chronicle: ["parish", "chronicle"] as const,
  outreach: ["parish", "outreach"] as const,
  liveStream: ["parish", "live-stream"] as const,
}

export function useAnnouncements() {
  return useQuery({ queryKey: keys.announcements, queryFn: getAnnouncements })
}

export function useAnnouncement(slug: string) {
  return useQuery({
    queryKey: keys.announcement(slug),
    queryFn: () => getAnnouncementBySlug(slug),
  })
}

export function useEventsCalendar(from?: string, to?: string) {
  return useQuery({
    queryKey: keys.events(from, to),
    queryFn: () => getEventsCalendar(from, to),
  })
}

export function useUpcomingEvents() {
  return useQuery({
    queryKey: keys.upcomingEvents,
    queryFn: getUpcomingEvents,
  })
}

export function useMassTimings() {
  return useQuery({ queryKey: keys.mass, queryFn: getMassTimings })
}

export function useMassTiming(id: string) {
  return useQuery({
    queryKey: [...keys.mass, id],
    queryFn: () => getMassTimingById(id),
    enabled: Boolean(id),
  })
}

export function useSacraments() {
  return useQuery({ queryKey: keys.sacraments, queryFn: getSacraments })
}

export function useClergy() {
  return useQuery({ queryKey: keys.clergy, queryFn: getClergy })
}

export function useClergyMember(id: string) {
  return useQuery({
    queryKey: [...keys.clergy, id],
    queryFn: () => getClergyById(id),
    enabled: Boolean(id),
  })
}

export function useCommunities() {
  return useQuery({ queryKey: keys.communities, queryFn: getCommunities })
}

export function useCellsAssociations() {
  return useQuery({
    queryKey: keys.associations,
    queryFn: getCellsAssociations,
  })
}

export function useCellsAssociation(id: string) {
  return useQuery({
    queryKey: [...keys.associations, id],
    queryFn: () => getCellsAssociationById(id),
    enabled: Boolean(id),
  })
}

export function useHistoryTimeline() {
  return useQuery({ queryKey: keys.history, queryFn: getHistoryTimeline })
}

export function useChronicle() {
  return useQuery({ queryKey: keys.chronicle, queryFn: getChronicle })
}

export function useChronicleIssue(slug: string) {
  return useQuery({
    queryKey: [...keys.chronicle, slug],
    queryFn: () => getChronicleBySlug(slug),
    enabled: Boolean(slug),
  })
}

export function useOutreach() {
  return useQuery({ queryKey: keys.outreach, queryFn: getOutreach })
}

export function useLiveMasses() {
  return useQuery({
    queryKey: keys.liveStream,
    queryFn: getLiveMasses,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  })
}

export function useLiveStream() {
  const query = useQuery({
    queryKey: keys.liveStream,
    queryFn: getLiveMasses,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  })

  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const interval = window.setInterval(() => {
      setNow(new Date())
    }, 5000)
    return () => window.clearInterval(interval)
  }, [])

  const masses: LiveMassRecord[] = Array.isArray(query.data) ? query.data : []
  const { activeMass, upcomingMass, updatedMasses } =
    selectActiveAndUpcomingMass(masses, now)

  const isLive = Boolean(activeMass)
  const stream: LiveStreamStatus = activeMass
    ? {
        id: activeMass.id,
        youtubeVideoId: activeMass.youtubeVideoId,
        title: activeMass.title,
        isLive: true,
        startedAt: activeMass.startsAt,
        endedAt: activeMass.endsAt,
        createdAt: activeMass.startsAt,
        updatedAt: activeMass.startsAt,
      }
    : { isLive: false }

  const countdown = upcomingMass
    ? formatCountdown(upcomingMass.startsAt, now)
    : ""

  return {
    ...query,
    data: stream,
    stream,
    isLive,
    activeMass,
    upcomingMass,
    allMasses: updatedMasses,
    countdown,
  }
}

export function useAdminLiveStream() {
  return useQuery({
    queryKey: [...keys.liveStream, "admin"],
    queryFn: getAdminLiveStream,
  })
}

export function useAdminLiveMasses() {
  const query = useQuery({
    queryKey: [...keys.liveStream, "all"],
    queryFn: getAdminLiveMasses,
    refetchInterval: 30_000,
    refetchOnWindowFocus: true,
  })

  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const interval = window.setInterval(() => setNow(new Date()), 5000)
    return () => window.clearInterval(interval)
  }, [])

  const masses: LiveMassRecord[] = Array.isArray(query.data) ? query.data : []
  const { activeMass, upcomingMass, updatedMasses } =
    selectActiveAndUpcomingMass(masses, now)

  return {
    ...query,
    data: updatedMasses,
    activeMass,
    upcomingMass,
    allMasses: updatedMasses,
  }
}

export function useCreateLiveMass() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: CreateLiveMassPayload) => createLiveMass(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: keys.liveStream })
      void queryClient.invalidateQueries({
        queryKey: [...keys.liveStream, "all"],
      })
    },
  })
}

export function useUpdateLiveMass() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: UpdateLiveMassPayload
    }) => updateLiveMass(id, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: keys.liveStream })
      void queryClient.invalidateQueries({
        queryKey: [...keys.liveStream, "all"],
      })
    },
  })
}

export function useDeleteLiveMass() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteLiveMass(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: keys.liveStream })
      void queryClient.invalidateQueries({
        queryKey: [...keys.liveStream, "all"],
      })
    },
  })
}

export function usePublishLiveStream() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      payload,
      current,
    }: {
      payload: Parameters<typeof publishLiveStream>[0]
      current?: LiveStream
    }) => publishLiveStream(payload, current),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: keys.liveStream })
      void queryClient.invalidateQueries({
        queryKey: [...keys.liveStream, "admin"],
      })
      void queryClient.invalidateQueries({
        queryKey: [...keys.liveStream, "all"],
      })
    },
  })
}

export function useEndLiveStream() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: endLiveStream,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: keys.liveStream })
      void queryClient.invalidateQueries({
        queryKey: [...keys.liveStream, "admin"],
      })
      void queryClient.invalidateQueries({
        queryKey: [...keys.liveStream, "all"],
      })
    },
  })
}

export function useSubmitFeedback() {
  return useMutation({ mutationFn: postFeedback })
}
