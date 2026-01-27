# Atomic Design 폴더 구조 가이드

## 목차
- [개요](#개요)
- [1. Atoms (원자)](#1-atoms-원자)
- [2. Molecules (분자)](#2-molecules-분자)
- [3. Organisms (유기체)](#3-organisms-유기체)
- [4. Templates (템플릿)](#4-templates-템플릿)
- [5. Pages (페이지)](#5-pages-페이지)
- [6. UI Primitives (UI 프리미티브)](#6-ui-primitives-ui-프리미티브)
- [Import 규칙](#import-규칙)
- [새 컴포넌트 추가 가이드](#새-컴포넌트-추가-가이드)

---

## 개요

### Atomic Design이란?

Atomic Design은 UI를 원자(Atoms), 분자(Molecules), 유기체(Organisms), 템플릿(Templates), 페이지(Pages)의 5가지 계층으로 구분하는 디자인 방법론입니다. 이 방식은 다음과 같은 이점을 제공합니다.

- **재사용성**: 작은 단위의 컴포넌트를 조합하여 복잡한 UI를 구성
- **유지보수성**: 각 계층이 명확하게 역할이 정의되어 있어 코드 관리가 용이
- **확장성**: 새로운 기능을 추가할 때 기존 컴포넌트를 활용하기 쉬움
- **일관성**: 동일한 원자(Atom)가 여러 곳에서 사용되어 UI의 일관성 유지

### 프로젝트에서의 적용 방식

KLID 프로젝트는 Atomic Design을 엄격하게 따르고 있습니다. 각 계층은 다음과 같이 폴더 구조로 분리되어 있습니다.

```
src/components/
├── atoms/          # 가장 작은 단위의 UI 요소
├── molecules/      # Atom들의 조합
├── organisms/      # 복잡한 UI 섹션
├── templates/      # 페이지 레이아웃 구조
├── pages/          # 라우팅되는 실제 페이지
└── ui/             # shadcn/ui 기반 헤드리스 컴포넌트
```

---

## 1. Atoms (원자)

**위치**: `src/components/atoms/`

### 설명

Atoms는 프로젝트에서 가장 작은 단위의 UI 요소입니다. 더 이상 분해할 수 없는 기본 컴포넌트들로, 프로젝트의 모든 다른 계층이 이들을 기반으로 구성됩니다.

### 포함된 컴포넌트

- **Button**: 클릭 가능한 버튼 요소
- **Input**: 텍스트 입력 필드
- **Label**: 폼 레이블 요소
- **Icon**: 아이콘 표시 컴포넌트
- **Checkbox**: 체크박스 선택 요소
- **Radio**: 라디오 버튼 선택 요소
- **Typography**: 텍스트 스타일링 컴포넌트

### 특징

- 상태 관리가 최소한이거나 props로만 관리됨
- 다른 Atoms를 import하지 않음
- UI Primitives(`src/components/ui/`)를 기반으로 구현됨

### 예시 코드: Button 사용

```typescript
// src/components/atoms/Button/index.tsx
import { type ComponentProps } from 'react'
import { Button, buttonVariants } from '@/components/ui/button'
import { type VariantProps } from 'class-variance-authority'

export type ButtonProps = ComponentProps<typeof Button> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }

export { Button, buttonVariants }
```

### 사용 예시

```typescript
import { Button } from '@/components/atoms'

export function MyComponent() {
  return (
    <>
      {/* 기본 버튼 */}
      <Button variant="default" size="md">
        클릭하기
      </Button>

      {/* 아웃라인 버튼 */}
      <Button variant="outline" size="sm">
        취소
      </Button>

      {/* 삭제 버튼 */}
      <Button variant="destructive" size="lg">
        삭제
      </Button>

      {/* 아이콘 버튼 */}
      <Button variant="ghost" size="icon">
        🔍
      </Button>
    </>
  )
}
```

### 네이밍 규칙

- **파일명**: PascalCase (예: `Button.tsx`, `Input.tsx`)
- **컴포넌트명**: PascalCase (예: `Button`, `Input`)
- **Props 타입명**: `{ComponentName}Props` (예: `ButtonProps`, `InputProps`)
- **Export 스타일**: Named Export (Barrel Export 사용)

---

## 2. Molecules (분자)

**위치**: `src/components/molecules/`

### 설명

Molecules는 여러 Atoms를 조합하여 만든 컴포넌트입니다. Atoms보다 복잡한 기능을 제공하지만, Organisms보다는 단순합니다. 특정 목적을 가진 재사용 가능한 UI 패턴을 구성합니다.

### 포함된 컴포넌트

- **FormField**: Label과 Input을 조합한 폼 필드 컴포넌트
- **InputWithIcon**: Icon과 Input을 조합한 검색/필터 입력
- **RadioGroup**: 여러 Radio를 조합한 선택 그룹
- **SearchInput**: 검색 기능이 있는 입력 필드
- **Timer**: 시간 표시 및 관리 컴포넌트
- **PageNav**: 페이지 네비게이션 및 브레드크럼브
- **SystemLinks**: 시스템 링크 모음

### 특징

- 여러 Atoms를 조합하여 구성
- 특정 기능(예: 폼 입력)에 최적화됨
- props로 Atoms의 동작을 제어
- 자체 상태 관리가 제한적이거나 없음

### 예시 코드: FormField 사용

```typescript
// src/components/molecules/FormField/index.tsx
import { type ReactNode } from 'react'
import { Label } from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface FormFieldProps {
  label: string
  htmlFor?: string
  required?: boolean
  error?: string
  className?: string
  children: ReactNode
}

export function FormField({
  label,
  htmlFor,
  required,
  error,
  className,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={htmlFor} className="flex items-center gap-1">
        {label}
        {required && <span className="text-[var(--color-error)]">*</span>}
      </Label>
      {children}
      {error && (
        <p className="text-sm text-[var(--color-error)]">{error}</p>
      )}
    </div>
  )
}
```

### 사용 예시

```typescript
import { FormField, Input } from '@/components/molecules'
import { useState } from 'react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('이메일은 필수입니다')
      return
    }
    // 로그인 처리
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormField
        label="이메일"
        htmlFor="email"
        required
        error={error}
      >
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@example.com"
        />
      </FormField>

      <FormField label="비밀번호" htmlFor="password" required>
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요"
        />
      </FormField>
    </form>
  )
}
```

### 구성 패턴

Molecules는 다음과 같은 패턴으로 구성됩니다.

1. **조합 패턴**: 여러 Atoms를 단순히 레이아웃으로 조합
2. **래퍼 패턴**: Atoms를 감싸서 추가 기능 제공
3. **상태 패턴**: props를 통해 상태를 받아 동작 제어

---

## 3. Organisms (유기체)

**위치**: `src/components/organisms/`

### 설명

Organisms는 복잡한 UI 섹션을 구성하는 컴포넌트입니다. Molecules나 Atoms를 조합하여 독립적인 기능을 담당하는 큰 단위의 컴포넌트입니다. 데이터 로딩, 복잡한 상태 관리 등을 처리할 수 있습니다.

### 포함된 컴포넌트

- **DataGrid**: 데이터 표시 및 상호작용을 위한 고급 테이블
- **Chart**: 다양한 형태의 차트 표시 (LineChart, PieChart, BarChart)
- **Modal**: 모달 다이얼로그 (ConfirmModal, AlertModal)
- **GlobalAlertModal**: 전역 알림 모달
- **GlobalConfirmModal**: 전역 확인 모달
- **GlobalPromptModal**: 전역 입력 모달
- **ErrorBoundary**: React 에러 처리 경계
- **Header**: 페이지 헤더 및 네비게이션
- **MenuBar**: 메뉴 바 및 사이드바 메뉴

### 특징

- Molecules나 Atoms 여러 개를 조합하여 구성
- 복잡한 상태 관리 및 비즈니스 로직을 포함 가능
- API 호출, 데이터 처리 등의 기능 담당
- Pages에서 직접 사용되거나 다른 Organisms와 조합되어 사용

### 예시 코드: DataGrid

```typescript
// src/components/organisms/DataGrid/index.tsx
import { useRef, useEffect, useCallback, type CSSProperties } from 'react'
import { cn } from '@/lib/utils'

export interface GridColumn {
  text: string
  datafield: string
  width?: number | string
  align?: 'left' | 'center' | 'right'
  cellsalign?: 'left' | 'center' | 'right'
  columntype?: 'textbox' | 'checkbox' | 'number' | 'date'
  filterable?: boolean
  sortable?: boolean
  hidden?: boolean
  pinned?: boolean
  cellsrenderer?: (
    row: number,
    column: string,
    value: unknown,
    rowData: Record<string, unknown>
  ) => string
}

export interface GridDataSource {
  datatype: 'json' | 'array' | 'xml'
  datafields: Array<{ name: string; type?: string }>
  url?: string
  localdata?: unknown[]
  id?: string
}

export interface DataGridProps {
  id: string
  columns: GridColumn[]
  source: GridDataSource
  width?: string | number
  height?: string | number
  pageable?: boolean
  pageSize?: number
  pageSizeOptions?: number[]
  sortable?: boolean
  filterable?: boolean
  selectionMode?: 'singlerow' | 'multiplerows' | 'checkbox'
  columnsReorder?: boolean
  enableTooltips?: boolean
  onRowSelect?: (rowData: Record<string, unknown>, rowIndex: number) => void
  onRowDoubleClick?: (
    rowData: Record<string, unknown>,
    rowIndex: number
  ) => void
  className?: string
}

export function DataGrid({
  id,
  columns,
  source,
  width = '100%',
  height = '400px',
  pageable = true,
  pageSize = 20,
  sortable = true,
  filterable = true,
  selectionMode = 'singlerow',
  columnsReorder = true,
  enableTooltips = true,
  onRowSelect,
  onRowDoubleClick,
  className,
}: DataGridProps) {
  // DataGrid 구현
  return (
    <div
      id={id}
      style={{
        width,
        height,
      } as CSSProperties}
      className={cn('dataGrid', className)}
    >
      {/* DataGrid 렌더링 */}
    </div>
  )
}

export function useDataGrid() {
  // DataGrid 관련 유틸리티 훅
}
```

### 사용 예시: DataGrid

```typescript
import { DataGrid } from '@/components/organisms'
import { useState } from 'react'

export function UserListPage() {
  const [selectedUser, setSelectedUser] = useState<Record<string, unknown> | null>(null)

  const columns = [
    { text: '사용자 ID', datafield: 'id', width: 100 },
    { text: '이름', datafield: 'name', width: 150 },
    { text: '이메일', datafield: 'email', width: 200 },
    { text: '생성일', datafield: 'createdAt', columntype: 'date' },
  ]

  const source = {
    datatype: 'json' as const,
    datafields: [
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'createdAt', type: 'date' },
    ],
    url: '/api/users',
  }

  return (
    <div>
      <DataGrid
        id="userGrid"
        columns={columns}
        source={source}
        height="500px"
        pageable
        pageSize={20}
        onRowSelect={(rowData) => setSelectedUser(rowData)}
      />
      {selectedUser && (
        <div className="mt-4 p-4 border rounded">
          <h3>선택된 사용자</h3>
          <p>이름: {selectedUser.name}</p>
          <p>이메일: {selectedUser.email}</p>
        </div>
      )}
    </div>
  )
}
```

### 예시 코드: Modal

```typescript
// src/components/organisms/Modal/index.tsx
import { type ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-[90vw]',
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
  size = 'md',
}: ModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(sizeClasses[size], className)}>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        {children}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  )
}

export interface ConfirmModalProps extends Omit<ModalProps, 'footer'> {
  onConfirm: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  isDangerous?: boolean
}

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
  isDangerous = false,
  className,
  size = 'sm',
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      className={className}
      size={size}
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {cancelText}
          </Button>
          <Button
            variant={isDangerous ? 'destructive' : 'default'}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      {children}
    </Modal>
  )
}

export interface AlertModalProps extends Omit<ModalProps, 'footer'> {
  onClose: () => void
  closeText?: string
}

export function AlertModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  onClose,
  closeText = '닫기',
  className,
  size = 'sm',
}: AlertModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      className={className}
      size={size}
      footer={
        <div className="flex justify-end">
          <Button onClick={onClose}>{closeText}</Button>
        </div>
      }
    >
      {children}
    </Modal>
  )
}
```

### 사용 예시: Modal

```typescript
import { Modal, ConfirmModal, AlertModal } from '@/components/organisms'
import { useState } from 'react'

export function ModalExample() {
  const [isOpen, setIsOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  return (
    <div className="space-y-4">
      {/* 기본 모달 */}
      <button onClick={() => setIsOpen(true)}>
        기본 모달 열기
      </button>
      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="모달 제목"
        description="이것은 모달 설명입니다"
        size="md"
      >
        <p>모달 콘텐츠가 여기에 표시됩니다.</p>
      </Modal>

      {/* 확인 모달 */}
      <button onClick={() => setConfirmOpen(true)}>
        확인 모달 열기
      </button>
      <ConfirmModal
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="정말로 삭제하시겠습니까?"
        onConfirm={() => {
          console.log('삭제 확인')
          setConfirmOpen(false)
        }}
        confirmText="삭제"
        cancelText="취소"
        isDangerous={true}
      >
        <p>이 작업은 되돌릴 수 없습니다.</p>
      </ConfirmModal>

      {/* 알림 모달 */}
      <button onClick={() => setAlertOpen(true)}>
        알림 모달 열기
      </button>
      <AlertModal
        open={alertOpen}
        onOpenChange={setAlertOpen}
        title="성공"
        onClose={() => setAlertOpen(false)}
      >
        <p>작업이 완료되었습니다.</p>
      </AlertModal>
    </div>
  )
}
```

---

## 4. Templates (템플릿)

**위치**: `src/components/templates/`

### 설명

Templates는 페이지의 레이아웃 구조를 정의하는 컴포넌트입니다. Organisms나 Molecules를 조합하여 페이지의 전체적인 구조(헤더, 사이드바, 메인 콘텐츠 등)를 만듭니다. Pages 컴포넌트가 자신의 콘텐츠를 Templates에 주입하여 최종 페이지를 구성합니다.

### 포함된 컴포넌트

- **AppLayout**: 전체 애플리케이션의 기본 레이아웃
- **AuthLayout**: 인증 페이지용 레이아웃 (로그인, 회원가입)
- **DefaultLayout**: 기본 페이지 레이아웃
- **MainLayout**: 메인 콘텐츠 + 헤더 + 사이드바 레이아웃
- **PopupLayout**: 팝업/모달 페이지 레이아웃
- **SimpleLayout**: 단순한 한 칼럼 레이아웃
- **PageToolbar**: 페이지 상단의 도구 모음

### 특징

- Organisms를 조합하여 페이지 구조 정의
- Props로 헤더, 사이드바, 콘텐츠 등을 받음
- 실제 데이터나 비즈니스 로직 없음
- 순수 레이아웃 구조만 담당

### 예시 코드: MainLayout

```typescript
// src/components/templates/MainLayout/index.tsx
import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface MainLayoutProps {
  children: ReactNode
  header?: ReactNode
  sidebar?: ReactNode
  className?: string
}

export function MainLayout({
  children,
  header,
  sidebar,
  className,
}: MainLayoutProps) {
  return (
    <div className={cn('flex min-h-screen flex-col', className)}>
      {header && (
        <header className="sticky top-0 z-50 border-b bg-white shadow-sm">
          {header}
        </header>
      )}
      <div className="flex flex-1">
        {sidebar && (
          <aside className="w-60 shrink-0 border-r bg-gray-50">
            {sidebar}
          </aside>
        )}
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  )
}

export interface ContentCardProps {
  children: ReactNode
  title?: string
  actions?: ReactNode
  className?: string
}

export function ContentCard({
  children,
  title,
  actions,
  className,
}: ContentCardProps) {
  return (
    <div className={cn('rounded-lg border bg-white p-4', className)}>
      {(title || actions) && (
        <div className="mb-4 flex items-center justify-between border-b pb-4">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  )
}
```

### 사용 예시: MainLayout

```typescript
import { MainLayout, ContentCard } from '@/components/templates'
import { Header } from '@/components/organisms'
import { MenuBar } from '@/components/organisms'
import { Button } from '@/components/atoms'

export function DashboardPage() {
  return (
    <MainLayout
      header={<Header />}
      sidebar={<MenuBar />}
    >
      <ContentCard
        title="대시보드"
        actions={
          <div className="flex gap-2">
            <Button size="sm" variant="outline">내보내기</Button>
            <Button size="sm">새로고침</Button>
          </div>
        }
      >
        <p>대시보드 콘텐츠가 여기에 표시됩니다.</p>
      </ContentCard>
    </MainLayout>
  )
}
```

---

## 5. Pages (페이지)

**위치**: `src/components/pages/`

### 설명

Pages는 실제로 라우팅되는 최상위 페이지 컴포넌트입니다. Templates, Organisms, Molecules, Atoms를 조합하여 완전한 페이지를 구성합니다. 데이터 로딩, 상태 관리, 비즈니스 로직 등 모든 것을 담당합니다.

### 포함된 카테고리

프로젝트의 Pages는 도메인별로 다음과 같이 분류됩니다.

- **Acc**: 사고(Accident) 관련 페이지
- **Board**: 게시판(Notice, QnA, Share, Resource, TakeOver 등) 페이지
- **Engineer**: 엔지니어 설정 및 관리 페이지
- **Env**: 환경 설정 및 사용자 관리 페이지
- **Hist**: 히스토리 및 로그 페이지
- **Home**: 홈 및 건강 확인 페이지
- **Logs**: 상세 로그 페이지
- **Login**: 로그인 페이지
- **Main**: 메인 대시보드 페이지
- **Popup**: 팝업 윈도우 페이지
- **Report**: 보고서 및 통계 페이지
- **System**: 시스템 설정 및 관리 페이지
- **WebDash**: 웹 대시보드 페이지

### 특징

- 모든 계층의 컴포넌트를 조합하여 사용 가능
- React hooks를 통한 상태 관리
- API 호출 및 데이터 처리
- 라우터와 직접 연결되는 컴포넌트
- 가장 복잡하고 비즈니스 로직이 많은 계층

### 도메인별 구조 설명

각 도메인 폴더는 다음과 같은 구조를 가집니다.

```
src/components/pages/{Domain}/
├── index.tsx                 # 메인 페이지 컴포넌트
├── components/               # 페이지 내부 로컬 컴포넌트
│   ├── Modal1.tsx           # 모달 컴포넌트
│   ├── Table.tsx            # 테이블 컴포넌트
│   ├── DetailPanel.tsx       # 상세 정보 패널
│   └── ...
└── ...
```

### 페이지 내부 로컬 컴포넌트 구조

각 페이지 내부의 `components/` 폴더는 해당 페이지에서만 사용되는 로컬 컴포넌트들을 포함합니다. 이러한 로컬 컴포넌트들은:

1. **특정 페이지에만 사용**: 다른 페이지에서 재사용되지 않음
2. **페이지 로직에 의존**: 부모 페이지의 상태나 props에 의존
3. **비즈니스 로직 포함 가능**: 해당 도메인의 특화된 로직 포함

### 사용 예시: Pages 구조

```typescript
// src/components/pages/Acc/AccidentApplyListPage/index.tsx
import { useState, useEffect } from 'react'
import { MainLayout, ContentCard } from '@/components/templates'
import { Header, MenuBar, DataGrid } from '@/components/organisms'
import { Button } from '@/components/atoms'
import { AccidentDetailModal } from './components/AccidentDetailModal'
import { AccidentAddModal } from './components/AccidentAddModal'
import { AccidentEditModal } from './components/AccidentEditModal'

interface Accident {
  id: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'investigating' | 'resolved'
  createdAt: string
}

export function AccidentApplyListPage() {
  const [accidents, setAccidents] = useState<Accident[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedAccident, setSelectedAccident] = useState<Accident | null>(null)
  const [modalMode, setModalMode] = useState<'add' | 'edit' | 'detail' | null>(null)

  useEffect(() => {
    // API 호출로 사고 데이터 로드
    fetchAccidents()
  }, [])

  const fetchAccidents = async () => {
    try {
      setLoading(true)
      // API 호출
      const response = await fetch('/api/accidents')
      const data = await response.json()
      setAccidents(data)
    } catch (error) {
      console.error('사고 목록 로드 실패:', error)
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    { text: 'ID', datafield: 'id', width: 100 },
    { text: '제목', datafield: 'title', width: 200 },
    { text: '설명', datafield: 'description', width: 300 },
    { text: '심각도', datafield: 'severity', width: 100 },
    { text: '상태', datafield: 'status', width: 100 },
    { text: '생성일', datafield: 'createdAt', columntype: 'date' },
  ]

  const source = {
    datatype: 'array' as const,
    datafields: [
      { name: 'id', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'severity', type: 'string' },
      { name: 'status', type: 'string' },
      { name: 'createdAt', type: 'date' },
    ],
    localdata: accidents,
  }

  return (
    <MainLayout
      header={<Header />}
      sidebar={<MenuBar />}
    >
      <ContentCard
        title="사고 신청 목록"
        actions={
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => {
                setModalMode('add')
                setSelectedAccident(null)
              }}
            >
              새 사고 추가
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={fetchAccidents}
            >
              새로고침
            </Button>
          </div>
        }
      >
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          <DataGrid
            id="accidentGrid"
            columns={columns}
            source={source}
            height="500px"
            onRowSelect={(rowData) => {
              setSelectedAccident(rowData as Accident)
              setModalMode('detail')
            }}
            onRowDoubleClick={(rowData) => {
              setSelectedAccident(rowData as Accident)
              setModalMode('edit')
            }}
          />
        )}
      </ContentCard>

      {/* 상세 조회 모달 */}
      {selectedAccident && modalMode === 'detail' && (
        <AccidentDetailModal
          accident={selectedAccident}
          open={true}
          onOpenChange={(open) => !open && setModalMode(null)}
        />
      )}

      {/* 추가 모달 */}
      {modalMode === 'add' && (
        <AccidentAddModal
          open={true}
          onOpenChange={(open) => !open && setModalMode(null)}
          onSuccess={() => {
            setModalMode(null)
            fetchAccidents()
          }}
        />
      )}

      {/* 수정 모달 */}
      {selectedAccident && modalMode === 'edit' && (
        <AccidentEditModal
          accident={selectedAccident}
          open={true}
          onOpenChange={(open) => !open && setModalMode(null)}
          onSuccess={() => {
            setModalMode(null)
            fetchAccidents()
          }}
        />
      )}
    </MainLayout>
  )
}
```

### 로컬 컴포넌트 예시

```typescript
// src/components/pages/Acc/AccidentApplyListPage/components/AccidentDetailModal.tsx
import { Modal } from '@/components/organisms'
import { Typography } from '@/components/atoms'

interface Accident {
  id: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'investigating' | 'resolved'
  createdAt: string
}

interface AccidentDetailModalProps {
  accident: Accident
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AccidentDetailModal({
  accident,
  open,
  onOpenChange,
}: AccidentDetailModalProps) {
  const severityColors = {
    low: 'text-blue-600',
    medium: 'text-yellow-600',
    high: 'text-orange-600',
    critical: 'text-red-600',
  }

  const statusLabels = {
    pending: '대기 중',
    investigating: '조사 중',
    resolved: '해결됨',
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={accident.title}
      size="lg"
    >
      <div className="space-y-4">
        <div>
          <Typography variant="label">사고 ID</Typography>
          <Typography variant="body">{accident.id}</Typography>
        </div>

        <div>
          <Typography variant="label">설명</Typography>
          <Typography variant="body">{accident.description}</Typography>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Typography variant="label">심각도</Typography>
            <Typography
              variant="body"
              className={severityColors[accident.severity]}
            >
              {accident.severity}
            </Typography>
          </div>
          <div>
            <Typography variant="label">상태</Typography>
            <Typography variant="body">
              {statusLabels[accident.status]}
            </Typography>
          </div>
        </div>

        <div>
          <Typography variant="label">생성일</Typography>
          <Typography variant="body">
            {new Date(accident.createdAt).toLocaleString('ko-KR')}
          </Typography>
        </div>
      </div>
    </Modal>
  )
}
```

---

## 6. UI Primitives (UI 프리미티브)

**위치**: `src/components/ui/`

### 설명

UI Primitives는 **shadcn/ui** 기반의 헤드리스 컴포넌트들입니다. Atoms 계층이 이들을 감싸서 프로젝트에 맞게 스타일링하고 타입을 정의합니다. 직접 Pages나 다른 곳에서 import하여 사용할 수도 있지만, 가능하면 Atoms를 통해 사용하는 것이 권장됩니다.

### 포함된 컴포넌트

- **button.tsx**: 기본 버튼 컴포넌트 (CVA 기반)
- **input.tsx**: 텍스트 입력 필드
- **label.tsx**: 폼 레이블
- **card.tsx**: 카드 레이아웃
- **dialog.tsx**: 다이얼로그/모달 베이스

### 특징

- shadcn/ui 프리셋 사용
- Headless (스타일 최소화)
- Radix UI 기반
- CVA(Class Variance Authority)로 variant 관리

### 사용 패턴

```typescript
// UI Primitive 직접 사용 (권장 아님)
import { Button } from '@/components/ui/button'

// Atom을 통한 사용 (권장)
import { Button } from '@/components/atoms'
```

---

## Import 규칙

### Barrel Export 패턴

프로젝트의 모든 계층은 **Barrel Export** 패턴을 사용합니다. 이를 통해 깔끔한 import 구문을 유지할 수 있습니다.

### 각 계층의 index.ts

```typescript
// src/components/atoms/index.ts
export { Button, buttonVariants } from './Button'
export type { ButtonProps } from './Button'

export { Input } from './Input'
export type { InputProps } from './Input'

// ... 기타 atoms
```

```typescript
// src/components/molecules/index.ts
export { FormField } from './FormField'
export type { FormFieldProps } from './FormField'

export { InputWithIcon } from './InputWithIcon'
export type { InputWithIconProps } from './InputWithIcon'

// ... 기타 molecules
```

### Import 예시

```typescript
// 권장: Barrel Export 사용
import { Button, FormField, Input } from '@/components/atoms'
import { DataGrid, Modal } from '@/components/organisms'
import { MainLayout } from '@/components/templates'

// 비권장: 직접 경로 사용
import { Button } from '@/components/atoms/Button'
import { FormField } from '@/components/molecules/FormField'
```

### 계층 간 Import 규칙

Import 의존성은 다음과 같아야 합니다.

```
Atoms
  ↑
Molecules
  ↑
Organisms
  ↑
Templates
  ↑
Pages

(아래 계층은 위 계층을 import할 수 없음)
```

**규칙**:
- **Pages**: 모든 계층 import 가능
- **Templates**: Atoms, Molecules, Organisms import 가능
- **Organisms**: Atoms, Molecules, UI Primitives import 가능
- **Molecules**: Atoms, UI Primitives import 가능
- **Atoms**: UI Primitives, utils만 import 가능

---

## 새 컴포넌트 추가 가이드

### 어떤 레이어에 추가해야 하는지 결정하기

다음 체크리스트를 따라 새 컴포넌트가 속할 레이어를 결정하세요.

#### Atom인지 확인

- [ ] 더 이상 분해할 수 없는 기본 UI 요소인가?
- [ ] 다른 Atoms를 import하지 않는가? (UI Primitives만 사용)
- [ ] 단순한 props 기반 제어만 필요한가?
- [ ] 상태 관리가 필요 없거나 매우 제한적인가?

예: Button, Input, Label, Icon → **Atom**

#### Molecule인지 확인

- [ ] 2개 이상의 Atoms를 조합하는가?
- [ ] 특정 기능(폼 입력, 검색 등)을 목적으로 하는가?
- [ ] 다른 Molecules를 import하지 않는가?
- [ ] 비즈니스 로직이 없거나 매우 제한적인가?

예: FormField, InputWithIcon, RadioGroup → **Molecule**

#### Organism인지 확인

- [ ] Molecules나 Atoms 여러 개를 조합하는가?
- [ ] 복잡한 상태 관리나 비즈니스 로직을 포함하는가?
- [ ] 여러 기능을 통합하여 독립적인 섹션을 구성하는가?
- [ ] 다른 Organisms와 독립적으로 동작하는가?

예: DataGrid, Modal, Header → **Organism**

#### Template인지 확인

- [ ] 페이지의 레이아웃 구조를 정의하는가?
- [ ] Organisms나 Molecules를 조합하여 페이지 스켈레톤을 만드는가?
- [ ] 실제 데이터나 비즈니스 로직이 없는가?
- [ ] Props로 헤더, 사이드바, 콘텐츠 등을 받는가?

예: MainLayout, AuthLayout, PopupLayout → **Template**

#### Page인지 확인

- [ ] 라우터와 직접 연결되는가?
- [ ] 최상위 컴포넌트인가?
- [ ] API 호출 및 데이터 로딩을 담당하는가?
- [ ] 모든 계층의 컴포넌트를 조합하는가?

예: AccidentApplyListPage, UserMgmtPage → **Page**

### 새 컴포넌트 추가 체크리스트

#### 1단계: 프로젝트 구조 이해
- [ ] 기존의 유사한 컴포넌트 검토
- [ ] 해당 도메인의 구조 파악
- [ ] 의존성 확인

#### 2단계: 컴포넌트 생성
- [ ] 올바른 폴더에 컴포넌트 생성
- [ ] 파일명: PascalCase (예: `MyComponent.tsx`)
- [ ] Props 인터페이스 정의 (`{ComponentName}Props`)
- [ ] 타입 export 포함

```typescript
// src/components/atoms/MyComponent/index.tsx
export interface MyComponentProps {
  // props 정의
}

export function MyComponent(props: MyComponentProps) {
  // 구현
}
```

#### 3단계: Barrel Export 추가
- [ ] 해당 계층의 `index.ts`에 export 추가
- [ ] 컴포넌트와 타입 모두 export

```typescript
// src/components/atoms/index.ts에 추가
export { MyComponent } from './MyComponent'
export type { MyComponentProps } from './MyComponent'
```

#### 4단계: 스타일링
- [ ] Tailwind CSS 클래스 사용
- [ ] CSS-in-JS 필요시 라이브러리 검토
- [ ] 컴포넌트별 기본 스타일 정의

#### 5단계: 타입 안전성
- [ ] TypeScript 타입 완전 정의
- [ ] Props의 모든 속성에 타입 정의
- [ ] 필요시 제네릭 사용

#### 6단계: 문서화
- [ ] JSDoc 주석 작성

```typescript
/**
 * MyComponent 설명
 *
 * @param {string} label - 레이블 텍스트
 * @param {ReactNode} children - 자식 요소
 * @example
 * <MyComponent label="예제">내용</MyComponent>
 */
export function MyComponent({ label, children }: MyComponentProps) {
  // 구현
}
```

#### 7단계: 테스트
- [ ] 기본 렌더링 테스트
- [ ] Props 변화 테스트
- [ ] 엣지 케이스 테스트

#### 8단계: 검토
- [ ] 의존성이 규칙을 따르는지 확인
- [ ] 다른 개발자가 쉽게 이해할 수 있는지 검토
- [ ] 성능 최적화 확인

### 실전 예시: 새 Molecule 추가

```typescript
// src/components/molecules/PasswordInput/index.tsx
import { useState } from 'react'
import { Input } from '@/components/atoms'
import { Icon } from '@/components/atoms'
import { cn } from '@/lib/utils'

export interface PasswordInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
  disabled?: boolean
  className?: string
}

/**
 * 비밀번호 표시/숨김 토글 기능이 있는 입력 필드
 *
 * @example
 * <PasswordInput
 *   value={password}
 *   onChange={setPassword}
 *   placeholder="비밀번호를 입력하세요"
 * />
 */
export function PasswordInput({
  value,
  onChange,
  placeholder = '비밀번호',
  error,
  disabled = false,
  className,
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className={cn('relative', className)}>
      <Input
        type={isVisible ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setIsVisible(!isVisible)}
        disabled={disabled}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
      >
        <Icon name={isVisible ? 'eye-off' : 'eye'} size="sm" />
      </button>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
```

```typescript
// src/components/molecules/index.ts에 추가
export { PasswordInput } from './PasswordInput'
export type { PasswordInputProps } from './PasswordInput'
```

---

## 요약

KLID 프로젝트의 Atomic Design 구조는 다음과 같이 정리됩니다.

| 계층 | 위치 | 목적 | 특징 |
|------|------|------|------|
| **Atoms** | `atoms/` | 기본 UI 요소 | 재사용 불가능, 독립적 |
| **Molecules** | `molecules/` | Atoms 조합 | 특정 기능, 재사용 가능 |
| **Organisms** | `organisms/` | 복잡한 섹션 | 상태 관리, 비즈니스 로직 |
| **Templates** | `templates/` | 페이지 레이아웃 | 스켈레톤, 구조 정의 |
| **Pages** | `pages/` | 라우팅 페이지 | 최상위, 완전한 기능 |
| **UI** | `ui/` | shadcn/ui | Headless, 베이스 |

이 구조를 따르면 코드의 재사용성, 유지보수성, 확장성을 높일 수 있습니다. 새로운 컴포넌트를 추가할 때는 항상 이 가이드를 참고하여 올바른 계층에 배치하세요.
