import React from 'react';
import styled from 'styled-components';
import { RiUserLine } from 'react-icons/ri';
import { H2, H3, PMuted, Caption } from '@/presentation/components/styled/Typography';
import { PrimaryBadge } from '@/presentation/components/styled/CommonStyles';
import { EllipsisText } from '@/presentation/components/styled/CommonStyles';

/**
 * CampaignCard가 받을 props 타입을 정의합니다.
 * @param brandName - 브랜드명 (파란색 텍스트)
 * @param title - 공고 제목 (검정색 굵은 텍스트)
 * @param content - 공고 내용 (회색 텍스트)
 * @param onPress - 카드 전체 클릭 시 실행될 함수 (선택)
 */
interface CampaignCardProps {
  brandName: string;
  title: string;
  content: string;
  onPress?: () => void;
}

const CardContainer = styled.div<{ $hasClick: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing.xl};
  cursor: ${({ $hasClick }) => ($hasClick ? 'pointer' : 'default')};
`;

const LeftIcon = styled.div`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.muted};
`;

const TextBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 0;
`;

const Brand = styled(H3)`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

const Title = styled(H2)`
  color: ${({ theme }) => theme.colors.foreground};
`;

const Content = styled(PMuted)``;

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

/**
 * "모집 공고" 리스트 페이지 전용 카드 UI 컴포넌트입니다.
 * (디자인 레퍼런스: image_0ac046.png)
 */
const CampaignCard: React.FC<CampaignCardProps> = ({
  brandName,
  title,
  content,
  onPress,
}) => {
  return (
    <CardContainer $hasClick={!!onPress} onClick={onPress}>
      {/* 1. 좌측 아이콘 */}
      <LeftIcon>
        <RiUserLine size={24} />
      </LeftIcon>

      {/* 2. 중간 텍스트 블록 */}
      <TextBlock>
        <EllipsisText>
          <Brand>{brandName}</Brand>
        </EllipsisText>
        <EllipsisText>
          <Title>{title}</Title>
        </EllipsisText>
        <EllipsisText>
          <Content>{content}</Content>
        </EllipsisText>
      </TextBlock>

      {/* 3. 우측 CH 아이콘 */}
      <ChIcon>
        <Caption>CH</Caption>
      </ChIcon>
    </CardContainer>
  );
};

export default CampaignCard;