interface ContactInfoProps {
  manualUrl?: string
}

export function ContactInfo({ manualUrl = '/files/user-manual.pdf' }: ContactInfoProps) {
  return (
    <div className="mt-5 flex items-center justify-between gap-5 border-t border-[#2f4d80] pt-6">
      <div className="flex-1">
        <p className="mb-1 text-lg font-semibold text-[#dae6ff]">
          로그인/시스템 사용문의
        </p>
        <ul className="space-y-1 text-[#7b94c5]">
          <li>* 사이버침해 대응시스템 02-2031-9900</li>
          <li>* 보안취약점 진단시스템 02-2031-9787</li>
          <li>* 주요정보통신기반시설 업무지원시스템 02-2031-9872</li>
        </ul>
      </div>

      <a
        href={manualUrl}
        download
        className="flex h-fit shrink-0 items-center justify-center rounded-lg border-2 border-[#2e58a4] bg-[#1a3464] px-6 py-5 text-lg font-semibold text-[#67c5ff] transition-all hover:border-[#3e74d6] hover:bg-[#214073] hover:text-[#8ad8ff]"
      >
        매뉴얼 다운로드
      </a>
    </div>
  )
}
