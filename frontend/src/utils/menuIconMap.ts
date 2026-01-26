const ICON_MAP: Record<string, string> = {
  'dc-mega-icon-dsbd': '/img/menu/level-1/dashboard.png',
  'dc-mega-icon-alarm': '/img/menu/level-1/incident-response.png',
  'dc-mega-icon-lock': '/img/menu/level-1/security-info.png',
  'dc-mega-icon-rpt': '/img/menu/level-1/report.png',
  'dc-mega-icon-ipt': '/img/menu/level-1/inquiry-center.png',
  'dc-mega-icon-mgnt': '/img/menu/level-1/operations-management.png',
  'dc-mega-icon-nms': '/img/menu/level-1/monitoring.png',
}

export function getMenuIcon(iconClass: string | undefined): string | null {
  if (!iconClass) return null
  return ICON_MAP[iconClass] ?? null
}
