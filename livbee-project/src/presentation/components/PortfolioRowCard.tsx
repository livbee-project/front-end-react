import React from 'react';

/**
 * PortfolioRowCard가 받을 props 타입을 정의합니다.
 * @param title - 한 줄 제목
 * @param content - 한 줄 소개 (내용)
 * @param imageUrl - 우측에 표시될 원형 이미지 URL (선택)
 * @param onOfferPress - '제안하기' 버튼 클릭 시 실행될 함수 (선택)
 * @param onCardPress - 카드 전체 클릭 시 실행될 함수 (선택)
 */
interface PortfolioRowCardProps {
  title: string;
  content: string;
  imageUrl?: string;
  onOfferPress?: () => void;
  onCardPress?: () => void;
}

/**
 * 홈 화면의 "이런 쇼호스트는 어떠세요?" 섹션 및
 * "포트폴리오" 목록 화면에서 사용되는 공통 가로형 카드입니다.
 * Flutter의 _buildPortfolioCard 위젯에 해당합니다.
 */
const PortfolioRowCard: React.FC<PortfolioRowCardProps> = ({
  title,
  content,
  imageUrl,
  onOfferPress,
  onCardPress,
}) => {
  // --- 스타일 정의 ---

  // 1. 좌측 텍스트 컨테이너 (Flutter: Expanded(flex: 7))
  const textContainerStyle: React.CSSProperties = {
    flex: 1, // 남은 공간을 모두 차지
    display: 'flex',
    flexDirection: 'column',
    gap: 5, // Flutter 원본(SizedBox(5))
    minWidth: 0, // flex 컨테이너 내에서 ellipsis가 잘 동작하도록 설정
  };

  // 1a. 상단 제목 + 제안하기 Row
  const topRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 10, // Flutter 원본(SizedBox(10))
  };

  // 1a-1. 제목 텍스트 (Flutter: Expanded(flex: 3))
  const titleStyle: React.CSSProperties = {
    flex: 1, // 남은 공간 차지
    fontWeight: 500,
    fontSize: 'var(--h2)', // 18px (React 기준)
    color: 'var(--black)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  // 1a-2. "제안하기" 텍스트
  const offerStyle: React.CSSProperties = {
    fontWeight: 500,
    fontSize: 'var(--h2)', // 18px
    color: 'var(--primary)',
    cursor: onOfferPress ? 'pointer' : 'default',
    flexShrink: 0, // 줄어들지 않음
  };

  // 1b. 하단 내용 텍스트
  const contentStyle: React.CSSProperties = {
    fontWeight: 400,
    fontSize: '12px', // Flutter p(12px)
    color: 'var(--dark-gray)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  // 2. 우측 원형 이미지 (Flutter: Container(100, 100))
  const imageContainerStyle: React.CSSProperties = {
    width: 100,
    height: 100,
    flexShrink: 0, // 줄어들지 않음
    borderRadius: '50%',
    border: '1px solid var(--dark-gray)',
    // 이미지 URL이 있으면 배경 이미지로, 없으면 회색 배경
    backgroundColor: imageUrl ? 'transparent' : 'var(--bs-gray-200)',
    backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // 이미지 URL이 없을 때 보여줄 플레이스홀더 아이콘
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // --- 컴포넌트 렌더링 ---
  return (
    // 전체 Row 컨테이너
    <div
      onClick={onCardPress}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16, // Flutter 원본(SizedBox(16))
        width: '100%',
        cursor: onCardPress ? 'pointer' : 'default',
      }}
    >
      {/* 1. 좌측 텍스트 영역 */}
      <div style={textContainerStyle}>
        {/* 1a. 상단 Row */}
        <div style={topRowStyle}>
          <span style={titleStyle}>{title}</span>
          {/* "제안하기" 버튼은 onOfferPress prop이 있을 때만 렌더링 */}
          {onOfferPress && (
            <span
              style={offerStyle}
              onClick={(e) => {
                e.stopPropagation(); // 카드 전체 클릭 방지
                onOfferPress();
              }}
            >
              제안하기
            </span>
          )}
        </div>
        {/* 1b. 하단 내용 */}
        <span style={contentStyle}>{content}</span>
      </div>

      {/* 2. 우측 이미지 영역 */}
      <div style={imageContainerStyle}>
        {!imageUrl && (
          // Remixicon을 사용할 수 없으므로(SVG) 기본 텍스트로 대체
          <span style={{ fontSize: 40, color: 'var(--dark-gray)' }}>?</span>
        )}
      </div>
    </div>
  );
};

export default PortfolioRowCard;