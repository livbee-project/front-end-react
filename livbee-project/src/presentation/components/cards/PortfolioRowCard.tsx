import React from 'react';
import styled from 'styled-components';
import { H2, PMuted, Caption } from '@/presentation/components/styled/Typography';
import { EllipsisText } from '@/presentation/components/styled/CommonStyles';

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

const CardContainer = styled.div<{ $hasClick: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['2xl']};
  width: 100%;
  cursor: ${({ $hasClick }) => ($hasClick ? 'pointer' : 'default')};
`;

const TextContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  min-width: 0;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled(H2)`
  flex: 1;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.foreground};
`;

const OfferButton = styled(H2)`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  flex-shrink: 0;
`;

const Content = styled(PMuted)``;

const ImageContainer = styled.div<{ $hasImage: boolean; $imageUrl?: string }>`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.full};
  border: ${({ $hasImage, theme }) => ($hasImage ? 'none' : `1px solid ${theme.colors.border}`)};
  background-color: ${({ $hasImage, theme }) => ($hasImage ? 'transparent' : theme.colors.secondary)};
  background-image: ${({ $hasImage, $imageUrl }) => ($hasImage && $imageUrl ? `url(${$imageUrl})` : 'none')};
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlaceholderIcon = styled(Caption)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.muted};
`;

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
  return (
    <CardContainer $hasClick={!!onCardPress} onClick={onCardPress}>
      {/* 1. 좌측 텍스트 영역 */}
      <TextContainer>
        {/* 1a. 상단 Row */}
        <TopRow>
          <EllipsisText>
            <Title>{title}</Title>
          </EllipsisText>
          {/* "제안하기" 버튼은 onOfferPress prop이 있을 때만 렌더링 */}
          {onOfferPress && (
            <OfferButton
              onClick={(e) => {
                e.stopPropagation();
                onOfferPress();
              }}
            >
              제안하기
            </OfferButton>
          )}
        </TopRow>
        {/* 1b. 하단 내용 */}
        <EllipsisText>
          <Content>{content}</Content>
        </EllipsisText>
      </TextContainer>

      {/* 2. 우측 이미지 영역 */}
      <ImageContainer $hasImage={!!imageUrl} $imageUrl={imageUrl}>
        {!imageUrl && <PlaceholderIcon>?</PlaceholderIcon>}
      </ImageContainer>
    </CardContainer>
  );
};

export default PortfolioRowCard;