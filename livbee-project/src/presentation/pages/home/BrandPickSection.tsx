import React from 'react';
import { useNavigate } from 'react-router-dom';
// 공통 컴포넌트 임포트
import SectionContainer from '@/presentation/components/section/SectionContainer';
import RecruitCard from '@/presentation/components/cards/RecruitCard';
import Button from '@/presentation/components/ui/Button';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { Campaign } from '@/domain/entities/Campaign';
import { htmlToText } from '@/shared/utils/htmlUtils';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useListData } from '@/presentation/hooks/useListData';
// 스크롤바 숨기기 CSS 임포트
import '@/presentation/styles/global.css';

/**
 * "브랜드 픽" 섹션 컴포넌트
 */
const BrandPickSection: React.FC = () => {
  const navigate = useNavigate();
  
  // campaignRepository를 useRepository 훅으로 관리
  const campaignRepository = useRepository(CampaignRepository);

  // 목록 데이터 조회
  const { data: campaigns, loading: isLoading } = useListData<Campaign, { page: number; limit: number; sort?: string }, { items: Campaign[] }>(
    (query, signal) => campaignRepository.getCampaignList(query, signal),
    {
      page: 1,
      limit: 10, // 홈 페이지에서는 최대 10개만 표시
      sort: 'latest',
    },
    [],
    '브랜드 픽 목록을 불러오는 중 오류가 발생했습니다.'
  );

  // 로딩 중이거나 데이터가 없을 때
  if (isLoading) {
    return (
      <SectionContainer
        title="브랜드 PICK"
        onMorePressed={() => navigate('/campaigns')}
      >
        <LoadingState />
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
                    width: 240,
                    height: 150, // Flutter 원본 높이
                    border: imageUrl ? 'none' : '1px solid var(--dark-gray)',
                    borderRadius: 10,
                    position: 'relative',
                    backgroundColor: 'var(--placeholder-bg)',
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