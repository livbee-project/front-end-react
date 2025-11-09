import React from 'react';
import { RiUserLine } from 'react-icons/ri';
import { GAP, FONT_SIZE, FONT_WEIGHT, TEXT_COLOR, ELLIPSIS_TEXT, FLEX_CENTER } from '@/presentation/styles/constants';
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
    alignItems: 'center',
    width: '100%',
    gap: GAP.XL,
    cursor: onPress ? 'pointer' : 'default',
  };

  /** 2. 좌측 원형 아이콘 (Placeholder) */
  const leftIconStyle: React.CSSProperties = {
    width: 50,
    height: 50,
    flexShrink: 0,
    borderRadius: '50%',
    backgroundColor: 'var(--paint-gray, #E5E7ED)',
    ...FLEX_CENTER,
    color: TEXT_COLOR.DARK_GRAY,
  };

  /** 3. 중간 텍스트 블록 (Column) */
  const textBlockStyle: React.CSSProperties = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: GAP.XS,
    minWidth: 0,
  };

  /** 3a. 브랜드명 (h3, primary) */
  const brandStyle: React.CSSProperties = {
    color: TEXT_COLOR.PRIMARY,
    fontSize: FONT_SIZE.MD,
    fontWeight: FONT_WEIGHT.MEDIUM,
    ...ELLIPSIS_TEXT,
  };

  /** 3b. 제목 (h2, black, bold) */
  const titleStyle: React.CSSProperties = {
    color: TEXT_COLOR.BLACK,
    fontSize: FONT_SIZE.LG,
    fontWeight: FONT_WEIGHT.BOLD,
    ...ELLIPSIS_TEXT,
  };

  /** 3c. 내용 (p2, dark-gray) */
  const contentStyle: React.CSSProperties = {
    color: TEXT_COLOR.DARK_GRAY,
    fontSize: FONT_SIZE.SM,
    fontWeight: FONT_WEIGHT.NORMAL,
    ...ELLIPSIS_TEXT,
  };

  /** 4. 우측 "CH" 아이콘 */
  const chIconStyle: React.CSSProperties = {
    width: 40,
    height: 40,
    flexShrink: 0,
    borderRadius: '50%',
    backgroundColor: TEXT_COLOR.PRIMARY,
    color: TEXT_COLOR.WHITE,
    ...FLEX_CENTER,
    fontSize: FONT_SIZE.SM,
    fontWeight: FONT_WEIGHT.NORMAL,
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