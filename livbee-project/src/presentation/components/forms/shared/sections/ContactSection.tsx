import React from 'react';
import styled from 'styled-components';
import ToggleSwitch from '@/presentation/components/ui/ToggleSwitch';
import FormField from '@/presentation/components/forms/common/FormField';
import {
  FormSection,
  SectionTitle,
  InputGroup,
  LabelNote,
  StyledInput,
} from '@/presentation/components/forms/portfolio/PortfolioRegisterStyles';
import { formatPhoneNumber, removePhoneHyphens } from '@/shared/utils/formatUtils';

interface ContactSectionProps {
  contact: string;
  openChat: string;
  contactEnabled: boolean;
  openChatEnabled: boolean;
  onInputChange: (field: 'contact' | 'openChat', value: string) => void;
  onToggleChange: (field: 'contact' | 'openChat') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contact,
  openChat,
  contactEnabled,
  openChatEnabled,
  onInputChange,
  onToggleChange,
}) => {
  return (
    <FormSection>
      <SectionTitle>연락처</SectionTitle>
      <InputGroup>
        <FormField
          label={
            <>
              연락처 <RequiredBadge>*</RequiredBadge> <LabelNote>계약 완료 시 브랜드에 전달됩니다</LabelNote>
            </>
          }
          action={<ToggleSwitch checked={contactEnabled} onChange={() => onToggleChange('contact')} />}
        >
          <StyledInput
            value={formatPhoneNumber(contact)}
            onChange={(event) => onInputChange('contact', removePhoneHyphens(event.target.value))}
            placeholder="010-1234-5678"
            disabled={!contactEnabled}
          />
        </FormField>

        <FormField
          label={
            <>
              오픈채팅방<LabelNote> 계약 완료 시 브랜드에 전달됩니다</LabelNote>
            </>
          }
          action={<ToggleSwitch checked={openChatEnabled} onChange={() => onToggleChange('openChat')} />}
        >
          <StyledInput
            value={openChat}
            onChange={(event) => onInputChange('openChat', event.target.value)}
            placeholder="https://open.kakao.com/..."
            disabled={!openChatEnabled}
          />
        </FormField>
      </InputGroup>
    </FormSection>
  );
};

const RequiredBadge = styled.span`
  color: ${({ theme }) => theme.colors.error};
  margin-left: ${({ theme }) => theme.spacing.xs};
`;
