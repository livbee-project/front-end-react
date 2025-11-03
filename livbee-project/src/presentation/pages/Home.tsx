import React from 'react';
// (추가) 공통 컴포넌트 import
import SectionContainer from '../components/SectionContainer';
import RecruitCard from '../components/RecruitCard';
import DividedList from '../components/DividedList';
import DividedListItem from '../components/DividedListItem';
// (유지) 스크롤바 숨기기 클래스를 위해 import
import '../styles/global.css';

/**
 * 홈 페이지 컴포넌트
 * 이제 이 컴포넌트는 공통 컴포넌트(SectionContainer, RecruitCard)를
 * 조립하는 역할만 담당합니다.
 */
const Home: React.FC = () => {
  // 가로 스크롤 리스트를 시연하기 위한 임시 데이터
  const shoppingLiveItems = [1, 2, 3, 4, 5];

  // (추가) "라이비 뉴스" 섹션을 위한 임시 데이터
  const newsItems = [
    { id: 1, title: '라이비, 2025년 상반기 파트너사 모집', time: '5분 전', content: '브랜드와 쇼호스트를 위한 새로운...' },
    { id: 2, title: '새로운 기능 업데이트 안내 (v1.2)', time: '3일 전', content: '스튜디오 예약 기능이 추가되었습니다...' },
  ];

  // (수정) React.FC 반환 타입에 맞게 <></> (Fragment) 대신
  // 최상위 <div className="app-container">로 변경합니다.
  return (
    <div className="app-container">
      {/*
        --- (수정) "지금 뜨는 쇼핑라이브" 섹션 ---
        기존의 <Header>와 <div className="hide-scrollbar">...</div>를
        <SectionContainer>로 대체합니다.
      */}
      <SectionContainer
        title="지금 뜨는 쇼핑라이브"
        onMorePressed={() => console.log('쇼핑라이브 더보기 클릭')}
      >
        {/*
          SectionContainer의 children으로
          가로 스크롤 리스트 컨테이너를 전달합니다.
        */}
        <div
          className="hide-scrollbar"
          style={{
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden',
            height: 610, // Flutter 원본 높이
            gap: 10,
            padding: '0 10px',
          }}
        >
          {/*
            임시 데이터를 map으로 순회하며
            기존의 복잡한 div 대신 <RecruitCard> 컴포넌트를 렌더링합니다.
          */}
          {shoppingLiveItems.map((item) => (
            <RecruitCard
              key={item}
              // --- 1. 공통 Props 전달 ---
              brandName={`브랜드명 ${item}`}
              title={`[${item}] 지금 뜨는 라이브 제목`}
              content={`[${item}] 라이브 내용 요약이 여기에 표시됩니다...`}
              onPress={() => console.log(`쇼핑라이브 Card ${item} 클릭`)}
              // --- 2. 상단 (TopContent) Prop 전달 ---
              // "쇼핑라이브" 섹션에만 해당하는 400px 높이의 이미지 영역 UI를
              // topContent prop으로 만들어 전달합니다.
              topContent={
                <div
                  style={{
                    width: 300,
                    height: 400,
                    border: '1px solid var(--dark-gray)',
                    borderRadius: 10,
                    position: 'relative',
                    backgroundColor: '#f0f0f0', // 임시 배경색
                    overflow: 'hidden',
                  }}
                >
                  {/* Flutter 원본의 Positioned 뱃지 */}
                  <span
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 10,
                      padding: '4px 17px',
                      background: 'var(--primary)',
                      color: 'var(--white)',
                      fontSize: 'var(--h3)',
                      fontWeight: 400,
                      borderRadius: 20,
                    }}
                  >
                    CH
                  </span>
                </div>
              }
              // --- 3. 하단 (BottomContent) Prop 전달 ---
              // "쇼핑라이브" 섹션에만 해당하는 상품 정보 UI를
              // bottomContent prop으로 만들어 전달합니다.
              bottomContent={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    gap: 20, // Flutter 원본
                  }}
                >
                  {/* 상품 이미지 플레이스홀더 */}
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      background: 'var(--dark-gray)',
                      flexShrink: 0,
                    }}
                  />
                  {/* 상품명 */}
                  <span
                    style={{
                      fontWeight: 400,
                      fontSize: '12px',
                      color: 'var(--dark-gray)',
                      flex: 1,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    상품명 {item}이 노출됩니다.
                  </span>
                </div>
              }
            />
          ))}
        </div>
      </SectionContainer>

      {/* --- (추가) "브랜드 픽" 섹션 --- */}
      {/*
        "브랜드 픽" 섹션도 동일하게 SectionContainer로 감싸줍니다.
      */}
      <SectionContainer
        title="브랜드 PICK"
        onMorePressed={() => console.log('브랜드 픽 더보기 클릭')}
      >
        {/*
          가로 스크롤 리스트 컨테이너
          Flutter 원본의 높이 360px를 적용합니다.
        */}
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
          {/* 임시 데이터를 map으로 순회하며 RecruitCard를 재사용합니다. */}
          {shoppingLiveItems.map((item) => (
            <RecruitCard
              key={item}
              // --- 1. 공통 Props 전달 ---
              brandName={`브랜드 ${item}`}
              title={`[${item}] 브랜드 픽 제목`}
              content={`[${item}] 브랜드 픽 내용 요약...`}
              onPress={() => console.log(`브랜드 픽 Card ${item} 클릭`)}
              // --- 2. 상단 (TopContent) Prop 전달 ---
              // "브랜드 픽"에 맞는 150px 높이의 이미지 영역 UI를 전달합니다.
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
                  {/*
                    Flutter 원본의 *원형* 뱃지 스타일을 적용합니다.
                  */}
                  <span
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 10,
                      // 원형 뱃지 스타일
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
              // "브랜드 픽"에 맞는 'BUTTON' UI를 전달합니다.
              bottomContent={
                <div
                  style={{
                    width: '100%',
                    padding: '10px 0',
                    background: 'var(--primary)',
                    color: 'var(--white)',
                    borderRadius: 10,
                    textAlign: 'center',
                    fontSize: 'var(--p2)',
                    fontWeight: 400,
                    cursor: 'pointer',
                  }}
                >
                  BUTTON
                </div>
              }
            />
          ))}
        </div>
      </SectionContainer>
      

      <SectionContainer
        title="라이비 뉴스"
        onMorePressed={() => console.log('라이비 뉴스 더보기 클릭')}
      >
        {/*
          Flutter 원본의 Padding(horizontal: 10)을 적용합니다.
        */}
        <div style={{ padding: '0 10px' }}>
          {/*
            새로 만든 DividedList 컴포넌트를 사용합니다.
          */}
          <DividedList>
            {/*
              임시 newsItems 데이터를 map으로 순회하며
              DividedListItem 컴포넌트를 렌더링합니다.
            */}
            {newsItems.map((news) => (
              <DividedListItem
                key={news.id}
                onTap={() => console.log(`뉴스 ${news.id} 클릭`)}
              >
                {/*
                  Flutter 원본의 Column 구조를
                  flex-direction: column으로 구현합니다.
                */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: 8, // Flutter 원본(SizedBox(height: 8))
                  }}
                >
                  {/* 1. 뉴스 제목 */}
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 'var(--h3)', // 16px (React 기준)
                      color: 'var(--black)',
                      // (추가) 말줄임표 스타일
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
                      // Flutter 원본의 p(12px)
                      fontSize: '12px',
                      color: 'var(--dark-gray)',
                      width: '100%',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {/* Flutter 원본 형식 ('$relativeTime · ${article.content}') */}
                    {news.time} · {news.content}
                  </span>
                </div>
              </DividedListItem>
            ))}
          </DividedList>
        </div>
      </SectionContainer>
      {/* --- "라이비 뉴스" 섹션 종료 --- */}
    </div>
  );
};

export default Home;