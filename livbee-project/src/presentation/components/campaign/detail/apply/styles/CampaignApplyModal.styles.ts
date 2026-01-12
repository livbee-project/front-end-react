import styled from 'styled-components';
import { H2, H3, PMuted, Caption } from '@/presentation/components/styled/Typography';
import { Badge } from '@/presentation/components/styled/CommonStyles';

export const ModalContainer = styled.div`
  border-radius: ${({ theme }) => theme.radii.xl};
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled(H2)`
  margin: 0;
`;

export const CloseButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SectionLabel = styled(PMuted)`
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 600;
`;

export const CampaignName = styled(H3)`
  margin: 0;
`;

export const PortfolioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const PortfolioCard = styled.button<{ $selected: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 2px solid ${({ theme, $selected }) => ($selected ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme }) => theme.colors.card};
  cursor: pointer;
  text-align: left;
`;

export const PortfolioHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Thumbnail = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PortfolioInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const PortfolioTitle = styled(H3)`
  margin: 0;
`;

export const PortfolioSummary = styled(PMuted)`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
`;

export const TagGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
`;

export const TagBadge = styled(Badge)``;

export const Indicator = styled.span<{ $selected: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 2px solid ${({ theme, $selected }) => ($selected ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, $selected }) => ($selected ? theme.colors.primary : 'transparent')};
  flex-shrink: 0;
`;

export const MessageInput = styled.textarea`
  width: 100%;
  min-height: 110px;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md};
  font: ${({ theme }) => theme.fonts.body};
  resize: vertical;
`;

export const ScheduleRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

export const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const InputLabel = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

export const DateInput = styled.input`
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font: ${({ theme }) => theme.fonts.body};
`;

export const TimeInput = styled(DateInput)``;

export const HelperText = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

export const WarningBox = styled.div`
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.primaryOpacity['10']};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: flex-start;
`;

export const WarningIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.primaryOpacity['20']};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const WarningTitle = styled(Caption)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

export const WarningText = styled(PMuted)`
  margin: 0;
  color: ${({ theme }) => theme.colors.foreground};
`;

export const ActionRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TypeSelector = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TypeButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 2px solid ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.card)};
  color: ${({ theme, $active }) => ($active ? theme.colors.background : theme.colors.foreground)};
  font: ${({ theme }) => theme.fonts.body};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    opacity: 0.8;
  }
`;
