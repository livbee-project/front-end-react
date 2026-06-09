import styled from 'styled-components';

const headerMaxWidth = '1120px';
const primaryLight = '#f1ebff';
const accentPink = '#ff5a9a';

export const AppHeaderRoot = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  height: 112px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(16px);

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    height: 78px;
    padding: 0 22px;
  }
`;

export const AppHeaderTop = styled.div`
  position: relative;
  width: 100%;
  max-width: ${headerMaxWidth};
  height: 64px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    height: 78px;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    gap: 24px;
  }
`;

export const AppLogo = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 23px;
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.6px;
  text-decoration: none;

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    font-size: 25px;
  }
`;

export const AppNav = styled.nav`
  position: absolute;
  left: -16px;
  right: -16px;
  top: 64px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 22px;
  overflow-x: auto;
  padding: 0 16px;
  border-top: 1px solid #f4f1f8;
  background: rgba(255, 255, 255, 0.98);
  color: ${({ theme }) => theme.colors.subText};
  font-size: 14px;
  font-weight: 850;
  white-space: nowrap;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  a {
    position: relative;
    display: inline-flex;
    align-items: center;
    height: 48px;
    color: ${({ theme }) => theme.colors.subText};
    text-decoration: none;
  }

  a.active {
    color: ${({ theme }) => theme.colors.primary};
  }

  a.active::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 3px;
    border-radius: 999px;
    background: ${({ theme }) => theme.colors.primary};
  }

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    position: static;
    height: 78px;
    justify-content: center;
    gap: 22px;
    overflow: visible;
    padding: 0;
    border-top: 0;
    background: transparent;

    a {
      height: 78px;
    }
  }
`;

export const AppHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const AppSearch = styled.label`
  display: none;
  align-items: center;
  gap: 8px;
  height: 42px;
  padding: 0 15px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 999px;
  background: #fff;
  color: #a39caf;
  font-size: 13px;

  input {
    width: 180px;
    border: 0;
    outline: 0;
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    font-size: 13px;
  }

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    display: flex;
  }
`;

export const HeaderIconButton = styled.button`
  position: relative;
  width: 30px;
  height: 30px;
  display: inline-grid;
  place-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    display: block;
  }

  svg path {
    fill: none;
    stroke: currentColor;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  &::after {
    content: '';
    position: absolute;
    top: 4px;
    right: 5px;
    width: 6px;
    height: 6px;
    border: 1px solid #fff;
    border-radius: 50%;
    background: ${accentPink};
  }
`;

export const HeaderAccountLink = styled.a`
  display: none;
  align-items: center;
  height: 42px;
  padding: 0 14px;
  border-radius: 999px;
  background: ${primaryLight};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  font-weight: 900;
  text-decoration: none;

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    display: inline-flex;
  }
`;

export const MobileMenuButton = styled.button`
  width: 30px;
  height: 30px;
  display: inline-grid;
  place-items: center;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    display: block;
  }

  svg path {
    fill: none;
    stroke: currentColor;
    stroke-width: 2.2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  @media (min-width: ${({ theme }) => theme.grid.breakpoints.tabletMin}) {
    display: none;
  }
`;
