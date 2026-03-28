import { ReactNode } from 'react'

interface PhoneMockupProps {
  children: ReactNode
  className?: string
}

export function PhoneMockup({ children, className = '' }: PhoneMockupProps) {
  return (
    <div className={`relative mx-auto h-[520px] w-[260px] rounded-[2.6rem] border border-black/45 bg-[#111513] p-2 shadow-[0_36px_80px_-36px_rgba(0,0,0,0.65)] dark:border-white/10 ${className}`}>
      <div className="absolute left-1/2 top-2 h-6 w-24 -translate-x-1/2 rounded-full bg-black/70" />
      <div className="relative h-full w-full overflow-hidden rounded-[2.05rem] border border-white/10 bg-[--surface]">
        {children}
      </div>
    </div>
  )
}
