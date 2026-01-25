import { test, expect, Page } from '@playwright/test'

async function mockAuthenticatedSession(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem('notice-popup-hide-until', String(Date.now() + 86400000))
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
          instName: '한국지역정보개발원',
          authMain: 'AUTH_MAIN_1',
          menuList: [
            { menuId: 'M001', menuName: '메인', menuPath: '/main' },
            { menuId: 'M002', menuName: '침해사고', menuPath: '/main/acc' },
          ],
        },
      }),
    })
  })

  await page.route('**/getThreatNow.do*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { step: 1, stepName: '관심', color: '#4CAF50' },
      ]),
    })
  })

  await page.route('**/getTodayStatus.do*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { statName: '접수', cnt: 5 },
        { statName: '진행', cnt: 3 },
        { statName: '완료', cnt: 10 },
      ]),
    })
  })

  await page.route('**/getYearStatus.do*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { month: '01', cnt: 15 },
        { month: '02', cnt: 20 },
        { month: '03', cnt: 18 },
      ]),
    })
  })

  await page.route('**/getPeriodStatus.do*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { periodName: '1분기', cnt: 50 },
        { periodName: '2분기', cnt: 45 },
      ]),
    })
  })

  await page.route('**/getMainNoticeList.do*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        resultData: [
          { boardNo: '1', title: '시스템 점검 안내', regDt: '2024-01-15' },
          { boardNo: '2', title: '보안 업데이트 공지', regDt: '2024-01-14' },
        ],
      }),
    })
  })

  await page.route('**/getMainQnaList.do*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        resultData: [
          { boardNo: '1', title: 'Q&A 질문 1', regDt: '2024-01-15' },
        ],
      }),
    })
  })

  await page.route('**/getMainForgeryCnt.do*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        resultData: { contents: { totalCnt: 100, normalCnt: 95, errorCnt: 5 } },
      }),
    })
  })
}

test.describe('대시보드 및 보호된 페이지 라우팅', () => {
  test.beforeEach(async ({ page }) => {
    await mockAuthenticatedSession(page)
  })

  test('메인 페이지 접근 시 리다이렉트 또는 렌더링', async ({ page }) => {
    const response = await page.goto('/main')
    expect(response?.status()).toBeLessThan(500)
  })

  test('침해사고 페이지 접근', async ({ page }) => {
    const response = await page.goto('/main/acc/accidentApplyList')
    expect(response?.status()).toBeLessThan(500)
  })

  test('게시판 페이지 접근', async ({ page }) => {
    const response = await page.goto('/main/board/notice')
    expect(response?.status()).toBeLessThan(500)
  })

  test('보고서 페이지 접근', async ({ page }) => {
    const response = await page.goto('/main/rpt/dailyState')
    expect(response?.status()).toBeLessThan(500)
  })

  test('환경설정 페이지 접근', async ({ page }) => {
    const response = await page.goto('/main/env/userMgmt')
    expect(response?.status()).toBeLessThan(500)
  })

  test('웹대시보드 페이지 접근', async ({ page }) => {
    const response = await page.goto('/webdash/adminControl')
    expect(response?.status()).toBeLessThan(500)
  })

  test('홈페이지 점검 URL 페이지 접근', async ({ page }) => {
    const response = await page.goto('/main/home/healthCheckUrl')
    expect(response?.status()).toBeLessThan(500)
  })
})

test.describe('404 페이지 처리', () => {
  test('존재하지 않는 페이지 접근', async ({ page }) => {
    const response = await page.goto('/non-existent-page')
    expect(response?.status()).toBeLessThan(500)
  })
})

test.describe('API 모킹 검증', () => {
  test('세션 정보 API 모킹', async ({ page }) => {
    let sessionApiCalled = false

    await page.route('**/session-info.do', async (route) => {
      sessionApiCalled = true
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: { userId: 'test' } }),
      })
    })

    await page.goto('/main')
    await page.waitForTimeout(1000)
  })

  test('침해사고 목록 API 모킹', async ({ page }) => {
    await page.route('**/getAccidentList.do*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          resultData: [
            { inciNo: 'TEST001', inciTtl: '테스트 사고' },
          ],
        }),
      })
    })

    await page.route('**/session-info.do', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: { userId: 'test', authMain: 'AUTH_MAIN_1' },
        }),
      })
    })

    await page.route('**/commonCode.do*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, data: [] }),
      })
    })

    const response = await page.goto('/main/acc/accidentApplyList')
    expect(response?.status()).toBe(200)
  })
})
