import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  getAnnouncementBySlug,
  getAnnouncements,
  getCellsAssociations,
  getCellsAssociationById,
  getChronicle,
  getChronicleBySlug,
  getClergy,
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
  endLiveStream,
  getLiveStream,
  publishLiveStream,
} from "@/features/parish/services/live-stream.service"

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

export function useLiveStream() {
  return useQuery({ queryKey: keys.liveStream, queryFn: getLiveStream })
}

export function usePublishLiveStream() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: publishLiveStream,
    onSuccess: (stream) => {
      queryClient.setQueryData(keys.liveStream, stream)
    },
  })
}

export function useEndLiveStream() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: endLiveStream,
    onSuccess: (stream) => {
      queryClient.setQueryData(keys.liveStream, stream)
    },
  })
}

export function useSubmitFeedback() {
  return useMutation({ mutationFn: postFeedback })
}
