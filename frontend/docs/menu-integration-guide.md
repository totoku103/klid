# 메뉴/페이지 통합 가이드

프론트엔드 프로젝트에 새로운 메뉴와 페이지를 추가하고 라우팅 시스템과 연동하는 방법을 설명합니다.

## 1. 개요

본 프로젝트는 **동적 라우팅 시스템**을 사용합니다. 서버에서 메뉴 JSON을 받아 자동으로 라우트를 생성하므로, 새 페이지 추가 시 다음 단계만 따르면 됩니다:

1. **페이지 컴포넌트** 작성
2. **componentMap.tsx** 에 GUID 맵핑 추가
3. **(선택)** types/menu.ts 에 경로 추가

라우팅 시스템은 메뉴 JSON의 구조를 자동으로 파싱하여 페이지를 렌더링합니다.

### 1.1 라우팅 흐름도

```
서버 메뉴 JSON
    ↓
menuStore (상태 관리)
    ↓
DynamicRoutes (라우트 추출 및 생성)
    ↓
componentMap (GUID → 컴포넌트 맵핑)
    ↓
레이아웃 선택 (SimpleLayout 또는 DefaultLayout)
    ↓
페이지 렌더링
```

---

## 2. 폴더 구조

```
src/
├── router/
│   ├── DynamicRoutes.tsx       # 동적 라우트 생성 로직
│   └── componentMap.tsx         # GUID별 컴포넌트 맵핑
├── components/pages/
│   ├── Main/                    # 대시보드 페이지
│   │   ├── index.tsx
│   │   ├── components/
│   │   └── hooks/
│   ├── Acc/                     # 침해사고 페이지 (예제)
│   │   ├── index.ts
│   │   ├── AccidentApplyListPage/
│   │   │   └── index.tsx
│   │   └── components/
│   ├── Login/                   # 로그인 (레이아웃 없음)
│   └── [기타 페이지들]/
├── services/api/
│   ├── accApi.ts                # API 호출 모음 (Accident)
│   ├── mainApi.ts               # API 호출 모음 (Main)
│   └── axios.ts                 # axios 인스턴스
├── types/
│   ├── index.ts
│   └── menu.ts                  # 메뉴 타입 및 MENU_ROUTE_MAP
├── stores/
│   ├── menuStore.ts             # 메뉴 상태 관리
│   └── userStore.ts             # 사용자 정보
└── App.tsx                      # 루트 레이아웃
```

---

## 3. 새 페이지 추가 가이드

### Step 1: 페이지 컴포넌트 생성

새로운 페이지 폴더를 생성합니다. 예를 들어, "보안정보" 섹션 아래 "뉴스" 페이지를 추가한다면:

```
src/components/pages/Sec/
├── index.ts                          # 내보내기 파일
├── NewsListPage/
│   └── index.tsx                     # 실제 페이지 컴포넌트
└── components/                       # 페이지 내부 컴포넌트 (선택)
```

**src/components/pages/Sec/NewsListPage/index.tsx**

```typescript
import { useState, useEffect, useCallback } from 'react'
import { globalAlert } from '@/utils/alert'
import {
  ActionBar,
  ActionButton,
  FilterPanel,
  DataPanel,
} from '@/components/organisms'
import { useUserStore } from '@/stores/userStore'
import { secApi } from '@/services/api/secApi'
import type { News } from '@/types'

export function NewsListPage() {
  const { user } = useUserStore()
  const [newsList, setNewsList] = useState<News[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // API에서 데이터 조회
  const loadNews = useCallback(async () => {
    try {
      setIsLoading(true)
      const data = await secApi.getNewsList({ instCd: user?.instCd })
      setNewsList(data)
    } catch (err) {
      console.error('Failed to load news:', err)
      globalAlert.error('뉴스 조회에 실패했습니다.')
    } finally {
      setIsLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadNews()
  }, [loadNews])

  const handleRefresh = useCallback(() => {
    loadNews()
  }, [loadNews])

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-lg">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      <FilterPanel>
        <ActionBar>
          <ActionButton icon="search" onClick={handleRefresh} title="조회" />
        </ActionBar>
      </FilterPanel>

      <DataPanel>
        {/* 페이지 콘텐츠 */}
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">뉴스</h1>
          {newsList.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              데이터가 없습니다.
            </div>
          ) : (
            <ul className="space-y-2">
              {newsList.map((news) => (
                <li key={news.id} className="border-b py-2">
                  <h3 className="font-semibold">{news.title}</h3>
                  <p className="text-gray-600 text-sm">{news.date}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </DataPanel>
    </div>
  )
}
```

