import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  padding: 32px 20px;
  box-sizing: border-box;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    padding: 20px 16px 80px;
    min-height: 100dvh;
  }
`;

export const Title = styled.h1`
  margin: 0 0 24px;
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`;

export const AvatarContainer = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const Avatar = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
`;

export const MessageContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Name = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const Timestamp = styled.div`
  font-size: 12px;
  color: #a0a0b0;
  flex-shrink: 0;
`;

export const MessageText = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EmptyState = styled.div`
  padding: 48px 24px;
  text-align: center;
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: 16px;
  color: #7b7f92;
  background: ${({ theme }) => theme.colors.surface};
`;

export const RetryButton = styled.button`
  margin-top: 12px;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;

export const DeleteButton = styled.button`
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: ${({ theme }) => theme.colors.error};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  flex-shrink: 0;

  &:hover {
    background: #fee2e2;
  }

  &:active {
    background: #fecaca;
  }
`;

export const MessageItemWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 0;
  border-bottom: 1px solid #f2f2f5;

  @media (max-width: 600px) {
    padding: 12px 0;
    gap: 12px;
  }
`;

export const MessageItemContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  cursor: pointer;
  min-width: 0;
`;

