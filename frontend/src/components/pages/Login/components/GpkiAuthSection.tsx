import { Button } from '@/components/atoms'

interface GpkiAuthSectionProps {
  onAuth: () => void
  onRegister: () => void
  isLoading?: boolean
}

export function GpkiAuthSection({
  onAuth,
  onRegister,
  isLoading,
}: GpkiAuthSectionProps) {
  const handleAuth = () => {
    window.open(
      '/gpki/sign-in-popup.do',
      'gpki-sign-in-popup',
      'width=1200,height=800,top=100,left=100'
    )
    onAuth()
  }

  const handleRegister = () => {
    window.open(
      '/gpki/sign-up-popup.do',
      'gpki-sign-up-popup',
      'width=1200,height=800,top=100,left=100'
    )
    onRegister()
  }

  return (
    <div className="mt-5 flex flex-col items-center gap-4 border-t border-[#2f4d80] pt-5">
      <div className="flex justify-center gap-4">
        <Button
          onClick={handleAuth}
          disabled={isLoading}
          className="h-[52px] bg-[#1f6fe5] px-6 font-semibold hover:bg-[#2d82ff] disabled:bg-[#1a2942] disabled:text-[#4a5c7a]"
        >
          GPKI 인증
        </Button>
        <Button
          onClick={handleRegister}
          disabled={isLoading}
          className="h-[52px] bg-[#1f6fe5] px-6 font-semibold hover:bg-[#2d82ff] disabled:bg-[#1a2942] disabled:text-[#4a5c7a]"
        >
          인증서 등록
        </Button>
      </div>

      <a
        href="/gpkisecureweb/client/setup/GPKISecureWebSetup.exe"
        className="text-sm text-[#67c5ff] hover:text-[#dae6ff] hover:underline"
      >
        인증서 모듈 다운로드
      </a>
    </div>
  )
}
