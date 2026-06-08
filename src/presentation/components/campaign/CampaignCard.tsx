import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { calcDday } from '@/shared/utils/calcDday'
import { formatPayment } from '@/shared/utils/formatPayment'
import { theme } from '@/presentation/styles/theme'

export interface CampaignCardProps {
  id?: string
  coverImage: string | null
  brandName: string
  title: string
  payment: string | number
  applyDeadline: string
  likeCount?: number
  to?: string
}

/** 브랜드 PICK 공고 카드 (4:3 커버) */
export function CampaignCard({
  id,
  coverImage,
  brandName,
  title,
  payment,
  applyDeadline,
  likeCount = 0,
  to,
}: CampaignCardProps) {
  const href = to ?? (id ? `/campaigns/${id}` : undefined)
  const dday = calcDday(applyDeadline)
  const paymentLabel = formatPayment(payment)

  const inner = (
    <Card>
      <Cover>
        {coverImage ? <img src={coverImage} alt={title} /> : <Placeholder>4:3</Placeholder>}
        {dday && <DdayBadge>{dday}</DdayBadge>}
      </Cover>
      <Info>
        <Brand>{brandName || '브랜드명'}</Brand>
        <Title>{title || '공고 제목'}</Title>
        <Meta>
          {paymentLabel && <span>출연료 {paymentLabel}</span>}
          {applyDeadline && <span>마감 {applyDeadline}</span>}
        </Meta>
        {likeCount > 0 && <Likes>♥ {likeCount}</Likes>}
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
  width: 240px;
`

const Cover = styled.div`
  position: relative;
  aspect-ratio: 4 / 3;
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

const DdayBadge = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  background: ${theme.colors.primary};
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: ${theme.radius.full};
`

const Info = styled.div`
  padding: 12px 14px;
  text-align: left;
`

const Brand = styled.div`
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  margin-bottom: 4px;
`

const Title = styled.h3`
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
`

const Meta = styled.div`
  font-size: 12px;
  color: ${theme.colors.textSecondary};
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const Likes = styled.div`
  margin-top: 6px;
  font-size: 12px;
  color: ${theme.colors.textMuted};
`
