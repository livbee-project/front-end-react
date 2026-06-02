import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { theme } from '@/presentation/styles/theme';
import { ContentCard } from '@/presentation/components/cards/content/ContentCard';
import { ContentCardGrid } from '@/presentation/components/cards/content/ContentCardGrid';

const SAMPLE_IMAGE =
  'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80';

const bp = theme.grid.breakpoints;

const gridStoryDescription =
  `모바일(${bp.mobileMin}~${bp.mobileMax}): ${theme.grid.columns.mobile}열 가로 스크롤 · ` +
  `태블릿(${bp.tabletMin}~${bp.tabletMax}): ${theme.grid.columns.tablet}열 · ` +
  `웹(${bp.wideMin}+): ${theme.grid.columns.desktop}열`;

const SampleCards = () => (
  <>
    <ContentCard variant="live" imageUrl={SAMPLE_IMAGE} heading="라이브 1" supplementary="12.3만 시청" />
    <ContentCard variant="ad" imageUrl={SAMPLE_IMAGE} heading="브랜드 A" title="캠페인 1" supplementary="~ 05.31" />
    <ContentCard variant="showhost" imageUrl={SAMPLE_IMAGE} heading="모델 1" supplementary="뷰티 · 4.9" />
    <ContentCard variant="news" imageUrl={SAMPLE_IMAGE} heading="뉴스 1" supplementary="2025.05.20" />
    <ContentCard variant="flip" imageUrl={SAMPLE_IMAGE} heading="클립 1" supplementary="1.2만" />
    <ContentCard variant="ad" imageUrl={SAMPLE_IMAGE} heading="브랜드 B" title="캠페인 2" supplementary="~ 06.15" />
  </>
);

const Page = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ViewportBlock = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const ViewportLabel = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  font: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.muted};
`;

const ViewportFrame = styled.div<{ $width: string }>`
  width: ${({ $width }) => $width};
  max-width: 100%;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  box-sizing: border-box;
  overflow: hidden;
`;

const meta: Meta<typeof ContentCardGrid> = {
  title: 'Cards/ContentCardGrid',
  component: ContentCardGrid,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `기획 반응형 카드 그리드 레이아웃. ${gridStoryDescription}`,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContentCardGrid>;

export const Default: Story = {
  render: () => (
    <Page>
      <ContentCardGrid>
        <SampleCards />
      </ContentCardGrid>
    </Page>
  ),
  parameters: {
    docs: {
      description: {
        story: '브라우저 너비에 따라 열 수가 바뀝니다. Storybook 상단에서 뷰포트를 조절해 확인하세요.',
      },
    },
  },
};

export const ViewportGuide: Story = {
  render: () => (
    <Page>
      <ViewportBlock>
        <ViewportLabel>Mobile — {bp.mobileMin} (2열 가로 스크롤)</ViewportLabel>
        <ViewportFrame $width={bp.mobileMin}>
          <ContentCardGrid>
            <SampleCards />
          </ContentCardGrid>
        </ViewportFrame>
      </ViewportBlock>
      <ViewportBlock>
        <ViewportLabel>Tablet — {bp.tabletMin} (3열)</ViewportLabel>
        <ViewportFrame $width={bp.tabletMin}>
          <ContentCardGrid>
            <SampleCards />
          </ContentCardGrid>
        </ViewportFrame>
      </ViewportBlock>
      <ViewportBlock>
        <ViewportLabel>Desktop — {bp.wideMin} (4열)</ViewportLabel>
        <ViewportFrame $width={bp.wideMin}>
          <ContentCardGrid>
            <SampleCards />
          </ContentCardGrid>
        </ViewportFrame>
      </ViewportBlock>
    </Page>
  ),
  parameters: {
    docs: {
      description: {
        story: `QA용 고정 너비 프레임입니다. ${gridStoryDescription}`,
      },
    },
  },
};
