import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { globalPrompt } from '@/utils/prompt'
import { SubPageLayout, PageToolbar, ToolbarButton } from '@/components/templates'
import { sysApi } from '@/services/api/sysApi'
import type { CodeLv1, CodeLv2, CodeLv3 } from '@/types'
import { cn } from '@/lib/utils'

export function CodeMgmtPage() {
  const [lv1List, setLv1List] = useState<CodeLv1[]>([])
  const [lv2List, setLv2List] = useState<CodeLv2[]>([])
  const [lv3List, setLv3List] = useState<CodeLv3[]>([])
  const [selectedLv1, setSelectedLv1] = useState<CodeLv1 | null>(null)
  const [selectedLv2, setSelectedLv2] = useState<CodeLv2 | null>(null)
  const [selectedLv3, setSelectedLv3] = useState<CodeLv3 | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadLv1 = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await sysApi.getCodeLv1List()
      setLv1List(data)
    } catch (err) {
      console.error('Failed to load lv1 codes:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadLv2 = useCallback(async (parentCode: string) => {
    try {
      const data = await sysApi.getCodeLv2List(parentCode)
      setLv2List(data)
      setLv3List([])
      setSelectedLv2(null)
      setSelectedLv3(null)
    } catch (err) {
      console.error('Failed to load lv2 codes:', err)
    }
  }, [])

  const loadLv3 = useCallback(async (parentCode: string) => {
    try {
      const data = await sysApi.getCodeLv3List(parentCode)
      setLv3List(data)
      setSelectedLv3(null)
    } catch (err) {
      console.error('Failed to load lv3 codes:', err)
    }
  }, [])

  useEffect(() => {
    loadLv1()
  }, [loadLv1])

  const handleLv1Click = useCallback(
    (code: CodeLv1) => {
      setSelectedLv1(code)
      loadLv2(code.code)
    },
    [loadLv2]
  )

  const handleLv2Click = useCallback(
    (code: CodeLv2) => {
      setSelectedLv2(code)
      loadLv3(code.code)
    },
    [loadLv3]
  )

  const handleLv3Click = useCallback((code: CodeLv3) => {
    setSelectedLv3(code)
  }, [])

  const handleAddLv1 = useCallback(async () => {
    const code = await globalPrompt('코드를 입력하세요:')
    if (!code) return
    const codeName = await globalPrompt('코드명을 입력하세요:')
    if (!codeName) return

    try {
      await sysApi.addCodeLv1({ code, codeName, useYn: 'Y' })
      globalAlert.success('추가되었습니다.')
      loadLv1()
    } catch {
      globalAlert.error('추가에 실패했습니다.')
    }
  }, [loadLv1])

  const handleEditLv1 = useCallback(async () => {
    if (!selectedLv1) {
      globalAlert.warning('코드를 선택해주세요.')
      return
    }
    const codeName = await globalPrompt('코드명을 입력하세요:', selectedLv1.codeName)
    if (!codeName || codeName === selectedLv1.codeName) return

    try {
      await sysApi.updateCodeLv1({ ...selectedLv1, codeName })
      globalAlert.success('수정되었습니다.')
      loadLv1()
    } catch {
      globalAlert.error('수정에 실패했습니다.')
    }
  }, [selectedLv1, loadLv1])

  const handleAddLv2 = useCallback(async () => {
    if (!selectedLv1) {
      globalAlert.warning('상위 코드를 선택해주세요.')
      return
    }
    const code = await globalPrompt('코드를 입력하세요:')
    if (!code) return
    const codeName = await globalPrompt('코드명을 입력하세요:')
    if (!codeName) return

    try {
      await sysApi.addCodeLv2({ code, codeName, parentCode: selectedLv1.code, useYn: 'Y' })
      globalAlert.success('추가되었습니다.')
      loadLv2(selectedLv1.code)
    } catch {
      globalAlert.error('추가에 실패했습니다.')
    }
  }, [selectedLv1, loadLv2])

  const handleEditLv2 = useCallback(async () => {
    if (!selectedLv2) {
      globalAlert.warning('코드를 선택해주세요.')
      return
    }
    const codeName = await globalPrompt('코드명을 입력하세요:', selectedLv2.codeName)
    if (!codeName || codeName === selectedLv2.codeName) return

    try {
      await sysApi.updateCodeLv2({ ...selectedLv2, codeName })
      globalAlert.success('수정되었습니다.')
      if (selectedLv1) loadLv2(selectedLv1.code)
    } catch {
      globalAlert.error('수정에 실패했습니다.')
    }
  }, [selectedLv1, selectedLv2, loadLv2])

  const handleAddLv3 = useCallback(async () => {
    if (!selectedLv2) {
      globalAlert.warning('상위 코드를 선택해주세요.')
      return
    }
    const code = await globalPrompt('코드를 입력하세요:')
    if (!code) return
    const codeName = await globalPrompt('코드명을 입력하세요:')
    if (!codeName) return

    try {
      await sysApi.addCodeLv3({ code, codeName, parentCode: selectedLv2.code, useYn: 'Y' })
      globalAlert.success('추가되었습니다.')
      loadLv3(selectedLv2.code)
    } catch {
      globalAlert.error('추가에 실패했습니다.')
    }
  }, [selectedLv2, loadLv3])

  const handleEditLv3 = useCallback(async () => {
    if (!selectedLv3) {
      globalAlert.warning('코드를 선택해주세요.')
      return
    }
    const codeName = await globalPrompt('코드명을 입력하세요:', selectedLv3.codeName)
    if (!codeName || codeName === selectedLv3.codeName) return

    try {
      await sysApi.updateCodeLv3({ ...selectedLv3, codeName })
      globalAlert.success('수정되었습니다.')
      if (selectedLv2) loadLv3(selectedLv2.code)
    } catch {
      globalAlert.error('수정에 실패했습니다.')
    }
  }, [selectedLv2, selectedLv3, loadLv3])

  const leftPanel = (
    <div className="flex h-full flex-col">
      <div className="flex justify-end gap-1 border-b border-gray-200 p-2">
        <button
          onClick={handleAddLv1}
          className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 bg-white text-sm hover:bg-gray-100"
          title="추가"
          type="button"
        >
          +
        </button>
        <button
          onClick={handleEditLv1}
          className="flex h-6 w-6 items-center justify-center rounded border border-gray-300 bg-white text-sm hover:bg-gray-100"
          title="수정"
          type="button"
        >
          ✎
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="border-b border-gray-300 p-2 text-center">코드</th>
              <th className="border-b border-gray-300 p-2 text-left">코드명</th>
              <th className="border-b border-gray-300 p-2 text-center">사용</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  로딩 중...
                </td>
              </tr>
            ) : lv1List.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-gray-500">
                  데이터가 없습니다
                </td>
              </tr>
            ) : (
              lv1List.map((code) => (
                <tr
                  key={code.code}
                  onClick={() => handleLv1Click(code)}
                  className={cn(
                    'cursor-pointer hover:bg-gray-50',
                    selectedLv1?.code === code.code && 'bg-blue-100'
                  )}
                >
                  <td className="border-b border-gray-200 p-2 text-center">
                    {code.code}
                  </td>
                  <td className="border-b border-gray-200 p-2">{code.codeName}</td>
                  <td className="border-b border-gray-200 p-2 text-center">
                    {code.useYn}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <SubPageLayout
      leftPanel={leftPanel}
      leftPanelTitle="대분류 코드"
      leftPanelWidth={300}
      locationPath={['시스템관리', '코드관리']}
    >
      <div className="flex h-full gap-4">
        <div className="flex flex-1 flex-col">
          <PageToolbar>
            <ToolbarButton icon="add" onClick={handleAddLv2} title="추가" />
            <ToolbarButton icon="edit" onClick={handleEditLv2} title="수정" />
          </PageToolbar>
          <div className="flex-1 overflow-auto rounded border border-gray-300">
            <div className="bg-[#22516d] px-4 py-2 text-sm font-bold text-white">
              중분류 코드
            </div>
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b border-gray-300 p-2 text-center">코드</th>
                  <th className="border-b border-gray-300 p-2 text-left">코드명</th>
                  <th className="border-b border-gray-300 p-2 text-center">사용</th>
                </tr>
              </thead>
              <tbody>
                {lv2List.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">
                      대분류를 선택해주세요
                    </td>
                  </tr>
                ) : (
                  lv2List.map((code) => (
                    <tr
                      key={code.code}
                      onClick={() => handleLv2Click(code)}
                      className={cn(
                        'cursor-pointer hover:bg-gray-50',
                        selectedLv2?.code === code.code && 'bg-blue-100'
                      )}
                    >
                      <td className="border-b border-gray-200 p-2 text-center">
                        {code.code}
                      </td>
                      <td className="border-b border-gray-200 p-2">{code.codeName}</td>
                      <td className="border-b border-gray-200 p-2 text-center">
                        {code.useYn}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <PageToolbar>
            <ToolbarButton icon="add" onClick={handleAddLv3} title="추가" />
            <ToolbarButton icon="edit" onClick={handleEditLv3} title="수정" />
          </PageToolbar>
          <div className="flex-1 overflow-auto rounded border border-gray-300">
            <div className="bg-[#22516d] px-4 py-2 text-sm font-bold text-white">
              소분류 코드
            </div>
            <table className="w-full border-collapse text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border-b border-gray-300 p-2 text-center">코드</th>
                  <th className="border-b border-gray-300 p-2 text-left">코드명</th>
                  <th className="border-b border-gray-300 p-2 text-center">사용</th>
                </tr>
              </thead>
              <tbody>
                {lv3List.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-4 text-center text-gray-500">
                      중분류를 선택해주세요
                    </td>
                  </tr>
                ) : (
                  lv3List.map((code) => (
                    <tr
                      key={code.code}
                      onClick={() => handleLv3Click(code)}
                      className={cn(
                        'cursor-pointer hover:bg-gray-50',
                        selectedLv3?.code === code.code && 'bg-blue-100'
                      )}
                    >
                      <td className="border-b border-gray-200 p-2 text-center">
                        {code.code}
                      </td>
                      <td className="border-b border-gray-200 p-2">{code.codeName}</td>
                      <td className="border-b border-gray-200 p-2 text-center">
                        {code.useYn}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
