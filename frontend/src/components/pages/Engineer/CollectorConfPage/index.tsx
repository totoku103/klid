import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { engineerApi } from '@/services/api/engineerApi'
import type { CollectorConfig, EngineerCodeItem } from '@/types'

const emptyCollector: CollectorConfig = {
  codeId: '',
  codeValue1: '',
  codeValue2: '',
  codeValue3: '',
  useFlag: 'Y',
}

export function CollectorConfPage() {
  const [collectors, setCollectors] = useState<CollectorConfig[]>([])
  const [useYnOptions] = useState<EngineerCodeItem[]>([
    { codeId: 'Y', codeNm: '사용' },
    { codeId: 'N', codeNm: '미사용' },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await engineerApi.getCollectorList()
      setCollectors(result.length > 0 ? result : [{ ...emptyCollector }])
    } catch (err) {
      console.error('Failed to load data:', err)
      setCollectors([{ ...emptyCollector }])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleChange = (
    index: number,
    field: keyof CollectorConfig,
    value: string
  ) => {
    setCollectors((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    )
  }

  const handleAdd = () => {
    setCollectors((prev) => [...prev, { ...emptyCollector }])
  }

  const handleRemove = (index: number) => {
    if (collectors.length <= 1) {
      globalAlert.info('최소 1개의 수집기 설정이 필요합니다.')
      return
    }
    setCollectors((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    try {
      await engineerApi.saveCollector(collectors)
      globalAlert.success('저장되었습니다.')
    } catch (err) {
      console.error('Failed to save:', err)
      globalAlert.error('저장 중 오류가 발생했습니다.')
    }
  }

  if (isLoading) {
    return (
      <>
        <div className="flex h-full items-center justify-center">
          <span className="text-gray-500">로딩 중...</span>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="overflow-auto p-4">
        <div className="rounded border border-gray-300 bg-white">
          <div className="border-b border-gray-300 bg-gray-100 p-2 font-semibold">
            수집기 설정
          </div>
          <div className="p-4">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 p-2">수집기번호</th>
                  <th className="border border-gray-200 p-2">수집기명</th>
                  <th className="border border-gray-200 p-2">수집기 IP</th>
                  <th className="border border-gray-200 p-2">수집기 PORT</th>
                  <th className="border border-gray-200 p-2">사용여부</th>
                  <th className="border border-gray-200 p-2 w-24">관리</th>
                </tr>
              </thead>
              <tbody>
                {collectors.map((collector, index) => (
                  <tr key={index}>
                    <td className="border border-gray-200 p-2">
                      <input
                        type="text"
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                        value={collector.codeId}
                        onChange={(e) =>
                          handleChange(index, 'codeId', e.target.value)
                        }
                      />
                    </td>
                    <td className="border border-gray-200 p-2">
                      <input
                        type="text"
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                        value={collector.codeValue1}
                        onChange={(e) =>
                          handleChange(index, 'codeValue1', e.target.value)
                        }
                      />
                    </td>
                    <td className="border border-gray-200 p-2">
                      <input
                        type="text"
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                        value={collector.codeValue2}
                        onChange={(e) =>
                          handleChange(index, 'codeValue2', e.target.value)
                        }
                      />
                    </td>
                    <td className="border border-gray-200 p-2">
                      <input
                        type="text"
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                        value={collector.codeValue3}
                        onChange={(e) =>
                          handleChange(index, 'codeValue3', e.target.value)
                        }
                      />
                    </td>
                    <td className="border border-gray-200 p-2">
                      <select
                        className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
                        value={collector.useFlag}
                        onChange={(e) =>
                          handleChange(index, 'useFlag', e.target.value)
                        }
                      >
                        {useYnOptions.map((opt) => (
                          <option key={opt.codeId} value={opt.codeId}>
                            {opt.codeNm}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="border border-gray-200 p-2 text-center">
                      <button
                        type="button"
                        className="mr-1 rounded bg-blue-500 px-2 py-1 text-xs text-white hover:bg-blue-600"
                        onClick={handleAdd}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
                        onClick={() => handleRemove(index)}
                      >
                        -
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <PageToolbar>
            <ToolbarButton icon="refresh" onClick={loadData} title="새로고침" />
            <ToolbarButton icon="save" onClick={handleSave} title="저장" />
          </PageToolbar>
        </div>
      </div>
    </>
  )
}
