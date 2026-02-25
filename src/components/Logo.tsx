import Image from 'next/image'

export default function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <div className={`relative flex-shrink-0 ${className}`}>
      <Image 
        src="/images/hvlogo.png"
        alt="VIBIN Logo"
        fill
        sizes="4rem"
        className="object-contain"
        priority
      />
    </div>
  )
}
