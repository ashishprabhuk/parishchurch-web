import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query"
import type { PropsWithChildren } from "react"

import { notify } from "@/lib/toast"

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: () => {
      notify.error("Unable to load data. Please try again.")
    },
  }),
  mutationCache: new MutationCache({
    onError: () => {
      notify.error("Something went wrong while saving your changes.")
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
})

export function QueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