### Step 2: index.ts에 export 추가

**src/components/pages/Sec/index.ts** (새로 생성 또는 기존 파일에 추가)

```typescript
export { NewsListPage } from './NewsListPage'
```

여러 페이지가 있는 경우:

```typescript
export { NewsListPage } from './NewsListPage'
export { GuideListPage } from './GuideListPage'
export { AnnouncementPage } from './AnnouncementPage'
```

### Step 3: componentMap.tsx에 GUID 맵핑 추가

**src/router/componentMap.tsx**

```typescript
import { lazy, type ComponentType } from 'react'

// 기존 import들...
const MainPage = lazy(() => import('@/components/pages/Main').then(m => ({ default: m.MainPage })))
const AccidentApplyListPage = lazy(() => import('@/components/pages/Acc').then(m => ({ default: m.AccidentApplyListPage })))

// 새 페이지 import 추가
const NewsListPage = lazy(() => import('@/components/pages/Sec').then(m => ({ default: m.NewsListPage })))

export const COMPONENT_MAP: Record<string, ComponentType<any>> = {
  '616D8144-FAF1-4BAE-9BB6-0B8F5F381130': MainPage, // 대시보드
  'A800930A-372D-41E2-BEDE-B40FFB5FDFAD': AccidentApplyListPage, // 사고신고 처리현황
  // 새 페이지 추가
  'ABC12345-6789-0123-4567-89ABCDEF1234': NewsListPage, // 뉴스 (예제 GUID)
}

// 나머지 코드...
```

**GUID는 어디서 얻나요?**

- 메뉴 JSON 응답에서 각 메뉴 항목의 `guid` 필드 확인
- 서버 관리자에게 할당받음
- 개발 중일 땐 임의의 UUID 생성 가능

### Step 4: (선택) types/menu.ts에 경로 추가

메뉴 항목의 경로를 고정하고 싶으면 `MENU_ROUTE_MAP`에 추가합니다.

**src/types/menu.ts**

```typescript
const MENU_ROUTE_MAP: Record<string, string> = {
  // 기존 맵핑들...

  // 보안정보 - 뉴스
  'ABC12345-6789-0123-4567-89ABCDEF1234': '/main/sec/newsList',
}

function getMenuUrl(guid: string): string {
  return MENU_ROUTE_MAP[guid] || `/menu/${guid}`
}
```

**경로 생성 규칙:**
- `/main` - 대시보드 전용
- `/main/{카테고리}/{페이지명}` - 일반 페이지
- 예: `/main/sec/newsList`, `/main/acc/accidentList`, `/main/env/userMgmt`

---

## 4. 실제 예제

### 예제 1: 보고서 페이지 추가

"보고서" → "신규보고서" 페이지를 추가한다고 가정합니다.

**1단계: 페이지 컴포넌트 작성**

```typescript
// src/components/pages/Rpt/NewReportPage/index.tsx

import { useState, useEffect } from 'react'
import { useUserStore } from '@/stores/userStore'
import { rptApi } from '@/services/api/rptApi'
import type { Report } from '@/types'

export function NewReportPage() {
  const { user } = useUserStore()
  const [reports, setReports] = useState<Report[]>([])

  useEffect(() => {
    const loadReports = async () => {
      try {
        const data = await rptApi.getReportList({
          instCd: user?.instCd,
          reportType: 'new'
        })
        setReports(data)
      } catch (err) {
        console.error('Report load failed:', err)
      }
    }

    loadReports()
  }, [user])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">신규보고서</h1>
      <div className="grid grid-cols-3 gap-4">
        {reports.map((report) => (
          <div key={report.id} className="border rounded p-4">
            <h3 className="font-semibold">{report.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{report.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

**2단계: index.ts 추가**

```typescript
// src/components/pages/Rpt/index.ts

export { NewReportPage } from './NewReportPage'
```

**3단계: componentMap.tsx 수정**

```typescript
const NewReportPage = lazy(() =>
  import('@/components/pages/Rpt').then(m => ({ default: m.NewReportPage }))
)

