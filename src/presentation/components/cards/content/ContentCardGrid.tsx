import styled from 'styled-components';

/**
 * 기획 반응형 그리드: 모바일(375~767) 2열 가로 스크롤, 태블릿 3열, 웹(1280+) 4열
 */
export const ContentCardGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.grid.gap};
  width: 100%;
  box-sizing: border-box;

  @media (max-width: ${({ theme }) => theme.grid.breakpoints.mobileMax}) {
    display: flex;
    overflow-x: auto;
    gap: ${({ theme }) => theme.spacing.md};
    padding-bottom: ${({ theme }) => theme.spacing.xs};
    -ms-overflow-style: none;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    & > * {
      flex: 0 0 calc(50% - ${({ theme }) => theme.spacing.sm});
      min-width: calc(50% - ${({ theme }) => theme.spacing.sm});
    }
  }

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) and (max-width: ${({ theme }) =>
      theme.grid.breakpoints.tabletMax}) {
    grid-template-columns: repeat(${({ theme }) => theme.grid.columns.tablet}, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.wideMin}) {
    grid-template-columns: repeat(${({ theme }) => theme.grid.columns.desktop}, 1fr);
  }
`;
