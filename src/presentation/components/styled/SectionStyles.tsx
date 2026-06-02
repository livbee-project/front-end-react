import styled from 'styled-components';

/**
 * SectionStyles - 섹션 및 카드 스타일 컴포넌트
 * 섹션 레이아웃, 카드 스타일의 표준화된 스타일 제공
 */

// ===== 섹션 스타일 =====

/**
 * Section - 표준화된 섹션 컨테이너
 * theme.section 토큰 사용
 */
export const Section = styled.section`
  padding: ${({ theme }) => theme.section.paddingY} 0;
  width: 100%;
  box-sizing: border-box;
`;

/**
 * SectionContainer - 섹션 내부 컨테이너
 * 반응형 패딩 적용
 */
export const SectionContainer = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.section.paddingX.mobile};
  box-sizing: border-box;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: 0 ${({ theme }) => theme.section.paddingX.tablet};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 ${({ theme }) => theme.section.paddingX.desktop};
  }
`;

/**
 * SectionHeader - 섹션 헤더
 * 제목과 MORE 버튼을 포함하는 헤더 영역
 */
export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

/**
 * SectionTitle - 섹션 제목
 * theme spacing 사용
 */
export const SectionTitle = styled.h2`
  margin: 0;
  font: ${({ theme }) => theme.fonts.h1};
  color: ${({ theme }) => theme.colors.foreground};
  line-height: 1.4;
`;

/**
 * SectionMoreButton - 섹션 MORE 버튼
 * theme spacing 및 radii 토큰 사용
 */
export const SectionMoreButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary}1a;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  font: ${({ theme }) => theme.fonts.button};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary}33;
  }
`;

/**
 * SectionContent - 섹션 콘텐츠 영역
 * theme section gap 사용
 */
export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.section.gap};
`;

// ===== 카드 스타일 =====

/**
 * Card - 표준화된 카드 컨테이너
 * theme.card 토큰 사용
 */
export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.card};
  border: ${({ theme }) => theme.card.border};
  border-radius: ${({ theme }) => theme.card.borderRadius};
  padding: ${({ theme }) => theme.card.padding};
  box-sizing: border-box;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 0 2px 8px ${({ theme }) => theme.primaryOpacity['10']};
  }
`;

/**
 * CardHeader - 카드 헤더 영역
 * theme spacing 사용
 */
export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.card.gap};
`;

/**
 * CardContent - 카드 콘텐츠 영역
 * theme card gap 사용
 */
export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.card.gap};
`;

/**
 * CardFooter - 카드 푸터 영역
 * theme spacing 사용
 */
export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ theme }) => theme.spacing.sm};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

// ===== 간격 유틸리티 =====

/**
 * Spacing - 간격 유틸리티 컴포넌트
 * theme spacing 토큰 사용
 */
export const Spacing = styled.div<{ size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' }>`
  height: ${({ theme, size = 'md' }) => theme.spacing[size]};
`;