export const COMPONENT_MAP = {
  // ...
  'RPT-NEW-GUID-1234': NewReportPage, // 신규보고서
}
```

**4단계: (선택) menu.ts 수정**

```typescript
const MENU_ROUTE_MAP = {
  // ...
  'RPT-NEW-GUID-1234': '/main/rpt/newReport',
}
```

### 예제 2: 기관관리 페이지 추가

기관 정보를 조회/수정하는 페이지를 추가한다고 가정합니다.

**폴더 구조:**
```
src/components/pages/Env/
├── index.ts
├── InstMgmtPage/
│   ├── index.tsx
│   └── components/
│       ├── InstForm.tsx           # 기관 정보 입력 폼
│       ├── InstTable.tsx          # 기관 목록 테이블
│       └── InstDetailModal.tsx    # 상세보기 모달
```

**페이지 컴포넌트:**

```typescript
// src/components/pages/Env/InstMgmtPage/index.tsx

import { useState, useCallback, useEffect } from 'react'
import { globalAlert } from '@/utils/alert'
import {
  ActionBar,
  ActionButton,
  FilterPanel,
  DataPanel,
  SearchBar,
  SearchRow,
  SearchInput,
  SearchField,
} from '@/components/organisms'
import { DataGrid, useDataGrid, type GridColumn } from '@/components/atoms'
import { envApi } from '@/services/api/envApi'
import type { Institution } from '@/types'
import { InstDetailModal } from './components/InstDetailModal'

const gridColumns: GridColumn[] = [
  { text: '기관명', datafield: 'instName', width: '30%' },
  { text: '기관코드', datafield: 'instCd', width: '20%' },
  { text: '지역', datafield: 'regionName', width: '20%' },
  { text: '담당자', datafield: 'manager', width: '15%' },
  { text: '연락처', datafield: 'phone', width: '15%' },
]

export function InstMgmtPage() {
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [selectedInst, setSelectedInst] = useState<Institution | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const { exportToExcel } = useDataGrid('instMgmtGrid')

  const loadInstitutions = useCallback(async () => {
    try {
      const data = await envApi.getInstitutionList({
        searchTerm: searchTerm || undefined
      })
      setInstitutions(data)
    } catch (err) {
      globalAlert.error('기관 목록 조회에 실패했습니다.')
      console.error(err)
    }
  }, [searchTerm])

  useEffect(() => {
    loadInstitutions()
  }, [loadInstitutions])

  const handleDetail = useCallback(() => {
    if (!selectedInst) {
      globalAlert.warning('기관을 선택해주세요.')
      return
    }
    setIsDetailOpen(true)
  }, [selectedInst])

  const handleExport = useCallback(() => {
    exportToExcel('기관관리')
  }, [exportToExcel])

  return (
    <div className="flex flex-col h-full">
      <FilterPanel>
        <SearchBar>
          <SearchRow>
            <SearchField label="기관명:">
              <SearchInput
                type="text"
                placeholder="기관명 입력"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchField>
          </SearchRow>
        </SearchBar>

        <ActionBar>
          <ActionButton icon="search" onClick={loadInstitutions} title="조회" />
          <ActionButton icon="view" onClick={handleDetail} title="조회" />
          <ActionButton icon="excel" onClick={handleExport} title="엑셀" />
        </ActionBar>
      </FilterPanel>

      <DataPanel>
        <DataGrid
          id="instMgmtGrid"
          columns={gridColumns}
          source={{
            datatype: 'json',
            datafields: [
              { name: 'instCd', type: 'string' },
              { name: 'instName', type: 'string' },
              { name: 'regionName', type: 'string' },
              { name: 'manager', type: 'string' },
              { name: 'phone', type: 'string' },
            ],
            localdata: institutions,
            id: 'instCd',
          }}
          width="100%"
          height="100%"
          pageable={true}
          pageSize={50}
          selectionMode="singlerow"
          onRowSelect={(data) => setSelectedInst(data as Institution)}
        />
      </DataPanel>

      {selectedInst && (
        <InstDetailModal
          open={isDetailOpen}
          onOpenChange={setIsDetailOpen}
          institution={selectedInst}
        />
      )}
    </div>
  )
}
```

---

## 5. 레이아웃 선택

프로젝트는 두 가지 레이아웃을 지원합니다:

### SimpleLayout (대시보드 전용)

- **사용 대상:** `/main` 경로
- **구성:** 헤더 + 대시보드 콘텐츠
- **특징:** 네비게이션 바 없음, 풀 스크린 대시보드

```typescript
// DynamicRoutes.tsx에서
<Route element={<SimpleLayout />}>
  <Route path="/main" element={<MainPage />} />
