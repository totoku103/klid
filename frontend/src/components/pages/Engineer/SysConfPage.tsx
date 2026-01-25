import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { SubPageLayout, PageToolbar, ToolbarButton } from '@/components/templates'
import { engineerApi } from '@/services/api/engineerApi'
import type { SysConfig, EngineerCodeItem } from '@/types'

const defaultConfig: SysConfig = {
  siteName: '',
  webSiteName: '',
  dashPort: '8082',
  pwdEncrUse: 'Y',
  topoAuthUse: 'N',
  appNetisPopup: 'N',
  uploadPath: '',
  uploadSizeLimit: '',
  evtLevel0: '',
  evtLevel1: '',
  evtLevel2: '',
  evtLevel3: '',
  evtLevel4: '',
  evtLevel5: '',
  evtLevel: '',
}

export function SysConfPage() {
  const [config, setConfig] = useState<SysConfig>(defaultConfig)
  const [useYnOptions] = useState<EngineerCodeItem[]>([
    { codeId: 'Y', codeNm: '사용' },
    { codeId: 'N', codeNm: '미사용' },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await engineerApi.getSysConfig()
      setConfig(result)
    } catch (err) {
      console.error('Failed to load config:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleChange = (field: keyof SysConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = async () => {
    try {
      await engineerApi.saveSysConfig(config)
      globalAlert.success('저장되었습니다.')
    } catch (err) {
      console.error('Failed to save config:', err)
      globalAlert.error('저장 중 오류가 발생했습니다.')
    }
  }

  const renderSelect = (field: keyof SysConfig, options: EngineerCodeItem[]) => (
    <select
      className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
      value={config[field]}
      onChange={(e) => handleChange(field, e.target.value)}
    >
      {options.map((opt) => (
        <option key={opt.codeId} value={opt.codeId}>
          {opt.codeNm}
        </option>
      ))}
    </select>
  )

  const renderInput = (field: keyof SysConfig, readOnly = false) => (
    <input
      type="text"
      className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
      value={config[field]}
      onChange={(e) => handleChange(field, e.target.value)}
      readOnly={readOnly}
    />
  )

  if (isLoading) {
    return (
      <SubPageLayout locationPath={['엔지니어', '시스템 설정']}>
        <div className="flex h-full items-center justify-center">
          <span className="text-gray-500">로딩 중...</span>
        </div>
      </SubPageLayout>
    )
  }

  return (
    <SubPageLayout locationPath={['엔지니어', '시스템 설정']}>
      <div className="overflow-auto p-4">
        <div className="rounded border border-gray-300 bg-white">
          <div className="border-b border-gray-300 bg-gray-100 p-2 font-semibold">
            Application 설정
          </div>
          <div className="p-4">
            <table className="w-full border-collapse text-sm">
              <colgroup>
                <col className="w-[15%]" />
                <col className="w-[35%]" />
                <col className="w-[15%]" />
                <col className="w-[35%]" />
              </colgroup>
              <tbody>
                <tr>
                  <td className="border border-gray-200 bg-gray-50 p-2 font-medium">사이트명</td>
                  <td className="border border-gray-200 p-2">{renderInput('siteName', true)}</td>
                  <td className="border border-gray-200 bg-gray-50 p-2 font-medium">웹사이트명</td>
                  <td className="border border-gray-200 p-2">{renderInput('webSiteName', true)}</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 bg-gray-50 p-2 font-medium">대시보드 포트</td>
                  <td className="border border-gray-200 p-2">{renderInput('dashPort')}</td>
                  <td className="border border-gray-200 bg-gray-50 p-2 font-medium">비밀번호암호화</td>
                  <td className="border border-gray-200 p-2">{renderSelect('pwdEncrUse', useYnOptions)}</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 bg-gray-50 p-2 font-medium">토폴로지권한사용</td>
                  <td className="border border-gray-200 p-2">{renderSelect('topoAuthUse', useYnOptions)}</td>
                  <td className="border border-gray-200 bg-gray-50 p-2 font-medium">분석설정 팝업사용</td>
                  <td className="border border-gray-200 p-2">{renderSelect('appNetisPopup', useYnOptions)}</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 bg-gray-50 p-2 font-medium">업로드 경로</td>
                  <td className="border border-gray-200 p-2">{renderInput('uploadPath', true)}</td>
                  <td className="border border-gray-200 bg-gray-50 p-2 font-medium">업로드 용량제한(byte)</td>
                  <td className="border border-gray-200 p-2">{renderInput('uploadSizeLimit')}</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 bg-gray-50 p-2 font-medium">이벤트레벨 문구</td>
                  <td colSpan={3} className="border border-gray-200 p-2">
                    <div className="flex flex-wrap gap-4">
                      <span className="flex items-center gap-1">
                        <label>-정상:</label>
                        <input
                          type="text"
                          className="w-20 rounded border border-gray-300 px-2 py-1 text-sm"
                          value={config.evtLevel0}
                          onChange={(e) => handleChange('evtLevel0', e.target.value)}
                        />
                      </span>
                      <span className="flex items-center gap-1">
                        <label>-정보:</label>
                        <input
                          type="text"
                          className="w-20 rounded border border-gray-300 px-2 py-1 text-sm"
                          value={config.evtLevel1}
                          onChange={(e) => handleChange('evtLevel1', e.target.value)}
                        />
                      </span>
                      <span className="flex items-center gap-1">
                        <label>-주의:</label>
                        <input
                          type="text"
                          className="w-20 rounded border border-gray-300 px-2 py-1 text-sm"
                          value={config.evtLevel2}
                          onChange={(e) => handleChange('evtLevel2', e.target.value)}
                        />
                      </span>
                      <span className="flex items-center gap-1">
                        <label>-알람:</label>
                        <input
                          type="text"
                          className="w-20 rounded border border-gray-300 px-2 py-1 text-sm"
                          value={config.evtLevel3}
                          onChange={(e) => handleChange('evtLevel3', e.target.value)}
                        />
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-4">
                      <span className="flex items-center gap-1">
                        <label>-경보:</label>
                        <input
                          type="text"
                          className="w-20 rounded border border-gray-300 px-2 py-1 text-sm"
                          value={config.evtLevel4}
                          onChange={(e) => handleChange('evtLevel4', e.target.value)}
                        />
                      </span>
                      <span className="flex items-center gap-1">
                        <label>-장애:</label>
                        <input
                          type="text"
                          className="w-20 rounded border border-gray-300 px-2 py-1 text-sm"
                          value={config.evtLevel5}
                          onChange={(e) => handleChange('evtLevel5', e.target.value)}
                        />
                      </span>
                      <span className="flex items-center gap-1">
                        <label>-조치중:</label>
                        <input
                          type="text"
                          className="w-20 rounded border border-gray-300 px-2 py-1 text-sm"
                          value={config.evtLevel}
                          onChange={(e) => handleChange('evtLevel', e.target.value)}
                        />
                      </span>
                    </div>
                  </td>
                </tr>
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
    </SubPageLayout>
  )
}
