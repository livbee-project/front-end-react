import React, { useState } from 'react';
import { H2, P } from '@/presentation/components/styled/Typography';
import Button from './Button';
import Modal from './Modal';

export const BasicModalDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>모달 열기</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <H2>기본 모달</H2>
        <P style={{ marginTop: 16 }}>이것은 기본 모달입니다. 오버레이를 클릭하거나 ESC 키를 누르면 닫힙니다.</P>
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => setIsOpen(false)}>닫기</Button>
        </div>
      </Modal>
    </>
  );
};

export const SizeModalDemo: React.FC = () => {
  const [isOpenSmall, setIsOpenSmall] = useState(false);
  const [isOpenMedium, setIsOpenMedium] = useState(false);
  const [isOpenLarge, setIsOpenLarge] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Button onClick={() => setIsOpenSmall(true)}>작은 모달</Button>
      <Button onClick={() => setIsOpenMedium(true)}>중간 모달</Button>
      <Button onClick={() => setIsOpenLarge(true)}>큰 모달</Button>

      <Modal isOpen={isOpenSmall} onClose={() => setIsOpenSmall(false)} maxWidth="300px" width="90%">
        <H2>작은 모달</H2>
        <P style={{ marginTop: 16 }}>최대 너비 300px</P>
      </Modal>

      <Modal isOpen={isOpenMedium} onClose={() => setIsOpenMedium(false)} maxWidth="500px" width="90%">
        <H2>중간 모달</H2>
        <P style={{ marginTop: 16 }}>최대 너비 500px</P>
      </Modal>

      <Modal isOpen={isOpenLarge} onClose={() => setIsOpenLarge(false)} maxWidth="800px" width="90%">
        <H2>큰 모달</H2>
        <P style={{ marginTop: 16 }}>최대 너비 800px</P>
      </Modal>
    </div>
  );
};

export const LongContentModalDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>긴 콘텐츠 모달</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} maxWidth="600px">
        <H2>긴 콘텐츠 모달</H2>
        <P style={{ marginTop: 16 }}>이 모달은 스크롤 가능한 긴 콘텐츠를 포함합니다.</P>
        {Array.from({ length: 20 }, (_, i) => (
          <P key={i} style={{ marginTop: 16 }}>
            이것은 {i + 1}번째 문단입니다. 모달이 스크롤 가능하도록 충분한 콘텐츠를 포함하고 있습니다.
          </P>
        ))}
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => setIsOpen(false)}>닫기</Button>
        </div>
      </Modal>
    </>
  );
};

export const CloseOptionsModalDemo: React.FC = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Button onClick={() => setIsOpen1(true)}>오버레이 클릭 불가</Button>
      <Button onClick={() => setIsOpen2(true)}>ESC 키 불가</Button>
      <Button onClick={() => setIsOpen3(true)}>둘 다 불가</Button>

      <Modal isOpen={isOpen1} onClose={() => setIsOpen1(false)} closeOnOverlayClick={false}>
        <H2>오버레이 클릭 불가</H2>
        <P style={{ marginTop: 16 }}>오버레이를 클릭해도 닫히지 않습니다.</P>
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => setIsOpen1(false)}>닫기</Button>
        </div>
      </Modal>

      <Modal isOpen={isOpen2} onClose={() => setIsOpen2(false)} closeOnEscape={false}>
        <H2>ESC 키 불가</H2>
        <P style={{ marginTop: 16 }}>ESC 키로 닫을 수 없습니다.</P>
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => setIsOpen2(false)}>닫기</Button>
        </div>
      </Modal>

      <Modal
        isOpen={isOpen3}
        onClose={() => setIsOpen3(false)}
        closeOnOverlayClick={false}
        closeOnEscape={false}
      >
        <H2>둘 다 불가</H2>
        <P style={{ marginTop: 16 }}>오버레이 클릭과 ESC 키 모두 비활성화되었습니다.</P>
        <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => setIsOpen3(false)}>닫기</Button>
        </div>
      </Modal>
    </div>
  );
};

