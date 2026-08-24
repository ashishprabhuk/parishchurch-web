import { useMutation, useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/lib/constants"
import { queryClient } from "@/app/providers/query-provider"
import { getDashboardPayload } from "@/features/example/services/dashboard.service"

export function useDashboard() {
  return useQuery({
    queryKey: QUERY_KEYS.stats,
    queryFn: getDashboardPayload,
  })
}

export function useRefreshDashboard() {
  return useMutation({
    mutationFn: async () => true,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.stats })
    },
  })
}
