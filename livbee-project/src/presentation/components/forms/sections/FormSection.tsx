import React from 'react';
import SectionTitle from '@/presentation/components/ui/SectionTitle';

interface FormSectionProps {
  title?: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
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

