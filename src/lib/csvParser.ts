import { Station, TouristicPOI } from '@/types'

export interface CSVStation {
  'Code UIC': string
  'Nom de la gare': string
  'Latitude': string
  'Longitude': string
  'Région': string
}

export interface CSVTouristicPOI {
  'Nom': string
  'Type': string
  'Latitude': string
  'Longitude': string
  'Description': string
  'Adresse': string
}

export function parseStationsFromCSV(csvData: string): Station[] {
  const lines = csvData.split('\n')
  const headers = lines[0].split(',')
  const stations: Station[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',')
    if (values.length >= 5) {
      try {
        stations.push({
          id: values[0]?.replace(/"/g, '') || '',
          name: values[1]?.replace(/"/g, '') || '',
          coordinates: {
            lat: parseFloat(values[2]?.replace(/"/g, '') || '0'),
            lng: parseFloat(values[3]?.replace(/"/g, '') || '0'),
          },
          region: values[4]?.replace(/"/g, '') || '',
        })
      } catch (error) {
        console.warn(`Error parsing station line ${i}:`, error)
      }
    }
  }

  return stations.filter(station => 
    station.coordinates.lat !== 0 && 
    station.coordinates.lng !== 0 &&
    station.name.length > 0
  )
}

export function parseTouristicPOIsFromCSV(csvData: string): TouristicPOI[] {
  const lines = csvData.split('\n')
  const pois: TouristicPOI[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',')
    if (values.length >= 6) {
      try {
        const poi: TouristicPOI = {
          id: `poi_${i}`,
          name: values[0]?.replace(/"/g, '') || '',
          type: mapPOIType(values[1]?.replace(/"/g, '') || ''),
          coordinates: {
            lat: parseFloat(values[2]?.replace(/"/g, '') || '0'),
            lng: parseFloat(values[3]?.replace(/"/g, '') || '0'),
          },
          description: values[4]?.replace(/"/g, '') || '',
        }

        if (poi.coordinates.lat !== 0 && poi.coordinates.lng !== 0) {
          pois.push(poi)
        }
      } catch (error) {
        console.warn(`Error parsing POI line ${i}:`, error)
      }
    }
  }

  return pois
}

function mapPOIType(type: string): TouristicPOI['type'] {
  const typeMap: Record<string, TouristicPOI['type']> = {
    'monument': 'monument',
    'musée': 'museum',
    'parc': 'park',
    'restaurant': 'restaurant',
    'hôtel': 'accommodation',
    'événement': 'event',
  }

  return typeMap[type.toLowerCase()] || 'monument'
}
