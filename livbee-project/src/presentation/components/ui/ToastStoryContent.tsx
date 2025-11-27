import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Toast from './Toast';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;
  min-height: 200px;
  justify-content: center;
`;

export const InfoToastDemo: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <Container>
      <Button onClick={() => setShow(true)}>정보 토스트 표시</Button>
      {show && <Toast message="작업이 완료되었습니다." variant="info" duration={2000} onClose={() => setShow(false)} />}
    </Container>
  );
};

export const ErrorToastDemo: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <Container>
      <Button onClick={() => setShow(true)} variant="outline">
        에러 토스트 표시
      </Button>
      {show && (
        <Toast
          message="오류가 발생했습니다. 다시 시도해주세요."
          variant="error"
          duration={3000}
          onClose={() => setShow(false)}
        />
      )}
    </Container>
  );
};

export const ToastMessageVariations: React.FC = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showLong, setShowLong] = useState(false);

  return (
    <Container>
      <ButtonGroup>
        <Button onClick={() => setShowInfo(true)}>짧은 메시지</Button>
        <Button onClick={() => setShowError(true)} variant="outline">
          에러 메시지
        </Button>
        <Button onClick={() => setShowLong(true)} variant="secondary">
          긴 메시지
        </Button>
      </ButtonGroup>
      {showInfo && <Toast message="저장되었습니다." variant="info" duration={2000} onClose={() => setShowInfo(false)} />}
      {showError && (
        <Toast
          message="네트워크 오류가 발생했습니다."
          variant="error"
          duration={3000}
          onClose={() => setShowError(false)}
        />
      )}
      {showLong && (
        <Toast
          message="이 작업은 시간이 다소 걸릴 수 있습니다. 잠시만 기다려주세요."
          variant="info"
          duration={4000}
          onClose={() => setShowLong(false)}
        />
      )}
    </Container>
  );
};

export const ToastDurationVariations: React.FC = () => {
  const [showShort, setShowShort] = useState(false);
  const [showMedium, setShowMedium] = useState(false);
  const [showLong, setShowLong] = useState(false);

  return (
    <Container>
      <ButtonGroup>
        <Button onClick={() => setShowShort(true)}>1초</Button>
        <Button onClick={() => setShowMedium(true)} variant="outline">
          3초
        </Button>
        <Button onClick={() => setShowLong(true)} variant="secondary">
          5초
        </Button>
      </ButtonGroup>
      {showShort && (
        <Toast message="1초 후 사라집니다." variant="info" duration={1000} onClose={() => setShowShort(false)} />
      )}
      {showMedium && (
        <Toast message="3초 후 사라집니다." variant="info" duration={3000} onClose={() => setShowMedium(false)} />
      )}
      {showLong && (
        <Toast message="5초 후 사라집니다." variant="info" duration={5000} onClose={() => setShowLong(false)} />
      )}
    </Container>
  );
};

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

