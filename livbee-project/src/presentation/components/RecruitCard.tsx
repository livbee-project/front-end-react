import React from 'react';

/**
 * RecruitCard 컴포넌트가 받을 props 타입을 정의합니다.
 * @param topContent - 카드의 상단 영역 (이미지, 뱃지 등)
 * @param bottomContent - 카드의 하단 영역 (상품 정보, 버튼 등)
 * @param brandName - 브랜드명 (파란색 텍스트)
 * @param title - 공고 제목 (검정색 굵은 텍스트)
 * @param content - 공고 내용 (회색 텍스트)
 * @param onPress - 카드 전체를 클릭했을 때 실행될 함수 (선택)
 */
interface RecruitCardProps {
  topContent: React.ReactNode;
  bottomContent: React.ReactNode;
  brandName: string;
  title: string;
  content: string;
  onPress?: () => void;
}

/**
 * '쇼핑라이브' 및 '브랜드 픽' 섹션에서 사용되는
 * 공통 공고 카드 레이아웃 컴포넌트입니다.
 */
const RecruitCard: React.FC<RecruitCardProps> = ({
  topContent,
  bottomContent,
  brandName,
  title,
  content,
  onPress,
}) => {
  // --- 공통 스타일 정의 ---
  // (Home.tsx에서 사용했던 스타일을 그대로 가져옵니다)

  // 브랜드명 (파란색)
  const brandNameStyle: React.CSSProperties = {
    color: 'var(--primary)',
    fontSize: 'var(--h3)',
    fontWeight: 700,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    flex: 1, // 아이콘을 밀어내기 위해
  };

  // CH 원형 아이콘
  const chIconStyle: React.CSSProperties = {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    background: 'var(--primary)',
    color: 'var(--white)',
    fontSize: 'var(--p2)',
    fontWeight: 400,
    borderRadius: '50%',
    flexShrink: 0,
  };

  // 제목 (검정 굵게)
  const titleStyle: React.CSSProperties = {
    fontWeight: 700,
    fontSize: 'var(--h2)',
    color: 'var(--black)',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  // 내용 (회색)
  const contentStyle: React.CSSProperties = {
    fontWeight: 400,
    fontSize: '12px',
    color: 'var(--dark-gray)',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  // --- 컴포넌트 렌더링 ---
  return (
    <div
      onClick={onPress}
      style={{
        width: 300, // 카드 고정 너비
        flexShrink: 0, // 가로 스크롤 시 찌그러짐 방지
        height: '100%', // 부모 컨테이너(가로 스크롤 div)의 높이를 채움
        display: 'flex',
        flexDirection: 'column',
        cursor: onPress ? 'pointer' : 'default', // 클릭 가능 여부 표시
      }}
    >
      {/*
        1. 상단 컨텐츠 (변화하는 부분)
        '쇼핑라이브'의 (400px 이미지 + 뱃지) 또는
        '브랜드 픽'의 (150px 이미지 + 뱃지)가 이 자리에 들어옵니다.
      */}
      {topContent}

      {/*
        2. 하단 공통 컨텐츠 영역
        (브랜드명, 제목, 내용, 하단 컨텐츠)
      */}
      <div
        style={{
          flex: 1, // topContent를 제외한 나머지 세로 공간을 모두 차지
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 12, // 상단 컨텐츠(이미지)와의 간격
          gap: 12, // 내부 아이템(브랜드, 제목, 내용) 간의 간격
        }}
      >
        {/* 2a. 브랜드명 + CH 아이콘 (공통) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={brandNameStyle}>{brandName}</span>
          <span style={chIconStyle}>CH</span>
        </div>

        {/* 2b. 제목 (공통) */}
        <span style={titleStyle}>{title}</span>

        {/* 2c. 내용 (공통) */}
        <span style={contentStyle}>{content}</span>

        {/* 2d. Spacer (공통) */}
        {/*
          이 빈 div가 flex: 1을 가짐으로써
          하단 컨텐츠(bottomContent)를 항상 카드 맨 아래로 밀어냅니다.
        */}
        <div style={{ flex: 1 }} />

        {/*
          2e. 하단 컨텐츠 (변화하는 부분)
          '쇼핑라이브'의 (상품 정보) 또는
          '브랜드 픽'의 (버튼)이 이 자리에 들어옵니다.
        */}
        {bottomContent}
      </div>
    </div>
  );
};

export default RecruitCard;