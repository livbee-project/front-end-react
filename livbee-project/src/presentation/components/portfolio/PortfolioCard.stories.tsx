import type { Meta, StoryObj } from '@storybook/react';
import type { MouseEvent } from 'react';
import { PortfolioCard } from './PortfolioCard';
import type { Portfolio } from '@/domain/entities/Portfolio';

const meta: Meta<typeof PortfolioCard> = {
  title: 'Cards/PortfolioCard',
  component: PortfolioCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '포트폴리오 목록에서 쇼호스트 카드를 표시할 때 사용하는 컴포넌트입니다. 썸네일, 소개 문구, 지역/경력 배지를 보여줍니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    portfolio: {
      control: 'object',
      description: '표시할 포트폴리오 데이터',
    },
    isScrapped: {
      control: 'boolean',
      description: '스크랩 상태',
    },
    onCardClick: {
      action: 'card clicked',
      description: '카드 전체 클릭 시 실행되는 함수',
    },
    onScrapClick: {
      action: 'scrap clicked',
      description: '스크랩 아이콘 클릭 시 실행되는 함수',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PortfolioCard>;

const createPortfolio = (overrides: Partial<Portfolio>): Portfolio => ({
  id: overrides.id ?? 'portfolio-1',
  nickname: overrides.nickname ?? '루미 쇼호스트',
  oneLineIntro: overrides.oneLineIntro ?? '쇼핑라이브 전문 호스트',
  mainThumbnailUrl:
    overrides.mainThumbnailUrl ??
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
  experienceYears: overrides.experienceYears ?? 3,
  detailedRegion: overrides.detailedRegion ?? '서울 · 강남',
  height: overrides.height ?? 165,
});

const handleCardClick = () => {
  alert('카드 클릭');
};

const handleScrapClick = (event: MouseEvent) => {
  event.stopPropagation();
  alert('스크랩 아이콘 클릭');
};

export const Default: Story = {
  args: {
    portfolio: createPortfolio({}),
    isScrapped: false,
    onCardClick: handleCardClick,
    onScrapClick: handleScrapClick,
  },
  parameters: {
    docs: {
      description: {
        story: '썸네일, 지역 배지, 경력 정보를 포함한 기본 포트폴리오 카드입니다.',
      },
    },
  },
};

export const Scrapped: Story = {
  args: {
    portfolio: createPortfolio({
      id: 'portfolio-2',
      nickname: '하린 쇼호스트',
      oneLineIntro: '패션/뷰티 전문 진행',
      detailedRegion: '서울 · 마포',
      experienceYears: 5,
    }),
    isScrapped: true,
    onCardClick: handleCardClick,
    onScrapClick: handleScrapClick,
  },
  parameters: {
    docs: {
      description: {
        story: '스크랩된 상태를 보여주는 예시입니다.',
      },
    },
  },
};

export const WithoutImage: Story = {
  args: {
    portfolio: createPortfolio({
      id: 'portfolio-3',
      nickname: '이미지 없음',
      mainThumbnailUrl: null,
      detailedRegion: '부산 · 해운대',
      experienceYears: null,
    }),
    isScrapped: false,
    onCardClick: handleCardClick,
    onScrapClick: handleScrapClick,
  },
  parameters: {
    docs: {
      description: {
        story: '썸네일 이미지가 없을 때 기본 플레이스홀더가 표시됩니다.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => {
    const portfolios = [
      createPortfolio({
        id: 'portfolio-4',
        nickname: '은재',
        oneLineIntro: '쇼핑라이브·프리젠터',
        detailedRegion: '서울 · 송파',
        experienceYears: 4,
      }),
      createPortfolio({
        id: 'portfolio-5',
        nickname: '다은',
        oneLineIntro: '뷰티/라이프 전문',
        detailedRegion: '경기 · 성남',
        experienceYears: 2,
        mainThumbnailUrl:
          'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
      }),
      createPortfolio({
        id: 'portfolio-6',
        nickname: '채린',
        oneLineIntro: '인테리어/리빙 진행',
        detailedRegion: '부산 · 남구',
        experienceYears: 6,
      }),
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {portfolios.map((portfolio) => (
          <PortfolioCard
            key={portfolio.id}
            portfolio={portfolio}
            isScrapped={portfolio.id === 'portfolio-5'}
            onCardClick={handleCardClick}
            onScrapClick={handleScrapClick}
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '리스트 화면에서 여러 포트폴리오 카드를 나열한 모습입니다.',
      },
    },
  },
};


