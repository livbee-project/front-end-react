import React from 'react';
import FormSection from '@/presentation/components/forms/sections/FormSection';
import TextInput from '@/presentation/components/forms/inputs/TextInput';
import ToggleSwitch from '@/presentation/components/ui/ToggleSwitch';
import FormField from '@/presentation/components/forms/common/FormField';

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
        <FormField
          label="연락처"
          helper="연락 가능한 번호를 입력해주세요."
          action={<ToggleSwitch checked={contactEnabled} onChange={onContactToggle} />}
        >
          <TextInput
            placeholder="010-0000-0000"
            value={contact}
            onChange={(e) => onContactChange(e.target.value)}
            disabled={!contactEnabled}
          />
        </FormField>
      </FormSection>
      <FormSection title="오픈채팅방">
        <FormField
          label="채팅 링크"
          helper="카카오톡 오픈채팅 등 링크를 입력해주세요."
          action={<ToggleSwitch checked={openChatEnabled} onChange={onOpenChatToggle} />}
        >
          <TextInput
            placeholder="https://open.kakao.com/..."
            value={openChat}
            onChange={(e) => onOpenChatChange(e.target.value)}
            disabled={!openChatEnabled}
          />
        </FormField>
      </FormSection>
    </>
  );
};

