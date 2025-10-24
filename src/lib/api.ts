import axios from 'axios'
import { config } from '@/lib/config'
import { Station, Destination, TravelOption } from '@/types'

export class NavitiaAPI {
  private baseUrl: string
  private apiKey: string

  constructor() {
    this.baseUrl = config.navitia.baseUrl
    this.apiKey = config.navitia.apiKey
  }

  private getHeaders() {
    return {
      'Authorization': this.apiKey,
      'Content-Type': 'application/json',
    }
  }

  async searchStations(query: string): Promise<Station[]> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/places`,
        {
          headers: this.getHeaders(),
          params: {
            q: query,
            type: 'stop_area',
            count: 10,
          },
        }
      )

      return response.data.places?.map((place: any) => ({
        id: place.id,
        name: place.name,
        coordinates: {
          lat: place.coord.lat,
          lng: place.coord.lon,
        },
        region: place.administrative_regions?.[0]?.name,
      })) || []
    } catch (error) {
      console.error('Error searching stations:', error)
      return []
    }
  }

  async getJourney(
    from: string,
    to: string,
    datetime?: string
  ): Promise<TravelOption | null> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/journeys`,
        {
          headers: this.getHeaders(),
          params: {
            from: from,
            to: to,
            datetime: datetime || new Date().toISOString(),
            count: 1,
          },
        }
      )

      const journey = response.data.journeys?.[0]
      if (!journey) return null

      return {
        origin: {
          id: journey.sections[0].from.id,
          name: journey.sections[0].from.name,
          coordinates: {
            lat: journey.sections[0].from.coord.lat,
            lng: journey.sections[0].from.coord.lon,
          },
        },
        destination: {
          station: {
            id: journey.sections[journey.sections.length - 1].to.id,
            name: journey.sections[journey.sections.length - 1].to.name,
            coordinates: {
              lat: journey.sections[journey.sections.length - 1].to.coord.lat,
              lng: journey.sections[journey.sections.length - 1].to.coord.lon,
            },
          },
          estimatedCost: this.estimateCost(journey),
          travelTime: journey.duration,
        },
        route: {
          segments: journey.sections.map((section: any) => ({
            mode: section.type === 'public_transport' ? 'train' : 'walk',
            duration: section.duration,
            distance: section.geojson?.properties?.distance,
          })),
        },
        totalCost: this.estimateCost(journey),
        totalDuration: journey.duration,
      }
    } catch (error) {
      console.error('Error getting journey:', error)
      return null
    }
  }

  private estimateCost(journey: any): number {
    // Simple cost estimation based on distance and duration
    const totalDistance = journey.sections.reduce((sum: number, section: any) => {
      return sum + (section.geojson?.properties?.distance || 0)
    }, 0)

    const baseCost = Math.max(
      config.sncf.minTicketPrice,
      Math.min(
        config.sncf.maxRegionalPrice,
        totalDistance * config.sncf.costPerKm
      )
    )

    return Math.round(baseCost * 100) / 100
  }
}

export const navitiaAPI = new NavitiaAPI()
