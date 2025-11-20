import React from 'react';
import VerticalList from '@/presentation/components/list/VerticalList';
import ListItem from '@/presentation/components/list/ListItem';
import FormSection from '@/presentation/components/forms/FormSection';
import FormRow from '@/presentation/components/forms/FormRow';
import TextInput from '@/presentation/components/forms/TextInput';
import ToggleSwitch from '@/presentation/components/ui/ToggleSwitch';
import { Caption } from '@/presentation/components/styled/Typography';
import type { ModelTagEntry } from '../types';

interface TagsSectionProps {
  tags: ModelTagEntry[];
  tagToggles: boolean[];
  onTagChange: (index: number, value: string) => void;
  onToggleChange: (index: number) => void;
}

export const TagsSection: React.FC<TagsSectionProps> = ({ tags, tagToggles, onTagChange, onToggleChange }) => {
  return (
    <FormSection title="태그">
      <VerticalList showDividers={false}>
        {tags.map((tag, index) => (
          <ListItem key={tag.label} style={{ padding: 0, marginBottom: '12px' }}>
            <FormRow>
              <Caption style={{ width: 60 }}>{tag.label}</Caption>
              <div style={{ flex: 1, minWidth: 0 }}>
                <TextInput
                  placeholder="내용을 입력해주세요"
                  value={tag.value}
                  onChange={(e) => onTagChange(index, e.target.value)}
                  disabled={!tagToggles[index]}
                />
              </div>
              <ToggleSwitch checked={tagToggles[index]} onChange={() => onToggleChange(index)} />
            </FormRow>
          </ListItem>
        ))}
      </VerticalList>
    </FormSection>
  );
};

