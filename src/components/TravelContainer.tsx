'use client'

import SearchControls from './SearchControls'
import DestinationCard from './DestinationCard'
import { Destination } from '@/types'

interface TravelContainerProps {
  title: string
  budget: number
  onBudgetChange: (budget: number) => void
  destinations: Destination[]
  allFilteredDestinations: Destination[]
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  startLocation: string
  onLocationChange: (location: string) => void
  isReduced: boolean
  onDestinationSelect: (destination: Destination) => void
  onFilterClick: () => void
}

const ChevronLeft = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
  </svg>
)

const ChevronRight = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
  </svg>
)

export default function TravelContainer({
  title,
  budget,
  onBudgetChange,
  destinations,
  allFilteredDestinations,
  currentPage,
  totalPages,
  onPageChange,
  startLocation,
  onLocationChange,
  isReduced,
  onDestinationSelect,
  onFilterClick
}: TravelContainerProps) {
  return (
    <div className={`
      ${isReduced ? 'w-[120px]' : 'w-[400px]'} h-[720px] 
      bg-white rounded-xl shadow-lg font-sans flex flex-col 
      transition-all duration-300 ease-in-out
    `}>
      {isReduced ? (
        // Reduced view
        <>
          <div className="p-4 text-center border-b border-secondary-200">
            <p className="text-xs font-semibold text-secondary-500 uppercase tracking-wider">Budget Max</p>
            <p className="text-3xl font-bold text-primary-600 mt-1">{budget}€</p>
          </div>
          
          <div className="flex-grow overflow-y-auto">
            {allFilteredDestinations.map(dest => (
              <button 
                key={dest.station.id} 
                onClick={() => onDestinationSelect(dest)}
                className="w-full block py-3 text-center text-lg text-secondary-700 border-b border-secondary-100 last:border-b-0 hover:bg-secondary-100 transition-colors"
              >
                {dest.estimatedCost}€
              </button>
            ))}
          </div>
        </>
      ) : (
        // Full view
        <>
          <h2 className="text-xl font-bold text-center p-4 text-secondary-800">{title}</h2>
          
          <SearchControls
            budget={budget}
            onBudgetChange={onBudgetChange}
            startLocation={startLocation}
            onLocationChange={onLocationChange}
            onFilterClick={onFilterClick}
          />

          <div className="flex-grow min-h-0 p-4">
            <div className={`flex flex-col gap-3 h-full ${destinations.length === 0 ? "justify-center" : ""}`}>
              {destinations.length > 0 ? (
                destinations.map(dest => (
                  <DestinationCard
                    key={dest.station.id}
                    cityName={dest.station.name}
                    price={dest.estimatedCost}
                    imageUrl={dest.imageUrl || "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=400"}
                    onClick={() => onDestinationSelect(dest)}
                  />
                ))
              ) : (
                <p className="text-center text-secondary-500 text-sm">
                  Aucune destination disponible...
                </p>
              )}
            </div>
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 pb-4">
              <button 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 0} 
                className="p-2 rounded-full bg-secondary-200 hover:bg-secondary-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft />
              </button>
              <span className="text-sm font-semibold text-secondary-600">
                Page {currentPage + 1} / {totalPages}
              </span>
              <button 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage + 1 >= totalPages} 
                className="p-2 rounded-full bg-secondary-200 hover:bg-secondary-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