</Route>
```

### DefaultLayout (일반 페이지)

- **사용 대상:** `/main/*` 모든 경로
- **구성:** 헤더 + 사이드바 + 콘텐츠
- **특징:** 메뉴 네비게이션 포함

```typescript
<Route element={<DefaultLayout />}>
  {routes.map(route => (
    <Route path={route.path} element={<Component />} />
  ))}
</Route>
```

### 레이아웃 없음

- **사용 대상:** 로그인, 팝업 등
- **위치:** `App.tsx`의 최상단 라우트

```typescript
// App.tsx에서
<Route path="/login" element={<LoginPage />} />
<Route path="/popup/*" element={<PopupPage />} />
```

---

## 6. API 연동

### API 모듈 생성

각 도메인별로 API 모듈을 만듭니다:

**src/services/api/exampleApi.ts**

```typescript
import api from './axios'
import type { ExampleData, ExampleParams } from '@/types'

interface ListResponse<T> {
  resultData: T[]
}

interface DetailResponse {
  resultData: ExampleData
}

export const exampleApi = {
  // 목록 조회
  getList: async (params: ExampleParams): Promise<ExampleData[]> => {
    const response = await api.get<ListResponse<ExampleData>>(
      '/api/example/list.do',
      { params }
    )
    return response.data.resultData
  },

  // 상세 조회
  getDetail: async (id: string): Promise<ExampleData> => {
    const response = await api.get<DetailResponse>(
      '/api/example/detail.do',
      { params: { id } }
    )
    return response.data.resultData
  },

  // 추가
  create: async (data: Partial<ExampleData>): Promise<void> => {
    await api.post('/api/example/create.do', data)
  },

  // 수정
  update: async (data: ExampleData): Promise<void> => {
    await api.post('/api/example/update.do', data)
  },

  // 삭제
  delete: async (id: string): Promise<void> => {
    await api.post('/api/example/delete.do', { id })
  },

  // 코드 조회
  getCode: async (codeGrp: string): Promise<CodeItem[]> => {
    const response = await api.get<ListResponse<CodeItem>>(
      '/api/code/get.do',
      { params: { codeGrp } }
    )
    return response.data.resultData
  },
}
```

### 페이지에서 API 사용

```typescript
import { exampleApi } from '@/services/api/exampleApi'

function ExamplePage() {
  const [data, setData] = useState<ExampleData[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await exampleApi.getList({
          instCd: user?.instCd,
          searchTerm: 'example'
        })
        setData(result)
      } catch (err) {
        globalAlert.error('데이터 조회 실패')
      }
    }

    loadData()
  }, [user])

  // ...
}
```

---

## 7. 타입 정의

### 페이지 타입 정의

**src/types/example.ts** (새 파일)

```typescript
export interface ExampleData {
  id: string
  name: string
  description: string
  status: 'active' | 'inactive'
  createdDate: string
}

export interface ExampleParams {
  searchTerm?: string
  instCd?: string
  status?: string
  startDate?: string
  endDate?: string
}

export interface ExampleAddParams {
  name: string
  description: string
  status: string
}
```

### 타입 내보내기

**src/types/index.ts**

```typescript
// 기존 내보내기들...
export type * from './example'
export type * from './accident'
// ...
```

---

## 8. 주요 패턴 및 관례

### 페이지 컴포넌트 구조

모든 페이지는 다음 패턴을 따릅니다:

```typescript
export function PageName() {
  const { user } = useUserStore()
  const [data, setData] = useState<Type[]>([])
  const [selectedItem, setSelectedItem] = useState<Type | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // API 호출
  const loadData = useCallback(async () => {
    try {
      const result = await api.getList(params)
      setData(result)
    } catch (err) {
      globalAlert.error('조회 실패')
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  // 이벤트 핸들러
  const handleAction = useCallback(() => {
    // 로직
  }, [])

  return (
    <div className="flex flex-col h-full">
      <FilterPanel>
        {/* 검색/필터 영역 */}
        <ActionBar>
          {/* 버튼 */}
        </ActionBar>
      </FilterPanel>

      <DataPanel>
        {/* 데이터 표시 영역 */}
      </DataPanel>

      {/* 모달 */}
    </div>
  )
}
```

### 네이밍 컨벤션

| 대상 | 규칙 | 예제 |
|-----|------|------|
| 폴더 | PascalCase | `Acc`, `Env`, `Rpt` |
| 파일 | PascalCase | `AccidentListPage.tsx` |
| 컴포넌트 | PascalCase + Page | `AccidentListPage` |
| 변수 | camelCase | `selectedIncident`, `isLoading` |
| 상수 | UPPER_SNAKE_CASE | `DATE_TYPE_OPTIONS` |
| API 모듈 | camelCase + Api | `accApi`, `envApi` |

### 상태 관리 순서

1. **로딩 상태** - `isLoading`
2. **데이터** - `data`, `items`
3. **선택된 항목** - `selectedItem`
4. **UI 상태** - `isModalOpen`, `showAdvanced`
5. **입력 필드** - `searchTerm`, `formData`

---

## 9. 트러블슈팅

### 문제 1: 페이지가 표시되지 않음

**증상:** 메뉴를 클릭해도 페이지가 로드되지 않음

**해결 방법:**

1. **componentMap.tsx** 에서 GUID가 정확한지 확인

   ```typescript
   // 메뉴 JSON에서 guid 값 확인
   // 예: "guid": "ABC12345-6789-0123-4567-89ABCDEF1234"

   // componentMap.tsx에 추가
   'ABC12345-6789-0123-4567-89ABCDEF1234': NewPage,
   ```

2. **import 경로** 확인

   ```typescript
   // 잘못된 예
   const NewPage = lazy(() => import('@/components/pages/New').then(m => m.default))

   // 올바른 예
   const NewPage = lazy(() => import('@/components/pages/New').then(m => ({ default: m.NewPage })))
   ```

3. **index.ts 에서 export** 확인

   ```typescript
   // src/components/pages/New/index.ts
   export { NewPage } from './NewPage'
   ```

4. 브라우저 콘솔에서 에러 메시지 확인

### 문제 2: PlaceholderPage가 보임

**증상:** "페이지 준비중" 메시지 표시

**원인:**
- GUID가 `componentMap.tsx` 에 등록되지 않음
- 잘못된 GUID 사용
- 컴포넌트 import 실패

**해결 방법:**

1. GUID 다시 확인

   ```typescript
   // DynamicRoutes.tsx에서 debug
   console.log('Loading component for GUID:', guid)
   console.log('Component:', getComponentByGuid(guid))
   ```

2. 네트워크 탭에서 컴포넌트 청크 로드 확인
3. 콘솔에서 다음 명령어로 맵핑 확인

   ```javascript
   // 브라우저 콘솔
   console.log(COMPONENT_MAP)
   ```

### 문제 3: 빌드 에러

**"Cannot find module" 에러**

```typescript
// 원인: 파일 경로 오류
const NewPage = lazy(() => import('@/components/pages/NEW').then(m => ({ default: m.NewPage })))
// 문제: 'NEW'는 존재하지만 'NewPage'가 export되지 않음

