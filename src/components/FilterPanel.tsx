'use client'

import { useState } from 'react'

interface FilterPanelProps {
  onClose?: () => void
}

const CloseIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
  </svg>
)

interface ToggleProps {
  label: string
  enabled: boolean
  setEnabled: (enabled: boolean) => void
}

const Toggle = ({ label, enabled, setEnabled }: ToggleProps) => (
  <div className="flex items-center justify-between">
    <span className="text-secondary-700">{label}</span>
    <button 
      onClick={() => setEnabled(!enabled)}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${enabled ? 'bg-primary-600' : 'bg-secondary-200'}`}
    >
      <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  </div>
)

export default function FilterPanel({ onClose }: FilterPanelProps) {
  const [duration, setDuration] = useState(120)
  const [withBike, setWithBike] = useState(false)
  const [onFoot, setOnFoot] = useState(true)
  const [withTransport, setWithTransport] = useState(true)

  const formatDuration = (totalMinutes: number) => {
    if (totalMinutes < 60) {
      return `${totalMinutes} min`
    }
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60
    
    if (minutes === 0) {
      return `${hours}h`
    }
    return `${hours}h ${minutes}min`
  }

  return (
    <div className="w-[300px] h-auto bg-white rounded-xl shadow-lg font-sans flex flex-col p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-secondary-800">Filtres</h3>
        {onClose && (
          <button onClick={onClose} className="p-1 rounded-full hover:bg-secondary-100">
            <CloseIcon />
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <Toggle label="Vélo autorisé" enabled={withBike} setEnabled={setWithBike} />
          <Toggle label="Accès à pied" enabled={onFoot} setEnabled={setOnFoot} />
          <Toggle label="Transports en commun" enabled={withTransport} setEnabled={setWithTransport} />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            Durée max. du trajet : 
            <span className="font-bold text-primary-600"> {formatDuration(duration)}</span>
          </label>
          <input
            type="range"
            min="30"
            max="300"
            step="15"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    </div>
  )
}
