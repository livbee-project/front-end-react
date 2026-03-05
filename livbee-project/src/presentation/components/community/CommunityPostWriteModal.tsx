import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CommunityPostWritePage from '@/presentation/pages/community/CommunityPostWritePage';

const CommunityPostWriteModal: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Overlay
      role="dialog"
      aria-modal="true"
      aria-label="커뮤니티 글쓰기"
      onClick={handleClose}
    >
      <ModalContainer
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <CommunityPostWritePage variant="modal" />
      </ModalContainer>
    </Overlay>
  );
};

export default CommunityPostWriteModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.35);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3.5rem 1rem 2rem;
  z-index: 120;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: center;
    padding: 0 1rem;
  }
`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.3);
`;

