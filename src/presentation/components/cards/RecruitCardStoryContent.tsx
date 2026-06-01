 
import React from 'react';
import styled from 'styled-components';
import Button from '@/presentation/components/ui/Button';
import PlaceholderImage from '@/presentation/components/ui/PlaceholderImage';
import RecruitCard from '@/presentation/components/cards/RecruitCard';

interface RecruitCardScrollProps {
  children: React.ReactNode;
}

export const RecruitCardScroll: React.FC<RecruitCardScrollProps> = ({ children }) => (
  <ScrollContainer>{children}</ScrollContainer>
);

interface RecruitCardImageProps {
  imageUrl?: string;
  children?: React.ReactNode;
}

export const RecruitCardImage: React.FC<RecruitCardImageProps> = ({ imageUrl, children }) => (
  <TopImage $imageUrl={imageUrl}>{children ?? <PlaceholderImage size={64} />}</TopImage>
);

export const RecruitCardBottomVariations: React.FC = () => (
  <RecruitCardScroll>
    <RecruitCard
      topContent={<RecruitCardImage imageUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80" />}
      bottomContent={
        <Button variant="primary" fullWidth>
          지원하기
        </Button>
      }
      brandName="브랜드 A"
      title="패션 라이브 쇼핑"
      content="봄 신상품 소개"
    />
    <RecruitCard
      topContent={<RecruitCardImage imageUrl="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80" />}
      bottomContent={
        <ButtonGroup>
          <Button variant="outline">상세보기</Button>
          <Button variant="primary">지원하기</Button>
        </ButtonGroup>
      }
      brandName="브랜드 B"
      title="뷰티 제품 리뷰"
      content="신제품 화장품 체험"
    />
    <RecruitCard
      topContent={<RecruitCardImage imageUrl="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80" />}
      bottomContent={
        <StackedInfo>
          <span>마감일: 2024.12.31</span>
          <Button variant="primary" fullWidth>
            지원하기
          </Button>
        </StackedInfo>
      }
      brandName="브랜드 C"
      title="홈데코 아이템"
      content="인테리어 소품 소개"
    />
  </RecruitCardScroll>
);

export const RecruitCardDefaultArgs = {
  topContent: <RecruitCardImage imageUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80" />,
  bottomContent: (
    <Button variant="primary" fullWidth>
      지원하기
    </Button>
  ),
  brandName: '브랜드명',
  title: '2024 봄/여름 패션 라이브 쇼핑',
  content: '봄 시즌 신상품을 소개하는 라이브 쇼핑입니다.',
  onPress: () => alert('카드 클릭됨'),
};

export const RecruitCardWithoutImageArgs = {
  topContent: <RecruitCardImage />,
  bottomContent: (
    <Button variant="primary" fullWidth>
      지원하기
    </Button>
  ),
  brandName: '브랜드명',
  title: '라이브 쇼핑 모집',
  content: '이미지가 없는 경우 플레이스홀더가 표시됩니다.',
  onPress: () => alert('카드 클릭됨'),
};

export const RecruitCardLongTextArgs = {
  topContent: <RecruitCardImage imageUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80" />,
  bottomContent: (
    <Button variant="primary" fullWidth>
      지원하기
    </Button>
  ),
  brandName: '매우 긴 브랜드명이 들어가는 경우',
  title: '매우 긴 제목이 들어가는 경우 어떻게 표시되는지 확인하는 예시입니다',
  content: '매우 긴 설명 텍스트가 들어가는 경우에도 텍스트가 잘리지 않고 말줄임표로 처리되어 표시됩니다.',
  onPress: () => alert('카드 클릭됨'),
};

export const RecruitCardNonClickableArgs = {
  topContent: <RecruitCardImage imageUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80" />,
  bottomContent: (
    <Button variant="primary" fullWidth>
      지원하기
    </Button>
  ),
  brandName: '브랜드명',
  title: '클릭 불가능한 카드',
  content: 'onPress가 없으면 카드가 클릭 불가능한 상태가 됩니다.',
};

const ScrollContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  padding: ${({ theme }) => theme.spacing.md};
  max-width: 100%;
`;

const TopImage = styled.div<{ $imageUrl?: string }>`
  width: 100%;
  aspect-ratio: 1;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-image: ${({ $imageUrl }) => ($imageUrl ? `url(${$imageUrl})` : 'none')};
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};

  button {
    flex: 1;
  }
`;

const StackedInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.muted};
`;

