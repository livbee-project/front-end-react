import React from 'react';
import FormSection from '@/presentation/components/forms/FormSection';
import FormRow from '@/presentation/components/forms/FormRow';
import TextInput from '@/presentation/components/forms/TextInput';
import ToggleSwitch from '@/presentation/components/ui/ToggleSwitch';

interface ContactSectionProps {
  contact: string;
  openChat: string;
  contactEnabled: boolean;
  openChatEnabled: boolean;
  onContactChange: (value: string) => void;
  onOpenChatChange: (value: string) => void;
  onContactToggle: () => void;
  onOpenChatToggle: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  contact,
  openChat,
  contactEnabled,
  openChatEnabled,
  onContactChange,
  onOpenChatChange,
  onContactToggle,
  onOpenChatToggle,
}) => {
  return (
    <>
      <FormSection title="연락처">
        <FormRow>
          <div style={{ flex: 1, minWidth: 0 }}>
            <TextInput placeholder="내용을 입력해주세요" value={contact} onChange={(e) => onContactChange(e.target.value)} disabled={!contactEnabled} />
          </div>
          <ToggleSwitch checked={contactEnabled} onChange={onContactToggle} />
        </FormRow>
      </FormSection>
      <FormSection title="오픈채팅방">
        <FormRow>
          <div style={{ flex: 1, minWidth: 0 }}>
            <TextInput placeholder="내용을 입력해주세요" value={openChat} onChange={(e) => onOpenChatChange(e.target.value)} disabled={!openChatEnabled} />
          </div>
          <ToggleSwitch checked={openChatEnabled} onChange={onOpenChatToggle} />
        </FormRow>
      </FormSection>
    </>
  );
};

