import { useCallback } from 'react'
import { cn } from '@/lib/utils'

interface SystemLink {
  readonly id: string
  readonly label: string
  readonly systemType: string
}

const SYSTEM_LINKS: readonly SystemLink[] = [
  {
    id: 'vms',
    label: '취약점진단\n통합관리시스템',
    systemType: 'vms',
  },
  {
    id: 'ctss',
    label: '주요정보통신기반시설\n업무지원시스템',
    systemType: 'ctss',
  },
] as const

interface SystemLinkItemProps {
  readonly link: SystemLink
}

function SystemLinkItem({ link }: SystemLinkItemProps) {
  const handleClick = useCallback(() => {
    window.open(`/login?systemType=${link.systemType}`, '_blank')
  }, [link.systemType])

  const [firstLine, secondLine] = link.label.split('\n')

  return (
    <button
      onClick={handleClick}
      className="flex h-[55px] cursor-pointer items-center gap-2 px-5 text-sm font-medium text-white transition-colors hover:bg-[#036ca5]"
      type="button"
    >
      <span className="text-center text-xs leading-tight">
        {firstLine}
        <br />
        {secondLine}
      </span>
      <span className="text-xl">접속</span>
    </button>
  )
}

export interface SystemLinksProps {
  readonly className?: string
}

export function SystemLinks({ className }: SystemLinksProps) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      {SYSTEM_LINKS.map((link, index) => (
        <div key={link.id} className="flex items-center gap-4">
          {index > 0 && <span className="text-white">|</span>}
          <SystemLinkItem link={link} />
        </div>
      ))}
    </div>
  )
}
