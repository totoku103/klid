import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import { SubPageLayout, PageToolbar, ToolbarButton } from '@/components/templates'
import { engineerApi } from '@/services/api/engineerApi'
import type { License } from '@/types'

const defaultLicense: License = {
  licenseType: 'SMS',
  licenseKey: '',
  expireDate: '',
  maxUser: 0,
  regDate: '',
}

export function LicenseMgmtPage() {
  const [smsLicense, setSmsLicense] = useState<License>({ ...defaultLicense, licenseType: 'SMS' })
  const [nmsLicense, setNmsLicense] = useState<License>({ ...defaultLicense, licenseType: 'NMS' })
  const [isLoading, setIsLoading] = useState(false)

  const loadData = useCallback(async () => {
    setIsLoading(true)
    try {
      const [sms, nms] = await Promise.all([
        engineerApi.getLicenseInfo('SMS'),
        engineerApi.getLicenseInfo('NMS'),
      ])
      if (sms) setSmsLicense(sms)
      if (nms) setNmsLicense(nms)
    } catch (err) {
      console.error('Failed to load license info:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleSaveSms = async () => {
    try {
      await engineerApi.saveLicense(smsLicense)
      globalAlert.success('SMS 라이선스가 저장되었습니다.')
    } catch (err) {
      console.error('Failed to save SMS license:', err)
      globalAlert.error('저장 중 오류가 발생했습니다.')
    }
  }

  const handleSaveNms = async () => {
    try {
      await engineerApi.saveLicense(nmsLicense)
      globalAlert.success('NMS 라이선스가 저장되었습니다.')
    } catch (err) {
      console.error('Failed to save NMS license:', err)
      globalAlert.error('저장 중 오류가 발생했습니다.')
    }
  }

  if (isLoading) {
    return (
      <SubPageLayout locationPath={['엔지니어', '라이선스 관리']}>
        <div className="flex h-full items-center justify-center">
          <span className="text-gray-500">로딩 중...</span>
        </div>
      </SubPageLayout>
    )
  }

  return (
    <SubPageLayout locationPath={['엔지니어', '라이선스 관리']}>
      <div className="flex h-full gap-4 p-4">
        <div className="w-1/2 rounded border border-gray-300 bg-white">
          <div className="flex items-center justify-between border-b border-gray-300 bg-gray-100 p-2">
            <div className="flex items-center gap-2">
              <img
                src="/img/MainImg/customer_bullet.png"
                alt="bullet"
                className="h-4 w-4"
              />
              <span className="font-semibold">SMS License</span>
            </div>
            <PageToolbar>
              <ToolbarButton icon="save" onClick={handleSaveSms} title="저장" />
            </PageToolbar>
          </div>
          <div className="p-4">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr>
                  <td className="border border-gray-200 bg-gray-50 p-2 font-medium w-32">
                    License Key
                  </td>
                  <td className="border border-gray-200 p-2">
                    <textarea
                      className="h-48 w-full resize-none rounded border border-gray-300 p-2 text-sm"
                      value={smsLicense.licenseKey}
                      onChange={(e) =>
                        setSmsLicense((prev) => ({
                          ...prev,
                          licenseKey: e.target.value,
                        }))
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="w-1/2 rounded border border-gray-300 bg-white">
          <div className="flex items-center justify-between border-b border-gray-300 bg-gray-100 p-2">
            <div className="flex items-center gap-2">
              <img
                src="/img/MainImg/customer_bullet.png"
                alt="bullet"
                className="h-4 w-4"
              />
              <span className="font-semibold">NMS License</span>
            </div>
            <PageToolbar>
              <ToolbarButton icon="save" onClick={handleSaveNms} title="저장" />
            </PageToolbar>
          </div>
          <div className="p-4">
            <table className="w-full border-collapse text-sm">
              <tbody>
                <tr>
                  <td className="border border-gray-200 bg-gray-50 p-2 font-medium w-32">
                    License Key
                  </td>
                  <td className="border border-gray-200 p-2">
                    <textarea
                      className="h-48 w-full resize-none rounded border border-gray-300 p-2 text-sm"
                      value={nmsLicense.licenseKey}
                      onChange={(e) =>
                        setNmsLicense((prev) => ({
                          ...prev,
                          licenseKey: e.target.value,
                        }))
                      }
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
