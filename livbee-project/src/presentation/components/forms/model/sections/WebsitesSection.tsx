import React from 'react';
import styled from 'styled-components';
import VerticalList from '@/presentation/components/list/VerticalList';
import ListItem from '@/presentation/components/list/ListItem';
import TextInput from '@/presentation/components/forms/inputs/TextInput';
import ToggleSwitch from '@/presentation/components/ui/ToggleSwitch';
import FormSection from '@/presentation/components/forms/sections/FormSection';
import type { ModelWebsiteEntry } from '../types';
import FormField from '@/presentation/components/forms/common/FormField';

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
    <FormSection
      title="웹사이트"
      description="활동 중인 웹사이트나 SNS 채널을 등록하면 검색 노출에 도움이 됩니다."
    >
      <VerticalList showDividers={false}>
        {websites.map((website, index) => (
          <StyledListItem key={index}>
            <FormField
              label={`채널 ${index + 1}`}
              action={<ToggleSwitch checked={websiteToggles[index]} onChange={() => onToggleChange(index)} />}
            >
              <FieldGrid>
                <TextInput
                  placeholder="관련 입력값"
                  value={website.related}
                  onChange={(e) => onWebsiteChange(index, 'related', e.target.value)}
                />
                <TextInput
                  placeholder="링크를 입력해주세요"
                  value={website.content}
                  onChange={(e) => onWebsiteChange(index, 'content', e.target.value)}
                />
              </FieldGrid>
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

const FieldGrid = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;

  & > * {
    flex: 1;
    min-width: 200px;
  }
`;

