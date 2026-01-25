import { useState, useEffect, useCallback, useMemo } from 'react'
import { globalAlert } from '@/utils/alert'
import { MainLayout } from '@/components/templates/MainLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import api from '@/services/api/axios'

interface DashConfigData {
  workCp1: string
  workCp2: string
  workCp3: string
  workPs1: string
  workPs2: string
  workPs3: string
  workMng1: string
  workMng2: string
  workMng3: string
  workCon1: string
  workCon2: string
  workCon3: string
  nirsCdM: string
  nirsCdA: string
  nirsCdD: string
  nirsDdM: string
  nirsDdA: string
  nirsDdD: string
  nirsHkM: string
  nirsHkA: string
  nirsHkD: string
  nirsEtM: string
  nirsEtA: string
  nirsEtD: string
  klidCdM: string
  klidCdA: string
  klidCdD: string
  klidDdM: string
  klidDdA: string
  klidDdD: string
  klidHkM: string
  klidHkA: string
  klidHkD: string
  klidEtM: string
  klidEtA: string
  klidEtD: string
  gtAv: string
  gtMax: string
  ctAv: string
  ctMax: string
  ssAv: string
  ssMax: string
  gtRst: string
  ctRst: string
  ssRst: string
  errSvr: string
  errNet: string
  errStr: string
  errBak: string
  errHom: string
  noti1: string
  noti2: string
  secu1: string
  secu2: string
}

const initialData: DashConfigData = {
  workCp1: '', workCp2: '', workCp3: '',
  workPs1: '', workPs2: '', workPs3: '',
  workMng1: '', workMng2: '', workMng3: '',
  workCon1: '', workCon2: '', workCon3: '',
  nirsCdM: '', nirsCdA: '', nirsCdD: '',
  nirsDdM: '', nirsDdA: '', nirsDdD: '',
  nirsHkM: '', nirsHkA: '', nirsHkD: '',
  nirsEtM: '', nirsEtA: '', nirsEtD: '',
  klidCdM: '', klidCdA: '', klidCdD: '',
  klidDdM: '', klidDdA: '', klidDdD: '',
  klidHkM: '', klidHkA: '', klidHkD: '',
  klidEtM: '', klidEtA: '', klidEtD: '',
  gtAv: '', gtMax: '', ctAv: '', ctMax: '', ssAv: '', ssMax: '',
  gtRst: '', ctRst: '', ssRst: '',
  errSvr: '', errNet: '', errStr: '', errBak: '', errHom: '',
  noti1: '', noti2: '',
  secu1: '', secu2: '',
}

const numericFields = [
  'workPs1', 'workPs2', 'workPs3',
  'nirsCdM', 'nirsCdA', 'nirsCdD', 'nirsDdM', 'nirsDdA', 'nirsDdD',
  'nirsHkM', 'nirsHkA', 'nirsHkD', 'nirsEtM', 'nirsEtA', 'nirsEtD',
  'klidCdM', 'klidCdA', 'klidCdD', 'klidDdM', 'klidDdA', 'klidDdD',
  'klidHkM', 'klidHkA', 'klidHkD', 'klidEtM', 'klidEtA', 'klidEtD',
  'gtAv', 'gtMax', 'ctAv', 'ctMax', 'ssAv', 'ssMax',
  'errSvr', 'errNet', 'errStr', 'errBak', 'errHom'
] as const

