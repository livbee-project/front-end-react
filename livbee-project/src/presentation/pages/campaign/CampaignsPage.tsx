import React, { useState } from 'react';
// (추가) 절대 경로로 필요한 공통 컴포넌트들을 임포트합니다.
import SearchInput from '@/presentation/components/SearchInput';
import CampaignCard from '@/presentation/components/CampaignCard';
import DividedList from '@/presentation/components/DividedList';
import DividedListItem from '@/presentation/components/DividedListItem';

/**
 * (추가) 리스트 렌더링을 위한 임시 목업 데이터
 * (디자인 이미지 참고)
 */
const MOCK_CAMPAIGNS = [
  {
    id: 1,
    brandName: '브랜드명',
    title: '한 줄 제목 넘치면 ...으로 표시하는..',
    content: 'P.동해물과 백두산이 마르고 닳도록',
  },
  {
    id: 2,
    brandName: '브랜드명',
    title: '두 번째 아이템 제목입니다',
    content: 'P.하느님이 보우하사 우리나라 만세',
  },
  {
    id: 3,
    brandName: '브랜드명',
    title: '세 번째 아이템 제목입니다',
    content: 'P.무궁화 삼천리 화려강산 대한사람',
  },
];

const CampaignsPage: React.FC = () => {
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
      <DividedList>
        {MOCK_CAMPAIGNS.map((campaign) => (
          /*
            DividedListItem으로 각 아이템을 감쌉니다.
            (수정) 디자인에 구분선이 없으므로 
            borderBottom: 'none' 스타일을 추가하여 구분선을 숨깁니다.
          */
          <DividedListItem
            key={campaign.id}
            onTap={() => console.log(`Campaign ${campaign.id} 클릭`)}
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
          </DividedListItem>
        ))}
      </DividedList>
    </div>
  );
};

export default CampaignsPage;