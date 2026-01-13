export default function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      aria-label="VIBIN Logo"
    >
      <defs>
        <linearGradient id="bronzeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#cf7353" />
          <stop offset="100%" stopColor="#6b3323" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Main Lotus/Figure Shape - Bronze Color */}
      <g stroke="url(#bronzeGradient)" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
        {/* Central Loop (Head/Body) */}
        <path d="M50 45 C35 45, 35 15, 50 15 C65 15, 65 45, 50 45 Z" fill="url(#bronzeGradient)" fillOpacity="0.1" />
        <path d="M50 45 C40 60, 40 80, 50 90 C60 80, 60 60, 50 45" />

        {/* Upper Side Petals (Arms) */}
        <path d="M35 30 C20 20, 10 35, 20 50 C25 60, 45 50, 50 45" />
        <path d="M65 30 C80 20, 90 35, 80 50 C75 60, 55 50, 50 45" />

        {/* Lower Base Loops (Legs) */}
        <path d="M50 90 C30 95, 10 85, 10 70 C10 60, 30 65, 40 75" />
        <path d="M50 90 C70 95, 90 85, 90 70 C90 60, 70 65, 60 75" />
      </g>

      {/* Center Accent - Teal/Cyan (representing the "VIBIN" energy) */}
      <circle cx="50" cy="30" r="3" className="fill-teal-400" filter="url(#glow)">
        <animate attributeName="opacity" values="0.6;1;0.6" duration="3s" repeatCount="indefinite" />
      </circle>
      
      {/* Optional "V" shape integration for VIBIN */}
      <path 
        d="M42 55 L50 70 L58 55" 
        stroke="#2dd4bf" 
        strokeWidth="2" 
        strokeLinecap="round" 
        className="opacity-80"
      />
    </svg>
  )
}
