import styled from 'styled-components';

/**
 * ChatRoomPage의 Styled Components
 */

export const PageWrapper = styled.div`
  min-height: 100dvh;
  padding: 0 0 160px;
  background: #f5f6ff1a;
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
  padding: 0 16px;

  @media (min-width: 1024px) {
    padding: 0 24px;
  }
`;

export const FixedPanel = styled.div`
  position: sticky;
  top: calc(env(safe-area-inset-top) + 0px);
  z-index: 50;
  width: 100%;
  background: #ffffff;
  padding: 12px 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #e1e4f2;

  @media (min-width: 768px) {
    border-radius: 0;
  }
`;

export const ScrollArea = styled.div`
  padding-top: 72px;
  padding-bottom: 160px; /* ComposerBar 높이 + 여유 공간 */
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
  padding: 24px 20px;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 16px 12px;
    gap: 12px;
  }
`;

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const MessageValue = styled.div`
  padding: 10px 12px;
  border-radius: 12px;
  background: #f5f6fc;
  color: #434659;
  margin: 8px 0;
`;

export const ScrollHintButton = styled.button`
  align-self: center;
  margin-top: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #e1e4f2;
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 0.75rem;
  color: #7d8299;
  background: #fff;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background: #f5f6ff;
  }
`;

