import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DetailHeader from '@/presentation/components/detail/DetailHeader';
import BulletList from '@/presentation/components/detail/BulletList';
import InfoItem from '@/presentation/components/detail/InfoItem';
import ProductCard from '@/presentation/components/cards/ProductCard';
import Button from '@/presentation/components/ui/Button';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import DetailSection from '@/presentation/layouts/DetailSection';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { CampaignDetail } from '@/domain/entities/Campaign';
import '@/presentation/styles/global.css';

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
  const [campaign, setCampaign] = useState<CampaignDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // campaignRepository를 useRef로 관리하여 매 렌더링마다 재생성되지 않도록 함
  const campaignRepositoryRef = useRef<CampaignRepository | null>(null);
  if (!campaignRepositoryRef.current) {
    campaignRepositoryRef.current = new CampaignRepository();
  }
  const campaignRepository = campaignRepositoryRef.current;

  /**
   * D-DAY 계산 함수
   */
  const calculateDDay = (closeAt: string): string => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadline = new Date(closeAt);
    deadline.setHours(23, 59, 59, 999);

    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return '마감';
    } else if (diffDays === 0) {
      return 'D-DAY';
    } else {
      return `D-${diffDays}`;
    }
  };

  /**
   * 날짜 포맷팅 함수 (YYYY-MM-DD)
   */
  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '-';
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  /**
   * HTML 콘텐츠를 텍스트로 변환 (요약용)
   */
  const htmlToText = (html: string): string => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  /**
   * 캠페인 상세 정보 로드
   */
  useEffect(() => {
    const abortController = new AbortController();
    let isCancelled = false;

    const loadCampaign = async () => {
      if (!id) {
        if (!isCancelled) {
          setError('공고 ID가 없습니다.');
          setIsLoading(false);
        }
        return;
      }

      try {
        if (!isCancelled) {
          setIsLoading(true);
          setError(null);
        }
        const data = await campaignRepository.getCampaignById(id, abortController.signal);
        if (!isCancelled && !abortController.signal.aborted) {
          setCampaign(data);
        }
      } catch (err) {
        // AbortError는 무시 (요청이 취소된 경우)
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        if (!isCancelled && !abortController.signal.aborted) {
          const errorMessage = err instanceof Error ? err.message : '공고를 불러오는데 실패했습니다.';
          setError(errorMessage);
          console.error('캠페인 상세 조회 실패:', err);
        }
      } finally {
        if (!isCancelled && !abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadCampaign();

    // cleanup 함수: 컴포넌트가 언마운트되거나 id가 변경되면 이전 요청을 취소
    return () => {
      isCancelled = true;
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // campaignRepository는 ref로 관리되므로 의존성 배열에서 제외

  /**
   * 이미지 클릭 핸들러
   */
  const handleImageClick = () => {
    console.log('이미지 클릭');
    // TODO: 이미지 확대 또는 갤러리 열기 기능 구현
  };

  /**
   * 상품 카드 클릭 핸들러
   */
  const handleProductClick = () => {
    if (campaign?.productUrl) {
      window.open(campaign.productUrl, '_blank');
    } else {
      console.log('상품 링크가 없습니다.');
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
      // 지원하기 기능 구현
      console.log('지원하기');
      // TODO: 지원하기 기능 구현
    }
  };

  // 로딩 중
  if (isLoading) {
    return (
      <DetailPageLayout>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <p>로딩 중...</p>
        </div>
      </DetailPageLayout>
    );
  }

  // 에러 발생
  if (error || !campaign) {
    return (
      <DetailPageLayout>
        <div style={{ padding: '16px', textAlign: 'center' }}>
          <p style={{ color: 'var(--error)', marginBottom: '16px' }}>
            {error || '공고를 찾을 수 없습니다.'}
          </p>
          <Button variant="primary" onClick={() => navigate('/campaigns')}>
            목록으로 돌아가기
          </Button>
        </div>
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
          <div
            style={{ fontSize: 'var(--p2)', lineHeight: 1.6 }}
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
          <div
            style={{ fontSize: 'var(--p2)', lineHeight: 1.6 }}
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
          content={formatDate(campaign.closeAt)}
        />
        <InfoItem
          title="시작시간"
          content={campaign.startTime || '-'}
        />
        <InfoItem
          title="종료시간"
          content={campaign.endTime || '-'}
        />
        {campaign.fee != null && (
          <InfoItem
            title="출연료"
            content={
              campaign.feeNegotiable
                ? `${campaign.fee.toLocaleString()}원 (협의 가능)`
                : `${campaign.fee.toLocaleString()}원`
            }
          />
        )}
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
      <div style={{ padding: '16px' }}>
        <Button
          variant="primary"
          size="large"
          fullWidth
          onClick={handleButtonClick}
          disabled={campaign.isApplied}
        >
          {campaign.isApplied ? '이미 지원한 공고입니다' : '지원하기'}
        </Button>
      </div>
    </DetailPageLayout>
  );
};

export default CampaignDetailPage;

