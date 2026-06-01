import React from 'react';
import styled from 'styled-components';
import { ChevronLeft } from 'lucide-react';
import type { ChatUserInfo } from '@/domain/entities/Chat';

interface ContactHeaderProps {
  counterpart?: ChatUserInfo | null;
  displayName: string;
  displayRole: string;
  onBack: () => void;
}

const ContactHeader: React.FC<ContactHeaderProps> = ({
  counterpart,
  displayName,
  displayRole,
  onBack,
}) => {
  return (
    <ContactHeaderContainer>
      <ProfileGroup>
        <BackButton onClick={onBack} aria-label="이전 페이지로 이동">
          <ChevronLeft size={18} />
        </BackButton>
        <AvatarWrapper>
          <Avatar
            src={
              counterpart?.avatarUrl ||
              'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80'
            }
            alt={displayName}
            loading="eager"
            decoding="async"
          />
          <StatusDot />
        </AvatarWrapper>
        <NameRoleGroup>
          <HeaderName>{displayName}</HeaderName>
          {displayRole && <HeaderRole>{displayRole}</HeaderRole>}
        </NameRoleGroup>
      </ProfileGroup>
    </ContactHeaderContainer>
  );
};

const ContactHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0;
`;

const ProfileGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BackButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
`;

const Avatar = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
`;

const StatusDot = styled.span`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #3cd25a;
  border: 2px solid ${({ theme }) => theme.colors.surface};
`;

const NameRoleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const HeaderName = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.2;
`;

const HeaderRole = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.2;
`;

export default ContactHeader;

