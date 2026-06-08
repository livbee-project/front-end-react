import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Campaign } from '@/domain/entities/campaign'
import type { ModelProfile } from '@/domain/entities/modelProfile'
import {
  fetchHeroBanners,
  fetchHomeCampaigns,
  fetchHomeClips,
  fetchHomeHosts,
  fetchHomeModels,
  fetchHomeNews,
} from '@/data/repositories/homeRepository'
import { CampaignCard } from '@/presentation/components/campaign/CampaignCard'
import { LiveCard } from '@/presentation/components/campaign/LiveCard'
import { ClipCard } from '@/presentation/components/home/ClipCard'
import type { HeroBannerItem } from '@/presentation/components/home/HeroBanner'
import { HeroBanner } from '@/presentation/components/home/HeroBanner'
import { HostCard } from '@/presentation/components/home/HostCard'
import { NewsCard } from '@/presentation/components/home/NewsCard'
import { ModelCard } from '@/presentation/components/models/ModelCard'
import {
  CardGrid,
  CardScroll,
  ModelScroll,
  Page,
  Section,
  SectionHeader,
  SectionTitle,
  ViewAll,
} from '@/presentation/pages/home/styles/home.styles'
import styled from 'styled-components'

/** 메인페이지 — 7섹션 조립 */
export function HomePage() {
  const [heroes, setHeroes] = useState<HeroBannerItem[]>([])
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [models, setModels] = useState<ModelProfile[]>([])
  const [hosts, setHosts] = useState<Awaited<ReturnType<typeof fetchHomeHosts>>>([])
  const [clips, setClips] = useState<Awaited<ReturnType<typeof fetchHomeClips>>>([])
  const [news, setNews] = useState<Awaited<ReturnType<typeof fetchHomeNews>>>([])

  useEffect(() => {
    Promise.all([
      fetchHeroBanners(),
      fetchHomeCampaigns(),
      fetchHomeModels(),
      fetchHomeHosts(),
      fetchHomeClips(),
      fetchHomeNews(),
    ]).then(([h, c, m, ho, cl, n]) => {
      setHeroes(h)
      setCampaigns(c)
      setModels(m)
      setHosts(ho)
      setClips(cl)
      setNews(n)
    })
  }, [])

  return (
    <Page>
      <Section>
        <HeroBanner items={heroes} />
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>지금 뜨는 쇼핑라이브</SectionTitle>
          <ViewAll to="/campaigns">전체보기</ViewAll>
        </SectionHeader>
        <CardScroll>
          {campaigns.map((c) => (
            <LiveCard
              key={c.id}
              id={c.id}
              liveThumbnail={c.liveThumbnail}
              brandName={c.brandName}
              title={c.title}
              summary={c.summary}
              isLive={c.isLive}
            />
          ))}
        </CardScroll>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>브랜드 PICK</SectionTitle>
          <ViewAll to="/campaigns">전체보기</ViewAll>
        </SectionHeader>
        <CardScroll $variant="campaign">
          {campaigns.map((c) => (
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
        </CardScroll>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>추천 쇼호스트</SectionTitle>
          <ViewAll to="/hosts">전체보기</ViewAll>
        </SectionHeader>
        <CardScroll>
          {hosts.map((h) => <HostCard key={h.id} {...h} />)}
        </CardScroll>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>추천 모델</SectionTitle>
          <ViewAll to="/models">전체보기</ViewAll>
        </SectionHeader>
        <ModelScroll>
          {models.map((m) => (
            <ModelLink key={m.id} to={`/models/${m.id}`}>
              <ModelCard
                profileImage={m.profileImage}
                name={m.name}
                modelType={m.modelType}
                height={m.height}
              />
            </ModelLink>
          ))}
          {models.length === 0 && <EmptyHint>등록된 모델이 없습니다.</EmptyHint>}
        </ModelScroll>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>HOT CLIP</SectionTitle>
          <ViewAll to="/clips">전체보기</ViewAll>
        </SectionHeader>
        <CardScroll>
          {clips.map((c) => <ClipCard key={c.id} {...c} />)}
        </CardScroll>
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle>라이브 뉴스</SectionTitle>
          <ViewAll to="/news">전체보기</ViewAll>
        </SectionHeader>
        <CardGrid>
          {news.map((n) => <NewsCard key={n.id} {...n} />)}
        </CardGrid>
      </Section>
    </Page>
  )
}

const ModelLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
`

const EmptyHint = styled.span`
  font-size: 14px;
  color: #9ca3af;
`
