import { test, expect } from '@playwright/test'

test.describe('로그인 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('로그인 페이지 렌더링', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '사이버 침해대응시스템' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'LOGIN' })).toBeVisible()
    await expect(page.getByText('접속을 원하는 시스템을 선택하세요.')).toBeVisible()
  })

  test('시스템 선택 라디오 버튼 표시', async ({ page }) => {
    await expect(page.getByLabel(/사이버침해대응시스템/)).toBeVisible()
    await expect(page.getByLabel(/보안취약점 진단시스템/)).toBeVisible()
    await expect(page.getByLabel(/주요정보통신기반시설/)).toBeVisible()
  })

  test('시스템 선택 시 체크 상태 변경', async ({ page }) => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    await page.addInitScript((time) => {
      localStorage.setItem('notice-popup-hide-until', String(time))
    }, tomorrow.getTime())
    await page.reload()

    const ctrsRadio = page.getByLabel(/사이버침해대응시스템/)
    const vmsRadio = page.getByLabel(/보안취약점 진단시스템/)

    await ctrsRadio.check()
    await expect(ctrsRadio).toBeChecked()

    await vmsRadio.check()
    await expect(vmsRadio).toBeChecked()
    await expect(ctrsRadio).not.toBeChecked()
  })

  test('로그인 폼 요소 표시', async ({ page }) => {
    await expect(page.getByPlaceholder(/아이디|ID/i)).toBeVisible()
    await expect(page.getByPlaceholder(/비밀번호|Password/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /로그인|LOGIN/i })).toBeVisible()
  })

  test('빈 폼 제출 시 에러 표시', async ({ page }) => {
    await page.getByRole('button', { name: /로그인|LOGIN/i }).click()
    await expect(page.locator('.bg-red-500\\/20')).toBeVisible({ timeout: 5000 })
  })

  test('아이디/비밀번호 입력 가능', async ({ page }) => {
    const idInput = page.getByPlaceholder(/아이디|ID/i)
    const pwInput = page.getByPlaceholder(/비밀번호|Password/i)

    await idInput.fill('testuser')
    await pwInput.fill('testpass')

    await expect(idInput).toHaveValue('testuser')
    await expect(pwInput).toHaveValue('testpass')
  })

  test('공지사항 팝업 닫기', async ({ page }) => {
    const noticePopup = page.locator('[role="dialog"]').filter({ hasText: '공지사항' })
    
    if (await noticePopup.isVisible()) {
      const closeButton = noticePopup.getByRole('button', { name: /닫기|확인|Close/i })
      await closeButton.click()
      await expect(noticePopup).not.toBeVisible()
    }
  })

  test('개인정보처리방침 링크 표시', async ({ page }) => {
    await expect(page.getByText(/개인정보처리방침|개인정보 처리방침/i)).toBeVisible()
  })

  test('저작권 정보 표시', async ({ page }) => {
    await expect(page.getByText(/한국지역정보개발원/)).toBeVisible()
    await expect(page.getByText(/All rights reserved/i)).toBeVisible()
  })
})

test.describe('로그인 플로우', () => {
  test('1차 인증 API 모킹 테스트', async ({ page }) => {
    await page.route('**/authenticate/primary.do', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          resultCode: '00',
          otpSecretKey: 'TESTSECRETKEY123',
        }),
      })
    })

    await page.goto('/login')
    await page.getByPlaceholder(/아이디|ID/i).fill('testuser')
    await page.getByPlaceholder(/비밀번호|Password/i).fill('testpass')
    await page.getByRole('button', { name: /로그인|LOGIN/i }).click()

    await page.waitForTimeout(2000)
  })

  test('에러 응답 모킹 테스트', async ({ page }) => {
    await page.route('**/authenticate/primary.do', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          resultCode: 'ERR_PASSWORD',
          message: '비밀번호가 일치하지 않습니다.',
        }),
      })
    })

    await page.goto('/login')
    await page.getByPlaceholder(/아이디|ID/i).fill('testuser')
    await page.getByPlaceholder(/비밀번호|Password/i).fill('wrongpass')
    await page.getByRole('button', { name: /로그인|LOGIN/i }).click()

    await page.waitForTimeout(2000)
  })
})
