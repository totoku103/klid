# KLID CTRS Web - React 전환 프로젝트 계획서

> **작성일**: 2026-01-24  
> **버전**: 1.0  
> **상태**: 확정

---

## 📌 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **원본 프로젝트** | `/Users/totoku103/IdeaProjects/klid-java-web` |
| **대상 프로젝트** | `/Users/totoku103/IdeaProjects/klid-ctrs-web` |
| **전환 범위** | 전체 185개 JSP 페이지 → React 순차 전환 |
| **전환 방식** | 전체 페이지 순차 전환 |

---

## 🔧 기술 스택 (안정 버전 - 확정)

| 영역 | 패키지 | 버전 | 상태 |
|------|--------|------|------|
| **프레임워크** | `react` | 19.2.x | ✅ Stable |
| | `react-dom` | 19.2.x | ✅ Stable |
| **빌드 도구** | `vite` | 7.3.x | ✅ Stable |
| **언어** | `typescript` | 5.7.x | ✅ Stable |
| **라우팅** | `react-router` | 7.12.x | ✅ Stable |
| **상태 관리** | `zustand` | 5.0.x | ✅ Stable |
| **서버 통신** | `axios` | 1.13.x | ✅ Stable |
| **스타일링** | `tailwindcss` | 4.1.x | ✅ Stable |
| | `@tailwindcss/vite` | 4.1.x | ✅ Stable |
| **UI 컴포넌트** | `shadcn/ui` | latest | ✅ Stable |
| **그리드** | `jqwidgets-react-ts` | 19.2.x | ✅ Stable |
| **차트** | `highcharts` | 12.5.x | ✅ Stable |
| | `highcharts-react-official` | 3.2.x | ✅ Stable |

---

## 🏗️ 프로젝트 구조 (Atomic Design)

```
klid-ctrs-web/
├── public/
│   ├── files/                    # 매뉴얼, 다운로드 파일
│   └── img/                      # 정적 이미지
├── src/
│   ├── components/
│   │   ├── atoms/                # 최소 단위 컴포넌트
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Icon/
│   │   │   ├── Label/
│   │   │   ├── Radio/
│   │   │   ├── Checkbox/
│   │   │   └── Typography/
│   │   ├── molecules/            # Atoms 조합
│   │   │   ├── FormField/
│   │   │   ├── RadioGroup/
│   │   │   ├── SearchInput/
│   │   │   ├── InputWithIcon/
│   │   │   └── Timer/
│   │   ├── organisms/            # 복잡한 UI 섹션
│   │   │   ├── Header/
│   │   │   ├── Navigation/
│   │   │   ├── LoginForm/
│   │   │   ├── OtpAuthSection/
│   │   │   ├── GpkiAuthSection/
│   │   │   ├── EmailAuthSection/
│   │   │   ├── DataGrid/         # JqxGrid 래퍼
│   │   │   ├── Chart/            # Highcharts 래퍼
│   │   │   └── Modal/
│   │   ├── templates/            # 페이지 레이아웃
│   │   │   ├── AuthLayout/       # 로그인 전용 레이아웃
│   │   │   ├── MainLayout/       # 메인 레이아웃
│   │   │   └── PopupLayout/      # 팝업 레이아웃
│   │   └── pages/                # 실제 페이지
│   │       ├── Login/
│   │       ├── Main/
│   │       ├── Board/
│   │       ├── System/
│   │       ├── Environment/
│   │       ├── Report/
│   │       ├── Log/
│   │       ├── History/
│   │       ├── Accident/
│   │       ├── WebDash/
│   │       └── Engineer/
│   ├── hooks/                    # 커스텀 훅
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   ├── useGrid.ts
│   │   └── useModal.ts
│   ├── stores/                   # Zustand 스토어
│   │   ├── authStore.ts
│   │   ├── userStore.ts
│   │   ├── menuStore.ts
│   │   └── notificationStore.ts
│   ├── services/                 # API 서비스
│   │   ├── api/
│   │   │   ├── axios.ts          # Axios 인스턴스
│   │   │   ├── authApi.ts
│   │   │   ├── userApi.ts
│   │   │   ├── boardApi.ts
│   │   │   └── ...
│   │   └── types/                # API 타입 정의
│   ├── utils/                    # 유틸리티
│   │   ├── constants.ts
│   │   ├── validators.ts
│   │   └── formatters.ts
│   ├── styles/                   # 글로벌 스타일
│   │   └── globals.css
│   ├── types/                    # 전역 타입
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env
├── .env.development
├── .env.production
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 🔐 인증 전략

### 방식: HttpOnly Cookie + Session

```
[React SPA] ──────────────────────────────────────> [Spring Backend]
     │                                                      │
     │  1. POST /login/ctrs/authenticate/primary.do         │
     │     { id, password, systemType }                     │
     │  ──────────────────────────────────────────────────> │
     │                                                      │
     │  2. 서버: 세션 생성, Set-Cookie: JSESSIONID (HttpOnly)│
     │  <────────────────────────────────────────────────── │
     │                                                      │
     │  3. 이후 모든 요청에 Cookie 자동 첨부 (credentials)   │
     │  ──────────────────────────────────────────────────> │
     │                                                      │
     │  4. GET /api/user/session-info.do                    │
     │     → 사용자 정보 반환 (세션에서 추출)                 │
     │  <────────────────────────────────────────────────── │
