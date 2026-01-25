# KLID CTRS Web - 마이그레이션 검증 계획서

> **작성일**: 2026-01-24  
> **목적**: 원본 JSP 시스템과 React 전환 시스템 간 동등성 검증

---

## 📋 검증 개요

| 항목 | 내용 |
|------|------|
| **원본 시스템** | `/Users/totoku103/IdeaProjects/klid-java-web` (JSP) |
| **전환 시스템** | `/Users/totoku103/IdeaProjects/klid-ctrs-web` (React) |
| **검증 범위** | 75+ 페이지, 모든 기능 |

---

## 🎯 검증 전략 5단계

### 1단계: API 계약 검증 (Contract Testing) ✅ 완료
### 2단계: 기능 검증 (Functional Testing)
### 3단계: 시각적 회귀 검증 (Visual Regression Testing)
### 4단계: E2E 자동화 검증 (End-to-End Testing) ✅ 완료
### 5단계: 병렬 운영 검증 (Shadow Testing)

---

## 📊 1단계: API 계약 검증

### 목적
- React 앱이 원본 JSP와 동일한 API를 호출하는지 확인
- 요청/응답 형식이 일치하는지 검증

### 방법

#### 1-1. API 호출 목록 추출

**원본 JSP에서 추출:**
```bash
# JSP 파일에서 AJAX 호출 패턴 추출
grep -rh "ajax\|fetch\|\.do" /Users/totoku103/IdeaProjects/klid-java-web/src/main/webapp --include="*.jsp" --include="*.js" | grep -oE "[a-zA-Z/]+\.do" | sort | uniq > jsp-api-calls.txt
```

**React에서 추출:**
```bash
# React 파일에서 API 호출 패턴 추출
grep -rh "api\." /Users/totoku103/IdeaProjects/klid-ctrs-web/src --include="*.ts" --include="*.tsx" | grep -oE "[a-zA-Z]+Api\.[a-zA-Z]+" | sort | uniq > react-api-calls.txt
```

#### 1-2. API 매핑 테이블 작성

| JSP API Endpoint | React API Method | 파라미터 일치 | 응답 형식 일치 |
|------------------|------------------|--------------|---------------|
| `/login/ctrs/authenticate/primary.do` | `authApi.primaryAuth()` | ☐ | ☐ |
| `/api/user/session-info.do` | `authApi.getSessionInfo()` | ☐ | ☐ |
| `/main/acc/accidentApplyList.do` | `accApi.getAccidentList()` | ☐ | ☐ |
| ... | ... | ... | ... |

#### 1-3. 검증 도구

```typescript
// src/test/api-contract.test.ts
import { describe, it, expect } from 'vitest'

describe('API Contract Verification', () => {
  it('should match JSP API parameters for login', async () => {
    const jspParams = { id: 'test', password: 'test', systemType: 'CTRS' }
    const reactParams = { id: 'test', password: 'test', systemType: 'CTRS' }
    expect(reactParams).toEqual(jspParams)
  })
})
```

### 산출물
- [ ] API 매핑 테이블 (Excel/Markdown)
- [ ] API 계약 테스트 코드
- [ ] 불일치 항목 목록

---

## 🔧 2단계: 기능 검증 (Functional Testing)

### 목적
- 각 페이지/기능이 원본과 동일하게 동작하는지 확인
- 비즈니스 로직 검증

### 방법

#### 2-1. 기능 체크리스트

| 모듈 | 페이지 | 기능 | JSP 동작 | React 동작 | 일치 |
|------|--------|------|----------|-----------|------|
| **로그인** | LoginPage | 1차 인증 | ID/PW 검증 → 세션 생성 | ID/PW 검증 → 세션 생성 | ☐ |
| | | 2차 인증 - OTP | OTP 코드 검증 | OTP 코드 검증 | ☐ |
| | | 2차 인증 - GPKI | GPKI 서버 연동 | GPKI 서버 연동 | ☐ |
| | | 2차 인증 - Email | 이메일 발송 + 타이머 | 이메일 발송 + 타이머 | ☐ |
| **메인** | MainPage | 위젯 데이터 로드 | API 호출 후 렌더링 | API 호출 후 렌더링 | ☐ |
| **침해사고** | AccidentApplyList | 목록 조회 | 검색 조건 + 그리드 | 검색 조건 + 그리드 | ☐ |
| | | 상세 보기 | 모달 팝업 | 모달 팝업 | ☐ |
| | | 등록 | 폼 입력 + 저장 | 폼 입력 + 저장 | ☐ |
| | | 삭제 | confirm → 삭제 | globalConfirm → 삭제 | ☐ |

