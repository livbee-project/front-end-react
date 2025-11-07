import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchInput from '@/presentation/components/common/SearchInput';
import CampaignCard from '@/presentation/components/cards/CampaignCard';
import VerticalList from '@/presentation/components/common/VerticalList';
import ListItem from '@/presentation/components/common/ListItem';
import FloatingActionButton from '@/presentation/components/common/FloatingActionButton';

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
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (query: string) => {
    console.log('검색 실행:', query);
    // TODO: 추후 ViewModel(데이터 관리 로직)과 연결
  };

  return (
    <div style={{ padding: '16px' }}>
      <SearchInput
        placeholder="제목·내용·브랜드로 검색"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSearchSubmit={handleSearchSubmit}
      />

      <p
        style={{
          marginBlockStart: '40px',
          marginBlockEnd: 0,
          fontSize: '12px',
          color: 'var(--dark-gray)',
          // (추가) 리스트와의 여백 20px (디자인 임의 적용)
          marginBottom: '20px',
        }}
      >
        카드를 누르면 상세 정보를 보실 수 있습니다.
      </p>

      {/* --- (추가) 모집 공고 리스트 --- */}
      {/*
        DividedList를 사용하여 리스트를 만듭니다.
      */}
      <VerticalList showDividers={false}>
        {MOCK_CAMPAIGNS.map((campaign) => (
          /*
            DividedListItem으로 각 아이템을 감쌉니다.
            (수정) 디자인에 구분선이 없으므로 
            borderBottom: 'none' 스타일을 추가하여 구분선을 숨깁니다.
          */
          <ListItem
            key={campaign.id}
            onTap={() => navigate(`/campaigns/${campaign.id}`)}
            style={{ borderBottom: 'none' }} // (추가) 구분선 숨기기
          >
            {/*
              방금 생성한 CampaignCard 컴포넌트를 렌더링합니다.
            */}
            <CampaignCard
              brandName={campaign.brandName}
              title={campaign.title}
              content={campaign.content}
            />
          </ListItem>
        ))}
      </VerticalList>

      {/* 플로팅 액션 버튼 */}
      <FloatingActionButton
        onClick={() => navigate('/campaigns/register')}
      />
    </div>
  );
};

export default CampaignsPage;
