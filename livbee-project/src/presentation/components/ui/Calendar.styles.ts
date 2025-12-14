import styled from 'styled-components';
import { DayPicker } from 'react-day-picker';
import { CALENDAR_COLORS, CALENDAR_OPACITY } from '@/presentation/components/ui/Calendar.constants';

/**
 * 공통 버튼 스타일 베이스
 */
const NavButtonBase = styled.button`
  width: 24px !important;
  height: 24px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: ${({ theme }) => theme.radii.md} !important;
  border: none !important;
  background: transparent !important;
  color: ${CALENDAR_COLORS.BLACK} !important;
  cursor: pointer !important;
  transition: all 0.2s !important;
  flex-shrink: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
  line-height: 1 !important;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.secondary} !important;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary} !important;
    outline-offset: 2px !important;
  }

  &:disabled {
    opacity: 0.3 !important;
    cursor: not-allowed !important;
  }

  svg.rdp-chevron,
  .rdp-chevron {
    color: ${CALENDAR_COLORS.BLACK} !important;
    fill: ${CALENDAR_COLORS.BLACK} !important;
    stroke: ${CALENDAR_COLORS.BLACK} !important;
    width: 24px !important;
    height: 24px !important;
    display: block !important;

    polygon,
    path,
    * {
      fill: ${CALENDAR_COLORS.BLACK} !important;
      stroke: ${CALENDAR_COLORS.BLACK} !important;
      stroke-width: 0.2 !important;
      color: ${CALENDAR_COLORS.BLACK} !important;
    }
  }
`;

export const CalendarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100dvh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
  box-sizing: border-box;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`;

export const CalendarContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  padding: 16px;
  padding-bottom: calc(16px + env(safe-area-inset-bottom));
  z-index: 100000;
  min-width: 280px;
  max-width: calc(100vw - 32px - env(safe-area-inset-left) - env(safe-area-inset-right));
  width: calc(100vw - 32px - env(safe-area-inset-left) - env(safe-area-inset-right));
  max-height: calc(100dvh - 80px - env(safe-area-inset-top) - env(safe-area-inset-bottom));
  overflow-y: auto;
  box-sizing: border-box;
  overscroll-behavior: contain;
  
  /* 모바일에서 화면 하단이 잘리지 않도록 위치 및 크기 조정 */
  @media (max-width: 767px) {
    /* 모달이 화면을 벗어나지 않도록 충분한 여유 공간 확보 */
    max-height: calc(100dvh - 150px - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    /* 중앙 정렬 유지하되, max-height로 하단이 잘리지 않도록 보장 */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    bottom: auto;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    right: 0;
    transform: none;
    min-width: 360px;
    padding: 20px;
    padding-bottom: 20px;
    width: auto;
    max-width: none;
    max-height: none;
    overflow-y: visible;
  }
`;