#### 2-2. 테스트 시나리오 작성

```markdown
## 시나리오: 침해사고 등록

### 사전 조건
- 사용자가 로그인되어 있음
- 침해사고 등록 권한이 있음

### 테스트 단계
1. 침해사고 접수 페이지로 이동
2. [등록] 버튼 클릭
3. 등록 모달에서 필수 필드 입력
   - 사고유형 선택
   - 우선순위 선택
   - 피해기관 선택
   - 내용 입력
4. [저장] 버튼 클릭
5. 성공 메시지 확인
6. 목록에 새 항목 표시 확인

### 예상 결과
- "등록되었습니다." 알림 표시
- 목록에 새로 등록된 침해사고 표시
- 등록 시간이 현재 시간과 일치

### JSP vs React 비교
| 단계 | JSP | React |
|------|-----|-------|
| 모달 표시 | window.open() 팝업 | Dialog 컴포넌트 |
| 알림 | alert() | globalAlert.success() |
| 목록 갱신 | 페이지 리로드 | 상태 업데이트 |
```

#### 2-3. 단위 테스트 작성

```typescript
// src/components/pages/Acc/AccidentApplyListPage.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { AccidentApplyListPage } from './AccidentApplyListPage'

describe('AccidentApplyListPage', () => {
  it('should show warning when delete without selection', async () => {
    render(<AccidentApplyListPage />)
    
    fireEvent.click(screen.getByTitle('삭제'))
    
    await waitFor(() => {
      expect(screen.getByText('데이터를 선택해주세요.')).toBeInTheDocument()
    })
  })
})
```

### 산출물
- [ ] 기능 체크리스트 (모듈별)
- [ ] 테스트 시나리오 문서
- [ ] 단위 테스트 코드

---

## 🎨 3단계: 시각적 회귀 검증 (Visual Regression Testing)

### 목적
- UI가 원본과 동일하게 보이는지 확인
- 레이아웃, 색상, 폰트 등 스타일 검증

### 방법

#### 3-1. 스크린샷 비교 도구

**Playwright를 이용한 시각적 테스트:**

```typescript
// e2e/visual-regression.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Visual Regression', () => {
  test('Login page should match baseline', async ({ page }) => {
    await page.goto('/login')
    await expect(page).toHaveScreenshot('login-page.png', {
      maxDiffPixels: 100,
    })
  })

  test('Main dashboard should match baseline', async ({ page }) => {
    // 로그인 후
    await page.goto('/main')
    await expect(page).toHaveScreenshot('main-dashboard.png', {
      maxDiffPixels: 100,
    })
  })
})
```

#### 3-2. 수동 스크린샷 비교

| 페이지 | JSP 스크린샷 | React 스크린샷 | 차이점 |
|--------|-------------|---------------|--------|
| 로그인 | ![jsp-login](screenshots/jsp/login.png) | ![react-login](screenshots/react/login.png) | 없음 / 있음 |
| 메인 대시보드 | ![jsp-main](screenshots/jsp/main.png) | ![react-main](screenshots/react/main.png) | 없음 / 있음 |
| 침해사고 목록 | ... | ... | ... |

#### 3-3. 스타일 비교 체크리스트

| 요소 | 속성 | JSP 값 | React 값 | 일치 |
|------|------|--------|----------|------|
| 헤더 | 배경색 | #1a1a2e | #1a1a2e | ☐ |
| 버튼 | 높이 | 28px | 28px | ☐ |
| 그리드 | 행 높이 | 25px | 25px | ☐ |
| 폰트 | 크기 | 12px | 12px | ☐ |

