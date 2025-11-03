import React from 'react';
// (추가) 필요한 공통 컴포넌트 임포트
import SectionContainer from '../../components/SectionContainer';
import DividedList from '../../components/DividedList';
import DividedListItem from '../../components/DividedListItem';

/**
 * "라이비 뉴스" 섹션 컴포넌트
 * Home.tsx에 있던 로직을 이 파일로 이동
 */
const LivbeeNewsSection: React.FC = () => {
  // (추가) "라이비 뉴스" 섹션을 위한 임시 데이터 (Home.tsx에서 이동)
  const newsItems = [
    {
      id: 1,
      title: '라이비, 2025년 상반기 파트너사 모집',
      time: '5분 전',
      content: '브랜드와 쇼호스트를 위한 새로운...',
    },
    {
      id: 2,
      title: '새로운 기능 업데이트 안내 (v1.2)',
      time: '3일 전',
      content: '스튜디오 예약 기능이 추가되었습니다...',
    },
  ];

  return (
    <SectionContainer
      title="라이비 뉴스"
      onMorePressed={() => console.log('라이비 뉴스 더보기 클릭')}
    >
      {/*
        Flutter 원본의 Padding(horizontal: 10)을 적용합니다.
        (Home.tsx에서 그대로 복사)
      */}
      <div style={{ padding: '0 10px' }}>
        <DividedList>
          {/* (Home.tsx에서 그대로 복사) */}
          {newsItems.map((news) => (
            <DividedListItem
              key={news.id}
              onTap={() => console.log(`뉴스 ${news.id} 클릭`)}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 8, // Flutter 원본
                }}
              >
                {/* 1. 뉴스 제목 */}
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: 'var(--h3)',
                    color: 'var(--black)',
                    width: '100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {news.title}
                </span>

                {/* 2. 시간 및 내용 요약 */}
                <span
                  style={{
                    fontWeight: 400,
                    fontSize: '12px',
                    color: 'var(--dark-gray)',
                    width: '100%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {news.time} · {news.content}
                </span>
              </div>
            </DividedListItem>
          ))}
        </DividedList>
      </div>
    </SectionContainer>
  );
};

export default LivbeeNewsSection;