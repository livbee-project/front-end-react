import React from 'react';
import SectionTitle from '@/presentation/components/ui/SectionTitle';

/**
 * FormSection 컴포넌트가 받을 props 타입을 정의합니다.
 * @param title - 섹션 제목 (선택)
 * @param children - 섹션 내부에 렌더링될 컨텐츠
 */
interface FormSectionProps {
  title?: string;
  children: React.ReactNode;
}

/**
 * 등록 페이지의 폼 섹션 컴포넌트입니다.
 * 제목과 컨텐츠를 포함한 일관된 섹션 스타일을 제공합니다.
 */
const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  /**
   * 섹션 컨테이너 스타일
   */
  const sectionStyle: React.CSSProperties = {
    marginBottom: '24px',
  };

  return (
    <div style={sectionStyle}>
      {title && (
        <SectionTitle variant="default" marginBottom="12px">
          {title}
        </SectionTitle>
      )}
      {children}
    </div>
  );
};

export default FormSection;

