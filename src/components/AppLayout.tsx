'use client'

import { useState, useEffect } from 'react'
import FloatingHeader from './FloatingHeader'
import MapView from './MapView'
import TravelContainer from './TravelContainer'
import DestinationDetailView from './DestinationDetailView'
import FilterPanel from './FilterPanel'
import { Destination } from '@/types'
import { sampleDestinations, ITEMS_PER_PAGE } from '@/lib/sampleData'

interface AppLayoutProps {
  projectName?: string
  mapZoom?: number
  initialBudget?: number
  showRoutes?: boolean
}

export default function AppLayout({
  projectName = "Capstone Tourisme Train",
  mapZoom = 6,
  initialBudget = 200,
  showRoutes = true
}: AppLayoutProps) {
  const [startLocation, setStartLocation] = useState("Paris")
  const [mapCenter, setMapCenter] = useState<[number, number]>([48.8566, 2.3522])
  const [currentBudget, setCurrentBudget] = useState(initialBudget)
  const [currentPage, setCurrentPage] = useState(0)
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null)
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)

  const handleMarkerClick = (destination: Destination) => {
    setSelectedDestination(destination)
  }

  const handleCloseDetail = () => {
    setSelectedDestination(null)
  }

  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(prevState => !prevState)
  }

  useEffect(() => {
    setCurrentPage(0)
  }, [currentBudget])

  const filteredDestinations = sampleDestinations.filter(
    (dest) => dest.estimatedCost <= currentBudget,
  )
  
  const totalPages = Math.ceil(filteredDestinations.length / ITEMS_PER_PAGE)
  const paginatedDestinations = filteredDestinations.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE,
  )

  // Create the list of destinations to show on the map
  let destinationsOnMap = paginatedDestinations

  // If a destination is selected, add it to the map if not already visible
  if (selectedDestination) {
    const isSelectedVisible = paginatedDestinations.some(d => d.station.id === selectedDestination.station.id)
    
    if (!isSelectedVisible) {
      destinationsOnMap = [...paginatedDestinations, selectedDestination]
    }
  }

  return (
    <div className="relative w-full h-screen bg-secondary-200 overflow-hidden">
      {/* Background with map */}
      <div className="absolute inset-0">
        <MapView
          center={mapCenter}
          zoom={mapZoom}
          markersData={destinationsOnMap}
          onMarkerClick={handleMarkerClick}
          showRoutes={showRoutes}
        />
      </div>

      {/* Floating header */}
      <FloatingHeader projectName={projectName} />

      {/* Main content layout */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 z-10 flex items-start gap-4">
        {/* Travel container */}
        <TravelContainer
          title="Où souhaitez-vous aller ?"
          budget={currentBudget}
          onBudgetChange={setCurrentBudget}
          destinations={paginatedDestinations}
          allFilteredDestinations={filteredDestinations}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          startLocation={startLocation}
          onLocationChange={setStartLocation}
          isReduced={selectedDestination !== null}
          onDestinationSelect={handleMarkerClick}
          onFilterClick={toggleFilterPanel}
        />

        {/* Destination detail view */}
        {selectedDestination && (
          <DestinationDetailView
            destination={selectedDestination}
            onClose={handleCloseDetail}
          />
        )}

        {/* Filter panel */}
        {isFilterPanelOpen && (
          <FilterPanel onClose={() => setIsFilterPanelOpen(false)} />
        )}
      </div>
    </div>
  )
}
