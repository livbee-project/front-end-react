import styled from 'styled-components';

/**
 * ChatRoomPage의 Styled Components
 */

export const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 0 0 120px;
  background: #F5F6FF1A;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const ChatColumn = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const FixedPanel = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  z-index: 50;
  width: 100%;
  max-width: 1200px;
  background: #ffffff;
  padding: 12px 16px;
  box-sizing: border-box;
  border-bottom: 1px solid #e1e4f2;
`;

export const ScrollArea = styled.div`
  padding-top: 80px;
  padding-bottom: 120px; /* ComposerBar 높이 + 여유 공간 */
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
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

