import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '@/presentation/components/ui/Button';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { CampaignDetail } from '@/domain/entities/Campaign';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useDetailFetcher } from '@/presentation/hooks/useDetailFetcher';
import { useDetailPageState } from '@/presentation/hooks/useDetailPageState';
import { useAuth } from '@/presentation/hooks/useAuth';
import { useRoleAccess } from '@/presentation/hooks/useRoleAccess';
import CampaignApplyModal from '@/presentation/components/campaign/detail/apply/CampaignApplyModal';
import { CampaignDetailHeader } from '@/presentation/components/campaign/detail/CampaignDetailHeader';
import { CampaignInfoSection } from '@/presentation/components/campaign/detail/CampaignInfoSection';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import {
  DetailWrapper,
  ActionSection,
  ActionMetaGrid,
  ActionMetaItem,
  ActionMetaLabel,
  ActionMetaValue,
  SupportText,
  ContentActions,
} from './CampaignDetailPage.styles';

const CampaignDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { hasRole } = useRoleAccess();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const campaignRepository = useRepository(CampaignRepository);

  const {
    data: campaign,
    loading: isLoading,
    error,
    setData: setCampaign,
  } = useDetailFetcher<CampaignDetail, CampaignRepository>({
    repository: campaignRepository,
    method: 'getCampaignById',
    id,
    errorMessage: '공고를 불러오는데 실패했습니다.',
  });

  const { renderState, isReady } = useDetailPageState({
    data: campaign,
    loading: isLoading,
    error,
    notFoundMessage: '공고를 찾을 수 없습니다.',
    listPath: '/campaigns',
    LayoutComponent: DetailPageLayout,
  });

  if (renderState) {
    return <>{renderState}</>;
  }

  if (!isReady || !campaign) {
    return null;
  }

  const mockData = {
    imageUrl:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    brandName: '스타일코리아',
    title: '봄 신상 패션 쇼핑라이브 쇼호스트 모집',
    dDay: 'D-5',
    tags: ['패션', '쇼호스트', '모델'],
    campaignIntro:
      '20대 여성 타겟 봄 신상 의류 라이브 커머스 진행을 위한 쇼호스트를 모집합니다. 트렌디한 스타일과 합리적인 가격으로 고객들에게 새로운 패션 아이템을 소개해주세요. 밝고 친근한 분위기로 진행해주실 쇼호스트를 찾고 있습니다.',
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

  const displayData = {
    imageUrl: campaign.imageUrl || campaign.coverImageUrl || mockData.imageUrl,
    brandName: campaign.brandName || mockData.brandName,
    title: campaign.title || mockData.title,
    dDay: campaign.closeAt
      ? `D-${Math.ceil((new Date(campaign.closeAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}`
      : mockData.dDay,
    tags: campaign.categoryName ? [campaign.categoryName, ...mockData.tags.slice(1)] : mockData.tags,
    campaignIntro: campaign.content || campaign.detailedContent || mockData.campaignIntro,
    qualifications:
      campaign.qualifications && campaign.qualifications.length > 0
        ? campaign.qualifications
        : mockData.qualifications,
    location: campaign.location || mockData.location,
    shootDate: campaign.shootDate ? campaign.shootDate.replace(/-/g, '. ') : mockData.shootDate,
    shootTime:
      campaign.startTime && campaign.endTime ? `${campaign.startTime} - ${campaign.endTime}` : mockData.shootTime,
    deadline: campaign.closeAt ? campaign.closeAt.replace(/-/g, '. ') : mockData.deadline,
    fee: campaign.fee ? `${(campaign.fee / 10000).toLocaleString()}만원` : mockData.fee,
    productInfo: campaign.productName || mockData.productInfo,
  };

  const handleApply = () => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true });
      return;
    }
    setIsApplyModalOpen(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleApplySuccess = () => {
    setCampaign((prev) => (prev ? { ...prev, isApplied: true } : prev));
  };

  const canApply = hasRole(['showhost']);

  return (
    <>
      <DetailPageLayout>
        <DetailWrapper>
          <CampaignDetailHeader
            brandName={displayData.brandName}
            title={displayData.title}
            tags={displayData.tags}
            dDay={displayData.dDay}
            imageUrl={displayData.imageUrl}
            onBack={handleBack}
          />

          <CampaignInfoSection
            campaignIntro={displayData.campaignIntro}
            qualifications={displayData.qualifications}
            location={displayData.location}
            shootDate={displayData.shootDate}
            shootTime={displayData.shootTime}
            deadline={displayData.deadline}
            fee={displayData.fee}
            productInfo={displayData.productInfo}
          />

          <ActionSection>
            <ActionMetaGrid>
              <ActionMetaItem>
                <ActionMetaLabel>지원 마감일</ActionMetaLabel>
                <ActionMetaValue>{displayData.deadline}</ActionMetaValue>
              </ActionMetaItem>
              <ActionMetaItem>
                <ActionMetaLabel>출연료</ActionMetaLabel>
                <ActionMetaValue>{displayData.fee}</ActionMetaValue>
              </ActionMetaItem>
              <ActionMetaItem>
                <ActionMetaLabel>촬영 일정</ActionMetaLabel>
                <ActionMetaValue>
                  {displayData.shootDate}
                  <br />
                  {displayData.shootTime}
                </ActionMetaValue>
              </ActionMetaItem>
              <ActionMetaItem>
                <ActionMetaLabel>촬영 장소</ActionMetaLabel>
                <ActionMetaValue>{displayData.location}</ActionMetaValue>
              </ActionMetaItem>
            </ActionMetaGrid>

            <SupportText>
              지원 완료 후 브랜드와 메시지로 세부 일정을 조율하게 됩니다. 지원 현황은 메시지 페이지에서
              확인할 수 있어요.
            </SupportText>

            <ContentActions>
              <Button variant="secondary" fullWidth onClick={handleBack}>
                목록으로
              </Button>
              {canApply && (
                <Button variant="primary" fullWidth onClick={handleApply} disabled={campaign.isApplied}>
                  {campaign.isApplied ? '이미 지원한 공고입니다' : '지원하기'}
                </Button>
              )}
            </ContentActions>
          </ActionSection>
        </DetailWrapper>
      </DetailPageLayout>

      {canApply && (
        <CampaignApplyModal
          isOpen={isApplyModalOpen}
          campaignId={campaign.id}
          campaignTitle={campaign.title || displayData.title}
          onClose={() => setIsApplyModalOpen(false)}
          onApplied={handleApplySuccess}
        />
      )}
    </>
  );
};

export default CampaignDetailPage;
