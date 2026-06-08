import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '@/presentation/styles/theme'

export interface NewsCardProps {
  id?: string
  thumbnail: string | null
  category: string
  title: string
  createdAt: string
  viewCount: number
  to?: string
}

/** 라이브 뉴스 카드 */
export function NewsCard({ id, thumbnail, category, title, createdAt, viewCount, to }: NewsCardProps) {
  const href = to ?? (id ? `/news/${id}` : undefined)
  const inner = (
    <Card>
      <Thumb>
        {thumbnail ? <img src={thumbnail} alt={title} /> : <Placeholder>img</Placeholder>}
      </Thumb>
      <Info>
        <Category>{category}</Category>
        <Title>{title}</Title>
        <Meta>{createdAt} · 조회 {viewCount.toLocaleString()}</Meta>
      </Info>
    </Card>
  )
  return href ? <CardLink to={href}>{inner}</CardLink> : inner
}

const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`

const Card = styled.article`
  display: flex;
  gap: 12px;
  padding: 12px;
  background: ${theme.colors.white};
  border-radius: ${theme.radius.md};
  border: 1px solid ${theme.colors.border};
`

const Thumb = styled.div`
  width: 80px;
  height: 60px;
  flex-shrink: 0;
  border-radius: ${theme.radius.sm};
  overflow: hidden;
  background: ${theme.colors.backgroundSubtle};

  img { width: 100%; height: 100%; object-fit: cover; }
`

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  color: ${theme.colors.textMuted};
`

const Info = styled.div`
  flex: 1;
  min-width: 0;
  text-align: left;
`

const Category = styled.span`
  font-size: 11px;
  color: ${theme.colors.primary};
  font-weight: 600;
`

const Title = styled.h3`
  margin: 4px 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
`

const Meta = styled.p`
  margin: 0;
  font-size: 11px;
  color: ${theme.colors.textMuted};
`
