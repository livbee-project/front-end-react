import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '@/presentation/styles/theme'

export interface HeroBannerItem {
  id: string
  image: string
  title: string
  subtitle: string
  link: string
}

interface HeroBannerProps {
  items: HeroBannerItem[]
}

/** 메인 Hero 배너 슬라이드 (첫 항목 노출) */
export function HeroBanner({ items }: HeroBannerProps) {
  const hero = items[0]
  if (!hero) return null

  return (
    <Banner to={hero.link}>
      <Bg src={hero.image} alt="" />
      <Overlay />
      <Content>
        <Title>{hero.title}</Title>
        <Subtitle>{hero.subtitle}</Subtitle>
        <Cta>지금 보기</Cta>
      </Content>
    </Banner>
  )
}

const Banner = styled(Link)`
  display: block;
  position: relative;
  border-radius: ${theme.radius.lg};
  overflow: hidden;
  min-height: 280px;
  text-decoration: none;
  color: white;
`

const Bg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 100%);
`

const Content = styled.div`
  position: relative;
  padding: 48px 40px;
  max-width: 480px;
`

const Title = styled.h2`
  margin: 0 0 12px;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
`

const Subtitle = styled.p`
  margin: 0 0 20px;
  font-size: 16px;
  opacity: 0.9;
`

const Cta = styled.span`
  display: inline-block;
  padding: 10px 20px;
  background: ${theme.colors.primary};
  border-radius: ${theme.radius.md};
  font-size: 14px;
  font-weight: 600;
`
