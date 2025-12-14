import React from 'react';

/**
 * 네비게이션 아이콘의 공통 props
 */
interface NavigationIconProps {
  size?: number;
  strokeWidth?: number;
  className?: string;
}

/**
 * SvgWrapper 기본 설정을 위한 공통 SVG 속성
 */
const defaultSvgProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

/**
 * 홈 아이콘
 * 집 모양 (지붕 + 문)
 */
export const IconHome: React.FC<NavigationIconProps> = ({
  size = 24,
  strokeWidth = 2,
  className,
}) => {
  return (
    <svg
      {...defaultSvgProps}
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      className={className}
    >
      <path d="M15 21v-8a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  );
};

/**
 * 검색 아이콘 (캠페인)
 * 돋보기 (원 + 손잡이)
 */
export const IconSearch: React.FC<NavigationIconProps> = ({
  size = 24,
  strokeWidth = 2,
  className,
}) => {
  return (
    <svg
      {...defaultSvgProps}
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
};

/**
 * 마이크 아이콘 (쇼호스트)
 * 마이크 모양 (상단 캡슐 + 스탠드)
 */
export const IconMic: React.FC<NavigationIconProps> = ({
  size = 24,
  strokeWidth = 2,
  className,
}) => {
  return (
    <svg
      {...defaultSvgProps}
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      className={className}
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
};

/**
 * 카메라 아이콘 (모델)
 * 카메라 모양 (본체 + 렌즈)
 */
export const IconCamera: React.FC<NavigationIconProps> = ({
  size = 24,
  strokeWidth = 2,
  className,
}) => {
  return (
    <svg
      {...defaultSvgProps}
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      className={className}
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
};

/**
 * 웃는 얼굴 아이콘 (MY)
 * 웃는 얼굴 이모티콘 (눈 + 웃는 입)
 */
export const IconSmile: React.FC<NavigationIconProps> = ({
  size = 24,
  strokeWidth = 2,
  className,
}) => {
  return (
    <svg
      {...defaultSvgProps}
      width={size}
      height={size}
      strokeWidth={strokeWidth}
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
};

