import React from 'react';
import styled from 'styled-components';
import { H2, H3, PMuted, Caption } from '@/presentation/components/styled/Typography';
import { PrimaryBadge } from '@/presentation/components/styled/CommonStyles';
import { EllipsisText } from '@/presentation/components/styled/CommonStyles';

/**
 * @deprecated ContentCard variant="ad"를 사용하세요.
 *
 * RecruitCard 컴포넌트가 받을 props 타입을 정의합니다.
 * @param topContent - 카드의 상단 영역 (이미지, 뱃지 등)
 * @param bottomContent - 카드의 하단 영역 (상품 정보, 버튼 등)
 * @param brandName - 브랜드명 (파란색 텍스트)
 * @param title - 공고 제목 (검정색 굵은 텍스트)
 * @param content - 공고 내용 (회색 텍스트)
 * @param onPress - 카드 전체를 클릭했을 때 실행될 함수 (선택)
 */
interface RecruitCardProps {
  topContent: React.ReactNode;
  bottomContent: React.ReactNode;
  brandName: string;
  title: string;
  content: string;
  onPress?: () => void;
}

const CardContainer = styled.div<{ $hasClick: boolean }>`
  width: 240px;
  flex-shrink: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: ${({ $hasClick }) => ($hasClick ? 'pointer' : 'default')};
`;

const BottomContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: ${({ theme }) => theme.spacing.md};
  gap: ${({ theme }) => theme.spacing.md};
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Brand = styled(H3)`
  color: ${({ theme }) => theme.colors.primary};
  flex: 1;
`;

const ChIcon = styled(PrimaryBadge)`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  ${Caption} {
    color: inherit;
  }
`;

const Title = styled(H2)`
  color: ${({ theme }) => theme.colors.foreground};
`;

const Content = styled(PMuted)``;

const Spacer = styled.div`
  flex: 1;
`;

/**
 * '쇼핑라이브' 및 '브랜드 픽' 섹션에서 사용되는
 * 공통 공고 카드 레이아웃 컴포넌트입니다.
 */
const RecruitCard: React.FC<RecruitCardProps> = ({
  topContent,
  bottomContent,
  brandName,
  title,
  content,
  onPress,
}) => {
  return (
    <CardContainer $hasClick={!!onPress} onClick={onPress}>
      {/* 1. 상단 컨텐츠 (변화하는 부분) */}
      {topContent}

      {/* 2. 하단 공통 컨텐츠 영역 */}
      <BottomContent>
        {/* 2a. 브랜드명 + CH 아이콘 (공통) */}
        <BrandRow>
          <EllipsisText>
            <Brand>{brandName}</Brand>
          </EllipsisText>
          <ChIcon>
            <Caption>CH</Caption>
          </ChIcon>
        </BrandRow>

        {/* 2b. 제목 (공통) */}
        <EllipsisText>
          <Title>{title}</Title>
        </EllipsisText>

        {/* 2c. 내용 (공통) */}
        <EllipsisText>
          <Content>{content}</Content>
        </EllipsisText>

        {/* 2d. Spacer (공통) */}
        <Spacer />

        {/* 2e. 하단 컨텐츠 (변화하는 부분) */}
        {bottomContent}
      </BottomContent>
    </CardContainer>
  );
};

export default RecruitCard;
