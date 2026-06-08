import styled from 'styled-components'
import { media } from '@/presentation/styles/breakpoints'
import { theme } from '@/presentation/styles/theme'

export const Page = styled.div`
  min-height: 100svh;
  background: ${theme.colors.backgroundSubtle};
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.border};
  position: sticky;
  top: 0;
  z-index: 10;
`

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const PageTitle = styled.h1`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`

export const Layout = styled.div`
  display: grid;
  gap: 24px;
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 20px 100px;

  ${media.desktopUp} {
    grid-template-columns: 220px 1fr 280px;
    padding-bottom: 40px;
  }
`

export const SideNav = styled.aside`
  ${media.mobile} { display: none; }
`

export const FormColumn = styled.main`
  background: ${theme.colors.white};
  border-radius: ${theme.radius.lg};
  border: 1px solid ${theme.colors.border};
  padding: 24px;
  min-width: 0;

  ${media.mobile} { padding: 16px; }
`

export const PreviewColumn = styled.aside`
  ${media.mobile} { display: none; }

  ${media.tablet} {
    display: block;
    grid-column: 1 / -1;
  }
`

export const PreviewStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: sticky;
  top: 80px;
`

export const PreviewCard = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  padding: 16px;
`

export const PreviewTitle = styled.h3`
  margin: 0 0 12px;
  font-size: 13px;
  font-weight: 600;
  text-align: left;
`

export const SectionHeading = styled.div`
  margin-bottom: 24px;
  text-align: left;
`

export const SectionTitle = styled.h2`
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 600;
`

export const SectionDesc = styled.p`
  margin: 0;
  font-size: 14px;
  color: ${theme.colors.textSecondary};
`

export const FormStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const StickyFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  background: ${theme.colors.white};
  border-top: 1px solid ${theme.colors.border};
  display: flex;
  gap: 10px;
  z-index: 20;

  ${media.desktopUp} {
    position: static;
    border: none;
    padding: 24px 0 0;
    background: transparent;
  }
`

export const UploadRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  ${media.mobile} { grid-template-columns: 1fr; }
`

export const UploadZone = styled.label<{ $ratio: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  aspect-ratio: ${({ $ratio }) => $ratio};
  border: 2px dashed ${theme.colors.border};
  border-radius: ${theme.radius.md};
  cursor: pointer;
  overflow: hidden;
  background: ${theme.colors.backgroundSubtle};
  font-size: 12px;
  color: ${theme.colors.textMuted};
  text-align: center;
  padding: 8px;

  img { width: 100%; height: 100%; object-fit: cover; }
  input { display: none; }
`

export const InfoBox = styled.div`
  padding: 12px 14px;
  background: ${theme.colors.primaryLight};
  border-radius: ${theme.radius.md};
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  text-align: left;
`

export const DetailTable = styled.dl`
  margin: 0;
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 8px 12px;
  font-size: 13px;
  text-align: left;

  dt { color: ${theme.colors.textSecondary}; font-weight: 500; }
  dd { margin: 0; }
`

export const Checklist = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  text-align: left;

  li {
    font-size: 13px;
    padding: 6px 0;
    color: ${theme.colors.textSecondary};
    &::before { content: '✓ '; color: ${theme.colors.success}; font-weight: 700; }
  }
`
