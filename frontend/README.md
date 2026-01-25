# KLID CTRS Web

JSP 기반 레거시 시스템을 React로 마이그레이션하는 프로젝트입니다.

## 기술 스택

| 영역 | 기술 | 버전 |
|------|------|------|
| 프레임워크 | React | 19.x |
| 빌드 도구 | Vite | 6.x |
| 언어 | TypeScript | 5.8.x |
| 라우팅 | React Router | 7.x |
| 상태 관리 | Zustand | 5.x |
| HTTP 클라이언트 | Axios | 1.x |
| 스타일링 | Tailwind CSS | 4.x |
| UI 컴포넌트 | shadcn/ui | - |
| 그리드 | jQWidgets | 19.x |
| 차트 | Highcharts | 12.x |

## 환경 설정

### 필수 환경변수

| 변수명 | 설명 | 기본값 |
|--------|------|--------|
| `VITE_API_URL` | 백엔드 API 서버 URL | - |
| `VITE_APP_TITLE` | 앱 타이틀 | KLID CTRS |

### 환경별 설정 파일

- `.env` - 기본 설정
- `.env.development` - 개발 환경 (localhost:8080 프록시)
- `.env.production` - 운영 환경

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

## 프로젝트 구조

```
src/
├── components/
│   ├── atoms/          # 최소 단위 컴포넌트
│   ├── molecules/      # Atoms 조합
│   ├── organisms/      # 복잡한 UI 섹션
│   ├── templates/      # 페이지 레이아웃
│   ├── pages/          # 실제 페이지
│   └── ui/             # shadcn/ui 컴포넌트
├── hooks/              # 커스텀 훅
├── stores/             # Zustand 스토어
├── services/api/       # API 서비스
├── utils/              # 유틸리티
├── types/              # 타입 정의
└── styles/             # 글로벌 스타일
```

## 인증 방식

HttpOnly Cookie + Session 기반 인증을 사용합니다.

- 모든 API 요청에 `withCredentials: true` 설정
- 401 응답 시 로그인 페이지로 리다이렉트
- CORS 설정 필요 (백엔드)

## 백엔드 연동 요구사항

| 항목 | 설명 | 우선순위 |
|------|------|----------|
| CORS 설정 | localhost:5173 허용 | 필수 |
| Credentials 허용 | `Access-Control-Allow-Credentials: true` | 필수 |
| 세션 정보 API | `/api/user/session-info.do` | 필수 |
| 로그아웃 API | `/api/auth/logout.do` | 필수 |
| 메뉴 정보 API | `/api/menu/list.do` | 필수 |

## 라이선스

jQWidgets 상용 라이선스가 필요합니다.
