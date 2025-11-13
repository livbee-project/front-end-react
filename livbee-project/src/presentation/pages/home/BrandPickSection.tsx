import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// 공통 컴포넌트 임포트
import SectionContainer from '@/presentation/components/section/SectionContainer';
import RecruitCard from '@/presentation/components/cards/RecruitCard';
import Button from '@/presentation/components/ui/Button';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { Campaign } from '@/domain/entities/Campaign';
// 스크롤바 숨기기 CSS 임포트
import '@/presentation/styles/global.css';

/**
 * HTML 콘텐츠를 텍스트로 변환하는 유틸리티 함수
 */
const htmlToText = (html: string): string => {
  if (typeof window === 'undefined') return html;
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
};

/**
 * "브랜드 픽" 섹션 컴포넌트
 */
const BrandPickSection: React.FC = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // campaignRepository를 useRef로 관리하여 매 렌더링마다 재생성되지 않도록 함
  const campaignRepositoryRef = useRef<CampaignRepository | null>(null);
  if (!campaignRepositoryRef.current) {
    campaignRepositoryRef.current = new CampaignRepository();
  }
  const campaignRepository = campaignRepositoryRef.current;

  /**
   * 모집 공고 목록 조회
   */
  useEffect(() => {
    const abortController = new AbortController();
    let isCancelled = false;

    const fetchCampaigns = async () => {
      try {
        if (!isCancelled) {
          setIsLoading(true);
        }
        const response = await campaignRepository.getCampaignList(
          {
            page: 1,
            limit: 10, // 홈 페이지에서는 최대 10개만 표시
            sort: 'latest',
          },
          abortController.signal
        );
        if (!isCancelled && !abortController.signal.aborted) {
          setCampaigns(response.items);
        }
      } catch (error) {
        // AbortError는 무시 (요청이 취소된 경우)
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        if (!isCancelled && !abortController.signal.aborted) {
          console.error('브랜드 픽 목록 조회 실패:', error);
          setCampaigns([]);
        }
      } finally {
        if (!isCancelled && !abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchCampaigns();

    // cleanup 함수: 컴포넌트가 언마운트되면 이전 요청을 취소
    return () => {
      isCancelled = true;
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // campaignRepository는 ref로 관리되므로 의존성 배열에서 제외

  // 로딩 중이거나 데이터가 없을 때
  if (isLoading) {
    return (
      <SectionContainer
        title="브랜드 PICK"
        onMorePressed={() => navigate('/campaigns')}
      >
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>로딩 중...</p>
        </div>
      </SectionContainer>
    );
  }

  if (campaigns.length === 0) {
    return null; // 데이터가 없으면 섹션을 표시하지 않음
  }

  return (
    <SectionContainer
      title="브랜드 PICK"
      onMorePressed={() => navigate('/campaigns')}
    >
      {/* 가로 스크롤 리스트 컨테이너 */}
      <div
        className="hide-scrollbar"
        style={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          height: 360, // Flutter 원본 높이
          gap: 10,
          padding: '0 10px',
        }}
      >
        {/* RecruitCard 렌더링 로직 */}
        {campaigns.map((campaign) => {
          const imageUrl = campaign.imageUrl || campaign.thumbnailUrl || undefined;
          const contentText = htmlToText(campaign.content);
          const summaryContent = contentText.length > 50 
            ? contentText.substring(0, 50) + '...' 
            : contentText;

          return (
            <RecruitCard
              key={campaign.id}
              // --- 1. 공통 Props 전달 ---
              brandName={campaign.brandName}
              title={campaign.title}
              content={summaryContent}
              onPress={() => navigate(`/campaigns/${campaign.id}`)}
              // --- 2. 상단 (TopContent) Prop 전달 ---
              // "브랜드 픽"에 맞는 150px 높이의 이미지 영역 UI
              topContent={
                <div
                  style={{
                    width: 300,
                    height: 150, // Flutter 원본 높이
                    border: '1px solid var(--dark-gray)',
                    borderRadius: 10,
                    position: 'relative',
                    backgroundColor: '#f0f0f0',
                    overflow: 'hidden',
                  }}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={campaign.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : null}
                  {/* 원형 뱃지 스타일 */}
                  <span
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 10,
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 40,
                      height: 40,
                      background: 'var(--primary)',
                      color: 'var(--white)',
                      fontSize: 'var(--h3)',
                      fontWeight: 400,
                      borderRadius: '50%',
                    }}
                  >
                    CH
                  </span>
                </div>
              }
              // --- 3. 하단 (BottomContent) Prop 전달 ---
              // "브랜드 픽"에 맞는 'BUTTON' UI
              bottomContent={
                <Button
                  variant="primary"
                  size="small"
                  fullWidth
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation(); // 카드 클릭 이벤트와 분리
                    navigate(`/campaigns/${campaign.id}`);
                  }}
                >
                  BUTTON
                </Button>
              }
            />
          );
        })}
      </div>
    </SectionContainer>
  );
};

export default BrandPickSection;