import React from 'react';
import ToggleSwitch from '@/presentation/components/ui/ToggleSwitch';
import FormSection from '@/presentation/components/forms/sections/FormSection';
import FormField from '@/presentation/components/forms/common/FormField';
import { InputGroup, LabelNote, FieldRow, StyledInput } from '../PortfolioRegisterStyles';

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
    <FormSection title="연락처" description="브랜드와의 원활한 소통을 위해 정확히 입력해주세요.">
      <InputGroup>
        <FormField
          label="연락처"
          helper={<LabelNote>계약 완료 시 브랜드에 전달됩니다.</LabelNote>}
          action={<ToggleSwitch checked={contactEnabled} onChange={() => onToggleChange('contact')} />}
        >
          <FieldRow>
            <StyledInput
              value={contact}
              onChange={(event) => onInputChange('contact', event.target.value)}
              placeholder="010-1234-5678"
              disabled={!contactEnabled}
            />
          </FieldRow>
        </FormField>

        <FormField
          label="오픈채팅방"
          action={<ToggleSwitch checked={openChatEnabled} onChange={() => onToggleChange('openChat')} />}
        >
          <FieldRow>
            <StyledInput
              value={openChat}
              onChange={(event) => onInputChange('openChat', event.target.value)}
              placeholder="https://open.kakao.com/..."
              disabled={!openChatEnabled}
            />
          </FieldRow>
        </FormField>
      </InputGroup>
    </FormSection>
  );
};

