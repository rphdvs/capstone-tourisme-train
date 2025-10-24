'use client'

interface DestinationCardProps {
  imageUrl: string
  cityName: string
  price: number
  onClick?: () => void
}

export default function DestinationCard({ imageUrl, cityName, price, onClick }: DestinationCardProps) {
  return (
    <div 
      className="flex items-center h-24 rounded-lg overflow-hidden shadow-sm bg-white border border-secondary-200 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <img
        src={imageUrl}
        alt={`Image de ${cityName}`}
        className="w-24 h-full object-cover"
      />
      <div className="flex-grow p-4">
        <h3 className="font-bold text-secondary-800">{cityName}</h3>
        <p className="text-secondary-600">à partir de {price}€</p>
      </div>
    </div>
  )
}
