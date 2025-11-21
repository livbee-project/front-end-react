import React from 'react';
import FormSection from '@/presentation/components/forms/sections/FormSection';
import FormField from '@/presentation/components/forms/common/FormField';
import { InputGroup, LabelNote, StyledInput, StyledTextarea } from '../PortfolioRegisterStyles';

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
    <FormSection title="기본 정보" description="소개에 사용할 기본 정보를 입력해주세요.">
      <InputGroup>
        <FormField label="이름" required helper="실제 계약에 사용되는 이름입니다.">
          <StyledInput
            value={name}
            onChange={(event) => onChange('name', event.target.value)}
            placeholder="이름을 입력해주세요."
          />
        </FormField>
        <FormField
          label="한 줄 소개"
          helper={<LabelNote>최대 50자까지 입력 가능</LabelNote> as unknown as string}
        >
          <StyledInput
            value={oneLineIntro}
            onChange={(event) => onChange('oneLineIntro', event.target.value.slice(0, 50))}
            placeholder="예) 패션 전문 라이브 쇼호스트"
          />
        </FormField>
        <FormField label="상세 소개" helper="활동 이력, 전문 분야 등을 자세히 작성해주세요.">
          <StyledTextarea
            value={detailedIntro}
            onChange={(event) => onChange('detailedIntro', event.target.value)}
            placeholder="활동 이력, 전문 분야 등을 자세히 작성해주세요."
          />
        </FormField>
      </InputGroup>
    </FormSection>
  );
};

