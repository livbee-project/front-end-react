import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import type { AppliedCampaign } from '@/domain/entities/AppliedCampaign';
import { useListPageState } from '@/presentation/hooks/useListPageState';
import AppliedCampaignFilters from './components/AppliedCampaignFilters';
import AppliedCampaignCard from './components/AppliedCampaignCard';
import {
  BackButton,
  ContentSection,
  HeaderSection,
  PageContainer,
  PageSubtitle,
  PageTitle,
} from './styled/MyAppliedCampaignsStyles';

const mockAppliedCampaigns: AppliedCampaign[] = [
  {
    id: '1',
    companyName: '스타일코리아',
    campaignTitle: '봄 신상 패션 쇼핑라이브 쇼호스트 모집',
    category: '패션',
    date: '2024.03.25',
    location: '서울 강남구',
    requirement: '경력 1년↑',
    compensation: '300만원',
    applicationDate: '2024.03.10',
    statuses: ['accepted', 'in-progress'],
  },
  {
    id: '2',
    companyName: '글로우뷰티',
    campaignTitle: '신제품 스킨케어 라인 론칭 라이브',
    category: '뷰티',
    date: '2024.03.28',
    location: '서울 서초구',
    requirement: '경력 무관',
    compensation: '400만원',
    applicationDate: '2024.03.12',
    statuses: ['pending', 'recruiting'],
  },
  {
    id: '3',
    companyName: '뷰티코리아',
    campaignTitle: '신상 메이크업 제품 라이브 커머스',
    category: '뷰티',
    date: '2024.03.15',
    location: '서울 강남구',
    requirement: '경력 1년↑',
    compensation: '320만원',
    applicationDate: '2024.03.05',
    statuses: ['accepted', 'completed'],
  },
  {
    id: '4',
    companyName: '푸드마켓',
    campaignTitle: '신제품 식품 라인업 소개 라이브',
    category: '푸드',
    date: '2024.04.02',
    location: '서울 마포구',
    requirement: '경력 6개월↑',
    compensation: '280만원',
    applicationDate: '2024.03.11',
    statuses: ['pending'],
  },
];

const FILTERS = ['전체', '합격', '대기', '불합격', '진행중'];

const MyAppliedCampaignsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string>('전체');

  const filteredCampaigns = useMemo(
    () =>
      mockAppliedCampaigns.filter((campaign) => {
      if (selectedFilter === '전체') return true;
      if (selectedFilter === '합격') return campaign.statuses.includes('accepted');
      if (selectedFilter === '대기') return campaign.statuses.includes('pending');
      if (selectedFilter === '불합격') return campaign.statuses.includes('rejected');
      if (selectedFilter === '진행중') return campaign.statuses.includes('in-progress');
      return true;
      }),
    [selectedFilter]
  );

  const handleBack = () => {
    navigate(-1);
  };

  const handleCampaignClick = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  const { renderState } = useListPageState<AppliedCampaign>({
    data: filteredCampaigns,
    loading: false,
    error: null,
    emptyMessage: '지원한 캠페인이 없습니다.',
    showEmptyState: true,
  });

  return (
    <PageContainer>
      <BackButton onClick={handleBack}>
        <ChevronLeft size={18} />
        뒤로가기
      </BackButton>

      <HeaderSection>
        <PageTitle>내가 지원한 캠페인</PageTitle>
        <PageSubtitle>지원 현황 및 결과를 확인하세요</PageSubtitle>

        <AppliedCampaignFilters filters={FILTERS} selectedFilter={selectedFilter} onFilterChange={setSelectedFilter} />
      </HeaderSection>

      <ContentSection>
        {renderState || filteredCampaigns.map((campaign) => (
          <AppliedCampaignCard key={campaign.id} campaign={campaign} onClick={handleCampaignClick} />
        ))}
      </ContentSection>
    </PageContainer>
  );
};

export default MyAppliedCampaignsPage;

