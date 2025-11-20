import React from 'react';
import VerticalList from '@/presentation/components/list/VerticalList';
import ListItem from '@/presentation/components/list/ListItem';
import TextInput from '@/presentation/components/forms/TextInput';
import ToggleSwitch from '@/presentation/components/ui/ToggleSwitch';
import FormSection from '@/presentation/components/forms/FormSection';
import FormRow from '@/presentation/components/forms/FormRow';
import type { ModelWebsiteEntry } from '../types';

interface WebsitesSectionProps {
  websites: ModelWebsiteEntry[];
  websiteToggles: boolean[];
  onWebsiteChange: (index: number, field: keyof ModelWebsiteEntry, value: string) => void;
  onToggleChange: (index: number) => void;
}

export const WebsitesSection: React.FC<WebsitesSectionProps> = ({
  websites,
  websiteToggles,
  onWebsiteChange,
  onToggleChange,
}) => {
  return (
    <FormSection title="웹사이트">
      <VerticalList showDividers={false}>
        {websites.map((website, index) => (
          <ListItem key={index} style={{ padding: 0, marginBottom: '12px' }}>
            <FormRow>
              <div style={{ flex: 1, minWidth: 0 }}>
                <TextInput
                  placeholder="관련 입력값"
                  value={website.related}
                  onChange={(e) => onWebsiteChange(index, 'related', e.target.value)}
                />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <TextInput
                  placeholder="내용을 입력해주세요"
                  value={website.content}
                  onChange={(e) => onWebsiteChange(index, 'content', e.target.value)}
                />
              </div>
              <ToggleSwitch checked={websiteToggles[index]} onChange={() => onToggleChange(index)} />
            </FormRow>
          </ListItem>
        ))}
      </VerticalList>
    </FormSection>
  );
};