```

### Axios 설정

```typescript
// src/services/api/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,  // 🔑 HttpOnly Cookie 전송 필수
  headers: {
    'Content-Type': 'application/json',
  },
});

// 401 응답 시 로그인 페이지로 리다이렉트
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 📝 서버(백엔드) 수정 필요 사항

| # | 항목 | 설명 | 우선순위 |
|---|------|------|----------|
| 1 | **CORS 설정** | React 개발 서버(localhost:5173)에서 API 호출 허용 | 🔴 필수 |
| 2 | **Credentials 허용** | `Access-Control-Allow-Credentials: true` 헤더 추가 | 🔴 필수 |
| 3 | **세션 정보 API** | `/api/user/session-info.do` - 현재 세션의 사용자 정보 반환 | 🔴 필수 |
| 4 | **CSRF 토큰 API** | `/api/csrf-token.do` - CSRF 토큰 발급 (보안 강화) | 🟡 권장 |
| 5 | **세션 유효성 검증 API** | `/api/auth/validate.do` - 세션 유효 여부 확인 | 🟡 권장 |
| 6 | **로그아웃 API 개선** | `/api/auth/logout.do` - 세션 무효화 + 쿠키 제거 | 🔴 필수 |
| 7 | **SameSite 쿠키 설정** | `SameSite=Lax` 또는 `SameSite=None; Secure` | 🔴 필수 |
| 8 | **메뉴 정보 API** | `/api/menu/list.do` - 동적 메뉴 데이터 | 🔴 필수 |
| 9 | **AppGlobal 설정 API** | `/api/config/global.do` - 앱 전역 설정값 반환 | 🟡 권장 |
| 10 | **GPKI 서버 분리** | GPKI 인증 별도 서버 연동 인터페이스 | 🟢 예정 |

