import type { Meta, StoryObj } from '@storybook/react';
import { CampaignInfoSection } from './CampaignInfoSection';

const meta: Meta<typeof CampaignInfoSection> = {
  title: 'Campaign/InfoSection',
  component: CampaignInfoSection,
  args: {
    campaignIntro:
      '20대 여성 타겟 봄 신상 의류 라이브 커머스 진행을 위한 쇼호스트를 모집합니다. 밝고 친근한 분위기가 필수예요.',
    qualifications: [
      '라이브 커머스 진행 경험 1년 이상',
      '패션 트렌드 이해도',
      '밝고 친근한 진행 스타일',
    ],
    location: '서울시 강남구 스튜디오',
    shootDate: '2024.04.02',
    shootTime: '15:00 - 17:00',
    deadline: '2024.03.28',
    fee: '300만원',
    productInfo: '봄 신상 패션 라이브 기획',
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CampaignInfoSection>;

export const Default: Story = {};

export const WithLongText: Story = {
  args: {
    campaignIntro:
      '본 플랫폼은 브랜드와 쇼호스트가 안전하게 거래할 수 있도록 결제, 계약, 일정 조율을 지원합니다.\n라이브 경험이 많지 않더라도 성실하게 준비해 주실 분이라면 누구나 지원해 주세요.',
    qualifications: [
      '신뢰할 수 있는 태도',
      '제품 특장점을 빠르게 파악할 수 있는 이해력',
      '주요 채널 팔로워 1만 이상 우대',
    ],
    productInfo: '글로벌 스킨케어 신제품 3종',
  },
};

export const BeautyCategory: Story = {
  args: {
    location: '서울 서초구',
    shootDate: '2024.05.10',
    shootTime: '19:00 - 21:00',
    deadline: '2024.05.02',
    fee: '협의',
    qualifications: ['뷰티 라이브 경험 2년 이상', '센스 있는 메이크업 연출 가능'],
    campaignIntro: '뷰티 브랜드의 신규 라인업을 소개하는 라이브입니다.',
    productInfo: '프리미엄 스킨케어, 색조 라인업',
  },
};

