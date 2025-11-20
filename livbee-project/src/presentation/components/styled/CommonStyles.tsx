import styled from 'styled-components';
import { H2, PMuted } from './Typography';

/**
 * CommonStyles - 공통 스타일 컴포넌트
 * 입력폼, 버튼, 배지, 레이블 등 공통 UI 요소의 표준화된 스타일 제공
 */

// ===== 입력폼 스타일 =====

/**
 * Input - 표준화된 입력 필드 스타일
 * theme.input 토큰 사용
 */
export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.input.padding};
  background-color: ${({ theme }) => theme.input.backgroundColor};
  border-radius: ${({ theme }) => theme.input.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.foreground};
  outline: none;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.input.focusBorderColor};
    box-shadow: 0 0 0 3px rgba(104, 124, 244, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

/**
 * Textarea - 표준화된 텍스트 영역 스타일
 */
export const Textarea = styled.textarea`
  width: 100%;
  padding: ${({ theme }) => theme.input.padding};
  background-color: ${({ theme }) => theme.input.backgroundColor};
  border-radius: ${({ theme }) => theme.input.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  font: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.foreground};
  outline: none;
  box-sizing: border-box;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.input.focusBorderColor};
    box-shadow: 0 0 0 3px rgba(104, 124, 244, 0.15);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// ===== 버튼 스타일 =====

/**
 * ButtonBase - 버튼 기본 스타일
 * theme spacing 및 radii 토큰 사용
 */
export const ButtonBase = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s;
  font-family: ${({ theme }) => theme.fonts.family};
  font: ${({ theme }) => theme.fonts.button};
  line-height: 1.4;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:active {
    transform: scale(0.98);
  }
`;

/**
 * PrimaryButton - Primary 버튼 스타일
 */
export const PrimaryButton = styled(ButtonBase)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};

  &:hover:not(:disabled) {
    background-color: #5b6de0;
  }
`;

/**
 * SecondaryButton - Secondary 버튼 스타일
 */
export const SecondaryButton = styled(ButtonBase)`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.foreground};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};

  &:hover:not(:disabled) {
    background-color: rgba(245, 246, 255, 0.8);
  }
`;

/**
 * OutlineButton - Outline 버튼 스타일
 */
export const OutlineButton = styled(ButtonBase)`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};

  &:hover:not(:disabled) {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

/**
 * SmallButton - Small 사이즈 버튼
 */
export const SmallButton = styled(ButtonBase)`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 12px;
`;

// ===== 배지 스타일 =====

/**
 * Badge - 기본 배지 스타일
 * theme spacing 및 radii 토큰 사용
 */
export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.sm};
  font: ${({ theme }) => theme.fonts.caption};
  line-height: 1.4;
  white-space: nowrap;
`;

/**
 * PrimaryBadge - Primary 배지 스타일
 */
export const PrimaryBadge = styled(Badge)`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
`;

/**
 * SecondaryBadge - Secondary 배지 스타일
 */
export const SecondaryBadge = styled(Badge)`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.foreground};
`;

/**
 * MutedBadge - Muted 배지 스타일
 */
export const MutedBadge = styled(Badge)`
  background-color: ${({ theme }) => theme.colors.inputBackground};
  color: ${({ theme }) => theme.colors.muted};
`;

// ===== 레이블 스타일 =====

/**
 * Label - 표준화된 레이블 컴포넌트
 * H2 스타일 적용
 */
export const Label = styled(H2)`
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: block;
`;

/**
 * LabelDescription - 레이블 설명 텍스트
 * PMuted 스타일 적용
 */
export const LabelDescription = styled(PMuted)`
  margin-top: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

// ===== 유틸리티 스타일 =====

/**
 * FlexRow - 가로 정렬 Flex 컨테이너
 */
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

/**
 * FlexColumn - 세로 정렬 Flex 컨테이너
 */
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

/**
 * FlexCenter - 중앙 정렬 Flex 컨테이너
 */
export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

/**
 * EllipsisText - 말줄임 처리 텍스트
 */
export const EllipsisText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