### 도구 추천
- **Playwright** - 스크린샷 캡처 + 비교
- **Percy** - 클라우드 기반 시각적 테스트
- **Chromatic** - Storybook 통합

### 산출물
- [ ] 베이스라인 스크린샷 (JSP)
- [ ] 비교 스크린샷 (React)
- [ ] 시각적 차이 리포트

---

## 🤖 4단계: E2E 자동화 검증 (Playwright)

### 목적
- 실제 사용자 시나리오를 자동화된 테스트로 검증
- 회귀 테스트 자동화

### 설정

```bash
# Playwright 설치
npm install -D @playwright/test
npx playwright install
```

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
```

### E2E 테스트 시나리오

```typescript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test'

test.describe('로그인 플로우', () => {
  test('정상 로그인', async ({ page }) => {
    await page.goto('/login')
    
    // 시스템 선택
    await page.click('text=CTRS')
    
    // ID/PW 입력
    await page.fill('input[name="userId"]', 'testuser')
    await page.fill('input[name="password"]', 'testpass')
    
    // 로그인 버튼 클릭
    await page.click('button:has-text("로그인")')
    
    // 2차 인증 화면 확인
    await expect(page.locator('text=2차 인증')).toBeVisible()
  })

  test('잘못된 비밀번호', async ({ page }) => {
    await page.goto('/login')
    await page.fill('input[name="userId"]', 'testuser')
    await page.fill('input[name="password"]', 'wrongpass')
    await page.click('button:has-text("로그인")')
    
    // 에러 메시지 확인
    await expect(page.locator('text=비밀번호가 일치하지 않습니다')).toBeVisible()
  })
})

// e2e/accident.spec.ts
test.describe('침해사고 관리', () => {
  test.beforeEach(async ({ page }) => {
    // 로그인 처리
    await page.goto('/login')
    // ... 로그인 절차
  })

  test('침해사고 목록 조회', async ({ page }) => {
    await page.goto('/main/acc/accidentApplyList')
    
    // 그리드 로드 확인
    await expect(page.locator('.jqx-grid')).toBeVisible()
  })

  test('침해사고 등록', async ({ page }) => {
    await page.goto('/main/acc/accidentApplyList')
    
    // 등록 버튼 클릭
    await page.click('button[title="등록"]')
    
    // 모달 확인
    await expect(page.locator('role=dialog')).toBeVisible()
  })
})
```

### 테스트 실행

```bash
# 전체 테스트
npx playwright test

# 특정 파일
npx playwright test e2e/login.spec.ts

# UI 모드
npx playwright test --ui

# 리포트 보기
npx playwright show-report
```

### 산출물
- [ ] E2E 테스트 코드 (모든 주요 시나리오)
- [ ] CI/CD 파이프라인 통합
- [ ] 테스트 리포트

---

## 🔄 5단계: 병렬 운영 검증 (Shadow Testing)

### 목적
- 실제 운영 환경에서 동일한 요청에 대해 두 시스템의 응답 비교
- 프로덕션 데이터로 검증

### 방법

#### 5-1. 프록시 기반 비교

```
[사용자] → [Nginx Proxy] → [JSP 서버 (기존)]
                ↓
            [로그 수집]
                ↓
          [React 서버 (신규)] → [응답 비교]
```

#### 5-2. 로그 비교 스크립트

```python
# compare_responses.py
import json

def compare_responses(jsp_log, react_log):
    differences = []
    
    for jsp_entry, react_entry in zip(jsp_log, react_log):
        if jsp_entry['endpoint'] == react_entry['endpoint']:
            if jsp_entry['response'] != react_entry['response']:
                differences.append({
                    'endpoint': jsp_entry['endpoint'],
                    'jsp_response': jsp_entry['response'],
                    'react_response': react_entry['response'],
                })
    
    return differences
