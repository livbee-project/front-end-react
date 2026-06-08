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
    grid-template-columns: 220px 1fr 260px;
    padding-bottom: 40px;
  }

  ${media.tablet} {
    grid-template-columns: 1fr;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    padding: 16px 16px 100px;
  }
`

export const SideNav = styled.aside`
  ${media.mobile} {
    display: none;
  }

  ${media.tablet} {
    order: 1;
  }
`

export const FormColumn = styled.main`
  background: ${theme.colors.white};
  border-radius: ${theme.radius.lg};
  border: 1px solid ${theme.colors.border};
  padding: 24px;
  min-width: 0;

  ${media.mobile} {
    padding: 16px;
    border-radius: ${theme.radius.md};
  }
`

export const PreviewColumn = styled.aside`
  ${media.mobile} {
    display: none;
  }

  ${media.tablet} {
    order: 3;
  }
`

export const PreviewCard = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.lg};
  padding: 20px;
  position: sticky;
  top: 80px;
`

export const PreviewTitle = styled.h3`
  margin: 0 0 16px;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
`

export const PreviewNote = styled.p`
  margin: 12px 0 0;
  font-size: 11px;
  color: ${theme.colors.textMuted};
  text-align: left;
  line-height: 1.4;
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

export const InfoBox = styled.div`
  padding: 12px 14px;
  background: ${theme.colors.primaryLight};
  border-radius: ${theme.radius.md};
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  text-align: left;
  line-height: 1.5;
`

export const UploadZone = styled.label<{ $hasImage?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  aspect-ratio: 3 / 4;
  max-width: 200px;
  border: 2px dashed ${theme.colors.border};
  border-radius: ${theme.radius.md};
  cursor: pointer;
  overflow: hidden;
  background: ${theme.colors.backgroundSubtle};
  font-size: 13px;
  color: ${theme.colors.textMuted};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  input { display: none; }
`

export const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`

export const GallerySlot = styled.div`
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: ${theme.radius.md};
  overflow: hidden;
  border: 1px solid ${theme.colors.border};
`

export const AddSlot = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  aspect-ratio: 3 / 4;
  border: 2px dashed ${theme.colors.border};
  border-radius: ${theme.radius.md};
  cursor: pointer;
  font-size: 12px;
  color: ${theme.colors.textMuted};
  gap: 4px;

  input { display: none; }
`

export const RemoveBtn = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 50%;
  background: rgba(0,0,0,0.6);
  color: white;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
`

export const FileRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};
  font-size: 13px;
`

export const TagInputRow = styled.div`
  display: flex;
  gap: 8px;
`

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`

export const TagChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  border-radius: ${theme.radius.full};
  font-size: 13px;

  button {
    border: none;
    background: none;
    cursor: pointer;
    color: ${theme.colors.primary};
    padding: 0;
    font-size: 14px;
  }
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
    display: flex;
    gap: 8px;

    &::before {
      content: '✓';
      color: ${theme.colors.success};
      font-weight: 700;
    }
  }
`
