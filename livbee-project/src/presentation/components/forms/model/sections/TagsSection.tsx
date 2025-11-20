import React from 'react';
import styled from 'styled-components';
import VerticalList from '@/presentation/components/list/VerticalList';
import ListItem from '@/presentation/components/list/ListItem';
import FormSection from '@/presentation/components/forms/sections/FormSection';
import TextInput from '@/presentation/components/forms/inputs/TextInput';
import ToggleSwitch from '@/presentation/components/ui/ToggleSwitch';
import type { ModelTagEntry } from '../types';
import FormField from '@/presentation/components/forms/common/FormField';

interface TagsSectionProps {
  tags: ModelTagEntry[];
  tagToggles: boolean[];
  onTagChange: (index: number, value: string) => void;
  onToggleChange: (index: number) => void;
}

export const TagsSection: React.FC<TagsSectionProps> = ({ tags, tagToggles, onTagChange, onToggleChange }) => {
  return (
    <FormSection title="태그" description="키, 사이즈 등 주요 정보를 태그로 등록하세요.">
      <VerticalList showDividers={false}>
        {tags.map((tag, index) => (
          <StyledListItem key={tag.label}>
            <FormField
              label={tag.label}
              action={<ToggleSwitch checked={tagToggles[index]} onChange={() => onToggleChange(index)} />}
            >
              <TextInput
                placeholder="내용을 입력해주세요"
                value={tag.value}
                onChange={(e) => onTagChange(index, e.target.value)}
                disabled={!tagToggles[index]}
              />
            </FormField>
          </StyledListItem>
        ))}
      </VerticalList>
    </FormSection>
  );
};

const StyledListItem = styled(ListItem)`
  padding: 0;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