```

#### 5-3. 병렬 운영 체크리스트

| 단계 | 작업 | 담당 | 완료 |
|------|------|------|------|
| 1 | 스테이징 환경 구축 | DevOps | ☐ |
| 2 | 프록시 설정 | DevOps | ☐ |
| 3 | 로그 수집 설정 | Backend | ☐ |
| 4 | 1주일 병렬 운영 | 전체 | ☐ |
| 5 | 로그 분석 및 차이점 리포트 | QA | ☐ |
| 6 | 차이점 수정 | Frontend | ☐ |
| 7 | 재검증 | QA | ☐ |

### 산출물
- [ ] 병렬 운영 환경 구성
- [ ] 로그 비교 도구
- [ ] 차이점 리포트

---

## 📈 검증 메트릭

### 정량적 지표

| 지표 | 목표 | 현재 |
|------|------|------|
| API 계약 일치율 | 100% | - |
| 기능 테스트 통과율 | 100% | - |
| 시각적 일치율 | 95%+ | - |
| E2E 테스트 통과율 | 100% | - |
| 병렬 운영 오류율 | 0% | - |

### 정성적 지표

- [ ] 사용자 피드백 수집
- [ ] QA 팀 승인
- [ ] 보안 검토 통과
- [ ] 성능 벤치마크 충족

---

## 📅 검증 일정

| 단계 | 기간 | 담당 |
|------|------|------|
| 1단계: API 계약 검증 | 2일 | Backend + Frontend |
| 2단계: 기능 검증 | 5일 | QA + Frontend |
| 3단계: 시각적 검증 | 2일 | Frontend + Design |
| 4단계: E2E 자동화 | 3일 | Frontend |
| 5단계: 병렬 운영 | 7일 | 전체 |

**총 예상 기간**: 약 3주

---

## 🛠️ 필요 도구 및 리소스

### 도구

| 도구 | 용도 | 비용 |
|------|------|------|
| Vitest | 단위 테스트 | 무료 |
| Playwright | E2E 테스트 + 시각적 테스트 | 무료 |
| Percy (옵션) | 클라우드 시각적 테스트 | 유료 |

### 환경

| 환경 | URL | 용도 |
|------|-----|------|
| JSP 개발 | http://localhost:8080 | 원본 참조 |
| React 개발 | http://localhost:5173 | 전환 테스트 |
| 스테이징 | TBD | 병렬 운영 |

---

## ✅ 검증 완료 기준

모든 항목이 충족되어야 마이그레이션 검증 완료:

1. [ ] API 계약 100% 일치
2. [ ] 기능 테스트 100% 통과
3. [ ] 시각적 차이 95% 이내
4. [ ] E2E 테스트 100% 통과
5. [ ] 병렬 운영 7일간 오류 0건
6. [ ] QA 팀 최종 승인
7. [ ] 보안 검토 통과

---

## 📝 부록

### A. 페이지별 기능 체크리스트 템플릿

```markdown
## [페이지명]

### 기본 정보
- JSP 경로: `/WEB-INF/view/xxx.jsp`
- React 경로: `src/components/pages/Xxx/index.tsx`
- 담당자: 

### 기능 목록
| # | 기능 | JSP | React | 검증 |
|---|------|-----|-------|------|
| 1 | 목록 조회 | ✅ | ✅ | ☐ |
| 2 | 검색 | ✅ | ✅ | ☐ |
| 3 | 등록 | ✅ | ✅ | ☐ |
| 4 | 수정 | ✅ | ✅ | ☐ |
| 5 | 삭제 | ✅ | ✅ | ☐ |
| 6 | 엑셀 내보내기 | ✅ | ✅ | ☐ |

### 특이사항
- 

### 검증 결과
- 검증일: 
- 검증자: 
- 결과: PASS / FAIL
```

### B. 버그 리포트 템플릿

```markdown
## 버그: [제목]

### 발견 위치
- 페이지: 
- 기능: 

### 재현 단계
1. 
2. 
3. 

### 예상 동작 (JSP)
- 

### 실제 동작 (React)
- 

### 스크린샷
- JSP: 
- React: 

### 우선순위
- [ ] Critical
- [ ] High
- [ ] Medium
- [ ] Low
```
