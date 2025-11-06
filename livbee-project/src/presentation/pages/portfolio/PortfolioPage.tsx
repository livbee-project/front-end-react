import React, { useState } from 'react';
import SearchInput from '@/presentation/components/SearchInput';
import PortfolioRowCard from '@/presentation/components/PortfolioRowCard';
import VerticalList from '@/presentation/components/VerticalList';
import ListItem from '@/presentation/components/ListItem';
import FloatingActionButton from '@/presentation/components/FloatingActionButton';

/**
 * 리스트 렌더링을 위한 임시 목업 데이터
 */
const MOCK_PORTFOLIOS = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `이태웅${i + 1 > 1 ? ` ${i + 1}` : ''}`,
  content: `P.동해물과 백두산이 마르고 닳도록 ${i + 1}`,
}));

const PortfolioPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (query: string) => {
    console.log('검색 실행:', query);
    // TODO: 추후 ViewModel(데이터 관리 로직)과 연결
  };

  return (
    <div style={{ padding: '16px' }}>
      <SearchInput
        placeholder="검색"
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
          marginBottom: '20px',
        }}
      >
        카드를 누르면 상세 정보를 보실 수 있습니다.
      </p>

      {/* 포트폴리오 리스트 */}
      <VerticalList showDividers={true}>
        {MOCK_PORTFOLIOS.map((portfolio) => (
          <ListItem
            key={portfolio.id}
            onTap={() => console.log(`Portfolio ${portfolio.id} 클릭`)}
          >
            <PortfolioRowCard
              title={portfolio.name}
              content={portfolio.content}
              onOfferPress={() => console.log(`제안하기 ${portfolio.id}`)}
              onCardPress={() => console.log(`포트폴리오 ${portfolio.id} 클릭`)}
            />
          </ListItem>
        ))}
      </VerticalList>

      {/* 플로팅 액션 버튼 */}
      <FloatingActionButton
        onClick={() => console.log('포트폴리오 작성 클릭')}
      />
    </div>
  );
};

export default PortfolioPage;

