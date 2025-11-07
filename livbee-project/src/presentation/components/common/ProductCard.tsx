import React from 'react';
import PlaceholderImage from './PlaceholderImage';

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

/**
 * 관련 상품 정보를 표시하는 카드 컴포넌트입니다.
 * 모집 공고 상세 페이지의 관련 상품 섹션에서 사용됩니다.
 */
const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  productName,
  onClick,
}) => {
  /**
   * 카드 컨테이너 스타일
   */
  const cardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    cursor: onClick ? 'pointer' : 'default',
    borderRadius: '8px',
    border: '1px solid #F7F8FA',
  };

  /**
   * 이미지 컨테이너 스타일
   * 작은 정사각형 이미지입니다.
   */
  const imageContainerStyle: React.CSSProperties = {
    width: '60px',
    height: '60px',
    flexShrink: 0,
    backgroundColor: '#F7F8FA',
    border: '1px solid #ECEFF1',
    borderRadius: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

  /**
   * 이미지 스타일
   */
  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };


  /**
   * 상품명 스타일
   */
  const productNameStyle: React.CSSProperties = {
    fontSize: 'var(--p2)', // 14px
    fontWeight: 400,
    color: 'var(--black)',
    flex: 1,
  };

  return (
    <div style={cardStyle} onClick={onClick}>
      {/* 이미지 */}
      <div style={imageContainerStyle}>
        {imageUrl ? (
          <img src={imageUrl} alt={productName} style={imageStyle} />
        ) : (
          <PlaceholderImage size={24} />
        )}
      </div>

      {/* 상품명 */}
      <span style={productNameStyle}>{productName}</span>
    </div>
  );
};

export default ProductCard;

