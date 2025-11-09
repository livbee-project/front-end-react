import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortfolioRowCard from '@/presentation/components/cards/PortfolioRowCard';
import VerticalList from '@/presentation/components/list/VerticalList';
import ListItem from '@/presentation/components/list/ListItem';
import ListPageLayout from '@/presentation/layouts/ListPageLayout';

/**
 * 리스트 렌더링을 위한 임시 목업 데이터
 */
const MOCK_PORTFOLIOS = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `이태웅${i + 1 > 1 ? ` ${i + 1}` : ''}`,
  content: `P.동해물과 백두산이 마르고 닳도록 ${i + 1}`,
}));

const PortfolioPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ListPageLayout
      searchPlaceholder="검색"
      floatingActionButtonPath="/portfolios/register"
    >
      {/* 포트폴리오 리스트 */}
      <VerticalList showDividers={true}>
        {MOCK_PORTFOLIOS.map((portfolio) => (
          <ListItem
            key={portfolio.id}
            onTap={() => navigate(`/portfolios/${portfolio.id}`)}
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
    </ListPageLayout>
  );
};

export default PortfolioPage;