// 해결: index.ts에서 export 확인
// src/components/pages/New/index.ts
export { NewPage } from './NewPage'
```

**TypeScript 에러**

```typescript
// 원인: 타입 정의 누락
const NewPage = lazy(() => import('@/components/pages/New').then(m => ({ default: m.NewPage })))

// 해결: any 타입으로 임시 해결 (권장하지 않음)
const NewPage = lazy(() =>
  import('@/components/pages/New').then(m => ({ default: m.NewPage as any }))
)

// 더 나은 방법: 컴포넌트 타입 정의
import type { ComponentType } from 'react'

export const COMPONENT_MAP: Record<string, ComponentType<any>> = {
  // ...
}
```

### 문제 4: 메뉴에 페이지가 안 보임

**증상:** 페이지는 작동하지만 메뉴에 표시되지 않음

**원인:** 서버에서 메뉴 JSON에 해당 항목을 포함하지 않음

**해결 방법:**
1. 서버 관리자에게 메뉴 등록 요청
2. 서버에서 메뉴 JSON이 올바른지 확인
3. `menuStore` 에서 메뉴 데이터 확인

   ```typescript
   // 컴포넌트에서 debug
   const { menus } = useMenuStore()
   console.log('메뉴:', menus)
   ```

### 문제 5: 스타일이 적용되지 않음

**원인:** Tailwind CSS 클래스명이 잘못되었거나 빌드되지 않음

**해결 방법:**

1. Tailwind 클래스 이름 확인 (hyphen 확인)

   ```typescript
   // 올바른 예
   <div className="flex items-center justify-center h-full">

   // 잘못된 예 (스페이스 포함)
   <div className="flex items-center justify-center h full">
   ```

2. 빌드 재실행

   ```bash
   npm run build
   ```

3. 개발 서버 재시작

   ```bash
   npm run dev
   ```

---

## 10. 체크리스트

새 페이지 추가 완료 시 다음을 확인하세요:

- [ ] 페이지 컴포넌트 생성 (`src/components/pages/...`)
- [ ] `index.ts` 에 export 추가
- [ ] `componentMap.tsx` 에 lazy import 및 COMPONENT_MAP 추가
- [ ] 올바른 GUID 사용 (서버 메뉴 JSON에서 확인)
- [ ] API 모듈 생성 또는 기존 모듈 사용
- [ ] 타입 정의 추가 (`src/types/...`)
- [ ] (선택) `MENU_ROUTE_MAP` 에 경로 추가
- [ ] 개발 서버 재시작
- [ ] 메뉴 클릭 시 페이지 로드 확인
- [ ] 브라우저 콘솔에서 에러 없음 확인
- [ ] 모바일 반응형 확인
- [ ] 접근성(a11y) 확인

---

## 11. 참고 자료

### 주요 파일

| 파일 | 설명 |
|------|------|
| `src/router/DynamicRoutes.tsx` | 동적 라우팅 로직 |
| `src/router/componentMap.tsx` | GUID 맵핑 |
| `src/types/menu.ts` | 메뉴 타입 및 라우트 맵 |
| `src/App.tsx` | 루트 레이아웃 |
| `src/stores/menuStore.ts` | 메뉴 상태 관리 |

### 유용한 컴포넌트

| 컴포넌트 | 위치 | 설명 |
|---------|------|------|
| `ActionBar` | `@/components/organisms` | 버튼 행 |
| `FilterPanel` | `@/components/organisms` | 검색/필터 영역 |
| `DataPanel` | `@/components/organisms` | 데이터 표시 영역 |
| `DataGrid` | `@/components/atoms` | 데이터 그리드 |
| `SearchBar` | `@/components/organisms` | 검색 폼 |

### 유틸리티 함수

| 함수 | 모듈 | 설명 |
|------|------|------|
| `globalAlert.success()` | `@/utils/alert` | 성공 메시지 |
| `globalAlert.error()` | `@/utils/alert` | 에러 메시지 |
| `globalConfirm()` | `@/utils/confirm` | 확인 대화상자 |
| `useUserStore()` | `@/stores/userStore` | 사용자 정보 |
| `useMenuStore()` | `@/stores/menuStore` | 메뉴 정보 |

---

## 12. FAQ

**Q: GUID는 어떻게 생성하나요?**

A: 서버 메뉴 JSON에서 제공됩니다. 개발 중에는 온라인 UUID 생성기를 사용할 수 있습니다:
```
https://www.uuidgenerator.net/
```

**Q: 같은 폴더에 여러 페이지를 만들 수 있나요?**

A: 네, 가능합니다. 예:
```
src/components/pages/Acc/
├── index.ts
├── AccidentListPage/
├── AccidentDetailPage/
└── AccidentReportPage/
```

**Q: 페이지 간에 데이터를 공유하려면?**

A: Zustand 스토어를 사용하세요:
```typescript
// src/stores/exampleStore.ts
import { create } from 'zustand'

export const useExampleStore = create((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}))
```

**Q: API 응답 형식이 일정하지 않으면?**

A: API 모듈에서 변환 로직을 추가하세요:
```typescript
export const exampleApi = {
  getList: async (params) => {
    const response = await api.get('/api/example/list.do', { params })
    // 응답 변환
    return transformListResponse(response.data)
  },
}

function transformListResponse(data: any) {
  return data.resultData?.map((item: any) => ({
    id: item.id,
    name: item.nm,
    status: item.sts === 'Y' ? 'active' : 'inactive',
  })) || []
}
```

---

## 13. 업데이트 이력

| 버전 | 날짜 | 변경 사항 |
|------|------|----------|
| 1.0 | 2026-01-28 | 초판 작성 |
