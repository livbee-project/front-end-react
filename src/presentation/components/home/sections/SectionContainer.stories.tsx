import { palette } from '@/presentation/styles/tokens';
import type { Meta, StoryObj } from '@storybook/react';
import SectionContainer from '@/presentation/components/home/sections/SectionContainer';
import { ContentCard } from '@/presentation/components/cards/content/ContentCard';
import { ContentCardGrid } from '@/presentation/components/cards/content/ContentCardGrid';

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=400&q=80';
import styled from 'styled-components';

const meta: Meta<typeof SectionContainer> = {
  title: 'Layouts/SectionContainer',
  component: SectionContainer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '홈 화면의 각 섹션(헤더 + 컨텐츠)을 감싸는 공통 컨테이너 컴포넌트입니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '섹션 제목',
    },
    onMorePressed: {
      action: 'more clicked',
      description: '더보기 버튼 클릭 시 실행될 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SectionContainer>;

// ===== 기본 섹션 =====
export const Default: Story = {
  args: {
    title: '섹션 제목',
    children: (
      <ContentCardGrid>
        <ContentCard variant="live" imageUrl={SAMPLE_IMAGE} heading="콘텐츠 1" supplementary="부가 정보" />
        <ContentCard variant="live" imageUrl={SAMPLE_IMAGE} heading="콘텐츠 2" supplementary="부가 정보" />
        <ContentCard variant="live" imageUrl={SAMPLE_IMAGE} heading="콘텐츠 3" supplementary="부가 정보" />
        <ContentCard variant="live" imageUrl={SAMPLE_IMAGE} heading="콘텐츠 4" supplementary="부가 정보" />
      </ContentCardGrid>
    ),
  },
};

// ===== 더보기 버튼 포함 =====
export const WithMoreButton: Story = {
  args: {
    title: '컨셉에 맞는 모델 찾기',
    onMorePressed: () => alert('더보기 클릭'),
    children: (
      <ContentCardGrid>
        <ContentCard variant="showhost" imageUrl={SAMPLE_IMAGE} heading="모델 1" supplementary="한 줄 소개" />
        <ContentCard variant="showhost" imageUrl={SAMPLE_IMAGE} heading="모델 2" supplementary="한 줄 소개" />
        <ContentCard variant="showhost" imageUrl={SAMPLE_IMAGE} heading="모델 3" supplementary="한 줄 소개" />
        <ContentCard variant="showhost" imageUrl={SAMPLE_IMAGE} heading="모델 4" supplementary="한 줄 소개" />
      </ContentCardGrid>
    ),
  },
};

// ===== 다양한 섹션 =====
export const DifferentSections: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <SectionContainer
        title="지금 뜨는 쇼핑라이브"
        onMorePressed={() => alert('더보기 클릭')}
      >
        <ContentCardGrid>
          <ContentCard variant="ad" imageUrl={SAMPLE_IMAGE} heading="브랜드 1" title="라이브 1" supplementary="방송 중" />
          <ContentCard variant="ad" imageUrl={SAMPLE_IMAGE} heading="브랜드 2" title="라이브 2" supplementary="방송 중" />
          <ContentCard variant="ad" imageUrl={SAMPLE_IMAGE} heading="브랜드 3" title="라이브 3" supplementary="방송 중" />
        </ContentCardGrid>
      </SectionContainer>
      
      <SectionContainer
        title="브랜드 PICK"
        onMorePressed={() => alert('더보기 클릭')}
      >
        <ContentCardGrid>
          <ContentCard variant="ad" imageUrl={SAMPLE_IMAGE} heading="브랜드 1" title="추천 캠페인" supplementary="~ 05.31 마감" />
          <ContentCard variant="ad" imageUrl={SAMPLE_IMAGE} heading="브랜드 2" title="추천 캠페인" supplementary="~ 06.15 마감" />
          <ContentCard variant="ad" imageUrl={SAMPLE_IMAGE} heading="브랜드 3" title="추천 캠페인" supplementary="~ 06.30 마감" />
        </ContentCardGrid>
      </SectionContainer>
      
      <SectionContainer
        title="HOT CLIP"
        onMorePressed={() => alert('더보기 클릭')}
      >
        <ContentCardGrid>
          <ContentCard variant="flip" imageUrl={SAMPLE_IMAGE} heading="클립 1" supplementary="인기 클립" />
          <ContentCard variant="flip" imageUrl={SAMPLE_IMAGE} heading="클립 2" supplementary="인기 클립" />
          <ContentCard variant="flip" imageUrl={SAMPLE_IMAGE} heading="클립 3" supplementary="인기 클립" />
        </ContentCardGrid>
      </SectionContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '다양한 홈 섹션 예시입니다. 제목의 특정 부분이 Primary 색상으로 강조됩니다.',
      },
    },
  },
};

