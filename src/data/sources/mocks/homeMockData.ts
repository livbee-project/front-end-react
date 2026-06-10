import { homeAssets } from '@/presentation/pages/home/config/homeAssets';
import type {
  HomeCampaignItem,
  HomeClipItem,
  HomeHeroData,
  HomeLiveItem,
  HomeNewsItem,
  HomeProfileItem,
} from '@/presentation/pages/home/types/homeView';

const {
  cardBeauty,
  cardFashion,
  cardProduct,
  heroFestival,
  hostMay,
  hostJena,
  hostWoni,
  modelJang,
  modelYujimin,
} = homeAssets;

export const HOME_HERO: HomeHeroData = {
  image: heroFestival,
  href: '/news',
};

export const HOME_LIVE_ITEMS: HomeLiveItem[] = [
  {
    id: 'live-1',
    liveThumbnail: hostMay,
    productImage: cardBeauty,
    productName: '톤업 선케어 세럼',
    title: '톤업 선케어 신제품 라이브',
    shootingDate: '2026.06.08',
  },
  {
    id: 'live-2',
    liveThumbnail: hostJena,
    productImage: cardFashion,
    productName: '프리미엄 데일리룩 세트',
    title: '프리미엄 데일리룩 스타일링',
    shootingDate: '2026.06.11',
  },
  {
    id: 'live-3',
    liveThumbnail: hostWoni,
    productImage: cardProduct,
    productName: '맛있는 도시락',
    title: '신제품 도시락 라이브',
    shootingDate: '2026.06.14',
  },
  {
    id: 'live-4',
    liveThumbnail: modelYujimin,
    productImage: cardFashion,
    productName: '썸머 OOTD 원피스',
    title: '여름 OOTD 스타일링 라이브',
    shootingDate: '2026.06.18',
  },
  {
    id: 'live-5',
    liveThumbnail: modelJang,
    productImage: cardBeauty,
    productName: '글로우 립 틴트',
    title: '신상 글로우 립 라이브',
    shootingDate: '2026.06.22',
  },
  {
    id: 'live-6',
    liveThumbnail: hostWoni,
    productImage: cardProduct,
    productName: '비건 스킨케어 키트',
    title: '비건 스킨케어 루틴 방송',
    shootingDate: '2026.06.25',
  },
];

export const HOME_CAMPAIGN_ITEMS: HomeCampaignItem[] = [
  {
    id: 'campaign-1',
    coverImage: hostJena,
    brandName: 'MUSE LABEL',
    title: '데일리 패션 런칭 라이브',
    payment: 500000,
    shootingDate: '2026.06.25',
  },
  {
    id: 'campaign-2',
    coverImage: cardBeauty,
    brandName: 'AURA BEAUTY',
    title: '신제품 뷰티 라이브',
    payment: 600000,
    shootingDate: '2026.06.28',
  },
  {
    id: 'campaign-3',
    coverImage: cardProduct,
    brandName: 'SWEET MARKET',
    title: '신제품 디저트 런칭 라이브',
    payment: 300000,
    shootingDate: '2026.06.15',
  },
  {
    id: 'campaign-4',
    coverImage: modelJang,
    brandName: 'LOVELY LIVE',
    title: '감성 뷰티 브랜드 라이브',
    payment: 450000,
    shootingDate: '2026.07.06',
  },
  {
    id: 'campaign-5',
    coverImage: modelYujimin,
    brandName: 'NOUVELLE FIT',
    title: '썸머 리조트룩 촬영 라이브',
    payment: 700000,
    shootingDate: '2026.07.09',
  },
];

export const HOME_HOST_PROFILES: HomeProfileItem[] = [
  {
    id: 'host-may',
    profileImage: hostMay,
    name: '메이',
    summary: '밝고 사랑스러운 톤으로 제품의 매력을 자연스럽게 전달하는 쇼호스트',
    category: '뷰티',
    experienceYears: 1,
  },
  {
    id: 'host-jena',
    profileImage: hostJena,
    name: '제나',
    summary: '차분하고 신뢰감 있는 진행으로 브랜드 메시지를 선명하게 전달하는 쇼호스트',
    category: '패션',
    experienceYears: 1,
  },
  {
    id: 'host-woni',
    profileImage: hostWoni,
    name: '원이',
    summary: '친근한 에너지와 감각적인 표현으로 시청자와 빠르게 연결되는 쇼호스트',
    category: '푸드',
    experienceYears: 1,
  },
  {
    id: 'host-4',
    profileImage: cardBeauty,
    name: '이서연',
    summary: 'K-뷰티 전문, 자연스러운 제품 시연과 구매 포인트 전달',
    category: '뷰티',
    experienceYears: 7,
  },
];

export { HOME_MODEL_PROFILES } from '@/data/sources/mocks/modelMockData';

export const HOME_CLIP_ITEMS: HomeClipItem[] = [
  {
    id: 'clip-1',
    thumbnail: modelJang,
    title: '톤업 선케어 제품 시연 레퍼런스',
    summary: '피부 표현, 제형, 사용감을 자연스럽게 보여준 뷰티 포트폴리오',
  },
  {
    id: 'clip-2',
    thumbnail: modelYujimin,
    title: '프리미엄 패션 스타일링 레퍼런스',
    summary: '도회적인 무드와 착장 핏을 선명하게 전달한 촬영 사례',
  },
  {
    id: 'clip-3',
    thumbnail: hostMay,
    title: '뷰티 제품 시연 포트폴리오',
    summary: '발색, 사용감, 구매 포인트를 자연스럽게 설명한 레퍼런스',
  },
  {
    id: 'clip-4',
    thumbnail: hostJena,
    title: '패션 스타일링 레퍼런스',
    summary: '코디 제안과 착용 핏을 차분하게 전달한 진행 사례',
  },
  {
    id: 'clip-5',
    thumbnail: hostWoni,
    title: '친근한 소통형 라이브 샘플',
    summary: '시청자 질문 대응과 체험형 설명이 돋보이는 포트폴리오',
  },
];

export const HOME_NEWS_ITEMS: HomeNewsItem[] = [
  {
    id: 'news-1',
    thumbnail: heroFestival,
    category: '뉴스',
    title: '2026년 쇼핑라이브 트렌드 리포트',
    createdAt: '2026-06-01',
  },
  {
    id: 'news-2',
    thumbnail: modelYujimin,
    category: '뉴스',
    title: 'Livbee, 쇼호스트 전문 매칭 강화',
    createdAt: '2026-05-28',
  },
  {
    id: 'news-3',
    thumbnail: modelJang,
    category: '뉴스',
    title: 'MZ세대 주목 라이브 키워드 공개',
    createdAt: '2026-05-24',
  },
];

/** 홈 뉴스 섹션 노출 개수 (test_codex: 2개) */
export const HOME_NEWS_DISPLAY_COUNT = 2;
