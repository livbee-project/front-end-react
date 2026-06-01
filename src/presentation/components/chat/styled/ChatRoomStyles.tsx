import styled from 'styled-components';

/**
 * ChatRoomPage의 Styled Components
 */

export const PageWrapper = styled.div`
  min-height: 100dvh;
  padding: 0 0 160px;
  background: ${({ theme }) => theme.colors.background};
  position: relative;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 0 200px;
  }
`;

export const ChatColumn = styled.div`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};

  @media (min-width: 1024px) {
    padding: 0 ${({ theme }) => theme.spacing.xl};
  }
`;

export const FixedPanel = styled.div`
  position: sticky;
  top: calc(env(safe-area-inset-top) + 0px);
  z-index: 50;
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: 768px) {
    border-radius: 0;
  }
`;

export const ScrollArea = styled.div`
  padding-top: 72px;
  padding-bottom: 160px;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
`;

export const ChatCard = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: transparent;
  padding: ${({ theme }) => `${theme.spacing.xl} 20px`};
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.md}`};
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const MessageValue = styled.div`
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

export const ScrollHintButton = styled.button`
  align-self: center;
  margin-top: ${({ theme }) => theme.spacing.md};
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 6px 14px;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.muted};
  background: ${({ theme }) => theme.colors.surface};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
  }
`;
