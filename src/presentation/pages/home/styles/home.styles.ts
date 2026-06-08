import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { media } from '@/presentation/styles/breakpoints'
import { theme } from '@/presentation/styles/theme'

export const Page = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 20px 40px;
`

export const Section = styled.section`
  margin-bottom: 40px;
`

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 700;
`

export const ViewAll = styled(Link)`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  &:hover { color: ${theme.colors.primary}; }
`

export const CardScroll = styled.div<{ $variant?: 'default' | 'campaign' }>`
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 8px;
  scroll-snap-type: x mandatory;

  & > * { scroll-snap-align: start; }

  ${media.desktopUp} {
    overflow-x: visible;
    flex-wrap: wrap;
  }

  ${media.mobile} {
    & > * {
      flex: 0 0 ${({ $variant }) => ($variant === 'campaign' ? '42%' : '72%')};
      max-width: ${({ $variant }) => ($variant === 'campaign' ? '42%' : '72%')};
    }
  }
`

export const CardGrid = styled.div`
  display: grid;
  gap: 12px;

  ${media.desktopUp} {
    grid-template-columns: repeat(2, 1fr);
  }
`

export const ModelScroll = styled(CardScroll)`
  ${media.mobile} {
    & > * { flex: 0 0 45%; max-width: 45%; }
  }
`
