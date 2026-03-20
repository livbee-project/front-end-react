import React from 'react';
import { PageContainer, Title, MessageList } from '@/presentation/pages/message/styled/MessagesPageStyles';
import { DeleteRoomDialog } from '@/presentation/pages/message/components/DeleteRoomDialog';
import { MessageListContent } from '@/presentation/pages/message/components/MessageListContent';
import { useMessagesPageController } from '@/presentation/hooks/message/useMessagesPageController';

const MessagesPage: React.FC = () => {
  const {
    rooms,
    loading,
    error,
    refresh,
    deletingRoomName,
    showDeleteDialog,
    confirmDelete,
    cancelDelete,
    handleMessageClick,
    handleDeleteClick,
  } = useMessagesPageController();

  return (
    <>
      <PageContainer>
        <Title>메시지</Title>
        <MessageList>
          <MessageListContent
            rooms={rooms}
            loading={loading}
            error={error}
            onRefresh={refresh}
            onMessageClick={handleMessageClick}
            onDeleteClick={handleDeleteClick}
          />
        </MessageList>
      </PageContainer>
      {showDeleteDialog && (
        <DeleteRoomDialog
          roomName={deletingRoomName ?? ''}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
};

export default MessagesPage;

