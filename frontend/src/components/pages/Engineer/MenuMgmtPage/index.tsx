import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { globalConfirm } from '@/utils/confirm'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { engineerApi } from '@/services/api/engineerApi'
import type { Page, PageGroup, Menu } from '@/types'

export function MenuMgmtPage() {
  const [pages, setPages] = useState<Page[]>([])
  const [pageGroups, setPageGroups] = useState<PageGroup[]>([])
  const [menus, setMenus] = useState<Menu[]>([])
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)
  const [selectedPageGroup, setSelectedPageGroup] = useState<PageGroup | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadPages = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await engineerApi.getPageList()
      setPages(result)
    } catch (err) {
      console.error('Failed to load pages:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadPageGroups = useCallback(async (pageCd: string) => {
    try {
      const result = await engineerApi.getPageGrpList(pageCd)
      setPageGroups(result)
      setSelectedPageGroup(null)
      setMenus([])
    } catch (err) {
      console.error('Failed to load page groups:', err)
    }
  }, [])

  const loadMenus = useCallback(async (pageGrpCd: string) => {
    try {
      const result = await engineerApi.getMenuList(pageGrpCd)
      setMenus(result)
    } catch (err) {
      console.error('Failed to load menus:', err)
    }
  }, [])

  useEffect(() => {
    loadPages()
  }, [loadPages])

  const handleSelectPage = (page: Page) => {
    setSelectedPage(page)
    loadPageGroups(page.pageCd)
  }

  const handleSelectPageGroup = (pageGroup: PageGroup) => {
    setSelectedPageGroup(pageGroup)
    loadMenus(pageGroup.pageGrpCd)
  }

  const handleAddPage = () => {
    globalAlert.info('페이지 추가 팝업 - 추후 구현')
  }

  const handleDeletePage = async () => {
    if (!selectedPage) {
      globalAlert.warning('삭제할 페이지를 선택하세요.')
      return
    }
    if (!await globalConfirm(`'${selectedPage.pageNm}' 페이지를 삭제하시겠습니까?`)) {
      return
    }
    try {
      await engineerApi.deletePage(selectedPage.pageCd)
      globalAlert.success('삭제되었습니다.')
      setSelectedPage(null)
      loadPages()
    } catch (err) {
      console.error('Failed to delete:', err)
      globalAlert.error('삭제 중 오류가 발생했습니다.')
    }
  }

  const handleSavePage = async () => {
    try {
      await engineerApi.savePageOrder(pages)
      globalAlert.success('저장되었습니다.')
    } catch (err) {
      console.error('Failed to save:', err)
      globalAlert.error('저장 중 오류가 발생했습니다.')
    }
  }

  const handleAddPageGroup = () => {
    globalAlert.info('페이지그룹 추가 팝업 - 추후 구현')
  }

  const handleDeletePageGroup = async () => {
    if (!selectedPageGroup) {
      globalAlert.warning('삭제할 페이지그룹을 선택하세요.')
      return
    }
    if (!await globalConfirm(`'${selectedPageGroup.pageGrpNm}' 페이지그룹을 삭제하시겠습니까?`)) {
      return
    }
    try {
      await engineerApi.deletePageGrp(selectedPageGroup.pageGrpCd)
      globalAlert.success('삭제되었습니다.')
      setSelectedPageGroup(null)
      if (selectedPage) {
        loadPageGroups(selectedPage.pageCd)
      }
    } catch (err) {
      console.error('Failed to delete:', err)
      globalAlert.error('삭제 중 오류가 발생했습니다.')
    }
  }

  const handleSavePageGroup = async () => {
    try {
      await engineerApi.savePageGrpOrder(pageGroups)
      globalAlert.success('저장되었습니다.')
    } catch (err) {
      console.error('Failed to save:', err)
      globalAlert.error('저장 중 오류가 발생했습니다.')
    }
  }

  const handleAddMenu = () => {
    globalAlert.info('메뉴 추가 팝업 - 추후 구현')
  }

  const handleDeleteMenu = () => {
    globalAlert.info('메뉴 삭제 - 추후 구현')
  }

  const handleSaveMenu = async () => {
    try {
      await engineerApi.saveMenuOrder(menus)
      globalAlert.success('저장되었습니다.')
    } catch (err) {
      console.error('Failed to save:', err)
      globalAlert.error('저장 중 오류가 발생했습니다.')
    }
  }

  return (
    <>
      <div className="flex h-full gap-2">
        <div className="flex w-1/3 flex-col">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-semibold">페이지</span>
            <PageToolbar>
              <ToolbarButton icon="add" onClick={handleAddPage} title="추가" />
              <ToolbarButton icon="delete" onClick={handleDeletePage} title="삭제" />
              <ToolbarButton icon="save" onClick={handleSavePage} title="저장" />
            </PageToolbar>
          </div>
          <div className="flex-1 overflow-auto rounded border border-gray-300">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="border-b border-gray-300 p-2 text-center">페이지코드</th>
                  <th className="border-b border-gray-300 p-2 text-center">페이지명</th>
                  <th className="border-b border-gray-300 p-2 text-center">URL</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">
                      로딩 중...
                    </td>
                  </tr>
                ) : pages.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">
                      데이터가 없습니다
                    </td>
                  </tr>
                ) : (
                  pages.map((page) => (
                    <tr
                      key={page.pageCd}
                      className={`cursor-pointer hover:bg-gray-50 ${
                        selectedPage?.pageCd === page.pageCd ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleSelectPage(page)}
                    >
                      <td className="border-b border-gray-200 p-2 text-center">
                        {page.pageCd}
                      </td>
                      <td className="border-b border-gray-200 p-2 text-center">
                        {page.pageNm}
                      </td>
                      <td className="border-b border-gray-200 p-2 text-center">
                        {page.pageUrl}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex w-1/3 flex-col">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-semibold">페이지그룹</span>
            <PageToolbar>
              <ToolbarButton icon="add" onClick={handleAddPageGroup} title="추가" />
              <ToolbarButton icon="delete" onClick={handleDeletePageGroup} title="삭제" />
              <ToolbarButton icon="save" onClick={handleSavePageGroup} title="저장" />
            </PageToolbar>
          </div>
          <div className="flex-1 overflow-auto rounded border border-gray-300">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="border-b border-gray-300 p-2 text-center">그룹코드</th>
                  <th className="border-b border-gray-300 p-2 text-center">그룹명</th>
                  <th className="border-b border-gray-300 p-2 text-center">순서</th>
                </tr>
              </thead>
              <tbody>
                {pageGroups.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">
                      {selectedPage ? '데이터가 없습니다' : '페이지를 선택하세요'}
                    </td>
                  </tr>
                ) : (
                  pageGroups.map((grp) => (
                    <tr
                      key={grp.pageGrpCd}
                      className={`cursor-pointer hover:bg-gray-50 ${
                        selectedPageGroup?.pageGrpCd === grp.pageGrpCd
                          ? 'bg-blue-50'
                          : ''
                      }`}
                      onClick={() => handleSelectPageGroup(grp)}
                    >
                      <td className="border-b border-gray-200 p-2 text-center">
                        {grp.pageGrpCd}
                      </td>
                      <td className="border-b border-gray-200 p-2 text-center">
                        {grp.pageGrpNm}
                      </td>
                      <td className="border-b border-gray-200 p-2 text-center">
                        {grp.pageOrder}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex w-1/3 flex-col">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-semibold">메뉴</span>
            <PageToolbar>
              <ToolbarButton icon="add" onClick={handleAddMenu} title="추가" />
              <ToolbarButton icon="delete" onClick={handleDeleteMenu} title="삭제" />
              <ToolbarButton icon="save" onClick={handleSaveMenu} title="저장" />
            </PageToolbar>
          </div>
          <div className="flex-1 overflow-auto rounded border border-gray-300">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="border-b border-gray-300 p-2 text-center">메뉴코드</th>
                  <th className="border-b border-gray-300 p-2 text-center">메뉴명</th>
                  <th className="border-b border-gray-300 p-2 text-center">URL</th>
                </tr>
              </thead>
              <tbody>
                {menus.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">
                      {selectedPageGroup
                        ? '데이터가 없습니다'
                        : '페이지그룹을 선택하세요'}
                    </td>
                  </tr>
                ) : (
                  menus.map((menu) => (
                    <tr key={menu.menuCd} className="hover:bg-gray-50">
                      <td className="border-b border-gray-200 p-2 text-center">
                        {menu.menuCd}
                      </td>
                      <td className="border-b border-gray-200 p-2 text-center">
                        {menu.menuNm}
                      </td>
                      <td className="border-b border-gray-200 p-2 text-center">
                        {menu.menuUrl}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
