import React from 'react';
import { GAP, FONT_SIZE, FONT_WEIGHT, TEXT_COLOR, ELLIPSIS_TEXT } from '@/presentation/styles/constants';

/**
 * BaseCard 컴포넌트가 받을 props 타입을 정의합니다.
 * @param children - 카드 내부에 렌더링될 컨텐츠
 * @param onClick - 카드 클릭 시 실행될 함수 (선택)
 * @param style - 커스텀 스타일 (선택)
 */
interface BaseCardProps {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}

/**
 * 모든 카드 컴포넌트의 기본 래퍼입니다.
 * 공통 스타일과 클릭 핸들러를 제공합니다.
 */
const BaseCard: React.FC<BaseCardProps> = ({ children, onClick, style }) => {
  /**
   * 카드 기본 스타일
   */
  const cardStyle: React.CSSProperties = {
    cursor: onClick ? 'pointer' : 'default',
    boxSizing: 'border-box',
    ...style,
  };

  return (
    <div onClick={onClick} style={cardStyle}>
      {children}
    </div>
  );
};

/**
 * 카드 텍스트 스타일 상수
 */
export const CARD_TEXT_STYLES = {
  title: {
    fontWeight: FONT_WEIGHT.MEDIUM,
    fontSize: FONT_SIZE.LG,
    color: TEXT_COLOR.BLACK,
    ...ELLIPSIS_TEXT,
  } as React.CSSProperties,
  titleSmall: {
    fontWeight: FONT_WEIGHT.NORMAL,
    fontSize: FONT_SIZE.MD,
    color: TEXT_COLOR.BLACK,
    ...ELLIPSIS_TEXT,
  } as React.CSSProperties,
  content: {
    fontWeight: FONT_WEIGHT.NORMAL,
    fontSize: FONT_SIZE.XS,
    color: TEXT_COLOR.DARK_GRAY,
    ...ELLIPSIS_TEXT,
  } as React.CSSProperties,
  brand: {
    fontWeight: FONT_WEIGHT.MEDIUM,
    fontSize: FONT_SIZE.MD,
    color: TEXT_COLOR.PRIMARY,
    ...ELLIPSIS_TEXT,
  } as React.CSSProperties,
};

/**
 * 카드 레이아웃 스타일 상수
 */
export const CARD_LAYOUT_STYLES = {
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: GAP.XL,
    width: '100%',
  } as React.CSSProperties,
  column: {
    display: 'flex',
    flexDirection: 'column',
    gap: GAP.LG,
  } as React.CSSProperties,
  textBlock: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: GAP.XS,
    minWidth: 0,
  } as React.CSSProperties,
};

export default BaseCard;

