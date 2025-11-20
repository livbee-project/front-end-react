import React from 'react';
import {
  FormSection,
  SectionTitle,
  SectionDescription,
  InputGroup,
  LabelText,
  LabelNote,
  StyledInput,
  StyledTextarea,
} from '../PortfolioRegisterStyles';

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
      <SectionDescription>소개에 사용할 기본 정보를 입력해주세요.</SectionDescription>
      <InputGroup>
        <label>
          <LabelText>이름</LabelText>
          <StyledInput
            value={name}
            onChange={(event) => onChange('name', event.target.value)}
            placeholder="이름을 입력해주세요."
          />
        </label>
        <label>
          <LabelText>
            한 줄 소개
            <LabelNote>최대 50자까지 입력 가능</LabelNote>
          </LabelText>
          <StyledInput
            value={oneLineIntro}
            onChange={(event) => onChange('oneLineIntro', event.target.value.slice(0, 50))}
            placeholder="예) 패션 전문 라이브 쇼호스트"
          />
        </label>
        <label>
          <LabelText>상세 소개</LabelText>
          <StyledTextarea
            value={detailedIntro}
            onChange={(event) => onChange('detailedIntro', event.target.value)}
            placeholder="활동 이력, 전문 분야 등을 자세히 작성해주세요."
          />
        </label>
      </InputGroup>
    </FormSection>
  );
};

