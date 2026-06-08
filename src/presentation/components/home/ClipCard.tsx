import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '@/presentation/styles/theme'

export interface ClipCardProps {
  id?: string
  thumbnail: string | null
  title: string
  viewCount: number
  to?: string
}

/** HOT CLIP 카드 */
export function ClipCard({ id, thumbnail, title, viewCount, to }: ClipCardProps) {
  const href = to ?? (id ? `/clips/${id}` : undefined)
  const inner = (
    <Card>
      <Thumb>
        {thumbnail ? <img src={thumbnail} alt={title} /> : <Placeholder>16:9</Placeholder>}
      </Thumb>
      <Title>{title}</Title>
      <Views>조회 {viewCount.toLocaleString()}</Views>
    </Card>
  )
  return href ? <CardLink to={href}>{inner}</CardLink> : inner
}

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
`

const Card = styled.article`
  width: 180px;
`

const Thumb = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: ${theme.radius.md};
  overflow: hidden;
  background: ${theme.colors.backgroundSubtle};
  margin-bottom: 8px;

  img { width: 100%; height: 100%; object-fit: cover; }
`

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: ${theme.colors.textMuted};
`

const Title = styled.h3`
  margin: 0 0 4px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.3;
`

const Views = styled.p`
  margin: 0;
  font-size: 11px;
  color: ${theme.colors.textMuted};
`
