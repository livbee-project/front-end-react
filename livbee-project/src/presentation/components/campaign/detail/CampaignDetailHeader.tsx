import React from 'react';
import styled from 'styled-components';
import { Heart, Share2 } from 'lucide-react';

interface CampaignDetailHeaderProps {
  brandName: string;
  title: string;
  tags: string[];
  dDay?: string;
  imageUrl?: string;
  children?: React.ReactNode;
}

export const CampaignDetailHeader: React.FC<CampaignDetailHeaderProps> = ({
  brandName,
  title,
  tags,
  dDay,
  imageUrl,
  children,
}) => {
  return (
    <HeaderWrapper>
      <DetailCard>
        <HeaderImage>
          {imageUrl && <HeaderImageContent src={imageUrl} alt={title} loading="eager" decoding="async" />}
          {dDay && <DDayBadge>{dDay}</DDayBadge>}
        </HeaderImage>

        <HeaderInfo>
          <BrandName>{brandName}</BrandName>
          <TitleRow>
            <Title>{title}</Title>
            <IconButtons>
              <IconButton aria-label="찜하기">
                <Heart size={20} />
              </IconButton>
              <IconButton aria-label="공유하기">
                <Share2 size={20} />
              </IconButton>
            </IconButtons>
          </TitleRow>
          <TagGroup>
            {tags.map((tag, index) => (
              <TagBadge key={`${tag}-${index}`} $variant={index === 0 ? 'primary' : 'secondary'}>
                {tag}
              </TagBadge>
            ))}
          </TagGroup>
        </HeaderInfo>

        {children}
      </DetailCard>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  transition: box-shadow 0.3s;
  margin: 0 12px;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const HeaderImage = styled.div`
  width: 100%;
  aspect-ratio: 4 / 3;
  background-color: ${({ theme }) => theme.colors.secondary};
  position: relative;
  overflow: hidden;
`;

const HeaderImageContent = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;

  ${HeaderImage}:hover & {
    transform: scale(1.05);
  }
`;

const DDayBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: ${({ theme }) => theme.colors.error};
  color: ${({ theme }) => theme.colors.errorForeground};
  padding: 0.25rem 0.75rem;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fonts.caption};
  font-weight: 700;
`;

const HeaderInfo = styled.div`
  background: ${({ theme }) => theme.colors.background};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const BrandName = styled.p`
  font-size: 0.875rem;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 0.5rem 0;
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.foreground};
  margin: 0;
  flex: 1;
`;

const IconButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
`;

const IconButton = styled.button`
  padding: 0.5rem;
  border-radius: 9999px;
  transition: background-color 0.2s;
  border: none;
  background: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.foreground};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const TagGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

const TagBadge = styled.span<{ $variant?: 'primary' | 'secondary' }>`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $variant, theme }) =>
    $variant === 'primary' ? theme.colors.primary : theme.colors.secondary};
  color: ${({ $variant, theme }) =>
    $variant === 'primary' ? theme.colors.primaryForeground : theme.colors.secondaryForeground};
  border: ${({ $variant, theme }) =>
    $variant === 'primary' ? 'none' : `1px solid ${theme.colors.border}`};
`;