### CORS 설정 예시 (Spring)

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:5173")  // React 개발 서버
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowCredentials(true)  // 🔑 필수
            .allowedHeaders("*");
    }
}
```

---

## 📅 마이그레이션 로드맵

### Phase 1: 기반 구축 (1-2주)

| 태스크 | 설명 |
|--------|------|
| 1.1 | Vite + React 19 + TypeScript 프로젝트 초기화 |
| 1.2 | Tailwind CSS v4 + shadcn/ui 설정 |
| 1.3 | jqwidgets-react-ts 설치 및 라이선스 설정 |
| 1.4 | Highcharts React 설치 |
| 1.5 | Axios 인스턴스 + 인터셉터 구성 |
| 1.6 | Zustand 스토어 기본 구조 |
| 1.7 | React Router v7 라우팅 설정 |
| 1.8 | Atomic Design 폴더 구조 생성 |

### Phase 2: 공통 컴포넌트 (1-2주)

| 태스크 | 설명 |
|--------|------|
| 2.1 | Atoms: Button, Input, Label, Icon, Radio, Checkbox |
| 2.2 | Molecules: FormField, InputWithIcon, RadioGroup, Timer |
| 2.3 | DataGrid 래퍼 컴포넌트 (JqxGrid 공통화) |
| 2.4 | Chart 래퍼 컴포넌트 (Highcharts 공통화) |
| 2.5 | Modal/Popup 컴포넌트 |
| 2.6 | 공통 레이아웃 템플릿 |

### Phase 3: 로그인/인증 (1주)

| 태스크 | 설명 | 참고 파일 |
|--------|------|-----------|
| 3.1 | 로그인 페이지 UI | integration-login-black.jsp/css |
| 3.2 | 시스템 선택 (CTRS/VMS/CTSS) | - |
| 3.3 | 1차 인증 (ID/PW) | integration-login.js |
| 3.4 | 2차 인증 - OTP | - |
| 3.5 | 2차 인증 - GPKI (별도 서버 연동) | - |
| 3.6 | 2차 인증 - Email | - |
| 3.7 | **개인정보 처리방침 팝업** | pPolicyInfo.do 연동 |
| 3.8 | 공지사항 팝업 | notice-popup-black.js |
| 3.9 | 매뉴얼 다운로드 | - |
| 3.10 | 회원가입 연동 (VMS/CTSS) | - |

### Phase 4: 메인 대시보드 (1주)

| 태스크 | 설명 |
|--------|------|
| 4.1 | 메인 레이아웃 (헤더, 네비게이션) |
| 4.2 | 예/경보 발령단계 위젯 |
| 4.3 | 침해사고/미처리현황 위젯 |
| 4.4 | 피해기관 Top 5 |
| 4.5 | 피해유형 Top 5 |
| 4.6 | 공지사항/문의의견 리스트 |
| 4.7 | 홈페이지 모니터링 위젯 |

### Phase 5-13: 기능 모듈 순차 전환 (8-12주)

| Phase | 모듈 | 페이지 수 | 예상 기간 |
|-------|------|----------|-----------|
| 5 | 시스템관리 (sys) | 5 | 1주 |
| 6 | 게시판 (board) | 20 | 2주 |
| 7 | 환경설정 (env) | 15 | 1.5주 |
| 8 | 침해사고 (acc) | 10 | 1.5주 |
| 9 | 보고서 (rpt) | 15 | 2주 |
| 10 | 로그관리 (logs) | 10 | 1주 |
| 11 | 이력관리 (hist) | 5 | 0.5주 |
| 12 | 웹대시보드 (webdash) | 10 | 2주 |
| 13 | 엔지니어 (engineer) | 15 | 1.5주 |

---

## 🎨 로그인 페이지 컴포넌트 설계

### 참고 원본 파일
- `integration-login-black.jsp`
- `integration-login-black.css`
- `integration-login.js`
- `notice-popup-black.js`

### 컴포넌트 구조

```
src/components/pages/Login/
├── components/
│   ├── SystemSelector.tsx        # CTRS/VMS/CTSS 라디오 선택
│   ├── LoginForm.tsx             # ID/PW 입력 + 로그인 버튼
│   ├── AuthMethodSelector.tsx    # OTP/GPKI/Email 선택
│   ├── OtpAuthSection.tsx        # OTP 코드 입력
│   ├── GpkiAuthSection.tsx       # GPKI 인증/등록 버튼
│   ├── EmailAuthSection.tsx      # 이메일 인증 (타이머 포함)
│   ├── ContactInfo.tsx           # 연락처 정보
│   ├── PrivacyPolicyLink.tsx     # 개인정보 처리방침 링크 ⚠️ 필수
│   └── NoticePopup.tsx           # 공지사항 팝업
├── hooks/
│   └── useLogin.ts               # 로그인 로직 훅
├── styles/
│   └── login.css                 # 로그인 전용 스타일
└── index.tsx                     # 페이지 진입점
```

### 주요 기능 체크리스트

- [x] 시스템 선택 (CTRS/VMS/CTSS)
- [x] ID/Password 입력 및 로그인
- [x] 2차 인증 - OTP
- [x] 2차 인증 - GPKI (별도 서버)
- [x] 2차 인증 - Email (타이머 포함)
- [x] **개인정보 처리방침 팝업** ✅ React Modal로 전환 완료
- [x] 공지사항 팝업 (오늘 하루 안 보기)
- [x] 매뉴얼 다운로드
- [x] 회원가입 (VMS/CTSS)
- [x] Help Desk 정보 표시
- [x] 비밀번호 변경 모달 (만료 시)

---

## ⚠️ 주의사항 및 핵심 포인트

1. **개인정보 처리방침**: 시스템별(CTRS/VMS/CTSS) 다른 팝업 URL 호출 - **절대 누락 금지**
2. **GPKI 분리**: 별도 서버 연동 필요 - 인터페이스 정의 필수
3. **세션 동기화**: React 앱 로드 시 세션 유효성 검증 필수
4. **2차 인증 플로우**: 1차 인증 후 input 비활성화 로직 그대로 유지
5. **공지사항 팝업**: localStorage 기반 "오늘 하루 안 보기" 기능 유지
6. **JqxGrid 라이선스**: 상용 라이선스 필요 - 라이선스 키 설정 필수
7. **기존 디자인 유지**: CSS 변수 및 색상 체계 그대로 마이그레이션

---

## 📦 package.json

```json
{
  "name": "klid-ctrs-web",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint ."
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router": "^7.12.0",
    "zustand": "^5.0.10",
    "axios": "^1.13.2",
    "highcharts": "^12.5.0",
    "highcharts-react-official": "^3.2.1",
    "jqwidgets-react-ts": "^19.2.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.4.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.7.0",
    "vite": "^7.3.1",
    "eslint": "^9.0.0",
    "typescript-eslint": "^8.0.0"
  }
}
```

---

## 🔗 참고 자료

### 원본 프로젝트 주요 파일

| 파일 | 경로 | 설명 |
|------|------|------|
| 로그인 JSP | `/WEB-INF/view/integration-login-black.jsp` | 로그인 페이지 |
| 로그인 CSS | `/css/integration-login-black.css` | 로그인 스타일 |
| 로그인 JS | `/js/integration-login.js` | 로그인 로직 |
| 공지 팝업 | `/js/notice-popup-black.js` | 공지사항 팝업 |
| 공통 include | `/inc/inc.jsp` | 라이브러리 로드 |
| 메인 페이지 | `/WEB-INF/view/main/main.jsp` | 메인 대시보드 |
| 헤더 | `/inc/header.jsp` | 헤더 컴포넌트 |
| 네비게이션 | `/inc/nav.jsp` | 네비게이션 |
| 그리드 유틸 | `/js/hm/hm.jqx.grid.js` | JqxGrid 래퍼 |
| 차트 유틸 | `/js/hm/hm.highchart.js` | Highcharts 래퍼 |

---

## ✅ 승인

- [x] 기술 스택 확정
- [x] 프로젝트 구조 확정
- [x] 인증 전략 확정
- [x] 마이그레이션 로드맵 확정
- [x] 계획서 문서화 완료

---

---

## 📊 마이그레이션 진행 현황

> **최종 업데이트**: 2026-01-24

### Phase별 완료 현황

| Phase | 모듈 | 상태 | 페이지 수 | 비고 |
|-------|------|------|----------|------|
| 1 | 기반 구축 | ✅ 완료 | - | Vite, React 19, TypeScript, Tailwind v4 |
| 2 | 공통 컴포넌트 | ✅ 완료 | - | Atoms, Molecules, Organisms, Templates |
| 3 | 로그인/인증 | ✅ 완료 | 1 | 모든 인증 방식 구현 |
| 4 | 메인 대시보드 | ✅ 완료 | 1 | 5개 위젯 포함 |
| 5 | 시스템관리 (sys) | ✅ 완료 | 5 | BoardMgmt, CodeMgmt, CustUserMgmt, RiskMgmt, WeekMgmt |
| 6 | 게시판 (board) | ✅ 완료 | 6 | Notice, Qna, Share, Resource, MoisBoard, TakeOverBoard |
| 7 | 환경설정 (env) | ✅ 완료 | 6 | User, Inst, InstIP, NationIP, UserConf, UserMgmtHistory |
| 8 | 침해사고 (acc) | ✅ 완료 | 1+4 | AccidentApplyList + 4개 Modal |
| 9 | 보고서 (rpt) | ✅ 완료 | 16 | Daily, Weekly, Inci*, Security* 등 |
| 10 | 로그관리 (logs) | ✅ 완료 | 8 | UserConnect*, UserAction* |
| 11 | 이력관리 (hist) | ✅ 완료 | 3 | UserInout, SmsEmail, UserAct |
| 12 | 웹대시보드 (webdash) | ✅ 완료 | 8 | Admin, External, Local, Mois1-4, DashConfig |
| 13 | 엔지니어 (engineer) | ✅ 완료 | 11 | PassReset, SysConf, Collector, Auth, Menu, Version 등 |
| 14 | 홈 (home) | ✅ 완료 | 5 | HealthCheck*, ForgeryUrl* |

### 추가 완료 항목

| 항목 | 상태 | 날짜 | 설명 |
|------|------|------|------|
| JSP 팝업 → React Modal | ✅ | 2026-01-24 | PrivacyPolicyModal, PasswordChangeModal |
| 전역 Alert 시스템 | ✅ | 2026-01-24 | globalAlert.success/error/warning/info |
| 전역 Confirm 시스템 | ✅ | 2026-01-24 | globalConfirm() → Promise<boolean> |
| 전역 Prompt 시스템 | ✅ | 2026-01-24 | globalPrompt() → Promise<string\|null> |

### 생성된 전역 유틸리티

| 파일 | 용도 |
|------|------|
| `src/stores/alertStore.ts` | Alert 상태 관리 |
| `src/stores/confirmStore.ts` | Confirm 상태 관리 |
| `src/stores/promptStore.ts` | Prompt 상태 관리 |
| `src/utils/alert.ts` | globalAlert 헬퍼 |
| `src/utils/confirm.ts` | globalConfirm 헬퍼 |
| `src/utils/prompt.ts` | globalPrompt 헬퍼 |
| `src/components/organisms/GlobalAlertModal.tsx` | Alert UI |
| `src/components/organisms/GlobalConfirmModal.tsx` | Confirm UI |
| `src/components/organisms/GlobalPromptModal.tsx` | Prompt UI |

---

## 🔜 남은 작업

### 권장 다음 단계

1. **코드 스플리팅 최적화**
   - 현재 빌드에서 616KB 청크 경고 발생
   - `build.rollupOptions.output.manualChunks` 설정 필요

2. **테스트 코드 작성**
   - 단위 테스트 (Vitest)
   - E2E 테스트 (Playwright)

3. **에러 바운더리 추가**
   - React Error Boundary 컴포넌트
   - 전역 에러 핸들링

4. **성능 최적화**
   - React.memo, useMemo, useCallback 검토
   - 불필요한 리렌더링 방지

5. **접근성 개선**
   - ARIA 속성 추가
   - 키보드 네비게이션

---

**다음 단계**: 코드 스플리팅 또는 테스트 작성
