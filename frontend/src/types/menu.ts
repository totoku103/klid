export interface MenuItem {
  id: string
  name: string
  url?: string
  icon?: string
  children?: MenuItem[]
}

export interface MenuGroup {
  id: string
  name: string
  items: MenuItem[]
}

export interface MenuApiItem {
  readonly pageNo: number
  readonly pageGrpNo: number
  readonly menuNo: number
  readonly menuName: string
  readonly orderNo: number
  readonly guid: string
  readonly menuAuth: string
}

export interface MenuApiGroup {
  readonly pageNo: number
  readonly pageGrpNo: number
  readonly pageGrpName: string
  readonly orderNo: number
  readonly children: MenuApiItem[]
}

export interface MenuApiPage {
  readonly pageNo: number
  readonly pageName: string
  readonly orderNo: number
  readonly webIconClass: string
  readonly children: MenuApiGroup[]
}

export type MenuApiResponse = MenuApiPage[]

export function transformMenuApiResponse(apiResponse: MenuApiResponse): MenuItem[] {
  return apiResponse
    .sort((a, b) => a.orderNo - b.orderNo)
    .map((page): MenuItem => ({
      id: `page-${page.pageNo}`,
      name: page.pageName,
      icon: page.webIconClass,
      children: page.children
        .sort((a, b) => a.orderNo - b.orderNo)
        .map((group): MenuItem => ({
          id: `group-${group.pageGrpNo}`,
          name: group.pageGrpName,
          children: group.children
            .sort((a, b) => a.orderNo - b.orderNo)
            .map((menu): MenuItem => ({
              id: menu.guid,
              name: menu.menuName,
              url: `/menu/${menu.guid}`,
            })),
        })),
    }))
}
