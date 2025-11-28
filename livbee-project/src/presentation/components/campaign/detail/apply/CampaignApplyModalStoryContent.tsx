import React, { useState } from 'react';
import styled from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import CampaignApplyModal from './CampaignApplyModal';
import Button from '@/presentation/components/ui/Button';
import { ToastProvider } from '@/presentation/contexts/ToastContext';

const StoryProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <MemoryRouter>
    <ToastProvider>{children}</ToastProvider>
  </MemoryRouter>
);

export const CampaignApplyModalDefaultStory: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StoryProviders>
      <Container>
        <Button onClick={() => setIsOpen(true)}>지원하기 모달 열기</Button>
        <CampaignApplyModal
          isOpen={isOpen}
          campaignId="camp-story-1"
          campaignTitle="2024 봄/여름 패션 라이브 쇼핑"
          onClose={() => setIsOpen(false)}
        />
      </Container>
    </StoryProviders>
  );
};

export const CampaignApplyModalVariantsStory: React.FC = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  return (
    <StoryProviders>
      <Container>
        <ButtonRow>
          <Button onClick={() => setIsOpen1(true)}>패션 캠페인</Button>
          <Button onClick={() => setIsOpen2(true)} variant="outline">
            뷰티 캠페인
          </Button>
          <Button onClick={() => setIsOpen3(true)} variant="secondary">
            리빙 캠페인
          </Button>
        </ButtonRow>
        <CampaignApplyModal
          isOpen={isOpen1}
          campaignId="camp-fashion"
          campaignTitle="2024 봄/여름 패션 라이브 쇼핑"
          onClose={() => setIsOpen1(false)}
        />
        <CampaignApplyModal
          isOpen={isOpen2}
          campaignId="camp-beauty"
          campaignTitle="신제품 뷰티 제품 리뷰 및 소개"
          onClose={() => setIsOpen2(false)}
        />
        <CampaignApplyModal
          isOpen={isOpen3}
          campaignId="camp-living"
          campaignTitle="홈데코 및 리빙 아이템 큐레이션"
          onClose={() => setIsOpen3(false)}
        />
      </Container>
    </StoryProviders>
  );
};

export const CampaignApplyModalLongTitleStory: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StoryProviders>
      <Container>
        <Button onClick={() => setIsOpen(true)}>긴 제목 모달 열기</Button>
        <CampaignApplyModal
          isOpen={isOpen}
          campaignId="camp-long-title"
          campaignTitle="2024 봄/여름 시즌 신상품 패션 라이브 쇼핑 및 스타일링 가이드"
          onClose={() => setIsOpen(false)}
        />
      </Container>
    </StoryProviders>
  );
};

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