export const StyledDayPicker = styled(DayPicker)`
  --rdp-cell-size: 36px;
  --rdp-accent-color: ${({ theme }) => theme.colors.primary};
  --rdp-background-color: ${({ theme }) => theme.primaryOpacity['10']};
  --rdp-accent-color-dark: ${({ theme }) => theme.colors.primary};
  --rdp-background-color-dark: ${({ theme }) => theme.primaryOpacity['10']};
  --rdp-outline: 2px solid ${({ theme }) => theme.colors.primary};
  --rdp-outline-selected: 2px solid ${({ theme }) => theme.colors.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    --rdp-cell-size: 40px;
  }

  .rdp {
    margin: 0;
  }

  .rdp-months {
    display: flex;
    justify-content: center;
  }

  .rdp-month {
    margin: 0;
    position: relative;
    margin-top: 0 !important;
    padding-top: 0 !important;
  }

  .rdp-month_caption {
    display: none !important;
    margin: 0 !important;
    padding: 0 !important;
    height: 0 !important;
  }

  .rdp-nav {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 0 8px 0 !important;
    width: 100% !important;
    position: relative !important;
    gap: 0 !important;
    margin-bottom: 0 !important;
    height: auto !important;
    min-height: 24px !important;
  }

  .rdp-month_grid {
    margin-top: -8px !important;
    padding-top: 0 !important;
  }

  .rdp-weekdays {
    margin-top: -8px !important;
    padding-top: 0 !important;
    margin-bottom: 0 !important;
  }

  /* 공통 버튼 SVG 스타일 */
  .rdp-button_previous,
  .rdp-button_next {
    ${NavButtonBase}
    position: relative !important;
    z-index: 1 !important;

    svg,
    svg.rdp-chevron,
    .rdp-chevron {
      color: ${CALENDAR_COLORS.BLACK} !important;
      fill: ${CALENDAR_COLORS.BLACK} !important;
    }

    svg polygon,
    svg.rdp-chevron polygon,
    .rdp-chevron polygon,
    svg *,
    svg.rdp-chevron *,
    .rdp-chevron * {
      fill: ${CALENDAR_COLORS.BLACK} !important;
      stroke: ${CALENDAR_COLORS.BLACK} !important;
      stroke-width: 0.2 !important;
      color: ${CALENDAR_COLORS.BLACK} !important;
    }
  }

  .rdp-button_previous {
    order: 1 !important;
  }

  .rdp-button_next {
    order: 3 !important;
  }

  .rdp-nav .custom-month-year {
    font-size: 14px !important;
    font-weight: 600 !important;
    color: ${({ theme }) => theme.colors.foreground} !important;
    text-align: center !important;
    position: absolute !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    order: 2 !important;
    pointer-events: none !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    height: 24px !important;
    line-height: 1 !important;
    padding: 0 !important;
    margin: 0 !important;

    @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
      font-size: 16px !important;
      height: auto !important;
    }
  }

  .rdp-head_cell,
  .rdp-weekday {
    color: ${({ theme }) => theme.colors.muted};
    font-size: 13px;
    font-weight: 500;
    padding: 4px 0 !important;
    text-transform: none;
    position: relative;
    margin: 0 !important;
  }

  .rdp-weekday {
    font-size: 0 !important;
    line-height: 0 !important;

    .korean-weekday {
      font-size: 13px !important;
      font-weight: 700 !important;
      color: ${CALENDAR_COLORS.BLACK} !important;
      line-height: normal !important;
    }
  }

  .rdp-day {
    width: var(--rdp-cell-size);
    height: var(--rdp-cell-size);
  }

  .rdp-day_button {
    width: 100%;
    height: 100%;
    border-radius: ${({ theme }) => theme.radii.md};
    font-size: 14px;
    font-weight: 400;
    color: ${({ theme }) => theme.colors.foreground};
    transition: background-color 0.15s ease, color 0.15s ease;
    border: none;
    background: transparent;
    cursor: pointer;
    opacity: 1;

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.secondary};
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;
    }
  }

  .rdp-selected .rdp-day_button {
    background: ${({ theme }) => theme.colors.primary} !important;
    color: ${CALENDAR_COLORS.WHITE} !important;
    font-weight: 600;
    border-radius: 50% !important;
    border: none !important;
    outline: none !important;
    opacity: 1 !important;
  }

  .rdp-today:not(.rdp-selected) .rdp-day_button {
    background: transparent !important;
    color: ${({ theme }) => theme.colors.foreground};
    font-weight: 700;
  }

  .rdp-outside .rdp-day_button {
    color: ${({ theme }) => theme.colors.muted} !important;
    opacity: ${CALENDAR_OPACITY.OUTSIDE_MONTH} !important;
    font-weight: 300;
    
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.secondary};
      opacity: ${CALENDAR_OPACITY.OUTSIDE_MONTH_HOVER} !important;
    }
  }

  /* 일요일 스타일 */
  tbody tr td:first-child.rdp-day:not(.rdp-selected) .rdp-day_button {
    color: ${CALENDAR_COLORS.SUNDAY} !important;
  }

  tbody tr td:first-child.rdp-day.rdp-outside .rdp-day_button {
    color: ${CALENDAR_COLORS.SUNDAY} !important;
    opacity: ${CALENDAR_OPACITY.OUTSIDE_MONTH} !important;
  }

  /* 토요일 스타일 */
  tbody tr td:last-child.rdp-day:not(.rdp-selected) .rdp-day_button {
    color: ${CALENDAR_COLORS.SATURDAY} !important;
  }

  tbody tr td:last-child.rdp-day.rdp-outside .rdp-day_button {
    color: ${CALENDAR_COLORS.SATURDAY} !important;
    opacity: ${CALENDAR_OPACITY.OUTSIDE_MONTH} !important;
  }

  .rdp-day_range_start,
  .rdp-day_range_end {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primaryForeground};
  }
`;

export const CalendarFooter = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    gap: 12px;
    margin-top: 16px;
    padding-top: 16px;
  }
`;

const ButtonBase = styled.button`
  flex: 1;
  padding: 10px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 12px;
    font-size: 14px;
  }
`;

export const CancelButton = styled(ButtonBase)`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.muted};

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    border-color: ${({ theme }) => theme.colors.muted};
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

export const ConfirmButton = styled(ButtonBase)`
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  color: ${({ theme }) => theme.colors.primaryForeground};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

