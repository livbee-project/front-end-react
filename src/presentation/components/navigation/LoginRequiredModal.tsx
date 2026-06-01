import React from 'react';
import styled from 'styled-components';
import Modal from '@/presentation/components/ui/Modal';
import Button from '@/presentation/components/ui/Button';
import { H2, P } from '@/presentation/components/styled/Typography';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

/**
 * 로그인이 필요한 경우 표시하는 모달 컴포넌트
 */
const LoginRequiredModal: React.FC<LoginRequiredModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="400px" closeOnOverlayClick={true}>
      <ModalContent>
        <H2>로그인이 필요합니다</H2>
        <P>회원 전용 서비스입니다. 로그인 후 이용해주세요.</P>
        <ButtonGroup>
          <Button variant="outline" onClick={onClose} fullWidth>
            취소
          </Button>
          <Button variant="primary" onClick={onConfirm} fullWidth>
            로그인하기
          </Button>
        </ButtonGroup>
      </ModalContent>
    </Modal>
  );
};

export default LoginRequiredModal;

