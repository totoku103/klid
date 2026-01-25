import { test, expect, Page } from '@playwright/test'

async function mockLoginSession(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem('auth', JSON.stringify({ isAuthenticated: true }))
  })

  await page.route('**/session-info.do', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        data: {
          userId: 'testuser',
          userName: '테스트사용자',
          instCd: 'INST001',
          instName: '테스트기관',
          authMain: 'AUTH_MAIN_2',
          menuList: [],
        },
      }),
    })
  })
}

test.describe('침해사고 접수 페이지', () => {
  test.beforeEach(async ({ page }) => {
    await mockLoginSession(page)

    await page.route('**/accidentApplyList.do', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: [
            {
              inciNo: 'INC2024001',
              inciDt: '20240115',
              inciAcpnDt: '2024-01-15 10:30:00',
              inciTtl: '테스트 침해사고 1',
              netDivName: '외부',
              dclInstName: '신고기관A',
              dmgInstName: '피해기관A',
              accdTypName: '해킹',
              acpnMthdName: '전화',
              inciPrcsStat: '01',
              inciPrcsStatName: '접수',
              transInciPrcsStat: '00',
              transInciPrcsStatName: '미접수',
              transSidoPrcsStat: '00',
              transSidoPrcsStatName: '미접수',
              dclCrgr: '담당자A',
              inciPrty: '01',
              inciPrtyName: '높음',
            },
          ],
        }),
      })
    })

    await page.route('**/commonCode.do*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: [
            { comCode2: '01', codeName: '접수' },
            { comCode2: '05', codeName: '진행' },
            { comCode2: '10', codeName: '완료' },
            { comCode2: '13', codeName: '종결' },
          ],
        }),
      })
    })

    await page.goto('/main/acc/accidentApplyList')
  })

  test('페이지 타이틀 및 경로 표시', async ({ page }) => {
    await expect(page.getByText('침해사고', { exact: true })).toBeVisible()
    await expect(page.getByText('침해사고접수')).toBeVisible()
  })

  test('검색 영역 표시', async ({ page }) => {
    await expect(page.locator('select').first()).toBeVisible()
    await expect(page.locator('input[type="date"]').first()).toBeVisible()
    await expect(page.getByPlaceholder('통합검색')).toBeVisible()
  })

  test('툴바 버튼 표시', async ({ page }) => {
    await expect(page.getByTitle('검색')).toBeVisible()
    await expect(page.getByTitle('등록')).toBeVisible()
    await expect(page.getByTitle('수정')).toBeVisible()
    await expect(page.getByTitle('삭제')).toBeVisible()
    await expect(page.getByTitle('엑셀')).toBeVisible()
  })

  test('목록 테이블 헤더 표시', async ({ page }) => {
    await expect(page.getByRole('columnheader', { name: 'NO' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: '접수번호' })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: /제목/ })).toBeVisible()
    await expect(page.getByRole('columnheader', { name: '사고유형' })).toBeVisible()
  })

  test('상세검색 토글', async ({ page }) => {
    const advancedCheckbox = page.getByLabel('상세검색')
    await advancedCheckbox.check()

    await expect(page.getByText('제목:')).toBeVisible()
    await expect(page.getByText('접수번호:')).toBeVisible()
    await expect(page.getByText('사고유형:')).toBeVisible()
    await expect(page.getByText('우선순위:')).toBeVisible()

    await advancedCheckbox.uncheck()
    await expect(page.getByText('제목:')).not.toBeVisible()
  })

  test('선택 없이 수정 클릭 시 경고', async ({ page }) => {
    await page.getByTitle('수정').click()
    
    const alertModal = page.locator('[role="alertdialog"], [role="dialog"]')
    await expect(alertModal.getByText(/선택|데이터/)).toBeVisible({ timeout: 5000 })
  })

  test('선택 없이 삭제 클릭 시 경고', async ({ page }) => {
    await page.getByTitle('삭제').click()
    
    const alertModal = page.locator('[role="alertdialog"], [role="dialog"]')
    await expect(alertModal.getByText(/선택|데이터/)).toBeVisible({ timeout: 5000 })
  })

  test('등록 버튼 클릭 시 모달 표시', async ({ page }) => {
    await page.getByTitle('등록').click()
    
    const modal = page.locator('[role="dialog"]')
    await expect(modal).toBeVisible({ timeout: 5000 })
  })

  test('날짜 범위 변경', async ({ page }) => {
    const date1Input = page.locator('input[type="date"]').first()
    const date2Input = page.locator('input[type="date"]').nth(1)

    await date1Input.fill('2024-01-01')
    await date2Input.fill('2024-01-31')

    await expect(date1Input).toHaveValue('2024-01-01')
    await expect(date2Input).toHaveValue('2024-01-31')
  })
})
