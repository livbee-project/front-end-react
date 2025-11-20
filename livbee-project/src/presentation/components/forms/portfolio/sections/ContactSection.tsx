import React from 'react';
import ToggleSwitch from '@/presentation/components/ui/ToggleSwitch';
import {
  FormSection,
  SectionTitle,
  SectionDescription,
  InputGroup,
  LabelText,
  LabelNote,
  FieldRow,
  StyledInput,
} from '../PortfolioRegisterStyles';

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
      <SectionDescription>브랜드와의 원활한 소통을 위해 정확히 입력해주세요.</SectionDescription>
      <InputGroup>
        <label>
          <LabelText>
            연락처
            <LabelNote>계약 완료 시 브랜드에 전달됩니다</LabelNote>
          </LabelText>
          <FieldRow>
            <StyledInput
              value={contact}
              onChange={(event) => onInputChange('contact', event.target.value)}
              placeholder="010-1234-5678"
              disabled={!contactEnabled}
            />
            <ToggleSwitch checked={contactEnabled} onChange={() => onToggleChange('contact')} />
          </FieldRow>
        </label>
        <label>
          <LabelText>오픈채팅방</LabelText>
          <FieldRow>
            <StyledInput
              value={openChat}
              onChange={(event) => onInputChange('openChat', event.target.value)}
              placeholder="https://open.kakao.com/..."
              disabled={!openChatEnabled}
            />
            <ToggleSwitch checked={openChatEnabled} onChange={() => onToggleChange('openChat')} />
          </FieldRow>
        </label>
      </InputGroup>
    </FormSection>
  );
};

