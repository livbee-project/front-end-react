import React from 'react';
import styled from 'styled-components';
import { HomeCard } from './HomeCard';
import { HomeCardImage } from './HomeCardImage';
import {
  HomeCardBody,
  HomeCardBrand,
  HomeCardTitle,
  HomeCardDescription,
  HomeCardMetaRow,
  CTAButton,
} from './HomeCardBody';
import { Caption } from '@/presentation/components/styled/Typography';

export const HomeCardDefaultContent = (
  <HomeCard>
    <HomeCardImage src="https://via.placeholder.com/300x300" alt="카드 이미지" />
    <HomeCardBody>
      <HomeCardBrand>BRAND</HomeCardBrand>
      <HomeCardTitle>카드 제목</HomeCardTitle>
      <HomeCardDescription>카드 설명이 여기에 표시됩니다. 여러 줄의 텍스트가 표시될 수 있습니다.</HomeCardDescription>
      <HomeCardMetaRow>
        <Caption>2024.01.15</Caption>
        <Caption>조회수 1,234</Caption>
      </HomeCardMetaRow>
      <CTAButton>자세히 보기</CTAButton>
    </HomeCardBody>
  </HomeCard>
);

export const HomeCardExamplesSection: React.FC = () => (
  <CardContainer>
    {homeCardExamples.map(({ brand, title, description, date, views }, index) => (
      <HomeCard key={title}>
        <HomeCardImage src="https://via.placeholder.com/300x300" alt={`카드 ${index + 1}`} />
        <HomeCardBody>
          <HomeCardBrand>{brand}</HomeCardBrand>
          <HomeCardTitle>{title}</HomeCardTitle>
          <HomeCardDescription>{description}</HomeCardDescription>
          <HomeCardMetaRow>
            <Caption>{date}</Caption>
            <Caption>조회수 {views}</Caption>
          </HomeCardMetaRow>
          <CTAButton>자세히 보기</CTAButton>
        </HomeCardBody>
      </HomeCard>
    ))}
  </CardContainer>
);

export const HomeCardNoImage: React.FC = () => (
  <HomeCard>
    <HomeCardImage alt="이미지 없음" />
    <HomeCardBody>
      <HomeCardBrand>BRAND</HomeCardBrand>
      <HomeCardTitle>이미지 없는 카드</HomeCardTitle>
      <HomeCardDescription>이미지가 없을 때 플레이스홀더가 표시됩니다.</HomeCardDescription>
      <HomeCardMetaRow>
        <Caption>2024.01.15</Caption>
        <Caption>조회수 1,234</Caption>
      </HomeCardMetaRow>
      <CTAButton>자세히 보기</CTAButton>
    </HomeCardBody>
  </HomeCard>
);

export const HomeCardLongText: React.FC = () => (
  <HomeCard>
    <HomeCardImage src="https://via.placeholder.com/300x300" alt="긴 텍스트 카드" />
    <HomeCardBody>
      <HomeCardBrand>VERY LONG BRAND NAME</HomeCardBrand>
      <HomeCardTitle>매우 긴 제목이 여기에 표시되며 여러 줄에 걸쳐 표시될 수 있습니다</HomeCardTitle>
      <HomeCardDescription>
        매우 긴 설명이 여기에 표시됩니다. 이 설명은 두 줄까지만 표시되고 나머지는 말줄임표로 처리됩니다.
      </HomeCardDescription>
      <HomeCardMetaRow>
        <Caption>2024.01.15</Caption>
        <Caption>조회수 1,234,567</Caption>
      </HomeCardMetaRow>
      <CTAButton>자세히 보기</CTAButton>
    </HomeCardBody>
  </HomeCard>
);

const homeCardExamples = [
  {
    brand: 'FASHION',
    title: '2024 봄/여름 컬렉션',
    description: '새로운 시즌의 패션 트렌드를 만나보세요.',
    date: '2024.01.15',
    views: '5,678',
  },
  {
    brand: 'BEAUTY',
    title: '신제품 런칭',
    description: '최신 뷰티 제품을 먼저 만나보세요.',
    date: '2024.01.14',
    views: '3,456',
  },
  {
    brand: 'LIFESTYLE',
    title: '라이프스타일 가이드',
    description: '일상 속에서 찾는 스타일링 팁을 공유합니다.',
    date: '2024.01.13',
    views: '2,345',
  },
];

const CardContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  overflow-x: auto;
  padding: ${({ theme }) => theme.spacing.lg} 0;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.secondary};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 4px;
  }
`;

