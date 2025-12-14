import React from 'react';
import FormField from '@/presentation/components/forms/common/FormField';
import {
  FormSection,
  SectionTitle,
  InputGroup,
  LabelNote,
  StyledInput,
  StyledTextarea,
} from '@/presentation/components/forms/portfolio/PortfolioRegisterStyles';

interface BasicInfoSectionProps {
  name: string;
  oneLineIntro: string;
  detailedIntro: string;
  onChange: (field: 'name' | 'oneLineIntro' | 'detailedIntro', value: string) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  name,
  oneLineIntro,
  detailedIntro,
  onChange,
}) => {
  return (
    <FormSection>
      <SectionTitle>기본 정보</SectionTitle>
      <InputGroup>
        <FormField label="이름" required helper="실제 계약에 사용되는 이름입니다.">
          <StyledInput
            value={name}
            onChange={(event) => onChange('name', event.target.value)}
            placeholder="이름을 입력하세요"
          />
        </FormField>
        <FormField
          label="한줄 소개"
          helper={<LabelNote>최대 50자까지 입력 가능</LabelNote>}
        >
          <StyledInput
            value={oneLineIntro}
            onChange={(event) => onChange('oneLineIntro', event.target.value.slice(0, 50))}
            placeholder="한 줄 소개를 입력하세요"
          />
        </FormField>
        <FormField label="상세 소개" helper="활동 이력, 전문 분야 등을 자세히 작성해주세요.">
          <StyledTextarea
            value={detailedIntro}
            onChange={(event) => onChange('detailedIntro', event.target.value)}
            placeholder="상세 소개를 입력하세요"
          />
        </FormField>
      </InputGroup>
    </FormSection>
  );
};

