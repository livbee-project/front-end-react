import React from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignCard from '@/presentation/components/cards/CampaignCard';
import VerticalList from '@/presentation/components/list/VerticalList';
import ListItem from '@/presentation/components/list/ListItem';
import ListPageLayout from '@/presentation/layouts/ListPageLayout';

/**
 * (수정) 리스트 렌더링을 위한 임시 목업 데이터
 * (스크롤 테스트를 위해 3개에서 10개로 늘림)
 */
const MOCK_CAMPAIGNS = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1, // id를 1부터 10까지 동적으로 생성
  brandName: `브랜드명 ${i + 1}`,
  title: `공고 제목 ${i + 1} (스크롤 테스트용)`,
  content: `P.동해물과 백두산이 마르고 닳도록 ${i + 1}`,
}));

const CampaignsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ListPageLayout
      searchPlaceholder="제목·내용·브랜드로 검색"
      floatingActionButtonPath="/campaigns/register"
    >
      {/* 모집 공고 리스트 */}
      <VerticalList showDividers={false}>
        {MOCK_CAMPAIGNS.map((campaign) => (
          <ListItem
            key={campaign.id}
            onTap={() => navigate(`/campaigns/${campaign.id}`)}
            style={{ borderBottom: 'none' }}
          >
            <CampaignCard
              brandName={campaign.brandName}
              title={campaign.title}
              content={campaign.content}
            />
          </ListItem>
        ))}
      </VerticalList>
    </ListPageLayout>
  );
};

export default CampaignsPage;
