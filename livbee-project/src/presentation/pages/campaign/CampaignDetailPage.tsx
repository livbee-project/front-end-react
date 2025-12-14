import React, { useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { CampaignDetail } from '@/domain/entities/Campaign';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useDetailFetcher } from '@/presentation/hooks/detail/useDetailFetcher';
import { useDetailPageState } from '@/presentation/hooks/detail/useDetailPageState';
import { useAuth } from '@/presentation/hooks/auth/useAuth';
import { useRoleAccess } from '@/presentation/hooks/common/useRoleAccess';
import { useToast } from '@/presentation/contexts/ToastContext';
import { setAuthRedirectPath } from '@/shared/utils/authRedirect';
import CampaignApplyModal from '@/presentation/components/campaign/detail/apply/CampaignApplyModal';
import { CampaignDetailHeader } from '@/presentation/components/campaign/detail/CampaignDetailHeader';
import { CampaignInfoSection } from '@/presentation/components/campaign/detail/CampaignInfoSection';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import StickyHeader from '@/presentation/components/detail/common/StickyHeader';
import {
  DetailWrapper,
  ActionSection,
  ContentActions,
  OutlineButton,
  PrimaryButton,
} from '@/presentation/pages/campaign/CampaignDetailPage.styles';

const CampaignDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const { hasRole } = useRoleAccess();
  const { showToast } = useToast();
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
    // 대표 이미지 우선순위: coverImageUrl > imageUrl > thumbnailUrl
    imageUrl: campaign.coverImageUrl || campaign.imageUrl || campaign.thumbnailUrl || mockData.imageUrl,
    brandName: campaign.brandName || mockData.brandName,
    title: campaign.title || mockData.title,
    dDay: campaign.closeAt
      ? `D-${Math.ceil((new Date(campaign.closeAt).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}`
      : mockData.dDay,
    tags: campaign.categoryName ? [campaign.categoryName, ...mockData.tags.slice(1)] : mockData.tags,
    campaignIntro: campaign.detailedContent || campaign.content || mockData.campaignIntro,
    brandIntroduction: campaign.brandIntroduction || '',
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
    // 비로그인 상태면 로그인 페이지로 이동 (현재 경로 저장)
    if (!isLoggedIn) {
      const currentPath = location.pathname + location.search + location.hash;
      setAuthRedirectPath(currentPath);
      navigate('/login', { replace: true });
      return;
    }
    
    // 로그인했지만 쇼호스트가 아닌 경우
    if (!hasRole(['showhost'])) {
      showToast('쇼호스트 권한이 필요합니다.', undefined, 'error');
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

  const canShowModal = isLoggedIn && hasRole(['showhost']);

  return (
    <>
      <DetailPageLayout>
        <StickyHeader title="캠페인" />
        <DetailWrapper>
          <CampaignDetailHeader
            brandName={displayData.brandName}
            title={displayData.title}
            tags={displayData.tags}
            dDay={displayData.dDay}
            imageUrl={displayData.imageUrl}
          >
            <CampaignInfoSection
              brandIntroduction={displayData.brandIntroduction}
              campaignIntro={displayData.campaignIntro}
              qualifications={displayData.qualifications}
              location={displayData.location}
              shootDate={displayData.shootDate}
              shootTime={displayData.shootTime}
              deadline={displayData.deadline}
              fee={displayData.fee}
              productInfo={displayData.productInfo}
            />
          </CampaignDetailHeader>

          <ActionSection>
            <ContentActions>
              <OutlineButton fullWidth onClick={handleBack}>
                목록으로
              </OutlineButton>
              <PrimaryButton 
                fullWidth 
                onClick={handleApply} 
                disabled={isLoggedIn && hasRole(['showhost']) && campaign.isApplied}
              >
                {isLoggedIn && hasRole(['showhost']) && campaign.isApplied 
                  ? '이미 지원한 공고입니다' 
                  : '지원하기'}
              </PrimaryButton>
            </ContentActions>
          </ActionSection>
        </DetailWrapper>
      </DetailPageLayout>

      {canShowModal && (
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
