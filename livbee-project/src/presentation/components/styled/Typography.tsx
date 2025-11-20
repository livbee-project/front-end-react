import React from 'react';
import styled from 'styled-components';

/**
 * Typography 컴포넌트 시스템
 * 디자인 시스템에 맞춘 일관된 타이포그래피 스타일 제공
 */

// ===== 제목 컴포넌트 =====

/**
 * H1 - 페이지 타이틀
 * 16px, Bold 700
 */
export const H1 = styled.h1`
  margin: 0;
  font: ${({ theme }) => theme.fonts.h1};
  color: ${({ theme }) => theme.colors.foreground};
  line-height: 1.4;
`;

/**
 * H2 - 섹션 타이틀, 이름, 브랜드명
 * 14px, Bold 700
 */
export const H2 = styled.h2`
  margin: 0;
  font: ${({ theme }) => theme.fonts.h2};
  color: ${({ theme }) => theme.colors.foreground};
  line-height: 1.4;
`;

/**
 * H3 - 섹션 타이틀, 이름, 브랜드명
 * 14px, Bold 700
 */
export const H3 = styled.h3`
  margin: 0;
  font: ${({ theme }) => theme.fonts.h2};
  color: ${({ theme }) => theme.colors.foreground};
  line-height: 1.4;
`;

// ===== 본문 컴포넌트 =====

/**
 * P - 본문 텍스트
 * 14px, Light 300
 */
export const P = styled.p`
  margin: 0;
  font: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.foreground};
  line-height: 1.6;
`;

/**
 * PMuted - 본문 텍스트 (보조 색상)
 * 14px, Light 300
 */
export const PMuted = styled.p`
  margin: 0;
  font: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.6;
`;

/**
 * Small - 작은 본문
 * 13px, Light 300
 */
export const Small = styled.p`
  margin: 0;
  font: 300 13px/1.6 'NexonLv2Gothic';
  color: ${({ theme }) => theme.colors.foreground};
  line-height: 1.6;
`;

// ===== 캡션 컴포넌트 =====

/**
 * Caption - 캡션, 태그
 * 12px, Light 300
 */
export const Caption = styled.span`
  font: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.foreground};
  line-height: 1.4;
`;

/**
 * CaptionMedium - 강조 캡션
 * 12px, Medium 500
 */
export const CaptionMedium = styled.span`
  font: ${({ theme }) => theme.fonts.button};
  color: ${({ theme }) => theme.colors.foreground};
  line-height: 1.4;
`;

// ===== 버튼 텍스트 =====

/**
 * ButtonText - 버튼 텍스트
 * 12px, Medium 500
 */
export const ButtonText = styled.span`
  font: ${({ theme }) => theme.fonts.button};
  color: ${({ theme }) => theme.colors.foreground};
  line-height: 1.4;
`;

// ===== 강조 컴포넌트 =====

/**
 * Highlight - 강조 텍스트 (Primary 컬러)
 * 인라인 스타일로 사용
 */
export const Highlight: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <HighlightSpan>{children}</HighlightSpan>;
};

const HighlightSpan = styled.span`
  color: ${({ theme }) => theme.colors.primary};
`;

