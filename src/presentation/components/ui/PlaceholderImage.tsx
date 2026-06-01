import React from 'react';
import styled from 'styled-components';

/**
 * PlaceholderImage 컴포넌트가 받을 props 타입을 정의합니다.
 * @param size - 아이콘 크기 (기본값: 48)
 * @param color - 아이콘 색상 (기본값: theme.colors.muted)
 * @param opacity - 투명도 (기본값: 0.5)
 */
interface PlaceholderImageProps {
  size?: number;
  color?: string;
  opacity?: number;
}

/**
 * 공통 플레이스홀더 이미지 컴포넌트입니다.
 * 이미지가 없을 때 표시되는 아이콘을 제공합니다.
 */
const PlaceholderImage: React.FC<PlaceholderImageProps> = ({
  size = 48,
  color,
  opacity = 0.5,
}) => {
  return (
    <StyledSvg
      $size={size}
      $color={color}
      $opacity={opacity}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 16L8.586 11.414C9.367 10.633 10.633 10.633 11.414 11.414L16 16M14 14L15.586 12.414C16.367 11.633 17.633 11.633 18.414 12.414L20 14M14 8H14.01M6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSvg>
  );
};

const StyledSvg = styled.svg<{
  $size: number;
  $color?: string;
  $opacity: number;
}>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  color: ${({ $color, theme }) => $color || theme.colors.muted};
  opacity: ${({ $opacity }) => $opacity};
`;

export default PlaceholderImage;

