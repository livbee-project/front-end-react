import type { Meta, StoryObj } from '@storybook/react';
import { PortfolioCard } from '@/presentation/components/portfolio/PortfolioCard';
import {
  DefaultPortfolioCard,
  ScrappedPortfolioCard,
  NoImagePortfolioCard,
  PortfolioShowcase,
} from '@/presentation/components/portfolio/PortfolioCardStoryContent';

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

export const Default: Story = {
  args: DefaultPortfolioCard,
  parameters: {
    docs: {
      description: {
        story: '썸네일, 지역 배지, 경력 정보를 포함한 기본 포트폴리오 카드입니다.',
      },
    },
  },
};

export const Scrapped: Story = {
  args: ScrappedPortfolioCard,
  parameters: {
    docs: {
      description: {
        story: '스크랩된 상태를 보여주는 예시입니다.',
      },
    },
  },
};

export const WithoutImage: Story = {
  args: NoImagePortfolioCard,
  parameters: {
    docs: {
      description: {
        story: '썸네일 이미지가 없을 때 기본 플레이스홀더가 표시됩니다.',
      },
    },
  },
};

export const Showcase: Story = {
  render: () => <PortfolioShowcase />,
  parameters: {
    docs: {
      description: {
        story: '리스트 화면에서 여러 포트폴리오 카드를 나열한 모습입니다.',
      },
    },
  },
};


