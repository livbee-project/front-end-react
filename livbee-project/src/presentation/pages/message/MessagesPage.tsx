import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChatRooms } from '@/presentation/hooks/useChatRooms';
import { debug } from '@/shared/utils/logger';
import { PageContainer, Title, MessageList } from './styled/MessagesPageStyles';
import { DeleteRoomDialog } from './components/DeleteRoomDialog';
import { MessageListContent } from './components/MessageListContent';
import { useRoomDeletion } from './hooks/useRoomDeletion';

const MessagesPage: React.FC = () => {
  const navigate = useNavigate();
  const { rooms, loading, error, refresh } = useChatRooms();
  const { deletingRoomName, showDeleteDialog, startDelete, confirmDelete, cancelDelete } = useRoomDeletion({
    rooms,
    refresh,
  });

  // 디버깅: 상태 확인
  useEffect(() => {
    debug('MessagesPage', '상태:', { loading, error, roomsCount: rooms.length, rooms });
  }, [loading, error, rooms]);

  const handleMessageClick = useCallback((roomId: string, event?: React.MouseEvent) => {
    // 삭제 버튼 클릭 시에는 네비게이션하지 않음
    if (event && (event.target as HTMLElement).closest('button')) {
      return;
    }
    navigate(`/chat/${roomId}`);
  }, [navigate]);

  // room.deleted 이벤트 처리 (다른 사용자가 삭제한 경우)
  useEffect(() => {
    // TODO: 글로벌 WebSocket 연결이 필요할 수 있음
    // 현재는 삭제한 사용자 본인만 refresh()로 처리
    // 다른 사용자가 삭제한 경우를 위해 글로벌 WebSocket 이벤트 리스너 추가 필요
  }, []);

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
            onDeleteClick={(roomId, event) => {
              event.stopPropagation();
              startDelete(roomId);
            }}
          />
        </MessageList>
      </PageContainer>
      {showDeleteDialog && (
        <DeleteRoomDialog
          roomName={deletingRoomName}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </>
  );
};

export default MessagesPage;

