import React from 'react';
import styled from 'styled-components';
import Tag from '@/presentation/components/ui/Tag';
import PlaceholderImage from '@/presentation/components/ui/PlaceholderImage';
import { H1, PMuted } from '@/presentation/components/styled/Typography';

interface DetailHeaderProps {
  imageUrl?: string;
  brandName: string;
  deadlineDay?: string;
  title: string;
  content: string;
  onImageClick?: () => void;
}

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ImageContainer = styled.div<{ $clickable: boolean }>`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.colors.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
`;

const HeaderImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.card};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const BrandRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const BrandName = styled(PMuted)`
  flex: 1;
  color: ${({ theme }) => theme.colors.muted};
`;

const TitleText = styled(H1)`
  margin: 0;
`;

const SummaryText = styled(PMuted)`
  margin: 0;
  color: ${({ theme }) => theme.colors.foreground};
`;

const DetailHeader: React.FC<DetailHeaderProps> = ({
  imageUrl,
  brandName,
  deadlineDay,
  title,
  content,
  onImageClick,
}) => {
  return (
    <HeaderWrapper>
      <ImageContainer onClick={onImageClick} $clickable={Boolean(onImageClick)}>
        {imageUrl ? <HeaderImage src={imageUrl} alt={title} /> : <PlaceholderImage size={64} />}
      </ImageContainer>

      <InfoContainer>
        <BrandRow>
          <BrandName>{brandName}</BrandName>
          {deadlineDay && <Tag label={`마감 ${deadlineDay}`} variant="rounded" />}
        </BrandRow>
        <TitleText>{title}</TitleText>
        <SummaryText>{content}</SummaryText>
      </InfoContainer>
    </HeaderWrapper>
  );
};

export default DetailHeader;

