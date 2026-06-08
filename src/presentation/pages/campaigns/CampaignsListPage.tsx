import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import type { Campaign } from '@/domain/entities/campaign'
import { listCampaigns } from '@/data/repositories/campaignRepository'
import { CampaignCard } from '@/presentation/components/campaign/CampaignCard'
import { Button } from '@/presentation/components/ui/Button'
import { theme } from '@/presentation/styles/theme'

/** 공고 목록 페이지 */
export function CampaignsListPage() {
  const [items, setItems] = useState<Campaign[]>([])

  useEffect(() => {
    listCampaigns().then(setItems)
  }, [])

  return (
    <Wrap>
      <Header>
        <h1>공고 목록</h1>
        <Link to="/campaigns/create"><Button>공고 등록</Button></Link>
      </Header>
      <Grid>
        {items.map((c) => (
          <CampaignCard
            key={c.id}
            id={c.id}
            coverImage={c.coverImage}
            brandName={c.brandName}
            title={c.title}
            payment={c.payment}
            applyDeadline={c.applyDeadline}
            likeCount={c.likeCount}
          />
        ))}
      </Grid>
      {items.length === 0 && <Empty>등록된 공고가 없습니다.</Empty>}
    </Wrap>
  )
}

const Wrap = styled.div`max-width: 1200px; margin: 0 auto; padding: 32px 20px;`
const Header = styled.div`display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; h1 { margin: 0; font-size: 22px; }`
const Grid = styled.div`display: flex; flex-wrap: wrap; gap: 16px;`
const Empty = styled.p`color: ${theme.colors.textMuted}; text-align: center;`
