import React from 'react';
import { useNavigate } from 'react-router-dom';
import SectionContainer from '@/presentation/components/section/SectionContainer';
import VerticalList from '@/presentation/components/list/VerticalList';
import ListItem from '@/presentation/components/list/ListItem';
import PortfolioRowCard from '@/presentation/components/cards/PortfolioRowCard';

/**
 * "이런 쇼호스트는 어떠세요?" 섹션 컴포넌트
 */
const HowShowhostSection: React.FC = () => {
  const navigate = useNavigate();
  // (추가) 섹션에서 사용할 임시 데이터
  const showhostItems = [
    {
      id: 1,
      title: '뷰티 전문 쇼호스트 OOO',
      content: '원피스 여행 피크닉 베스트 셀러 슈엘리엘에서...',
      // imageUrl: 'https://...' (테스트용 이미지 URL)
    },
    {
      id: 2,
      title: '가전 전문 쇼호스트 XXX',
      content: '라이브 커머스 경력 3년차, 전문성 보장!',
      // imageUrl: 'https://...'
    },
  ];

  return (
    // 1. 섹션 컨테이너 (재사용)
    <SectionContainer
      title="이런 쇼호스트는 어떠세요?"
      onMorePressed={() => navigate('/portfolios')}
    >
      {/* Flutter 원본의 Container(padding: 10) 적용
       */}
      <div style={{ padding: '0 10px' }}>
        {/* 2. 구분선이 있는 리스트 (재사용) */}
        <VerticalList>
          {/* 임시 데이터를 map으로 순회하며 리스트 아이템 렌더링
           */}
          {showhostItems.map((item) => (
            // 3. 리스트 아이템 (재사용)
            <ListItem key={item.id}>
              {/* 4. 방금 생성한 공통 카드 (신규 사용)
                Flutter의 _buildPortfolioCard를 대체합니다.
              */}
              <PortfolioRowCard
                title={item.title}
                content={item.content}
                // imageUrl={item.imageUrl} (이미지 URL prop)
                onOfferPress={() => console.log(`제안하기 ${item.id}`)}
                onCardPress={() => navigate(`/portfolios/${item.id}`)}
              />
            </ListItem>
          ))}
        </VerticalList>
      </div>
    </SectionContainer>
  );
};

export default HowShowhostSection;
