import React from 'react';
import styled from 'styled-components';
import ToggleSwitch from '@/presentation/components/ui/ToggleSwitch';
import {
  FormSection,
  SectionTitle,
  SectionDescription,
} from '@/presentation/components/forms/portfolio/PortfolioRegisterStyles';
import { TAG_ENTRIES } from '@/presentation/components/forms/portfolio/constants';

interface TagsSectionProps {
  tags: string[];
  tagToggles: boolean[];
  onInputChange: (value: string, index: number) => void;
  onToggleChange: (index: number) => void;
}

const TagList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const TagItem = styled.div<{ $disabled: boolean }>`
  background-color: #F9FAFB;
  border: none;
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.2s;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  &:focus-within {
    background-color: ${({ theme }) => theme.colors.surface};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primary}20;
  }
`;

const TagLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #374151;
  min-width: 80px;
  flex-shrink: 0;
`;

const TagInputWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
`;

const TagInput = styled.input`
  background: transparent;
  border: none;
  padding: 0;
  font-size: 15px;
  color: #111111;
  flex: 1;
  font-family: inherit;
  min-width: 0;

  &::placeholder {
    color: #9CA3AF;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const TagUnit = styled.span`
  font-size: 15px;
  color: #6B7280;
  flex-shrink: 0;
`;

const ToggleWrapper = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
`;

export const TagsSection: React.FC<TagsSectionProps> = ({ tags, tagToggles, onInputChange, onToggleChange }) => {
  // 입력값에서 숫자만 추출하는 함수
  const extractNumbers = (value: string): string => {
    // 숫자만 추출 (소수점 포함)
    return value.replace(/[^\d.]/g, '');
  };

  // 표시용 값에서 숫자만 추출 (기존에 "165cm" 같은 형식으로 저장된 경우 대비)
  const getNumericValue = (value: string): string => {
    if (!value) return '';
    // 숫자만 추출
    const numbers = value.replace(/[^\d.]/g, '');
    return numbers;
  };

  const handleInputChange = (value: string, index: number) => {
    // 숫자만 추출하여 전달
    const numericValue = extractNumbers(value);
    onInputChange(numericValue, index);
  };

  return (
    <FormSection>
      <SectionTitle>태그</SectionTitle>
      <SectionDescription>공개하고 싶은 정보만 입력하고 토글을 활성화해주세요</SectionDescription>
      <TagList>
        {TAG_ENTRIES.map((tag) => {
          const numericValue = getNumericValue(tags[tag.id] || '');
          return (
            <TagItem key={tag.id} $disabled={!tagToggles[tag.id]}>
              <TagLabel>{tag.label}</TagLabel>
              <TagInputWrapper>
                <TagInput
                  type="text"
                  inputMode="numeric"
                  value={numericValue}
                  onChange={(event) => handleInputChange(event.target.value, tag.id)}
                  placeholder={tag.placeholder}
                  disabled={!tagToggles[tag.id]}
                />
                {tag.unit && <TagUnit>{tag.unit}</TagUnit>}
              </TagInputWrapper>
              <ToggleWrapper>
                <ToggleSwitch checked={tagToggles[tag.id]} onChange={() => onToggleChange(tag.id)} />
              </ToggleWrapper>
            </TagItem>
          );
        })}
      </TagList>
    </FormSection>
  );
};

