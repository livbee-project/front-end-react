import React from 'react';
import styled from 'styled-components';
import PlaceholderImage from '@/presentation/components/ui/PlaceholderImage';
import { P } from '@/presentation/components/styled/Typography';

/**
 * ProductCard 컴포넌트가 받을 props 타입을 정의합니다.
 * @param imageUrl - 상품 이미지 URL (선택)
 * @param productName - 상품명
 * @param onClick - 카드 클릭 시 실행될 함수 (선택)
 */
interface ProductCardProps {
  imageUrl?: string;
  productName: string;
  onClick?: () => void;
}

const CardContainer = styled.div<{ $hasClick: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  cursor: ${({ $hasClick }) => ($hasClick ? 'pointer' : 'default')};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ImageContainer = styled.div<{ $hasImage: boolean }>`
  width: 60px;
  height: 60px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.secondary};
  border: ${({ $hasImage, theme }) => ($hasImage ? 'none' : `1px solid ${theme.colors.border}`)};
  border-radius: ${({ theme }) => theme.radii.md};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductName = styled(P)`
  flex: 1;
  color: ${({ theme }) => theme.colors.foreground};
`;

/**
 * 관련 상품 정보를 표시하는 카드 컴포넌트입니다.
 * 모집 공고 상세 페이지의 관련 상품 섹션에서 사용됩니다.
 */
const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  productName,
  onClick,
}) => {
  return (
    <CardContainer $hasClick={!!onClick} onClick={onClick}>
      {/* 이미지 */}
      <ImageContainer $hasImage={!!imageUrl}>
        {imageUrl ? (
          <ProductImage src={imageUrl} alt={productName} />
        ) : (
          <PlaceholderImage size={24} />
        )}
      </ImageContainer>

      {/* 상품명 */}
      <ProductName>{productName}</ProductName>
    </CardContainer>
  );
};

export default ProductCard;