export function DashConfigPage() {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  })
  const [formData, setFormData] = useState<DashConfigData>(initialData)
  const [isUpdate, setIsUpdate] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleNumericInput = (field: keyof DashConfigData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '')
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFloatInput = (field: keyof DashConfigData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '')
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleTextInput = (field: keyof DashConfigData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleSelectChange = (field: keyof DashConfigData) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }))
  }

  const calculations = useMemo(() => {
    const num = (val: string) => Number(val) || 0

    const niraSum1 = num(formData.nirsCdM) + num(formData.nirsCdA) + num(formData.nirsCdD)
    const niraSum2 = num(formData.nirsDdM) + num(formData.nirsDdA) + num(formData.nirsDdD)
    const niraSum3 = num(formData.nirsHkM) + num(formData.nirsHkA) + num(formData.nirsHkD)
    const niraSum4 = num(formData.nirsEtM) + num(formData.nirsEtA) + num(formData.nirsEtD)

    const klidSum1 = num(formData.klidCdM) + num(formData.klidCdA) + num(formData.klidCdD)
    const klidSum2 = num(formData.klidDdM) + num(formData.klidDdA) + num(formData.klidDdD)
    const klidSum3 = num(formData.klidHkM) + num(formData.klidHkA) + num(formData.klidHkD)
    const klidSum4 = num(formData.klidEtM) + num(formData.klidEtA) + num(formData.klidEtD)

    const sum1 = num(formData.nirsCdM) + num(formData.nirsDdM) + num(formData.nirsHkM) + num(formData.nirsEtM)
    const sum2 = num(formData.klidCdM) + num(formData.klidDdM) + num(formData.klidHkM) + num(formData.klidEtM)
    const sum3 = num(formData.nirsCdA) + num(formData.nirsDdA) + num(formData.nirsHkA) + num(formData.nirsEtA)
    const sum4 = num(formData.klidCdA) + num(formData.klidDdA) + num(formData.klidHkA) + num(formData.klidEtA)
    const sum5 = num(formData.nirsCdD) + num(formData.nirsDdD) + num(formData.nirsHkD) + num(formData.nirsEtD)
    const sum6 = num(formData.klidCdD) + num(formData.klidDdD) + num(formData.klidHkD) + num(formData.klidEtD)
    const sum7 = sum1 + sum3 + sum5
    const sum8 = sum2 + sum4 + sum6

    const totalCnt = num(formData.workPs1) + num(formData.workPs2) + num(formData.workPs3)

    return {
      niraSum1, niraSum2, niraSum3, niraSum4,
      klidSum1, klidSum2, klidSum3, klidSum4,
      sum1, sum2, sum3, sum4, sum5, sum6, sum7, sum8,
      totalCnt
    }
  }, [formData])

  const searchContents = useCallback(async () => {
    setLoading(true)
    try {
      const response = await api.get('/main/mois/dashConfig/getDashConfigList.do', {
        params: { datTime: selectedDate }
      })
      
      if (response.data.resultData) {
        setFormData(response.data.resultData)
        setIsUpdate(true)
      } else {
        setFormData(initialData)
        setIsUpdate(false)
      }
    } catch (error) {
      console.error('조회 실패:', error)
      globalAlert.error('데이터 조회에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }, [selectedDate])

  const saveContents = async () => {
    const normalizedData = { ...formData }
    numericFields.forEach(field => {
      if (normalizedData[field] === '') {
        normalizedData[field] = '0'
      }
    })

    const url = isUpdate
      ? '/main/mois/dashConfig/editDashConfig.do'
      : '/main/mois/dashConfig/addDashConfig.do'

    try {
      await api.post(url, { ...normalizedData, datTime: selectedDate })
      globalAlert.success('저장완료되었습니다.')
      searchContents()
    } catch (error) {
      console.error('저장 실패:', error)
      globalAlert.error('저장에 실패했습니다.')
    }
  }

  useEffect(() => {
    searchContents()
  }, [searchContents])

  const inputStyle = "h-7 text-sm text-center"
  const cellStyle = "border border-gray-300 px-2 py-1 text-center text-sm"
  const headerStyle = "border border-gray-300 px-2 py-1 text-center text-sm font-medium bg-[#0a73a7] text-white"
  const subHeaderStyle = "border border-gray-300 px-2 py-1 text-center text-sm bg-gray-100"

  return (
    <MainLayout>
      <div className="p-4">
        <div className="bg-white border border-gray-300 rounded p-3 mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">일자:</label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-40 h-8"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={searchContents} disabled={loading} size="sm">
                조회
              </Button>
              <Button onClick={saveContents} disabled={loading} size="sm" variant="secondary">
                저장
              </Button>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="bg-[#0a73a7] text-white px-3 py-1 text-sm font-medium">
            근무 현황
          </div>
          <table className="w-full border-collapse">
            <colgroup>
              <col width="15%" />
              <col width="5%" />
              <col width="30%" />
              <col width="50%" />
            </colgroup>
            <thead>
              <tr>
                <th className={headerStyle}>상황근무 현황</th>
                <th className={headerStyle}>총{calculations.totalCnt}명</th>
                <th className={headerStyle}>담당자</th>
                <th className={headerStyle}>위탁요원</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map(i => (
                <tr key={i}>
                  <td className={cellStyle}>
                    <Input
                      value={formData[`workCp${i}` as keyof DashConfigData]}
                      onChange={handleTextInput(`workCp${i}` as keyof DashConfigData)}
                      className={inputStyle}
                      maxLength={50}
                    />
                  </td>
                  <td className={cellStyle}>
                    <div className="flex items-center justify-center gap-1">
                      <Input
                        value={formData[`workPs${i}` as keyof DashConfigData]}
                        onChange={handleNumericInput(`workPs${i}` as keyof DashConfigData)}
                        className={`${inputStyle} w-12`}
                      />
                      <span className="text-sm">명</span>
                    </div>
                  </td>
                  <td className={cellStyle}>
                    <Input
                      value={formData[`workMng${i}` as keyof DashConfigData]}
                      onChange={handleTextInput(`workMng${i}` as keyof DashConfigData)}
                      className={inputStyle}
                      maxLength={500}
                    />
                  </td>
                  <td className={cellStyle}>
                    <Input
                      value={formData[`workCon${i}` as keyof DashConfigData]}
                      onChange={handleTextInput(`workCon${i}` as keyof DashConfigData)}
                      className={inputStyle}
                      maxLength={500}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-4">
          <div className="bg-[#0a73a7] text-white px-3 py-1 text-sm font-medium">
            사이버위협 탐지/차단 현황
          </div>
          <table className="w-full border-collapse">
            <colgroup>
              <col width="5%" />
              <col width="9.5%" />
              <col width="9.5%" />
              <col width="9.5%" />
              <col width="9.5%" />
              <col width="9.5%" />
              <col width="9.5%" />
              <col width="9.5%" />
              <col width="9.5%" />
              <col width="9.5%" />
              <col width="9.5%" />
            </colgroup>
            <thead>
              <tr>
                <th rowSpan={2} className={headerStyle}>구분</th>
                <th colSpan={5} className="border border-gray-300 px-2 py-1 text-center text-sm font-medium bg-purple-600 text-white">
                  중앙행정기관(국가정보자원관리원)
                </th>
                <th colSpan={5} className="border border-gray-300 px-2 py-1 text-center text-sm font-medium bg-green-600 text-white">
                  지방자치단체(한국지역정보개발원)
                </th>
              </tr>
              <tr>
                <td className="border border-gray-300 px-2 py-1 text-center text-sm bg-purple-100">(소계)</td>
                <td className="border border-gray-300 px-2 py-1 text-center text-sm bg-purple-100">악성코드</td>
                <td className="border border-gray-300 px-2 py-1 text-center text-sm bg-purple-100">DDos</td>
                <td className="border border-gray-300 px-2 py-1 text-center text-sm bg-purple-100">해킹</td>
                <td className="border border-gray-300 px-2 py-1 text-center text-sm bg-purple-100">기타</td>
                <td className="border border-gray-300 px-2 py-1 text-center text-sm bg-green-100">(소계)</td>
                <td className="border border-gray-300 px-2 py-1 text-center text-sm bg-green-100">악성코드</td>
                <td className="border border-gray-300 px-2 py-1 text-center text-sm bg-green-100">DDos</td>
                <td className="border border-gray-300 px-2 py-1 text-center text-sm bg-green-100">해킹</td>
                <td className="border border-gray-300 px-2 py-1 text-center text-sm bg-green-100">기타</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={cellStyle}>자동차단</td>
                <td className={cellStyle}>{calculations.sum3}</td>
                <td className={cellStyle}>
                  <Input value={formData.nirsCdA} onChange={handleNumericInput('nirsCdA')} className={inputStyle} />
                </td>
                <td className={cellStyle}>
                  <Input value={formData.nirsDdA} onChange={handleNumericInput('nirsDdA')} className={inputStyle} />
                </td>
                <td className={cellStyle}>
                  <Input value={formData.nirsHkA} onChange={handleNumericInput('nirsHkA')} className={inputStyle} />
                </td>
                <td className={cellStyle}>
                  <Input value={formData.nirsEtA} onChange={handleNumericInput('nirsEtA')} className={inputStyle} />
                </td>
                <td className={cellStyle}>{calculations.sum4}</td>
                <td className={cellStyle}>
                  <Input value={formData.klidCdA} onChange={handleNumericInput('klidCdA')} className={inputStyle} />
                </td>
                <td className={cellStyle}>
                  <Input value={formData.klidDdA} onChange={handleNumericInput('klidDdA')} className={inputStyle} />
                </td>
                <td className={cellStyle}>
                  <Input value={formData.klidHkA} onChange={handleNumericInput('klidHkA')} className={inputStyle} />
                </td>
                <td className={cellStyle}>
                  <Input value={formData.klidEtA} onChange={handleNumericInput('klidEtA')} className={inputStyle} />
                </td>
              </tr>
              <tr>
                <td className={cellStyle}>수동차단</td>
                <td className={cellStyle}>{calculations.sum1}</td>
                <td className={cellStyle}>
                  <Input value={formData.nirsCdM} onChange={handleNumericInput('nirsCdM')} className={inputStyle} />
                </td>
                <td className={cellStyle}>
                  <Input value={formData.nirsDdM} onChange={handleNumericInput('nirsDdM')} className={inputStyle} />
                </td>
                <td className={cellStyle}>
                  <Input value={formData.nirsHkM} onChange={handleNumericInput('nirsHkM')} className={inputStyle} />
                </td>
                <td className={cellStyle}>
                  <Input value={formData.nirsEtM} onChange={handleNumericInput('nirsEtM')} className={inputStyle} />
                </td>
                <td className={cellStyle}>{calculations.sum2}</td>
                <td className={cellStyle}>
                  <Input value={formData.klidCdM} onChange={handleNumericInput('klidCdM')} className={inputStyle} />
                </td>
                <td className={cellStyle}>
                  <Input value={formData.klidDdM} onChange={handleNumericInput('klidDdM')} className={inputStyle} />
                </td>
                <td className={cellStyle}>
                  <Input value={formData.klidHkM} onChange={handleNumericInput('klidHkM')} className={inputStyle} />
                </td>
                <td className={cellStyle}>
                  <Input value={formData.klidEtM} onChange={handleNumericInput('klidEtM')} className={inputStyle} />
                </td>
              </tr>
              <tr>
                <td className={cellStyle}>탐지</td>
                <td className={cellStyle}>{calculations.sum5}</td>
                <td className={cellStyle}>
                  <Input value={formData.nirsCdD} onChange={handleNumericInput('nirsCdD')} className={inputStyle} />
                </td>
                <td className={cellStyle}>
                  <Input value={formData.nirsDdD} onChange={handleNumericInput('nirsDdD')} className={inputStyle} />
                </td>
                <td className={cellStyle}>
                  <Input value={formData.nirsHkD} onChange={handleNumericInput('nirsHkD')} className={inputStyle} />
                </td>
                <td className={cellStyle}>
                  <Input value={formData.nirsEtD} onChange={handleNumericInput('nirsEtD')} className={inputStyle} />
                </td>
                <td className={cellStyle}>{calculations.sum6}</td>
                <td className={cellStyle}>
                  <Input value={formData.klidCdD} onChange={handleNumericInput('klidCdD')} className={inputStyle} />
                </td>
                <td className={cellStyle}>
                  <Input value={formData.klidDdD} onChange={handleNumericInput('klidDdD')} className={inputStyle} />
                </td>
                <td className={cellStyle}>
                  <Input value={formData.klidHkD} onChange={handleNumericInput('klidHkD')} className={inputStyle} />
                </td>
                <td className={cellStyle}>
                  <Input value={formData.klidEtD} onChange={handleNumericInput('klidEtD')} className={inputStyle} />
                </td>
              </tr>
              <tr className="bg-gray-200">
                <td className={`${cellStyle} font-medium`}>합계</td>
                <td className={cellStyle}>{calculations.sum7}</td>
                <td className={cellStyle}>{calculations.niraSum1}</td>
                <td className={cellStyle}>{calculations.niraSum2}</td>
                <td className={cellStyle}>{calculations.niraSum3}</td>
                <td className={cellStyle}>{calculations.niraSum4}</td>
                <td className={cellStyle}>{calculations.sum8}</td>
                <td className={cellStyle}>{calculations.klidSum1}</td>
                <td className={cellStyle}>{calculations.klidSum2}</td>
                <td className={cellStyle}>{calculations.klidSum3}</td>
                <td className={cellStyle}>{calculations.klidSum4}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="bg-[#0a73a7] text-white px-3 py-1 text-sm font-medium">
              전자정부 네트워크 현황
            </div>
            <table className="w-full border-collapse">
              <colgroup>
                <col width="10%" />
                <col width="15%" />
                <col width="15%" />
                <col width="15%" />
                <col width="15%" />
                <col width="15%" />
                <col width="15%" />
              </colgroup>
              <thead>
                <tr>
                  <th rowSpan={2} className={headerStyle}>구분</th>
                  <th colSpan={2} className="border border-gray-300 px-2 py-1 text-center text-sm font-medium bg-purple-600 text-white">
                    국통망(최대 10G)
                  </th>
                  <th colSpan={2} className="border border-gray-300 px-2 py-1 text-center text-sm font-medium bg-green-600 text-white">
                    센터망(최대 2G)
                  </th>
                  <th colSpan={2} className="border border-gray-300 px-2 py-1 text-center text-sm font-medium bg-orange-600 text-white">
                    소속기관(최대 1G)
                  </th>
                </tr>
                <tr>
                  <td className={subHeaderStyle}>평균값</td>
                  <td className={subHeaderStyle}>최대값</td>
                  <td className={subHeaderStyle}>평균값</td>
                  <td className={subHeaderStyle}>최대값</td>
                  <td className={subHeaderStyle}>평균값</td>
                  <td className={subHeaderStyle}>최대값</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={`${cellStyle} text-xs`}>트래픽량</td>
                  <td className={cellStyle}>
                    <div className="flex items-center justify-center gap-1">
                      <Input value={formData.gtAv} onChange={handleFloatInput('gtAv')} className={`${inputStyle} w-16`} />
                      <span className="text-xs">G</span>
                    </div>
                  </td>
                  <td className={cellStyle}>
                    <div className="flex items-center justify-center gap-1">
                      <Input value={formData.gtMax} onChange={handleFloatInput('gtMax')} className={`${inputStyle} w-16`} />
                      <span className="text-xs">G</span>
                    </div>
                  </td>
                  <td className={cellStyle}>
                    <div className="flex items-center justify-center gap-1">
                      <Input value={formData.ctAv} onChange={handleFloatInput('ctAv')} className={`${inputStyle} w-16`} />
                      <span className="text-xs">G</span>
                    </div>
                  </td>
                  <td className={cellStyle}>
                    <div className="flex items-center justify-center gap-1">
                      <Input value={formData.ctMax} onChange={handleFloatInput('ctMax')} className={`${inputStyle} w-16`} />
                      <span className="text-xs">G</span>
                    </div>
                  </td>
                  <td className={cellStyle}>
                    <div className="flex items-center justify-center gap-1">
                      <Input value={formData.ssAv} onChange={handleFloatInput('ssAv')} className={`${inputStyle} w-16`} />
                      <span className="text-xs">MB</span>
                    </div>
                  </td>
                  <td className={cellStyle}>
                    <div className="flex items-center justify-center gap-1">
                      <Input value={formData.ssMax} onChange={handleFloatInput('ssMax')} className={`${inputStyle} w-16`} />
                      <span className="text-xs">MB</span>
                    </div>
                  </td>
                </tr>
                <tr className="bg-gray-200">
                  <td className={`${cellStyle} font-medium`}>결과</td>
                  <td colSpan={2} className={cellStyle}>
                    <select
                      value={formData.gtRst}
                      onChange={handleSelectChange('gtRst')}
                      className="h-7 w-full border border-gray-300 rounded text-sm px-2"
                    >
                      <option value="">선택</option>
                      <option value="1">양호</option>
                    </select>
                  </td>
                  <td colSpan={2} className={cellStyle}>
                    <select
                      value={formData.ctRst}
                      onChange={handleSelectChange('ctRst')}
                      className="h-7 w-full border border-gray-300 rounded text-sm px-2"
                    >
                      <option value="">선택</option>
                      <option value="1">양호</option>
                    </select>
                  </td>
                  <td colSpan={2} className={cellStyle}>
                    <select
                      value={formData.ssRst}
                      onChange={handleSelectChange('ssRst')}
                      className="h-7 w-full border border-gray-300 rounded text-sm px-2"
                    >
                      <option value="">선택</option>
                      <option value="1">양호</option>
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <div className="bg-[#0a73a7] text-white px-3 py-1 text-sm font-medium">
              전자정부 장애 현황
            </div>
            <table className="w-full border-collapse">
              <colgroup>
                <col width="10%" />
                <col width="18%" />
                <col width="18%" />
                <col width="18%" />
                <col width="18%" />
                <col width="18%" />
              </colgroup>
              <thead>
                <tr>
                  <th rowSpan={2} className={headerStyle}>구분</th>
                  <th rowSpan={2} className={headerStyle}>서버</th>
                  <th rowSpan={2} className={headerStyle}>네트워크/보안</th>
                  <th rowSpan={2} className={headerStyle}>스토리지</th>
                  <th rowSpan={2} className={headerStyle}>백업/기타</th>
                  <th rowSpan={2} className={headerStyle}>홈페이지</th>
                </tr>
                <tr></tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan={2} className={cellStyle}>수량</td>
                  <td rowSpan={2} className={cellStyle}>
                    <Input value={formData.errSvr} onChange={handleNumericInput('errSvr')} className={inputStyle} />
                  </td>
                  <td rowSpan={2} className={cellStyle}>
                    <Input value={formData.errNet} onChange={handleNumericInput('errNet')} className={inputStyle} />
                  </td>
                  <td rowSpan={2} className={cellStyle}>
                    <Input value={formData.errStr} onChange={handleNumericInput('errStr')} className={inputStyle} />
                  </td>
                  <td rowSpan={2} className={cellStyle}>
                    <Input value={formData.errBak} onChange={handleNumericInput('errBak')} className={inputStyle} />
                  </td>
                  <td rowSpan={2} className={cellStyle}>
                    <Input value={formData.errHom} onChange={handleNumericInput('errHom')} className={inputStyle} />
                  </td>
                </tr>
                <tr></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="bg-[#0a73a7] text-white px-3 py-1 text-sm font-medium">
              상황전파 현황
            </div>
            <table className="w-full border-collapse">
              <tbody>
                {[1, 2].map(i => (
                  <tr key={i}>
                    <td className={`${headerStyle} w-12`}>{i}</td>
                    <td className={cellStyle}>
                      <Input
                        value={formData[`noti${i}` as keyof DashConfigData]}
                        onChange={handleTextInput(`noti${i}` as keyof DashConfigData)}
                        className={`${inputStyle} w-full`}
                        maxLength={500}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div>
            <div className="bg-[#0a73a7] text-white px-3 py-1 text-sm font-medium">
              보안동향
            </div>
            <table className="w-full border-collapse">
              <tbody>
                {[1, 2].map(i => (
                  <tr key={i}>
                    <td className={`${headerStyle} w-12`}>{i}</td>
                    <td className={cellStyle}>
                      <Input
                        value={formData[`secu${i}` as keyof DashConfigData]}
                        onChange={handleTextInput(`secu${i}` as keyof DashConfigData)}
                        className={`${inputStyle} w-full`}
                        maxLength={500}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
