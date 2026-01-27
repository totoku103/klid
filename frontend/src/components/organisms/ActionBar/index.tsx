import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/atoms/Button'
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  FileSpreadsheet,
  RefreshCw,
  Save,
  X,
  MessageSquare,
  Printer,
  type LucideIcon,
} from 'lucide-react'

export interface ActionBarProps {
  children: ReactNode
  className?: string
  minWidth?: number
}

export function ActionBar({ children, className, minWidth = 600 }: ActionBarProps) {
  return (
    <div
      className={cn(
        'my-[5px] mr-[5px] flex items-center justify-end gap-1 rounded border border-gray-300 bg-gray-50 p-2',
        className
      )}
      style={{ minWidth }}
    >
      {children}
    </div>
  )
}

export interface ActionButtonProps {
  icon: string
  onClick: () => void
  title: string
  disabled?: boolean
}

const ICON_MAP: Record<string, LucideIcon> = {
  search: Search,
  add: Plus,
  edit: Pencil,
  delete: Trash2,
  excel: FileSpreadsheet,
  refresh: RefreshCw,
  save: Save,
  cancel: X,
  sms: MessageSquare,
  print: Printer,
}

export function ActionButton({ icon, onClick, title, disabled = false }: ActionButtonProps) {
  const IconComponent = ICON_MAP[icon]

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {IconComponent && <IconComponent className="size-4" />}
      <span>{title}</span>
    </Button>
  )
}
