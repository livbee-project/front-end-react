import React from 'react';
import styled from 'styled-components';

const DeleteDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const DeleteDialogContent = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const DeleteDialogTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 18px;
  font-weight: 700;
  color: #0f0f17;
`;

const DeleteDialogMessage = styled.p`
  margin: 0 0 24px;
  font-size: 14px;
  color: #696a7c;
  line-height: 1.5;
`;

const DeleteDialogActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const DialogButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $variant }) =>
    $variant === 'primary'
      ? `
    background: #ef4444;
    color: #fff;
    &:hover {
      background: #dc2626;
    }
    &:active {
      background: #b91c1c;
    }
  `
      : `
    background: #f4f5fb;
    color: #3a3b4f;
    &:hover {
      background: #e5e7eb;
    }
    &:active {
      background: #d1d5db;
    }
  `}
`;

interface DeleteRoomDialogProps {
  roomName: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteRoomDialog: React.FC<DeleteRoomDialogProps> = ({
  roomName,
  onConfirm,
  onCancel,
}) => {
  return (
    <DeleteDialog onClick={onCancel}>
      <DeleteDialogContent onClick={(e) => e.stopPropagation()}>
        <DeleteDialogTitle>채팅방 삭제</DeleteDialogTitle>
        <DeleteDialogMessage>
          {roomName}님과의 채팅방을 삭제하시겠습니까?
          <br />
          삭제된 채팅방은 복구할 수 없습니다.
        </DeleteDialogMessage>
        <DeleteDialogActions>
          <DialogButton type="button" $variant="secondary" onClick={onCancel}>
            취소
          </DialogButton>
          <DialogButton type="button" $variant="primary" onClick={onConfirm}>
            삭제
          </DialogButton>
        </DeleteDialogActions>
      </DeleteDialogContent>
    </DeleteDialog>
  );
};

