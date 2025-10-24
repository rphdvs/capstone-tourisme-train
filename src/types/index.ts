export interface Station {
  id: string
  name: string
  coordinates: {
    lat: number
    lng: number
  }
  region?: string
}

export interface Destination {
  station: Station
  estimatedCost: number
  travelTime: number
  imageUrl?: string
  isochrone?: GeoJSON.FeatureCollection
}

export interface TouristicPOI {
  id: string
  name: string
  type: 'monument' | 'museum' | 'park' | 'restaurant' | 'accommodation' | 'event'
  coordinates: {
    lat: number
    lng: number
  }
  description?: string
  imageUrl?: string
  rating?: number
  priceRange?: '€' | '€€' | '€€€'
}

export interface TravelOption {
  origin: Station
  destination: Destination
  route: {
    segments: Array<{
      mode: 'train' | 'bus' | 'walk'
      duration: number
      distance?: number
    }>
  }
  totalCost: number
  totalDuration: number
}
