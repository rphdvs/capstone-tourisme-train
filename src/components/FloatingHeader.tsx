'use client'

interface FloatingHeaderProps {
  projectName?: string
}

const LogoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

export default function FloatingHeader({ projectName = "Capstone Tourisme Train" }: FloatingHeaderProps) {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl z-50">
      <div className="flex items-center justify-between h-16 px-6 bg-white/70 backdrop-blur-md rounded-xl shadow-md border border-gray-200/80">
        {/* Logo and project name */}
        <div className="flex items-center gap-3">
          <div className="text-primary-600">
            <LogoIcon />
          </div>
          <span className="text-lg font-bold text-secondary-800">{projectName}</span>
        </div>

        {/* Navigation and action button */}
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-secondary-600 hover:text-secondary-900 transition-colors">
            Bons Plans du Moment
          </a>
          <a href="#" className="text-sm font-medium text-secondary-600 hover:text-secondary-900 transition-colors">
            Mes voyages
          </a>
          <button className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 rounded-lg hover:bg-primary-700 transition-colors">
            Se connecter
          </button>
        </div>
      </div>
    </div>
  )
}
