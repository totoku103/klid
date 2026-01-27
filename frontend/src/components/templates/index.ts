export { AuthLayout, AuthBox } from './AuthLayout'
export type { AuthLayoutProps, AuthBoxProps } from './AuthLayout'

export { AppLayout } from './AppLayout'

export { SimpleLayout } from './SimpleLayout'

export { DefaultLayout } from './DefaultLayout'

export { MainLayout, ContentCard } from './MainLayout'
export type { MainLayoutProps, ContentCardProps } from './MainLayout'

export { PopupLayout } from './PopupLayout'
export type { PopupLayoutProps } from './PopupLayout'

// Re-export from organisms for backward compatibility
export {
  ActionBar,
  ActionButton,
  SearchBar,
  SearchRow,
  SearchLabel,
  SearchSelect,
  SearchMultiSelect,
  SearchInput,
  SearchDateInput,
  SearchDateRange,
  SearchCheckbox,
  SearchField,
  // Backward compatibility aliases
  PageToolbar,
  ToolbarButton,
  SearchPanel,
} from '@/components/organisms'
export type {
  ActionBarProps,
  ActionButtonProps,
  SearchBarProps,
  SearchRowProps,
  SearchLabelProps,
  SearchSelectOption,
  SearchSelectProps,
  SearchMultiSelectProps,
  SearchInputProps,
  SearchDateRangeProps,
  SearchCheckboxProps,
  SearchFieldProps,
  // Backward compatibility aliases
  PageToolbarProps,
  ToolbarButtonProps,
  SearchPanelProps,
} from '@/components/organisms'
