import React from 'react';
import styled from 'styled-components';
import CampaignCard from './CampaignCard';

export const CampaignCardExamples: React.FC = () => (
  <CardContainer>
    <CampaignCard
      brandName="패션 브랜드"
      title="2024 봄/여름 컬렉션 모델 모집"
      content="패션 쇼와 광고 촬영에 참여할 모델을 모집합니다."
      onPress={() => alert('카드 클릭')}
    />
    <CampaignCard brandName="뷰티 브랜드" title="화장품 광고 모델 모집" content="신제품 런칭 광고에 출연할 모델을 찾고 있습니다." />
    <CampaignCard
      brandName="라이프스타일 브랜드"
      title="인플루언서 협업 모집"
      content="제품 리뷰 및 콘텐츠 제작에 참여할 인플루언서를 모집합니다."
      onPress={() => alert('카드 클릭')}
    />
  </CardContainer>
);

export const CampaignCardLongText: React.FC = () => (
  <CardContainer>
    <CampaignCard
      brandName="매우 긴 브랜드명이 여기에 표시됩니다"
      title="매우 긴 공고 제목이 여기에 표시되며 텍스트가 길어지면 말줄임표로 처리됩니다"
      content="매우 긴 공고 내용이 여기에 표시됩니다. 이 내용은 여러 줄에 걸쳐 표시될 수 있으며, 텍스트가 길어지면 말줄임표로 처리됩니다."
      onPress={() => alert('카드 클릭')}
    />
  </CardContainer>
);

export const CampaignCardListExample: React.FC = () => (
  <ListContainer>
    {[
      {
        brand: '패션 브랜드 A',
        title: '2024 봄/여름 컬렉션 모델 모집',
        content: '패션 쇼와 광고 촬영에 참여할 모델을 모집합니다.',
      },
      {
        brand: '뷰티 브랜드 B',
        title: '화장품 광고 모델 모집',
        content: '신제품 런칭 광고에 출연할 모델을 찾고 있습니다.',
      },
      {
        brand: '라이프스타일 브랜드 C',
        title: '인플루언서 협업 모집',
        content: '제품 리뷰 및 콘텐츠 제작에 참여할 인플루언서를 모집합니다.',
      },
    ].map(({ brand, title, content }, index) => (
      <CampaignCard
        key={title}
        brandName={brand}
        title={title}
        content={content}
        onPress={() => alert(`카드 ${index + 1} 클릭`)}
      />
    ))}
  </ListContainer>
);

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 600px;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 800px;
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.md};
`;

