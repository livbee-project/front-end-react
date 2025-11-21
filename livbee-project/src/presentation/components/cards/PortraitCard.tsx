import React from 'react';
import styled from 'styled-components';
import { H3, PMuted } from '@/presentation/components/styled/Typography';
import { EllipsisText } from '@/presentation/components/styled/CommonStyles';

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

const CardContainer = styled.div<{ $width: number | string; $isDefault: boolean }>`
  width: ${({ $isDefault, $width }) => ($isDefault ? '300px' : typeof $width === 'number' ? `${$width}px` : $width)};
  flex-shrink: ${({ $isDefault }) => ($isDefault ? 0 : 1)};
  cursor: ${({ onClick }) => (onClick ? 'pointer' : 'default')};
  max-width: 100%;
  box-sizing: border-box;
`;

const ImageContainer = styled.div<{ $hasImage: boolean; $isDefault: boolean; $imageUrl?: string }>`
  width: ${({ $isDefault }) => ($isDefault ? '300px' : '100%')};
  height: ${({ $isDefault }) => ($isDefault ? '400px' : undefined)};
  aspect-ratio: ${({ $isDefault }) => ($isDefault ? undefined : '3/4')};
  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: ${({ $hasImage, theme }) => ($hasImage ? 'none' : `1px solid ${theme.colors.border}`)};
  background-image: ${({ $hasImage, $imageUrl }) => ($hasImage && $imageUrl ? `url(${$imageUrl})` : 'none')};
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.muted};
  overflow: hidden;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.spacing.xl};
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled(H3)`
  color: ${({ theme }) => theme.colors.foreground};
`;

const Content = styled(PMuted)``;

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
  const isDefaultWidth = width === 300 || width === undefined;

  return (
    <CardContainer $width={width} $isDefault={isDefaultWidth} onClick={onPress}>
      {/* 1. 300x400 이미지 영역 */}
      <ImageContainer $hasImage={!!imageUrl} $isDefault={isDefaultWidth} $imageUrl={imageUrl}>
        {!imageUrl && <span>(Image 300x400)</span>}
      </ImageContainer>

      {/* 2. 텍스트 영역 */}
      <TextContainer>
        {/* 2a. 제목 (모델명 또는 클립명) */}
        <EllipsisText>
          <Title>{title}</Title>
        </EllipsisText>
        {/* 2b. 내용 (한 줄 소개) */}
        <EllipsisText>
          <Content>{content}</Content>
        </EllipsisText>
      </TextContainer>
    </CardContainer>
  );
};

export default PortraitCard;