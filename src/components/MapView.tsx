'use client'

import { useEffect, useRef, useState } from 'react'
import maplibregl, { Map, Popup, GeoJSONSource } from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { Destination } from '@/types'

interface MapViewProps {
  center: [number, number]
  zoom: number
  markersData: Destination[]
  onMarkerClick: (destination: Destination) => void
  showRoutes?: boolean
}

const markerStyles = `
  .map-popup .maplibregl-popup-content {
    padding: 0;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    font-family: sans-serif;
  }
`

export default function MapView({ center, zoom, markersData, onMarkerClick, showRoutes = true }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<Map | null>(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  // Initialize map (once)
  useEffect(() => {
    if (map.current || !mapContainer.current) return

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [2.35, 48.85], // Safe starting point
      zoom: 5,
    })

    map.current.on('load', () => setIsMapLoaded(true))

    return () => {
      map.current?.remove()
      map.current = null
    }
  }, [])

  // Update map view and draw elements
  useEffect(() => {
    if (!isMapLoaded || !map.current) return
    const mapInstance = map.current

    // A. Update view (smart centering)
    if (markersData.length > 0) {
      const bounds = new maplibregl.LngLatBounds()
      bounds.extend(center)
      markersData.forEach(dest => bounds.extend([dest.station.coordinates.lng, dest.station.coordinates.lat]))
      mapInstance.fitBounds(bounds, { padding: 100, duration: 1500, maxZoom: 12 })
    } else {
      mapInstance.flyTo({ center, zoom, duration: 1500 })
    }

    // B. Prepare GeoJSON data
    const pointsGeoJSON = {
      type: 'FeatureCollection' as const,
      features: [
        // Start point
        { type: 'Feature' as const, geometry: { type: 'Point' as const, coordinates: center }, properties: { type: 'start' } },
        // Destination points
        ...markersData.map(d => ({ 
          type: 'Feature' as const, 
          geometry: { type: 'Point' as const, coordinates: [d.station.coordinates.lng, d.station.coordinates.lat] }, 
          properties: { 
            id: d.station.id,
            city: d.station.name,
            price: d.estimatedCost,
            img: d.imageUrl || "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=400"
          } 
        }))
      ]
    }
    
    const linesGeoJSON = {
      type: 'FeatureCollection' as const,
      features: markersData.map(d => ({ 
        type: 'Feature' as const, 
        geometry: { type: 'LineString' as const, coordinates: [center, [d.station.coordinates.lng, d.station.coordinates.lat]] }, 
        properties: { 
          id: d.station.id,
          city: d.station.name,
          price: d.estimatedCost,
          img: d.imageUrl || "https://images.pexels.com/photos/374870/pexels-photo-374870.jpeg?auto=compress&cs=tinysrgb&w=400"
        } 
      })),
    }

    // C. Update or create data sources
    const sourcePoints = mapInstance.getSource('points-source') as GeoJSONSource | undefined
    if (sourcePoints) {
      sourcePoints.setData(pointsGeoJSON)
    } else {
      mapInstance.addSource('points-source', { type: 'geojson', data: pointsGeoJSON })
    }

    const sourceLines = mapInstance.getSource('lines-source') as GeoJSONSource | undefined
    if (sourceLines) {
      sourceLines.setData(linesGeoJSON)
    } else {
      mapInstance.addSource('lines-source', { type: 'geojson', data: linesGeoJSON })
    }
    
    // D. Create layers (if they don't exist)
    if (!mapInstance.getLayer('start-point-layer')) {
      mapInstance.addLayer({
        id: 'start-point-layer', 
        type: 'circle', 
        source: 'points-source',
        paint: { 'circle-color': '#E53E3E', 'circle-radius': 8, 'circle-stroke-color': 'white', 'circle-stroke-width': 2 },
        filter: ['==', 'type', 'start']
      })
    }
    
    if (!mapInstance.getLayer('destination-points-layer')) {
      mapInstance.addLayer({
        id: 'destination-points-layer', 
        type: 'circle', 
        source: 'points-source',
        paint: { 'circle-radius': 20, 'circle-color': 'white', 'circle-stroke-color': '#E2E8F0', 'circle-stroke-width': 2 },
        filter: ['!=', 'type', 'start']
      })
      
      mapInstance.addLayer({
        id: 'destination-prices-layer', 
        type: 'symbol', 
        source: 'points-source',
        layout: { 'text-field': ['concat', ['get', 'price'], '€'], 'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'], 'text-size': 12 },
        paint: { 'text-color': '#334155' },
        filter: ['!=', 'type', 'start']
      })
    }
    
    if (!mapInstance.getLayer('route-lines-layer')) {
      mapInstance.addLayer({
        id: 'route-lines-layer', 
        type: 'line', 
        source: 'lines-source',
        paint: { 'line-color': '#3B82F6', 'line-width': 2, 'line-opacity': 0.6 },
      })
    }

    // E. Update line visibility
    mapInstance.setLayoutProperty('route-lines-layer', 'visibility', showRoutes ? 'visible' : 'none')

  }, [isMapLoaded, center, zoom, markersData, showRoutes])

  // Handle interactivity
  useEffect(() => {
    if (!isMapLoaded || !map.current) return
    const mapInstance = map.current
    const popup = new Popup({ closeButton: false, closeOnClick: false })
    const interactiveLayers = ['destination-points-layer', 'route-lines-layer']

    const handleMouseEnter = (e: any) => {
      mapInstance.getCanvas().style.cursor = 'pointer'
      const dest = e.features[0].properties
      const html = `
        <div class="w-48 rounded-lg overflow-hidden bg-white">
          <img src="${dest.img}" alt="${dest.city}" class="w-full h-20 object-cover" />
          <div class="p-2">
            <h3 class="font-bold text-sm">${dest.city}</h3>
            <p class="text-xs text-gray-600">à partir de ${dest.price}€</p>
          </div>
        </div>
      `
      popup.setLngLat(e.lngLat).setHTML(html).addTo(mapInstance)
    }
    
    const handleMouseLeave = () => {
      mapInstance.getCanvas().style.cursor = ''
      popup.remove()
    }
    
    const handleClick = (e: any) => {
      popup.remove()
      const dest = markersData.find(d => d.station.id === e.features[0].properties.id)
      if (dest) {
        onMarkerClick(dest)
      }
    }

    interactiveLayers.forEach(id => {
      mapInstance.on('mouseenter', id, handleMouseEnter)
      mapInstance.on('mouseleave', id, handleMouseLeave)
      mapInstance.on('click', id, handleClick)
    })

    return () => {
      if (!mapInstance.isStyleLoaded()) return
      interactiveLayers.forEach(id => {
        mapInstance.off('mouseenter', id, handleMouseEnter)
        mapInstance.off('mouseleave', id, handleMouseLeave)
        mapInstance.off('click', id, handleClick)
      })
    }
  }, [isMapLoaded, onMarkerClick, markersData])

  return (
    <>
      <style>{markerStyles}</style>
      <div ref={mapContainer} className="w-full h-full" />
    </>
  )
}
