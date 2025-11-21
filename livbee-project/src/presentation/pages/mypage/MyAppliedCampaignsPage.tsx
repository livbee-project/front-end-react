import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ChevronLeft, Calendar, MapPin, DollarSign } from 'lucide-react';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f4f5fb;
  padding-bottom: 80px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #1f1f25;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 500;
`;

const HeaderSection = styled.div`
  padding: 20px 16px;
  background: #ffffff;
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f1f25;
  margin: 0 0 8px 0;
`;

const PageSubtitle = styled.p`
  font-size: 0.875rem;
  color: #9297af;
  margin: 0 0 20px 0;
`;

const FilterSection = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const FilterButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;
  
  background: ${({ $active }) => ($active ? '#5a64ff' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#1f1f25')};
  border: ${({ $active }) => ($active ? 'none' : '1px solid #eceff7')};
  
  &:hover {
    background: ${({ $active }) => ($active ? '#4a54e8' : '#f4f5fb')};
  }
`;

const ContentSection = styled.div`
  padding: 20px 16px;
`;

const CampaignCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const CompanyName = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: #1f1f25;
`;

const StatusBadges = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const StatusBadge = styled.span<{ $variant: 'accepted' | 'pending' | 'rejected' | 'in-progress' | 'recruiting' | 'completed' }>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  
  ${({ $variant }) => {
    switch ($variant) {
      case 'accepted':
        return 'background: #3cd25a; color: #ffffff;';
      case 'pending':
        return 'background: #ffa726; color: #ffffff;';
      case 'rejected':
        return 'background: #ff4757; color: #ffffff;';
      case 'in-progress':
        return 'background: #edf0ff; color: #5a64ff;';
      case 'recruiting':
        return 'background: #e8f5e9; color: #2e7d32;';
      case 'completed':
        return 'background: #f5f5f5; color: #757575;';
      default:
        return 'background: #f4f5fb; color: #434659;';
    }
  }}
`;

const CampaignTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #1f1f25;
  margin: 0 0 12px 0;
`;

const CampaignInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
`;

const CategoryTag = styled.span`
  padding: 4px 10px;
  border-radius: 12px;
  background: #f4f5ff;
  color: #5a64ff;
  font-size: 0.75rem;
  font-weight: 600;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: #434659;
  
  svg {
    width: 16px;
    height: 16px;
    color: #9297af;
  }
`;

const Requirement = styled.div`
  font-size: 0.875rem;
  color: #434659;
  margin-bottom: 8px;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid #eceff7;
`;

const Compensation = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #1f1f25;
  
  svg {
    width: 16px;
    height: 16px;
    color: #5a64ff;
  }
`;

const ApplicationDate = styled.div`
  font-size: 0.875rem;
  color: #9297af;
`;

interface AppliedCampaign {
  id: string;
  companyName: string;
  campaignTitle: string;
  category: string;
  date: string;
  location: string;
  requirement: string;
  compensation: string;
  applicationDate: string;
  statuses: Array<'accepted' | 'pending' | 'rejected' | 'in-progress' | 'recruiting' | 'completed'>;
}

const MyAppliedCampaignsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string>('전체');

  // 하드코딩된 지원한 캠페인 데이터
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

  const filters = ['전체', '합격', '대기', '불합격', '진행중'];

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'accepted':
        return '합격';
      case 'pending':
        return '대기';
      case 'rejected':
        return '불합격';
      case 'in-progress':
        return '진행중';
      case 'recruiting':
        return '모집중';
      case 'completed':
        return '진행완료';
      default:
        return status;
    }
  };

  const filteredCampaigns = mockAppliedCampaigns.filter((campaign) => {
    if (selectedFilter === '전체') return true;
    if (selectedFilter === '합격') return campaign.statuses.includes('accepted');
    if (selectedFilter === '대기') return campaign.statuses.includes('pending');
    if (selectedFilter === '불합격') return campaign.statuses.includes('rejected');
    if (selectedFilter === '진행중') return campaign.statuses.includes('in-progress');
    return true;
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleCampaignClick = (campaignId: string) => {
    navigate(`/campaigns/${campaignId}`);
  };

  return (
    <PageContainer>
      <BackButton onClick={handleBack}>
        <ChevronLeft size={18} />
        뒤로가기
      </BackButton>

      <HeaderSection>
        <PageTitle>내가 지원한 캠페인</PageTitle>
        <PageSubtitle>지원 현황 및 결과를 확인하세요</PageSubtitle>

        <FilterSection>
          {filters.map((filter) => (
            <FilterButton
              key={filter}
              $active={selectedFilter === filter}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter}
            </FilterButton>
          ))}
        </FilterSection>
      </HeaderSection>

      <ContentSection>
        {filteredCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} onClick={() => handleCampaignClick(campaign.id)}>
            <CardHeader>
              <CompanyName>{campaign.companyName}</CompanyName>
              <StatusBadges>
                {campaign.statuses.map((status, index) => (
                  <StatusBadge key={index} $variant={status}>
                    {getStatusLabel(status)}
                  </StatusBadge>
                ))}
              </StatusBadges>
            </CardHeader>
            <CampaignTitle>{campaign.campaignTitle}</CampaignTitle>
            <CampaignInfo>
              <CategoryTag>{campaign.category}</CategoryTag>
              <InfoItem>
                <Calendar size={16} />
                <span>{campaign.date}</span>
              </InfoItem>
              <InfoItem>
                <MapPin size={16} />
                <span>{campaign.location}</span>
              </InfoItem>
            </CampaignInfo>
            <Requirement>{campaign.requirement}</Requirement>
            <CardFooter>
              <Compensation>
                <DollarSign size={16} />
                <span>{campaign.compensation}</span>
              </Compensation>
              <ApplicationDate>지원일: {campaign.applicationDate}</ApplicationDate>
            </CardFooter>
          </CampaignCard>
        ))}
      </ContentSection>
    </PageContainer>
  );
};

export default MyAppliedCampaignsPage;

