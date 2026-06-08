import { listCampaigns } from '@/data/repositories/campaignRepository'
import { listModelProfiles } from '@/data/repositories/modelProfileRepository'
import {
  getFeaturedClips,
  getFeaturedHosts,
  getFeaturedNews,
  getHeroBanners,
} from '@/data/sources/mocks/homeMockData'

/** 메인페이지 Hero 배너 조회 */
export async function fetchHeroBanners() {
  return getHeroBanners()
}

/** 메인 라이브·캠페인 카드용 공고 목록 */
export async function fetchHomeCampaigns() {
  return listCampaigns()
}

/** 메인 추천 모델 목록 */
export async function fetchHomeModels() {
  const models = await listModelProfiles()
  return models.filter((m) => !m.isDraft).slice(0, 6)
}

/** 메인 추천 쇼호스트 목록 */
export async function fetchHomeHosts() {
  return getFeaturedHosts()
}

/** 메인 클립 목록 */
export async function fetchHomeClips() {
  return getFeaturedClips()
}

/** 메인 뉴스 목록 */
export async function fetchHomeNews() {
  return getFeaturedNews()
}
