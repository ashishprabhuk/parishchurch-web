import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import {
  createAdminRecord,
  createAdminUser,
  archiveAdminRecord,
  deleteAdminRecord,
  deleteAdminUser,
  getAdminUsers,
  getAdminCollection,
  patchAdminRecord,
  resetAdminUserPassword,
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

export function usePatchAdminRecord(type: AdminEntityType) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Record<string, unknown> }) =>
      patchAdminRecord(type, id, payload),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: keys.collection(type) }),
  })
}

export function useArchiveAdminRecord(type: AdminEntityType) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => archiveAdminRecord(type, id),
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

export function useAdminUsers() {
  return useQuery({ queryKey: ["admin", "users"], queryFn: getAdminUsers })
}

function invalidateUsers(queryClient: ReturnType<typeof useQueryClient>) {
  return Promise.all([
    queryClient.invalidateQueries({ queryKey: ["admin", "users"] }),
    queryClient.invalidateQueries({ queryKey: ["admin", "roles"] }),
  ])
}

export function useCreateAdminUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createAdminUser,
    onSuccess: () => invalidateUsers(queryClient),
  })
}

export function useResetAdminUserPassword() {
  return useMutation({
    mutationFn: ({
      id,
      newPassword,
      confirmPassword,
    }: {
      id: string
      newPassword: string
      confirmPassword: string
    }) => resetAdminUserPassword(id, { newPassword, confirmPassword }),
  })
}

export function useDeleteAdminUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteAdminUser,
    onSuccess: () => invalidateUsers(queryClient),
  })
}
