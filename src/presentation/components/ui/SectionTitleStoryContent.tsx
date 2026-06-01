import React from 'react';
import styled from 'styled-components';
import SectionTitle from '@/presentation/components/ui/SectionTitle';

const VariantContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const InfoText = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.muted};
`;

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.sm};
`;

export const SectionTitleVariants: React.FC = () => (
  <VariantContainer>
    <div>
      <SectionTitle variant="default">Default 제목</SectionTitle>
      <InfoText>기본 스타일: 14px, Bold 700</InfoText>
    </div>
    <div>
      <SectionTitle variant="subtitle">Subtitle 제목</SectionTitle>
      <InfoText>부제목 스타일: 14px, Medium 500, Muted 색상</InfoText>
    </div>
    <div>
      <SectionTitle variant="detail">Detail 제목</SectionTitle>
      <InfoText>상세 페이지 스타일: 14px, Bold 700</InfoText>
    </div>
  </VariantContainer>
);

export const SectionTitleWithBullet: React.FC = () => (
  <VariantContainer>
    <SectionTitle showBullet>Bullet이 있는 제목</SectionTitle>
    <SectionTitle showBullet variant="detail">
      Detail 스타일 + Bullet
    </SectionTitle>
  </VariantContainer>
);

export const SectionTitleMargins: React.FC = () => (
  <VariantContainer>
    <Card>
      <SectionTitle marginBottom="8px">작은 마진 (8px)</SectionTitle>
      <p>콘텐츠가 바로 이어집니다.</p>
    </Card>
    <Card>
      <SectionTitle marginBottom="16px">기본 마진 (16px)</SectionTitle>
      <p>콘텐츠가 적당한 간격으로 이어집니다.</p>
    </Card>
    <Card>
      <SectionTitle marginBottom="24px">큰 마진 (24px)</SectionTitle>
      <p>콘텐츠가 넓은 간격으로 이어집니다.</p>
    </Card>
  </VariantContainer>
);

export const SectionTitleUsageExamples: React.FC = () => (
  <VariantContainer>
    <div>
      <SectionTitle>홈 섹션 제목</SectionTitle>
      <p style={{ marginTop: '8px' }}>섹션 내용이 여기에 표시됩니다.</p>
    </div>
    <div>
      <SectionTitle variant="subtitle">부제목</SectionTitle>
      <p style={{ marginTop: '8px' }}>부제목 아래 내용이 표시됩니다.</p>
    </div>
    <div>
      <SectionTitle variant="detail" showBullet>
        상세 페이지 섹션
      </SectionTitle>
      <p style={{ marginTop: '8px' }}>상세 페이지의 섹션 내용입니다.</p>
    </div>
  </VariantContainer>
);

