import {
  LayoutDashboard,
  AlertTriangle,
  Lock,
  FileText,
  MessageSquare,
  Settings,
  Monitor,
  type LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  'dc-mega-icon-dsbd': LayoutDashboard,
  'dc-mega-icon-alarm': AlertTriangle,
  'dc-mega-icon-lock': Lock,
  'dc-mega-icon-rpt': FileText,
  'dc-mega-icon-ipt': MessageSquare,
  'dc-mega-icon-mgnt': Settings,
  'dc-mega-icon-nms': Monitor,
}

export function getMenuIcon(iconClass: string | undefined): LucideIcon | null {
  if (!iconClass) return null
  return ICON_MAP[iconClass] ?? null
}
