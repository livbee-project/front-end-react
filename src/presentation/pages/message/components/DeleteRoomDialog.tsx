import React from 'react';
import styled, { css } from 'styled-components';

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
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 24px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const DeleteDialogTitle = styled.h3`
  margin: 0 0 12px;
  font: ${({ theme }) => theme.fonts.h3};
  color: ${({ theme }) => theme.colors.text};
`;

const DeleteDialogMessage = styled.p`
  margin: 0 0 24px;
  font: ${({ theme }) => theme.fonts.p1};
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

const DeleteDialogActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

const primaryDialogButton = css`
  background: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.errorForeground};

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.85;
  }
`;

const secondaryDialogButton = css`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    background: ${({ theme }) => theme.colors.border};
  }

  &:active {
    opacity: 0.9;
  }
`;

const DialogButton = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font: ${({ theme }) => theme.fonts.p1};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${({ $variant }) => ($variant === 'primary' ? primaryDialogButton : secondaryDialogButton)}
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

