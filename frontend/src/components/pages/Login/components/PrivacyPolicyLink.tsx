import type { SystemType } from '@/utils/constants'
import { SYSTEM_TYPE } from '@/utils/constants'

interface PrivacyPolicyLinkProps {
  systemType: SystemType
}

export function PrivacyPolicyLink({ systemType }: PrivacyPolicyLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()

    if (systemType === SYSTEM_TYPE.CTRS) {
      window.open(
        '/popup/privacy-policy',
        'ctrs-privacy-policy',
        'width=980,height=800,top=10,left=10,resizable=yes,scrollbars=yes'
      )
    } else {
      const baseUrl = import.meta.env.VITE_API_URL || ''

      if (systemType === SYSTEM_TYPE.VMS) {
        fetch(`${baseUrl}/main/vms/privacy-policy.do`, { credentials: 'include' })
          .then(res => res.text())
          .then(url => {
            window.open(
              url,
              'vms-private-policy',
              'width=1240,height=800,top=10,left=10,resizable=no,scrollbars=yes'
            )
          })
      } else if (systemType === SYSTEM_TYPE.CTSS) {
        fetch(`${baseUrl}/main/ctss/privacy-policy.do`, { credentials: 'include' })
          .then(res => res.text())
          .then(url => {
            window.open(
              url,
              'ctss-private-policy',
              'width=1240,height=800,top=10,left=10,resizable=no,scrollbars=yes'
            )
          })
      }
    }
  }

  return (
    <a
      href="#"
      onClick={handleClick}
      className="text-sm text-[#67c5ff] hover:underline"
    >
      개인정보 처리방침
    </a>
  )
}
