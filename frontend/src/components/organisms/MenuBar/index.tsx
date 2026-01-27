import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router'
import { ChevronRight } from 'lucide-react'
import { useMenuStore } from '@/stores/menuStore'
import { getMenuIcon } from '@/utils/menuIconMap'
import type { MenuItem } from '@/types'
import { cn } from '@/lib/utils'
import { SystemLinks } from '@/components/molecules/SystemLinks'
import { LAYOUT_MIN_WIDTH_CLASS } from '@/constants/layout'

export interface MenuBarProps {
  className?: string
}

interface MenuDropdownProps {
  groups: MenuItem[]
  onMenuClick: (menuItem: MenuItem) => void
}

function MenuDropdown({ groups, onMenuClick }: MenuDropdownProps) {
  return (
    <div className="absolute left-0 top-full z-50 bg-white shadow-lg border border-gray-200">
      <div className="flex">
        {groups.map((group) => (
          <div key={group.id} className="min-w-[160px]">
            <div className="bg-[#e8f4fc] px-4 py-2 border-b border-gray-200">
              <span className="text-sm font-medium text-[#1a4a63]">
                {group.name}
              </span>
            </div>
            <ul className="py-2">
              {group.children?.map((menu) => (
                <li key={menu.id}>
                  <Link
                    to={menu.url ?? '#'}
                    onClick={() => onMenuClick(menu)}
                    className="flex items-center gap-1 px-4 py-1.5 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <ChevronRight className="size-3 text-gray-400" />
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

interface MenuBarItemProps {
  item: MenuItem
  onSelect: (id: string) => void
}

function MenuBarItem({ item, onSelect }: MenuBarItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const navigate = useNavigate()

  const handleMenuClick = useCallback(
    (menuItem: MenuItem) => {
      onSelect(menuItem.id)
      if (menuItem.url) {
        navigate(menuItem.url)
      }
    },
    [onSelect, navigate]
  )

  const hasChildren = item.children && item.children.length > 0
  const iconPath = getMenuIcon(item.icon)

  return (
    <li
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => onSelect(item.id)}
        className={cn(
          'flex h-[55px] cursor-pointer items-center gap-2 px-5 text-lg font-bold text-white transition-colors hover:bg-[#036ca5]'
        )}
        type="button"
      >
        {iconPath && <img src={iconPath} alt={item.name} className="size-4" />}
        {item.name}
      </button>

      {hasChildren && isHovered && (
        <MenuDropdown
          groups={item.children!}
          onMenuClick={handleMenuClick}
        />
      )}
    </li>
  )
}

export function MenuBar({ className }: MenuBarProps) {
  const { menus, setActiveMenu } = useMenuStore()

  const handleSelect = useCallback(
    (id: string) => {
      setActiveMenu(id)
    },
    [setActiveMenu]
  )

  return (
    <nav
      className={cn(
        'flex h-[55px] items-center justify-between bg-[#133b52] px-4',
        LAYOUT_MIN_WIDTH_CLASS,
        className
      )}
    >
      <ul className="flex">
        {menus.map((item) => (
          <MenuBarItem
            key={item.id}
            item={item}
            onSelect={handleSelect}
          />
        ))}
      </ul>
      <SystemLinks />
    </nav>
  )
}
