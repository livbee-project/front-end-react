import React from 'react';
import styled from 'styled-components';
import ToggleSwitch from '@/presentation/components/ui/ToggleSwitch';
import {
  FormSection,
  SectionTitle,
  SectionDescription,
  StyledInput,
  FieldRow,
} from '../PortfolioRegisterStyles';
import { TAG_ENTRIES } from '../constants';
import { P } from '@/presentation/components/styled/Typography';

interface TagsSectionProps {
  tags: string[];
  tagToggles: boolean[];
  onInputChange: (value: string, index: number) => void;
  onToggleChange: (index: number) => void;
}

const TagList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const TagLabel = styled(P)`
  min-width: 80px;
  font-weight: 500;
`;

const TagInputWrapper = styled(FieldRow)`
  flex: 1;
`;

export const TagsSection: React.FC<TagsSectionProps> = ({ tags, tagToggles, onInputChange, onToggleChange }) => {
  return (
    <FormSection>
      <SectionTitle>태그</SectionTitle>
      <SectionDescription>키, 사이즈 등 공개하고 싶은 정보를 선택하세요.</SectionDescription>
      <TagList>
        {TAG_ENTRIES.map((tag) => (
          <TagItem key={tag.id}>
            <TagLabel>{tag.label}</TagLabel>
            <TagInputWrapper>
              <StyledInput
                as="input"
                value={tags[tag.id]}
                onChange={(event) => onInputChange(event.target.value, tag.id)}
                placeholder={tag.placeholder}
                disabled={!tagToggles[tag.id]}
              />
              <ToggleSwitch checked={tagToggles[tag.id]} onChange={() => onToggleChange(tag.id)} />
            </TagInputWrapper>
          </TagItem>
        ))}
      </TagList>
    </FormSection>
  );
};

