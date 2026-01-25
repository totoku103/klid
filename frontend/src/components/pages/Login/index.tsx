import { AuthLayout, AuthBox } from '@/components/templates'
import { AUTH_METHOD, SYSTEM_TYPE } from '@/utils/constants'
import { useLogin } from './hooks/useLogin'
import {
  SystemSelector,
  LoginForm,
  AuthMethodSelector,
  OtpAuthSection,
  GpkiAuthSection,
  EmailAuthSection,
  ContactInfo,
  PrivacyPolicyLink,

  PasswordChangeModal,
} from './components'

export function LoginPage() {
  const {
    systemType,
    setSystemType,
    authMethod,
    setAuthMethod,
    step,
    otpSecretKey,
    isLoading,
    error,
    isInputDisabled,
    handlePrimaryAuth,
    handleOtpAuth,
    handleEmailSend,
    handleEmailValidate,
    showSignUpButton,
    passwordChangeModal,
    closePasswordChangeModal,
  } = useLogin()

  const handleSignUp = () => {
    const popupOption =
      'width=' +
      screen.availWidth +
      ',height=' +
      screen.availHeight +
      ',top=100,left=100,fullscreen=yes'

    if (systemType === SYSTEM_TYPE.VMS) {
      window.open('/main/vms/sign-up.do', 'vms-sign-up', popupOption)
    } else if (systemType === SYSTEM_TYPE.CTSS) {
      window.open('/main/ctss/sign-up.do', 'ctss-sign-up', popupOption)
    }
  }

  const renderSecondaryAuth = () => {
    if (step !== 'secondary') return null

    if (systemType === SYSTEM_TYPE.CTRS) {
      return (
        <OtpAuthSection
          otpSecretKey={otpSecretKey}
          onConfirm={handleOtpAuth}
          isLoading={isLoading}
        />
      )
    }

    return (
      <>
        <div className="mt-5 border-t border-[#2f4d80] pt-5">
          <AuthMethodSelector
            value={authMethod}
            onChange={setAuthMethod}
            disabled={isLoading}
          />
        </div>

        {authMethod === AUTH_METHOD.OTP && (
          <OtpAuthSection
            otpSecretKey={otpSecretKey}
            onConfirm={handleOtpAuth}
            isLoading={isLoading}
          />
        )}

        {authMethod === AUTH_METHOD.GPKI && (
          <GpkiAuthSection
            onAuth={() => { }}
            onRegister={() => { }}
            isLoading={isLoading}
          />
        )}

        {authMethod === AUTH_METHOD.EMAIL && (
          <EmailAuthSection
            onSend={handleEmailSend}
            onValidate={handleEmailValidate}
            isLoading={isLoading}
          />
        )}
      </>
    )
  }

  return (
    <AuthLayout>
      <PasswordChangeModal
        isOpen={passwordChangeModal.isOpen}
        onClose={closePasswordChangeModal}
        message={passwordChangeModal.message}
      />

      <AuthBox>
        <div className="mb-8 text-center">
          <h1 className="text-[43px] font-bold text-[#67c5ff]">
            사이버 침해대응시스템
          </h1>
        </div>

        <div className="mb-9 flex items-baseline justify-center gap-4">
          <h2 className="text-[41px] font-bold text-[#e5f2ff]">LOGIN</h2>
          <p className="pt-3 text-sm text-[#9db6e3]">
            접속을 원하는 시스템을 선택하세요.
          </p>
        </div>

        <SystemSelector
          value={systemType}
          onChange={setSystemType}
          disabled={isInputDisabled}
        />

        {error && (
          <div className="mb-4 rounded-lg bg-red-500/20 p-3 text-center text-sm text-red-400">
            {error}
          </div>
        )}

        <LoginForm
          onSubmit={handlePrimaryAuth}
          onSignUp={handleSignUp}
          disabled={isInputDisabled}
          isLoading={isLoading}
          showSignUp={showSignUpButton && !isInputDisabled}
        />

        {renderSecondaryAuth()}

        <ContactInfo />

        <div className="mt-2 border-t border-[#2f4d80] pt-2 text-center">
          <p className="mb-2 text-sm text-[#9db6e3]">
            Copyright © 2025 한국지역정보개발원. All rights reserved.
          </p>
          <PrivacyPolicyLink systemType={systemType} />
        </div>
      </AuthBox>
    </AuthLayout>
  )
}

export default LoginPage
