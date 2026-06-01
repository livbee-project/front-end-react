import React from 'react';
import ContactHeader from '@/presentation/components/chat/ContactHeader';
import { ChatMessageList } from '@/presentation/components/chat/ChatMessageList';
import ComposerBar from '@/presentation/components/chat/ComposerBar';
import { useChatRoomPageController } from '@/presentation/hooks/chat/useChatRoomPageController';
import {
  PageWrapper,
  ChatColumn,
  FixedPanel,
  ScrollArea,
  MessageValue,
} from '@/presentation/components/chat/styled/ChatRoomStyles';

const ChatRoomPage: React.FC = () => {
  const {
    activeRoomId,
    roomDetail,
    displayedMessages,
    loading,
    error,
    isBrandUser,
    counterpart,
    displayName,
    displayRole,
    composer,
    sendError,
    scrollRef,
    autoScroll,
    handleScroll,
    onBack,
    setComposer,
    onSend,
    extractApplicationData,
    onApplicationAccept,
    onApplicationReject,
    onPaymentClick,
    onScrollToBottom,
  } = useChatRoomPageController();

  if (!activeRoomId) {
    return (
      <PageWrapper>
        <MessageValue>채팅방 정보가 없습니다. 메시지 목록으로 이동 중...</MessageValue>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <ChatColumn>
        <FixedPanel>
          <ContactHeader
            counterpart={counterpart}
            displayName={displayName}
            displayRole={displayRole}
            onBack={onBack}
          />
        </FixedPanel>

        <ScrollArea ref={scrollRef} onScroll={handleScroll}>
          <ChatMessageList
            displayedMessages={displayedMessages}
            roomDetail={roomDetail}
            loading={loading}
            error={error}
            autoScroll={autoScroll}
            isBrandUser={isBrandUser}
            extractApplicationData={extractApplicationData}
            onApplicationAccept={onApplicationAccept}
            onApplicationReject={onApplicationReject}
            onPaymentClick={onPaymentClick}
            onScrollToBottom={onScrollToBottom}
          />
        </ScrollArea>
      </ChatColumn>

      <ComposerBar
        value={composer}
        error={sendError}
        loading={loading}
        disabled={Boolean(error)}
        onChange={setComposer}
        onSend={onSend}
      />
    </PageWrapper>
  );
};

export default ChatRoomPage;
