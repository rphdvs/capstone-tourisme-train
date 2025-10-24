'use client'

import { Destination } from '@/types'

interface DestinationDetailViewProps {
  destination: Destination
  onClose: () => void
}

const CloseIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
  </svg>
)

export default function DestinationDetailView({ destination, onClose }: DestinationDetailViewProps) {
  if (!destination) return null

  return (
    <div className="w-[450px] h-[720px] bg-white rounded-xl shadow-lg font-sans flex flex-col p-4 relative">
      {/* Close button */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 p-2 rounded-full bg-secondary-100 hover:bg-secondary-200 text-secondary-600 z-10"
      >
        <CloseIcon />
      </button>

      {/* Content */}
      <div className="flex-grow flex flex-col">
        <img 
          src={destination.imageUrl || "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=400"} 
          alt={`Image de ${destination.station.name}`} 
          className="w-full h-56 object-cover rounded-lg mb-4" 
        />
        <h2 className="text-4xl font-bold text-secondary-800">{destination.station.name}</h2>
        <p className="text-xl text-secondary-600 mb-6">à partir de {destination.estimatedCost}€</p>
        <p className="text-secondary-700 text-sm mb-auto">
          Explorez la magnifique ville de {destination.station.name}. Profitez de son architecture unique, de sa gastronomie locale et de ses paysages inoubliables.
        </p>
        <button className="w-full mt-4 py-3 text-lg font-bold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors">
          Réserver ce trajet
        </button>
      </div>
    </div>
  )
}
