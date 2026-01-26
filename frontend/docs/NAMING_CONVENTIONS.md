# 파일 및 디렉토리 명명 규칙

## 요약

| 카테고리 | 케이스 | 패턴 | 예시 |
|---------|-------|------|------|
| 컴포넌트 디렉토리 | PascalCase | `ComponentName/` | `Button/`, `DataGrid/` |
| 기능 디렉토리 | lowercase | `feature/` | `hooks/`, `stores/` |
| 컴포넌트 파일 | index.tsx | `index.tsx` | 모든 메인 컴포넌트 |
| 서브 컴포넌트 | PascalCase | `ComponentName.tsx` | `NoticeTypeBadge.tsx` |
| UI 프리미티브 | lowercase | `component.tsx` | `button.tsx` (shadcn) |
| 훅 | camelCase | `use{Name}.ts` | `useAuth.ts` |
| 스토어 | camelCase | `{name}Store.ts` | `authStore.ts` |
| API 서비스 | camelCase | `{name}Api.ts` | `authApi.ts` |
| 타입 정의 | lowercase | `{domain}.ts` | `user.ts` |
| 유틸리티 | lowercase/camelCase | `{name}.ts` | `formatters.ts` |
| 설정 파일 | lowercase | `{name}.config.ts` | `vite.config.ts` |
| 테스트 파일 | camelCase | `{name}.test.ts` | `alert.test.ts` |

---

## 1. 디렉토리 구조

### 컴포넌트 디렉토리 (PascalCase)

Atomic Design 패턴을 따르며, 컴포넌트 디렉토리는 **PascalCase**를 사용합니다.

```
src/components/
├── atoms/
│   ├── Button/
│   │   └── index.tsx
│   └── Input/
│       └── index.tsx
├── molecules/
│   └── FormField/
│       └── index.tsx
├── organisms/
│   └── DataGrid/
│       └── index.tsx
├── templates/
│   ├── AppLayout/
│   ├── MainLayout/
│   └── AuthLayout/
└── pages/
    └── {Feature}/
        └── {PageName}Page/
            └── index.tsx
```

### 기능 디렉토리 (lowercase)

기능별 디렉토리는 **lowercase**를 사용합니다.

```
src/
├── hooks/          # 커스텀 훅
├── stores/         # Zustand 스토어
├── services/
│   └── api/        # API 서비스
├── utils/          # 유틸리티 함수
├── types/          # 타입 정의
├── lib/            # 라이브러리
└── styles/         # 스타일
```

---

## 2. 컴포넌트 파일

### 메인 컴포넌트: `index.tsx`

모든 메인 컴포넌트는 디렉토리 내 `index.tsx`로 export 합니다.

```
# Good
src/components/atoms/Button/index.tsx
src/components/pages/Home/HealthCheckUrlPage/index.tsx

# Bad
src/components/atoms/Button.tsx
src/components/pages/HealthCheckUrlPage.tsx
```

### 서브 컴포넌트: PascalCase 직접 명명

페이지 내 하위 컴포넌트는 `components/` 하위에 **PascalCase**로 직접 명명합니다.

```
src/components/pages/Board/
├── index.tsx
└── components/
    ├── NoticeTypeBadge.tsx
    ├── SearchBox.tsx
    └── BoardTable.tsx
```

### UI 프리미티브 (shadcn/ui): lowercase

shadcn/ui 컴포넌트는 **lowercase**를 사용합니다.

```
src/components/ui/
├── button.tsx
├── dialog.tsx
├── input.tsx
└── label.tsx
```

---

## 3. 훅 (Hooks)

**패턴**: `use{FunctionName}.ts` (camelCase + `use` 접두사)

```
src/hooks/
├── useAuth.ts
├── useMenu.ts
├── useAlert.ts
└── useApi.ts
```

페이지별 훅은 해당 페이지 디렉토리 내 `hooks/`에 배치합니다.

```
src/components/pages/Login/
├── index.tsx
└── hooks/
    └── useLogin.ts
```

---

## 4. 스토어 (Zustand)

**패턴**: `{domain}Store.ts` (camelCase + `Store` 접미사)

```
src/stores/
├── authStore.ts
├── userStore.ts
├── menuStore.ts
├── alertStore.ts
├── confirmStore.ts
├── promptStore.ts
├── notificationStore.ts
└── index.ts          # export 집합
```

---

## 5. API 서비스

**패턴**: `{domain}Api.ts` (camelCase + `Api` 접미사)

```
src/services/api/
├── authApi.ts
├── userApi.ts
├── boardApi.ts
├── homeApi.ts
├── rptApi.ts         # report 약어
└── index.ts
```

---

## 6. 타입 정의

**패턴**: `{domain}.ts` (lowercase, 도메인 기반)

```
src/types/
├── user.ts
├── auth.ts
├── dashboard.ts
├── menu.ts
├── board.ts
├── rpt.ts            # report 약어
├── acc.ts            # accident 약어
├── hist.ts           # history 약어
├── system.ts
├── jqwidgets.d.ts    # 외부 라이브러리 선언
└── index.ts
```

---

## 7. 유틸리티

**패턴**: `{name}.ts` (lowercase, 복합어는 camelCase)

```
src/utils/
├── formatters.ts     # 포매팅 함수들
├── validators.ts     # 유효성 검사
├── constants.ts      # 상수
├── menuIconMap.ts    # 복합어 (camelCase)
├── alert.ts
├── confirm.ts
└── prompt.ts
```

---

## 8. 테스트 파일

**패턴**: `{name}.test.ts` (원본 파일명 + `.test` 접미사)

```
src/utils/alert.test.ts
src/utils/confirm.test.ts
src/test/api-contract.test.ts
```

---

## 9. 설정 파일

**패턴**: `{name}.config.{ts|js}` (lowercase)

```
vite.config.ts
vitest.config.ts
playwright.config.ts
eslint.config.js
tsconfig.json
tsconfig.app.json
tsconfig.node.json
```

---

## 신규 파일 생성 가이드

| 생성할 파일 | 경로 | 예시 |
|------------|------|------|
| Atom 컴포넌트 | `src/components/atoms/{Name}/index.tsx` | `atoms/Badge/index.tsx` |
| Molecule 컴포넌트 | `src/components/molecules/{Name}/index.tsx` | `molecules/SearchInput/index.tsx` |
| Organism 컴포넌트 | `src/components/organisms/{Name}/index.tsx` | `organisms/Header/index.tsx` |
| 페이지 컴포넌트 | `src/components/pages/{Feature}/{Name}Page/index.tsx` | `pages/User/UserListPage/index.tsx` |
| 커스텀 훅 | `src/hooks/use{Name}.ts` | `hooks/useTable.ts` |
| 스토어 | `src/stores/{name}Store.ts` | `stores/tableStore.ts` |
| API 서비스 | `src/services/api/{name}Api.ts` | `services/api/tableApi.ts` |
| 타입 정의 | `src/types/{domain}.ts` | `types/table.ts` |
| 유틸리티 | `src/utils/{name}.ts` | `utils/tableHelpers.ts` |
