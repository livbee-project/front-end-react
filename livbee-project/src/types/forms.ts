/**
 * 공통 폼 타입 정의
 */

// ===== 폼 필드 데이터 =====

export interface RegistrationInfoFields {
  registrationType: string;
  oneLineIntro: string;
  detailedIntro: string;
}

export interface ContactInfoFields {
  contact: string;
  openChat: string;
}

export interface WebsiteEntry {
  related: string;
  content: string;
}

export interface TagEntry {
  label: string;
  value: string;
}

export interface ToggleGroupState {
  websites: boolean[];
  contact: boolean;
  openChat: boolean;
  tags: boolean[];
}

// ===== 폼 섹션 Props =====

export interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export interface FormFieldProps {
  label?: React.ReactNode;
  required?: boolean;
  description?: React.ReactNode;
  helper?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
}

export interface FormRowProps {
  children: React.ReactNode;
}

// ===== 입력 필드 Props =====

export interface TextInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string;
  description?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface DateInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TimeInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// ===== 폼 섹션별 Props =====

export interface BasicInfoSectionProps {
  name: string;
  oneLineIntro: string;
  detailedIntro: string;
  onChange: (field: 'name' | 'oneLineIntro' | 'detailedIntro', value: string) => void;
}

export interface ContactSectionProps {
  contact: string;
  openChat: string;
  contactEnabled: boolean;
  openChatEnabled: boolean;
  onInputChange: (field: 'contact' | 'openChat', value: string) => void;
  onToggleChange: (field: 'contact' | 'openChat') => void;
}

export interface GallerySectionProps {
  images: string[];
  onSelectImage: (file: File) => void;
  onRemoveImage: (index: number) => void;
}

export interface SubmitSectionProps {
  disabled: boolean;
  isSubmitting: boolean;
  onSubmit?: () => void;
}

export interface RegistrationTypeSectionProps {
  value: string;
  onChange: (value: string) => void;
}

