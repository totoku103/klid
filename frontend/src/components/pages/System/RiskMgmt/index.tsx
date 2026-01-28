import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { globalConfirm } from '@/utils/confirm'
import { globalPrompt } from '@/utils/prompt'
import { PageToolbar, ToolbarButton } from '@/components/templates'
import { sysApi } from '@/services/api/sysApi'
import type { RiskMgmt, RiskHistory } from '@/types'
import { cn } from '@/lib/utils'

const RISK_LEVELS = [
  { step: 1, name: '정상', color: 'bg-blue-500' },
  { step: 2, name: '관심', color: 'bg-green-500' },
  { step: 3, name: '주의', color: 'bg-yellow-500' },
  { step: 4, name: '경계', color: 'bg-orange-500' },
  { step: 5, name: '심각', color: 'bg-red-500' },
]

export function RiskMgmtPage() {
  const [riskData, setRiskData] = useState<RiskMgmt | null>(null)
  const [selectedStep, setSelectedStep] = useState<number | null>(null)
  const [historyList, setHistoryList] = useState<RiskHistory[]>([])
  const [selectedHistory, setSelectedHistory] = useState<RiskHistory | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadRiskData = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await sysApi.getRiskMgmt()
      setRiskData(data)
    } catch (err) {
      console.error('Failed to load risk data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const loadHistory = useCallback(async (step: number) => {
    try {
      const data = await sysApi.getRiskHistory(step)
      setHistoryList(data)
      setSelectedHistory(null)
    } catch (err) {
      console.error('Failed to load history:', err)
    }
  }, [])

  useEffect(() => {
    loadRiskData()
  }, [loadRiskData])

  const handleStepClick = useCallback(
    (step: number) => {
      setSelectedStep(step)
      loadHistory(step)
    },
    [loadHistory]
  )

  const handleEditRisk = useCallback(async () => {
    if (!riskData) return

    const basis1 = await globalPrompt('정상 최대값:', String(riskData.basis1))
    if (!basis1 || isNaN(Number(basis1))) return
    const basis2 = await globalPrompt('관심 최대값:', String(riskData.basis2))
    if (!basis2 || isNaN(Number(basis2))) return
    const basis3 = await globalPrompt('주의 최대값:', String(riskData.basis3))
    if (!basis3 || isNaN(Number(basis3))) return
    const basis4 = await globalPrompt('경계 최대값:', String(riskData.basis4))
    if (!basis4 || isNaN(Number(basis4))) return
    const basis5 = await globalPrompt('심각 최대값:', String(riskData.basis5))
    if (!basis5 || isNaN(Number(basis5))) return

    try {
      await sysApi.updateRiskMgmt({
        basis1: Number(basis1),
        basis2: Number(basis2),
        basis3: Number(basis3),
        basis4: Number(basis4),
        basis5: Number(basis5),
      })
      globalAlert.success('수정되었습니다.')
      loadRiskData()
    } catch {
      globalAlert.error('수정에 실패했습니다.')
    }
  }, [riskData, loadRiskData])

  const handleAddHistory = useCallback(async () => {
    if (!selectedStep) {
      globalAlert.warning('위협등급을 선택해주세요.')
      return
    }

    const contents = await globalPrompt('이력 내용을 입력하세요:')
    if (!contents) return

    try {
      await sysApi.addRiskHistory({ step: selectedStep, contents })
      globalAlert.success('추가되었습니다.')
      loadHistory(selectedStep)
    } catch {
      globalAlert.error('추가에 실패했습니다.')
    }
  }, [selectedStep, loadHistory])

  const handleDeleteHistory = useCallback(async () => {
    if (!selectedHistory) {
      globalAlert.warning('이력을 선택해주세요.')
      return
    }

    if (!await globalConfirm('삭제하시겠습니까?')) return

    try {
      await sysApi.deleteRiskHistory(selectedHistory.logSeq)
      globalAlert.success('삭제되었습니다.')
      if (selectedStep) loadHistory(selectedStep)
    } catch {
      globalAlert.error('삭제에 실패했습니다.')
    }
  }, [selectedHistory, selectedStep, loadHistory])

  const getRiskRange = (step: number): string => {
    if (!riskData) return '-'
    switch (step) {
      case 1:
        return `0 ~ ${riskData.basis1}`
      case 2:
        return `${riskData.basis1 + 1} ~ ${riskData.basis2}`
      case 3:
        return `${riskData.basis2 + 1} ~ ${riskData.basis3}`
      case 4:
        return `${riskData.basis3 + 1} ~ ${riskData.basis4}`
      case 5:
        return `${riskData.basis4 + 1} ~ ${riskData.basis5}`
      default:
        return '-'
    }
  }

  const selectedLevelInfo = selectedStep
    ? RISK_LEVELS.find((l) => l.step === selectedStep)
    : null

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          type="button"
          onClick={handleEditRisk}
          className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          위협등급 변경
        </button>
      </div>

      <div className="mb-4 rounded border border-gray-300 p-4">
        {isLoading ? (
          <div className="py-4 text-center text-gray-500">로딩 중...</div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 bg-gray-100 p-2">구분</th>
                {RISK_LEVELS.map((level) => (
                  <th key={level.step} className="border border-gray-300 bg-gray-100 p-2">
                    {level.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center">위협지수</td>
                {RISK_LEVELS.map((level) => (
                  <td key={level.step} className="border border-gray-300 p-2 text-center">
                    {getRiskRange(level.step)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="border-gray-300 p-2"></td>
                {RISK_LEVELS.map((level) => (
                  <td key={level.step} className="p-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleStepClick(level.step)}
                      className={cn(
                        'rounded px-3 py-1 text-sm text-white transition-opacity',
                        level.color,
                        selectedStep === level.step ? 'ring-2 ring-blue-500' : 'opacity-70 hover:opacity-100'
                      )}
                    >
                      이력보기
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {selectedStep && (
        <div className="rounded border border-gray-300 p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">
              [{selectedLevelInfo?.name}] 위협등급 변경 이력
            </h3>
            <div className="text-sm text-gray-600">
              ※ 위협지수 범위:{' '}
              <strong className="text-blue-600">[{getRiskRange(selectedStep)}]</strong> 점
            </div>
          </div>

          <PageToolbar>
            <ToolbarButton icon="add" onClick={handleAddHistory} title="추가" />
            <ToolbarButton icon="delete" onClick={handleDeleteHistory} title="삭제" />
          </PageToolbar>

          <div className="mt-2 h-64 overflow-auto rounded border border-gray-300">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 bg-gray-100">
                <tr>
                  <th className="border-b border-gray-300 p-2 text-left">내용</th>
                  <th className="border-b border-gray-300 p-2 text-center w-24">등록자</th>
                  <th className="border-b border-gray-300 p-2 text-center w-24">아이디</th>
                  <th className="border-b border-gray-300 p-2 text-center w-36">등록일</th>
                </tr>
              </thead>
              <tbody>
                {historyList.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-500">
                      데이터가 없습니다
                    </td>
                  </tr>
                ) : (
                  historyList.map((item) => (
                    <tr
                      key={item.logSeq}
                      onClick={() => setSelectedHistory(item)}
                      className={cn(
                        'cursor-pointer hover:bg-gray-50',
                        selectedHistory?.logSeq === item.logSeq && 'bg-blue-100'
                      )}
                    >
                      <td className="border-b border-gray-200 p-2">{item.contents}</td>
                      <td className="border-b border-gray-200 p-2 text-center">{item.usrName}</td>
                      <td className="border-b border-gray-200 p-2 text-center">{item.usrId}</td>
                      <td className="border-b border-gray-200 p-2 text-center">{item.regDt}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}
