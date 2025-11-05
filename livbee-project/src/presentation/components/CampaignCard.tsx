import React from 'react';
// (규칙 적용) Remix Icon 라이브러리 임포트
import { RiUserLine } from 'react-icons/ri';
// (규칙 적용) 절대 경로 임포트
import '@/presentation/styles/global.css';

/**
 * CampaignCard가 받을 props 타입을 정의합니다.
 * @param brandName - 브랜드명 (파란색 텍스트)
 * @param title - 공고 제목 (검정색 굵은 텍스트)
 * @param content - 공고 내용 (회색 텍스트)
 * @param onPress - 카드 전체 클릭 시 실행될 함수 (선택)
 */
interface CampaignCardProps {
  brandName: string;
  title: string;
  content: string;
  onPress?: () => void;
}

/**
 * "모집 공고" 리스트 페이지 전용 카드 UI 컴포넌트입니다.
 * (디자인 레퍼런스: image_0ac046.png)
 */
const CampaignCard: React.FC<CampaignCardProps> = ({
  brandName,
  title,
  content,
  onPress,
}) => {
  // --- 스타일 정의 ---

  /** 1. 전체 카드 컨테이너 (Row) */
  const cardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center', // 세로 중앙 정렬
    width: '100%',
    gap: 12, // 아이템 간 간격
    cursor: onPress ? 'pointer' : 'default',
  };

  /** 2. 좌측 원형 아이콘 (Placeholder) */
  const leftIconStyle: React.CSSProperties = {
    width: 50,
    height: 50,
    flexShrink: 0, // 줄어들지 않음
    borderRadius: '50%',
    backgroundColor: 'var(--paint-gray, #E5E7ED)', // global.css의 색상
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--dark-gray)',
  };

  /** 3. 중간 텍스트 블록 (Column) */
  const textBlockStyle: React.CSSProperties = {
    flex: 1, // 남은 공간 모두 차지
    display: 'flex',
    flexDirection: 'column',
    gap: 4, // 텍스트 간 세로 간격
    minWidth: 0, // flex 아이템 내부의 말줄임표(ellipsis)를 위한 설정
  };

  /** 3a. 브랜드명 (h3, primary) */
  const brandStyle: React.CSSProperties = {
    color: 'var(--primary)',
    fontSize: 'var(--h3)', // 16px
    fontWeight: 500,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  /** 3b. 제목 (h2, black, bold) */
  const titleStyle: React.CSSProperties = {
    color: 'var(--black)',
    fontSize: 'var(--h2)', // 18px
    fontWeight: 700,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  /** 3c. 내용 (p2, dark-gray) */
  const contentStyle: React.CSSProperties = {
    color: 'var(--dark-gray)',
    fontSize: 'var(--p2)', // 14px
    fontWeight: 400,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  /** 4. 우측 "CH" 아이콘 */
  const chIconStyle: React.CSSProperties = {
    width: 40,
    height: 40,
    flexShrink: 0,
    borderRadius: '50%',
    backgroundColor: 'var(--primary)',
    color: 'var(--white)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'var(--p2)', // 14px
    fontWeight: 400,
  };

  // --- 렌더링 ---
  return (
    <div style={cardStyle} onClick={onPress}>
      {/* 1. 좌측 아이콘 */}
      <div style={leftIconStyle}>
        <RiUserLine size={24} />
      </div>

      {/* 2. 중간 텍스트 블록 */}
      <div style={textBlockStyle}>
        <span style={brandStyle}>{brandName}</span>
        <span style={titleStyle}>{title}</span>
        <span style={contentStyle}>{content}</span>
      </div>

      {/* 3. 우측 CH 아이콘 */}
      <div style={chIconStyle}>CH</div>
    </div>
  );
};

export default CampaignCard;