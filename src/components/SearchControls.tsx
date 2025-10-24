'use client'

interface SearchControlsProps {
  budget: number
  onBudgetChange: (budget: number) => void
  startLocation: string
  onLocationChange: (location: string) => void
  onFilterClick: () => void
}

const SearchIcon = () => (
  <svg className="size-5 text-secondary-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CalendarIcon = () => (
  <svg className="size-5 text-secondary-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.5 9.09H20.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.6947 13.7H15.7037" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.6947 16.7H15.7037" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.9955 13.7H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11.9955 16.7H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.29431 13.7H8.30331" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.29431 16.7H8.30331" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const SortIcon = () => (
  <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path>
  </svg>
)

export default function SearchControls({ 
  budget, 
  onBudgetChange, 
  startLocation, 
  onLocationChange,
  onFilterClick 
}: SearchControlsProps) {
  return (
    <div className="p-4 space-y-4 bg-white rounded-t-xl">
      {/* Search bar for departure location */}
      <div className="relative">
        <input
          type="text"
          value={startLocation}
          onChange={(e) => onLocationChange(e.target.value)}
          className="w-full h-12 pl-10 pr-4 rounded-md border border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="D'où partez-vous ?"
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          <SearchIcon />
        </div>
      </div>

      {/* Date inputs */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <input 
            type="date" 
            className="w-full h-10 pl-10 pr-3 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <CalendarIcon />
          </div>
        </div>
        <div className="relative flex-1">
          <input 
            type="date" 
            className="w-full h-10 pl-10 pr-3 border border-secondary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <CalendarIcon />
          </div>
        </div>
      </div>
      
      {/* Budget slider and filter buttons */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex-grow">
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            Budget max : <span className="font-bold text-primary-600">{budget}€</span>
          </label>
          <input
            type="range"
            min="10"
            max="500"
            value={budget}
            onChange={(e) => onBudgetChange(Number(e.target.value))}
            className="w-full h-2 bg-secondary-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        <div className="flex items-center gap-2">
          <button className="h-10 px-4 flex items-center gap-2 text-sm font-semibold text-secondary-700 bg-secondary-100 border border-secondary-300 rounded-md hover:bg-secondary-200">
            <SortIcon /> Trier
          </button>
          <button 
            onClick={onFilterClick}
            className="h-10 px-4 text-sm font-semibold text-secondary-700 bg-secondary-100 border border-secondary-300 rounded-md hover:bg-secondary-200"
          >
            Filtres
          </button>
        </div>
      </div>
    </div>
  )
}
