import {
  type ReactNode,
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
  Children,
  cloneElement,
  isValidElement,
} from 'react'
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
  Menu,
  type LucideIcon,
} from 'lucide-react'

const MAX_WIDTH = 600
const BUTTON_GAP = 4
const PADDING = 16
const MENU_BUTTON_WIDTH = 40

export interface ActionBarProps {
  children: ReactNode
  className?: string
}

export function ActionBar({ children, className }: ActionBarProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = useState<number | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const childArray = Children.toArray(children).filter(isValidElement)

  const calculateVisibleCount = useCallback(() => {
    if (!measureRef.current) return

    const buttons = measureRef.current.children
    let totalWidth = PADDING
    let count = 0

    for (let i = 0; i < buttons.length; i++) {
      const buttonWidth = (buttons[i] as HTMLElement).offsetWidth + BUTTON_GAP
      const needsMenuButton = i < buttons.length - 1
      const availableWidth = needsMenuButton
        ? MAX_WIDTH - MENU_BUTTON_WIDTH - BUTTON_GAP
        : MAX_WIDTH

      if (totalWidth + buttonWidth <= availableWidth) {
        totalWidth += buttonWidth
        count++
      } else {
        break
      }
    }

    setVisibleCount(count)
  }, [])

  useLayoutEffect(() => {
    calculateVisibleCount()

    const resizeObserver = new ResizeObserver(() => {
      calculateVisibleCount()
    })

    if (measureRef.current) {
      resizeObserver.observe(measureRef.current)
    }

    return () => resizeObserver.disconnect()
  }, [calculateVisibleCount, children])

  // Close menu when clicking outside
  useLayoutEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isMenuOpen])

  const visibleChildren = visibleCount !== null ? childArray.slice(0, visibleCount) : childArray
  const hiddenChildren = visibleCount !== null ? childArray.slice(visibleCount) : []

  return (
    <>
      {/* Hidden measure container */}
      <div
        ref={measureRef}
        className="pointer-events-none invisible absolute flex gap-1"
        aria-hidden="true"
      >
        {children}
      </div>

      {/* Visible container */}
      <div
        ref={containerRef}
        className={cn(
          'relative my-[5px] mr-[5px] flex w-fit items-center justify-center gap-1 rounded border border-gray-300 bg-gray-50 p-2',
          className
        )}
        style={{ maxWidth: MAX_WIDTH }}
      >
        {visibleChildren}

        {hiddenChildren.length > 0 && (
          <div ref={menuRef} className="relative">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              title="더보기"
            >
              <Menu className="size-4" />
            </Button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 flex flex-col gap-1 rounded border border-gray-300 bg-white p-2 shadow-lg">
                {hiddenChildren.map((child, index) => {
                  if (isValidElement<ActionButtonProps>(child)) {
                    return cloneElement(child, {
                      key: index,
                      onClick: () => {
                        child.props.onClick?.()
                        setIsMenuOpen(false)
                      },
                    } as Partial<ActionButtonProps>)
                  }
                  return child
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </>
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
