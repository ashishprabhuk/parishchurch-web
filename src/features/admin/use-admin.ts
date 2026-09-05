import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  createAdminRecord,
  deleteAdminRecord,
  getAdminCollection,
  updateAdminRecord,
} from "./admin.service"
import type { AdminEntityType } from "./types"

const keys = {
  collection: (type: AdminEntityType) => ["admin", type] as const,
}

export function useAdminCollection(type: AdminEntityType) {
  return useQuery({
    queryKey: keys.collection(type),
    queryFn: () => getAdminCollection(type),
  })
}

export function useCreateAdminRecord(type: AdminEntityType) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (payload: Record<string, unknown>) =>
      createAdminRecord(type, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: keys.collection(type) }),
  })
}

export function useUpdateAdminRecord(type: AdminEntityType) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string
      payload: Record<string, unknown>
    }) => updateAdminRecord(type, id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: keys.collection(type) }),
  })
}

export function useDeleteAdminRecord(type: AdminEntityType) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => deleteAdminRecord(type, id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: keys.collection(type) }),
  })
}
