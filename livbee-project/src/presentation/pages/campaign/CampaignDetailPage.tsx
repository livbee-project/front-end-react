import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DetailHeader from '@/presentation/components/detail/campaign/DetailHeader';
import BulletList from '@/presentation/components/detail/BulletList';
import InfoItem from '@/presentation/components/detail/campaign/InfoItem';
import ProductCard from '@/presentation/components/cards/ProductCard';
import Button from '@/presentation/components/ui/Button';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import DetailSection from '@/presentation/layouts/DetailSection';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { CampaignDetail } from '@/domain/entities/Campaign';
import { htmlToText } from '@/shared/utils/htmlUtils';
import { calculateDDay, formatDate, formatDateTime } from '@/shared/utils/dateUtils';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useDetailData } from '@/presentation/hooks/useDetailData';
import { P } from '@/presentation/components/styled/Typography';
import '@/presentation/styles/global.css';

const ContentWrapper = styled(P)``;

const FooterActions = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

/**
 * 모집 공고 상세 페이지 컴포넌트입니다.
 * 이미지에 맞게 다음 섹션들을 포함합니다:
 * 1. 상단 헤더 (이미지 + 브랜드명 + D-DAY 태그 + 제목 + 내용)
 * 2. 브랜드 소개 섹션
 * 3. 모집부문 및 담당 업무 섹션
 * 4. 자격요건 섹션
 * 5. 우대사항 섹션
 * 6. 모집 상세 정보 필드 섹션
 * 7. 관련 상품 정보 섹션
 * 8. 하단 액션 버튼
 */
const CampaignDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // campaignRepository를 useRepository 훅으로 관리
  const campaignRepository = useRepository(CampaignRepository);

  // 상세 데이터 조회
  const { data: campaign, loading: isLoading, error } = useDetailData<CampaignDetail>(
    (id, signal) => campaignRepository.getCampaignById(id, signal),
    id,
    '공고를 불러오는데 실패했습니다.'
  );

  /**
   * 이미지 클릭 핸들러
   */
  const handleImageClick = () => {
    // TODO: 이미지 확대 또는 갤러리 열기 기능 구현
  };

  /**
   * 상품 카드 클릭 핸들러
   */
  const handleProductClick = () => {
    if (campaign?.productUrl) {
      window.open(campaign.productUrl, '_blank');
    }
  };

  /**
   * 하단 버튼 클릭 핸들러
   */
  const handleButtonClick = () => {
    if (campaign?.isApplied) {
      // 이미 지원한 경우
      alert('이미 지원하신 공고입니다.');
    } else {
      // TODO: 지원하기 기능 구현
    }
  };

  // 로딩 중
  if (isLoading) {
    return (
      <DetailPageLayout>
        <LoadingState padding="16px" />
      </DetailPageLayout>
    );
  }

  // 에러 발생
  if (error || !campaign) {
    return (
      <DetailPageLayout>
        <ErrorState
          message={error || '공고를 찾을 수 없습니다.'}
          padding="16px"
          onRetry={() => navigate('/campaigns')}
          retryLabel="목록으로 돌아가기"
        />
      </DetailPageLayout>
    );
  }

  // 요약 내용 생성 (HTML 태그 제거 후 100자로 제한)
  const summaryContent = htmlToText(campaign.content).substring(0, 100) + '...';

  return (
    <DetailPageLayout>
      {/* 1. 상단 헤더 */}
      <DetailHeader
        imageUrl={campaign.imageUrl || campaign.coverImageUrl || undefined}
        brandName={campaign.brandName}
        deadlineDay={calculateDDay(campaign.closeAt)}
        title={campaign.title}
        content={summaryContent}
        onImageClick={handleImageClick}
      />

      {/* 2. 브랜드 소개 섹션 */}
      {campaign.brandIntroduction && (
        <DetailSection title="브랜드 소개">
          <ContentWrapper
            dangerouslySetInnerHTML={{ __html: campaign.brandIntroduction }}
          />
        </DetailSection>
      )}

      {/* 3. 모집부문 및 담당 업무 섹션 */}
      {campaign.recruitmentSection && (
        <DetailSection
          title={
            campaign.prefixName
              ? `모집부문: ${campaign.prefixName}`
              : '모집부문'
          }
        >
          <ContentWrapper
            dangerouslySetInnerHTML={{ __html: campaign.recruitmentSection }}
          />
        </DetailSection>
      )}

      {/* 4. 자격요건 섹션 */}
      {campaign.qualifications && campaign.qualifications.length > 0 && (
        <DetailSection title="자격요건">
          <BulletList items={campaign.qualifications} />
        </DetailSection>
      )}

      {/* 5. 우대사항 섹션 */}
      {campaign.preferredQualifications &&
        campaign.preferredQualifications.length > 0 && (
          <DetailSection title="우대사항">
            <BulletList items={campaign.preferredQualifications} />
          </DetailSection>
        )}

      {/* 6. 모집 상세 정보 필드 섹션 */}
      <div>
        <InfoItem
          title="모집구분"
          content={campaign.prefixName || '-'}
        />
        <InfoItem
          title="카테고리"
          content={campaign.categoryName || '-'}
        />
        <InfoItem
          title="장소"
          content={campaign.location || '-'}
        />
        <InfoItem
          title="촬영일"
          content={formatDate(campaign.shootDate)}
        />
        <InfoItem
          title="공고마감일"
          content={formatDateTime(campaign.closeAt)}
        />
        <InfoItem
          title="시작시간"
          content={campaign.startTime || '-'}
        />
        <InfoItem
          title="종료시간"
          content={campaign.endTime || '-'}
        />
        <InfoItem
          title="출연료"
          content={
            campaign.fee != null
              ? campaign.feeNegotiable
                ? `${campaign.fee.toLocaleString()}원 (협의 가능)`
                : `${campaign.fee.toLocaleString()}원`
              : '-'
          }
        />
      </div>

      {/* 7. 관련 상품 정보 섹션 */}
      {campaign.productName && (
        <DetailSection>
          <ProductCard
            imageUrl={campaign.productImageUrl || campaign.productThumbnailUrl || undefined}
            productName={campaign.productName}
            onClick={handleProductClick}
          />
        </DetailSection>
      )}

      {/* 8. 하단 액션 버튼 */}
      <FooterActions>
        <Button
          variant="primary"
          size="large"
          fullWidth
          onClick={handleButtonClick}
          disabled={campaign.isApplied}
        >
          {campaign.isApplied ? '이미 지원한 공고입니다' : '지원하기'}
        </Button>
      </FooterActions>
    </DetailPageLayout>
  );
};

export default CampaignDetailPage;

