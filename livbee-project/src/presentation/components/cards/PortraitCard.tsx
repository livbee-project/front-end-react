import React from 'react';
import { GAP, FONT_SIZE, FONT_WEIGHT, TEXT_COLOR, ELLIPSIS_TEXT, BORDER_RADIUS, SPACING } from '@/presentation/styles/constants';

/**
 * PortraitCard가 받을 props 타입을 정의합니다.
 * @param imageUrl - 300x400 비율의 세로형 이미지 (선택)
 * @param title - 카드 제목 (예: 모델 이름, 클립 제목)
 * @param content - 카드 부제목 (예: 한 줄 소개)
 * @param onPress - 카드 전체 클릭 시 실행될 함수 (선택)
 * @param width - 카드 너비 (선택, 기본값: 300)
 */
interface PortraitCardProps {
  imageUrl?: string;
  title: string;
  content: string;
  onPress?: () => void;
  width?: number | string;
}

/**
 * "컨셉 모델" 및 "HOT CLIP" 섹션에서 사용될
 * 세로형 이미지(300x400) 기반의 공통 카드 컴포넌트입니다.
 */
const PortraitCard: React.FC<PortraitCardProps> = ({
  imageUrl,
  title,
  content,
  onPress,
  width = 300,
}) => {
  // --- 스타일 정의 ---
  
  // width를 숫자 또는 문자열로 처리
  const isDefaultWidth = width === 300 || width === undefined;

  // 1. 카드 전체 컨테이너
  const cardStyle: React.CSSProperties = {
    width: isDefaultWidth ? 300 : width,
    flexShrink: isDefaultWidth ? 0 : 1, // 반응형일 때는 줄어들 수 있도록
    cursor: onPress ? 'pointer' : 'default',
    maxWidth: '100%', // 부모를 넘지 않도록
    boxSizing: 'border-box',
  };

  // 2. 300x400 이미지 영역
  const imageStyle: React.CSSProperties = {
    width: isDefaultWidth ? 300 : '100%',
    height: isDefaultWidth ? 400 : undefined,
    aspectRatio: isDefaultWidth ? undefined : '3/4', // 비율 유지 (3:4) - 반응형일 때만 적용
    backgroundColor: '#f0f0f0',
    borderRadius: BORDER_RADIUS.MD,
    border: `1px solid ${TEXT_COLOR.DARK_GRAY}`,

    // 이미지 처리
    backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',

    // 플레이스홀더 텍스트 (이미지 없을 시)
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'var(--dark-gray)',
    overflow: 'hidden',
  };

  // 3. 텍스트 컨테이너
  const textContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: SPACING.XL,
    gap: GAP.LG,
  };

  // 4. 제목 텍스트
  const titleStyle: React.CSSProperties = {
    fontWeight: FONT_WEIGHT.NORMAL,
    fontSize: FONT_SIZE.MD,
    color: TEXT_COLOR.BLACK,
    width: '100%',
    ...ELLIPSIS_TEXT,
  };

  // 5. 내용 텍스트
  const contentStyle: React.CSSProperties = {
    fontWeight: FONT_WEIGHT.NORMAL,
    fontSize: FONT_SIZE.XS,
    color: TEXT_COLOR.DARK_GRAY,
    width: '100%',
    ...ELLIPSIS_TEXT,
  };

  // --- 컴포넌트 렌더링 ---
  return (
    <div onClick={onPress} style={cardStyle}>
      {/* 1. 300x400 이미지 영역 */}
      <div style={imageStyle}>
        {!imageUrl && <span>(Image 300x400)</span>}
      </div>

      {/* 2. 텍스트 영역 */}
      <div style={textContainerStyle}>
        {/* 2a. 제목 (모델명 또는 클립명) */}
        <span style={titleStyle}>{title}</span>
        {/* 2b. 내용 (한 줄 소개) */}
        <span style={contentStyle}>{content}</span>
      </div>
    </div>
  );
};

export default PortraitCard;