import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import type { Campaign } from '@/domain/entities/campaign'
import { getCampaignById } from '@/data/repositories/campaignRepository'
import { CampaignCard } from '@/presentation/components/campaign/CampaignCard'
import { LiveCard } from '@/presentation/components/campaign/LiveCard'
import { Button } from '@/presentation/components/ui/Button'
import { formatPayment } from '@/shared/utils/formatPayment'
import { theme } from '@/presentation/styles/theme'

/** 공고 상세 페이지 */
export function CampaignDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [campaign, setCampaign] = useState<Campaign | null>(null)

  useEffect(() => {
    if (!id) return
    getCampaignById(id).then(setCampaign)
  }, [id])

  if (!campaign) return <Wrap>불러오는 중...</Wrap>

  return (
    <Wrap>
      <Top>
        <h1>{campaign.title}</h1>
        <Link to="/campaigns"><Button variant="outline" size="sm">목록</Button></Link>
      </Top>
      <Cards>
        <LiveCard
          liveThumbnail={campaign.liveThumbnail}
          brandName={campaign.brandName}
          title={campaign.title}
          summary={campaign.summary}
          isLive={campaign.isLive}
        />
        <CampaignCard
          coverImage={campaign.coverImage}
          brandName={campaign.brandName}
          title={campaign.title}
          payment={campaign.payment}
          applyDeadline={campaign.applyDeadline}
          likeCount={campaign.likeCount}
        />
      </Cards>
      <Detail>
        <p><strong>브랜드</strong> {campaign.brandName}</p>
        <p><strong>모집</strong> {campaign.recruitType} · {campaign.category} · {campaign.recruitCount}명</p>
        <p><strong>출연료</strong> {formatPayment(campaign.payment)}</p>
        <p><strong>일정</strong> {campaign.shootingDate} {campaign.startTime}~{campaign.endTime}</p>
        <p><strong>장소</strong> {campaign.location}</p>
        <p><strong>마감</strong> {campaign.applyDeadline}</p>
        <Desc>{campaign.description}</Desc>
      </Detail>
    </Wrap>
  )
}

const Wrap = styled.div`max-width: 800px; margin: 0 auto; padding: 32px 20px;`
const Top = styled.div`display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; h1 { margin: 0; font-size: 20px; }`
const Cards = styled.div`display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;`
const Detail = styled.div`
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.border};
  border-radius: 12px;
  padding: 24px;
  text-align: left;
  font-size: 14px;
  p { margin: 0 0 8px; }
`
const Desc = styled.p`margin-top: 16px; line-height: 1.6; color: ${theme.colors.textSecondary}; white-space: pre-wrap;`
