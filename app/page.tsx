import { FantasyDataProvider } from '@/providers/FantasyDataProvider'
import { dataProcessor } from '@/lib/data-processor'

import FilterPanel from '@/components/FilterPanel'
import FilteredPlayersInfo from '@/components/FIlteredPlayersInfo.tsx'

// This is a Server Component - data is fetched at build time
export default async function Home() {
  // SSG: Load data at build time
  const processedData = dataProcessor.getProcessedData()
  const { slates, filterOptions } = processedData

  return (
    <FantasyDataProvider
      initialData={{
        slates,
        filterOptions,
      }}
    >
      <main className="min-h-screen">
        <div className=" px-4 xl:px-8">
          {/* Filter Panel */}
          <div className="my-14">
            <FilterPanel />
          </div>

          {/* Players Table */}
          <div className="my-16">
            <FilteredPlayersInfo />
          </div>
        </div>
      </main>
    </FantasyDataProvider>
  )
}

// Generate static parameters for build optimization
export function generateStaticParams() {
  return [{}] // Single static page
}

// Optional: Force static generation
export const dynamic = 'force-static'
