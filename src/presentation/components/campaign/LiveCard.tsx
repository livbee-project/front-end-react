import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '@/presentation/styles/theme'

export interface LiveCardProps {
  id?: string
  liveThumbnail: string | null
  brandName: string
  title: string
  summary: string
  isLive?: boolean
  to?: string
}

/** 지금 뜨는 쇼핑라이브 카드 (1:1 썸네일) */
export function LiveCard({
  id,
  liveThumbnail,
  brandName,
  title,
  summary,
  isLive = true,
  to,
}: LiveCardProps) {
  const href = to ?? (id ? `/campaigns/${id}` : undefined)
  const inner = (
    <Card>
      <Thumb>
        {liveThumbnail ? <img src={liveThumbnail} alt={title} /> : <Placeholder>1:1</Placeholder>}
        {isLive && <LiveBadge>LIVE</LiveBadge>}
      </Thumb>
      <Info>
        <Brand>{brandName || '브랜드명'}</Brand>
        <Title>{title || '공고 제목'}</Title>
        {summary && <Summary>{summary}</Summary>}
      </Info>
    </Card>
  )
  return href ? <CardLink to={href}>{inner}</CardLink> : inner
}

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  flex-shrink: 0;
`

const Card = styled.article`
  background: ${theme.colors.white};
  border-radius: ${theme.radius.lg};
  overflow: hidden;
  border: 1px solid ${theme.colors.border};
  box-shadow: ${theme.shadow.sm};
  width: 200px;
`

const Thumb = styled.div`
  position: relative;
  aspect-ratio: 1 / 1;
  background: ${theme.colors.backgroundSubtle};

  img { width: 100%; height: 100%; object-fit: cover; }
`

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.textMuted};
  font-size: 12px;
`

const LiveBadge = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  background: #ef4444;
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: ${theme.radius.full};
`

const Info = styled.div`
  padding: 12px;
  text-align: left;
`

const Brand = styled.div`
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 4px;
`

const Title = styled.h3`
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
`

const Summary = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${theme.colors.textMuted};
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
