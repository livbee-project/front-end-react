import React from 'react';
import styled from 'styled-components';
import { Star, Pencil, Trash2 } from 'lucide-react';
import { H2, PMuted, Caption } from '@/presentation/components/styled/Typography';
import { Badge } from '@/presentation/components/styled/CommonStyles';
import { formatDateLabel } from '@/shared/utils/portfolioUtils';
import type { MyPortfolioItem } from '@/types/portfolio';

interface MyPortfolioCardProps {
  item: MyPortfolioItem;
  onCardClick: () => void;
  onPinClick: (event: React.MouseEvent) => void;
  onDefaultClick: () => void;
  onEditClick: () => void;
  onDeleteClick: () => void;
}

export const MyPortfolioCard: React.FC<MyPortfolioCardProps> = ({
  item,
  onCardClick,
  onPinClick,
  onDefaultClick,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <CardContainer onClick={onCardClick}>
      <CardHeader>
        <Thumbnail $hasImage={Boolean(item.imageUrl)}>
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={item.title} loading="lazy" decoding="async" />
          ) : (
            <span>?</span>
          )}
        </Thumbnail>
        <CardBody>
          <TitleRow>
            <CardTitle>{item.title}</CardTitle>
            <PinButton
              type="button"
              aria-label="즐겨찾기"
              $active={Boolean(item.isPinned)}
              onClick={onPinClick}
            >
              <Star size={16} fill={item.isPinned ? 'currentColor' : 'none'} />
            </PinButton>
          </TitleRow>
          <CardSummary>{item.summary}</CardSummary>
          <MetaRow>
            <ChipGroup>
              {item.categories.map((category) => (
                <Chip key={`${item.id}-${category}`} $variant="secondary">
                  {category}
                </Chip>
              ))}
            </ChipGroup>
            <UpdatedAt>{formatDateLabel(item.updatedAt)}</UpdatedAt>
          </MetaRow>
        </CardBody>
      </CardHeader>

      <ButtonRow onClick={(event) => event.stopPropagation()}>
        <DefaultButton type="button" $active={Boolean(item.isDefault)} onClick={onDefaultClick}>
          <Star size={14} fill={item.isDefault ? 'currentColor' : 'none'} />
          기본
        </DefaultButton>
        <OutlineButton type="button" onClick={onEditClick}>
          <Pencil size={14} />
          편집
        </OutlineButton>
        <DangerButton type="button" onClick={onDeleteClick}>
          <Trash2 size={14} />
          삭제
        </DangerButton>
      </ButtonRow>
    </CardContainer>
  );
};

const CardContainer = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 12px 24px ${({ theme }) => theme.primaryOpacity['10']};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
`;

const CardHeader = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Thumbnail = styled.div<{ $hasImage: boolean }>`
  width: 72px;
  height: 72px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme, $hasImage }) => ($hasImage ? 'transparent' : theme.colors.secondary)};
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const CardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CardTitle = styled(H2)`
  margin: 0;
  font-size: 1rem;
`;

const PinButton = styled.button<{ $active: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background: ${({ theme, $active }) =>
    $active ? theme.primaryOpacity['20'] : theme.colors.secondary};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.muted)};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CardSummary = styled(PMuted)`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const ChipGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
`;

const Chip = styled(Badge)`
  font-size: 12px;
`;

const UpdatedAt = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

const ButtonRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const ActionButtonBase = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font: ${({ theme }) => theme.fonts.button};
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s;
`;

const DefaultButton = styled(ActionButtonBase)<{ $active: boolean }>`
  border: none;
  background: ${({ theme, $active }) =>
    $active ? theme.primaryOpacity['25'] : theme.colors.secondary};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.foreground)};
`;

const OutlineButton = styled(ActionButtonBase)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.foreground};
`;

const DangerButton = styled(ActionButtonBase)`
  border: 1px solid ${({ theme }) => theme.colors.error};
  background: transparent;
  color: ${({ theme }) => theme.colors.error};
`;

