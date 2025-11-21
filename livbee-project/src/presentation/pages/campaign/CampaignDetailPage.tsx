import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FileText, CheckCircle, Briefcase, MapPin, Calendar, Clock, DollarSign, Tag, ChevronLeft } from 'lucide-react';
import Button from '@/presentation/components/ui/Button';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { CampaignDetail } from '@/domain/entities/Campaign';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useDetailData } from '@/presentation/hooks/useDetailData';
import CampaignApplyModal from '@/presentation/components/detail/CampaignApplyModal';

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

const HeaderImage = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
`;

const HeaderImageContent = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DDayBadge = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  background: #ff4757;
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 700;
`;

const HeaderInfo = styled.div`
  background: #ffffff;
  padding: 20px 16px;
  border-radius: 20px 20px 0 0;
  margin-top: -20px;
  position: relative;
  z-index: 1;
`;

const BrandName = styled.div`
  font-size: 0.875rem;
  color: #9297af;
  margin-bottom: 8px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f1f25;
  margin: 0;
  flex: 1;
`;

const TagGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
`;

const TagBadge = styled.span<{ $variant?: 'primary' | 'secondary' }>`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $variant }) => ($variant === 'primary' ? '#5a64ff' : '#ffffff')};
  color: ${({ $variant }) => ($variant === 'primary' ? '#ffffff' : '#1f1f25')};
  border: ${({ $variant }) => ($variant === 'primary' ? 'none' : '1px solid #eceff7')};
`;

const ContentCard = styled.div`
  background: #ffffff;
  margin: 0 16px;
  padding: 24px 20px;
  border-radius: 0 0 20px 20px;
`;

const Section = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #5a64ff;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f1f25;
  margin: 0;
`;

const SectionContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #434659;
  white-space: pre-wrap;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BulletItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #434659;
`;

const BulletDot = styled.span`
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #5a64ff;
  margin-top: 8px;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #5a64ff;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const InfoLabel = styled.span`
  font-size: 0.875rem;
  color: #9297af;
  font-weight: 500;
`;

const InfoValue = styled.span`
  font-size: 0.95rem;
  color: #1f1f25;
  font-weight: 600;
`;

const Divider = styled.div`
  height: 1px;
  background: #eceff7;
  margin: 24px 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

const CampaignDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isApplyModalOpen, setIsApplyModalOpen] = React.useState(false);

  const campaignRepository = useRepository(CampaignRepository);

  const { data: campaign, loading: isLoading, error } = useDetailData<CampaignDetail>(
    (id, signal) => campaignRepository.getCampaignById(id, signal),
    id,
    '공고를 불러오는데 실패했습니다.'
  );

  // 하드코딩된 데이터 (API 데이터가 없을 때 사용)
  const mockData = {
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    brandName: '스타일코리아',
    title: '봄 신상 패션 쇼핑라이브 쇼호스트 모집',
    dDay: 'D-5',
    tags: ['패션', '쇼호스트', '모델'],
    campaignIntro: '20대 여성 타겟 봄 신상 의류 라이브 커머스 진행을 위한 쇼호스트를 모집합니다. 트렌디한 스타일과 합리적인 가격으로 고객들에게 새로운 패션 아이템을 소개해주세요. 밝고 친근한 분위기로 진행해주실 쇼호스트를 찾고 있습니다.',
    qualifications: [
      '패션 분야 쇼핑라이브 경력 1년 이상',
      '밝고 친근한 진행 스타일',
      '카메라 앞에서 자연스러운 표현력',
      '트렌드에 대한 이해도',
    ],
    location: '서울시 강남구 스튜디오',
    shootDate: '2024.03.25',
    shootTime: '15:00 - 17:00',
    deadline: '2024.03.20',
    fee: '300만원',
    productInfo: '2024 봄 신상 패션 컬렉션',
  };

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingState padding="16px" />
      </PageContainer>
    );
  }

  if (error || !campaign) {
    return (
      <PageContainer>
        <ErrorState
          message={error || '공고를 찾을 수 없습니다.'}
          padding="16px"
          onRetry={() => navigate('/campaigns')}
          retryLabel="목록으로 돌아가기"
        />
      </PageContainer>
    );
  }

  // 실제 데이터가 있으면 사용, 없으면 하드코딩 데이터 사용
  const displayData = {
    imageUrl: campaign.imageUrl || campaign.coverImageUrl || mockData.imageUrl,
    brandName: campaign.brandName || mockData.brandName,
    title: campaign.title || mockData.title,
    dDay: campaign.closeAt ? `D-${Math.ceil((new Date(campaign.closeAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}` : mockData.dDay,
    tags: campaign.categoryName ? [campaign.categoryName, ...mockData.tags.slice(1)] : mockData.tags,
    campaignIntro: campaign.content || campaign.detailedContent || mockData.campaignIntro,
    qualifications: campaign.qualifications && campaign.qualifications.length > 0 ? campaign.qualifications : mockData.qualifications,
    location: campaign.location || mockData.location,
    shootDate: campaign.shootDate ? campaign.shootDate.replace(/-/g, '. ') : mockData.shootDate,
    shootTime: campaign.startTime && campaign.endTime ? `${campaign.startTime} - ${campaign.endTime}` : mockData.shootTime,
    deadline: campaign.closeAt ? campaign.closeAt.replace(/-/g, '. ') : mockData.deadline,
    fee: campaign.fee ? `${(campaign.fee / 10000).toLocaleString()}만원` : mockData.fee,
    productInfo: campaign.productName || mockData.productInfo,
  };

  const handleApply = () => {
    setIsApplyModalOpen(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageContainer>
      <BackButton onClick={handleBack}>
        <ChevronLeft size={18} />
        뒤로가기
      </BackButton>

      <HeaderImage>
        <HeaderImageContent src={displayData.imageUrl} alt={displayData.title} />
        <DDayBadge>{displayData.dDay}</DDayBadge>
      </HeaderImage>

      <HeaderInfo>
        <BrandName>{displayData.brandName}</BrandName>
        <TitleRow>
          <Title>{displayData.title}</Title>
        </TitleRow>
        <TagGroup>
          {displayData.tags.map((tag, index) => (
            <TagBadge key={index} $variant={index === 0 ? 'primary' : 'secondary'}>
              {tag}
            </TagBadge>
          ))}
        </TagGroup>
      </HeaderInfo>

      <ContentCard>
        {/* 캠페인 소개 */}
        <Section>
          <SectionHeader>
            <SectionIcon>
              <FileText size={20} />
            </SectionIcon>
            <SectionTitle>캠페인 소개</SectionTitle>
          </SectionHeader>
          <SectionContent>{displayData.campaignIntro}</SectionContent>
        </Section>

        {/* 자격요건 */}
        <Section>
          <SectionHeader>
            <SectionIcon>
              <CheckCircle size={20} />
            </SectionIcon>
            <SectionTitle>자격요건</SectionTitle>
          </SectionHeader>
          <BulletList>
            {displayData.qualifications.map((qualification, index) => (
              <BulletItem key={index}>
                <BulletDot />
                <span>{qualification}</span>
              </BulletItem>
            ))}
          </BulletList>
        </Section>

        {/* 촬영 정보 */}
        <Section>
          <SectionHeader>
            <SectionIcon>
              <Briefcase size={20} />
            </SectionIcon>
            <SectionTitle>촬영 정보</SectionTitle>
          </SectionHeader>
          <InfoGrid>
            <InfoRow>
              <InfoIcon>
                <MapPin size={18} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>장소</InfoLabel>
                <InfoValue>{displayData.location}</InfoValue>
              </InfoContent>
            </InfoRow>
            <InfoRow>
              <InfoIcon>
                <Calendar size={18} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>촬영일</InfoLabel>
                <InfoValue>{displayData.shootDate}</InfoValue>
              </InfoContent>
            </InfoRow>
          </InfoGrid>
        </Section>

        <Divider />

        {/* 촬영 시간 */}
        <InfoRow>
          <InfoIcon>
            <Clock size={18} />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>촬영 시간</InfoLabel>
            <InfoValue>{displayData.shootTime}</InfoValue>
          </InfoContent>
        </InfoRow>

        {/* 지원 마감일 */}
        <InfoRow>
          <InfoIcon>
            <Calendar size={18} />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>지원 마감일</InfoLabel>
            <InfoValue>{displayData.deadline}</InfoValue>
          </InfoContent>
        </InfoRow>

        {/* 출연료 */}
        <InfoRow>
          <InfoIcon>
            <DollarSign size={18} />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>출연료</InfoLabel>
            <InfoValue>{displayData.fee}</InfoValue>
          </InfoContent>
        </InfoRow>

        {/* 상품 정보 */}
        <Divider />
        <InfoRow>
          <InfoIcon>
            <Tag size={18} />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>상품 정보</InfoLabel>
            <InfoValue>{displayData.productInfo}</InfoValue>
          </InfoContent>
        </InfoRow>

        {/* 액션 버튼 */}
        <ActionButtons>
          <Button variant="secondary" fullWidth onClick={handleBack}>
            목록으로
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={handleApply}
            disabled={campaign.isApplied}
          >
            {campaign.isApplied ? '이미 지원한 공고입니다' : '지원하기'}
          </Button>
        </ActionButtons>
      </ContentCard>

      <CampaignApplyModal
        isOpen={isApplyModalOpen}
        campaignTitle={campaign.title || displayData.title}
        onClose={() => setIsApplyModalOpen(false)}
      />
    </PageContainer>
  );
};

export default CampaignDetailPage;
