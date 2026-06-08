import type { HeroBannerItem } from '@/presentation/components/home/HeroBanner'
import type { HostCardProps } from '@/presentation/components/home/HostCard'
import type { ClipCardProps } from '@/presentation/components/home/ClipCard'
import type { NewsCardProps } from '@/presentation/components/home/NewsCard'
import heroImage from '@/assets/hero.png'

/** 메인 Hero 배너 목 데이터 */
export function getHeroBanners(): HeroBannerItem[] {
  return [
    {
      id: 'hero-1',
      image: heroImage,
      title: '라이브 커머스, 오늘의 트렌드를 만나다',
      subtitle: '쇼호스트·모델·브랜드가 함께하는 LIVBEE',
      link: '/campaigns',
    },
  ]
}

/** 추천 쇼호스트 목 데이터 */
export function getFeaturedHosts(): HostCardProps[] {
  return [
    { id: 'host-1', profileImage: null, name: '김지현', category: '뷰티', experienceYears: 5 },
    { id: 'host-2', profileImage: null, name: '박서연', category: '패션', experienceYears: 3 },
    { id: 'host-3', profileImage: null, name: '이민호', category: '식품', experienceYears: 7 },
    { id: 'host-4', profileImage: null, name: '최유진', category: '라이프', experienceYears: 2 },
  ]
}

/** HOT CLIP 목 데이터 */
export function getFeaturedClips(): ClipCardProps[] {
  return [
    { id: 'clip-1', thumbnail: null, title: '뷰티 라이브 하이라이트', viewCount: 12400 },
    { id: 'clip-2', thumbnail: null, title: '패션 피팅 베스트 모먼트', viewCount: 8900 },
    { id: 'clip-3', thumbnail: null, title: '식품 라이브 시식 리액션', viewCount: 15200 },
  ]
}

/** 라이브 뉴스 목 데이터 */
export function getFeaturedNews(): NewsCardProps[] {
  return [
    {
      id: 'news-1',
      thumbnail: null,
      category: '트렌드',
      title: '2026 라이브 커머스 시장 전망',
      createdAt: '2026.06.01',
      viewCount: 3200,
    },
    {
      id: 'news-2',
      thumbnail: null,
      category: '인터뷰',
      title: 'TOP 쇼호스트가 말하는 라이브 팁',
      createdAt: '2026.05.28',
      viewCount: 5100,
    },
  ]
}
