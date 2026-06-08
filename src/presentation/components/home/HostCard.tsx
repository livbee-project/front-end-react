import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '@/presentation/styles/theme'

export interface HostCardProps {
  id?: string
  profileImage: string | null
  name: string
  category: string
  experienceYears: number
  to?: string
}

/** 추천 쇼호스트 카드 */
export function HostCard({ id, profileImage, name, category, experienceYears, to }: HostCardProps) {
  const href = to ?? (id ? `/hosts/${id}` : undefined)
  const inner = (
    <Card>
      <Avatar>
        {profileImage ? <img src={profileImage} alt={name} /> : <Placeholder>1:1</Placeholder>}
      </Avatar>
      <Name>{name}</Name>
      <Meta>{category} · 경력 {experienceYears}년</Meta>
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
  width: 140px;
  text-align: center;
`

const Avatar = styled.div`
  width: 100px;
  height: 100px;
  margin: 0 auto 10px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid ${theme.colors.border};
  background: ${theme.colors.backgroundSubtle};

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

const Name = styled.h3`
  margin: 0 0 4px;
  font-size: 14px;
  font-weight: 600;
`

const Meta = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${theme.colors.textSecondary};
`
