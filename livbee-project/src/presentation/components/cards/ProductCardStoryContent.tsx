import React from 'react';
import styled from 'styled-components';
import ProductCard from './ProductCard';

export const ProductCardExamplesSection: React.FC = () => (
  <CardContainer>
    <ProductCard
      imageUrl="https://via.placeholder.com/60x60"
      productName="패션 아이템 1"
      onClick={() => alert('상품 1 클릭')}
    />
    <ProductCard
      imageUrl="https://via.placeholder.com/60x60"
      productName="뷰티 제품 2"
      onClick={() => alert('상품 2 클릭')}
    />
    <ProductCard productName="이미지 없는 상품" onClick={() => alert('상품 3 클릭')} />
  </CardContainer>
);

export const ProductCardLongNameSection: React.FC = () => (
  <CardContainer>
    <ProductCard
      imageUrl="https://via.placeholder.com/60x60"
      productName="매우 긴 상품명이 여기에 표시되며 텍스트가 길어지면 말줄임표로 처리됩니다"
      onClick={() => alert('상품 클릭')}
    />
  </CardContainer>
);

export const ProductCardListSection: React.FC = () => (
  <ListContainer>
    <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: 700 }}>관련 상품</h3>
    {[
      '패션 아이템 1',
      '뷰티 제품 2',
      '라이프스타일 제품 3',
    ].map((name, index) => (
      <ProductCard
        key={name}
        imageUrl="https://via.placeholder.com/60x60"
        productName={name}
        onClick={() => alert(`상품 ${index + 1} 클릭`)}
      />
    ))}
  </ListContainer>
);

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 500px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  max-width: 600px;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.md};
`;

