'use client'

import AppLayout from '@/components/AppLayout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLayout 
        projectName="Capstone Tourisme Train"
        mapZoom={6}
        initialBudget={200}
        showRoutes={true}
      />
    </QueryClientProvider>
  )
}
