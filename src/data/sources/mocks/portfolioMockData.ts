import type { Portfolio, PortfolioDetail } from '@/domain/entities/Portfolio';
import { portfolioAssets } from '@/presentation/pages/portfolio/config/portfolioAssets';
import type {
  PortfolioDetailExtraView,
  PortfolioFilterKey,
  PortfolioListItemView,
} from '@/presentation/pages/portfolio/types/portfolioView';

const { hostMay, hostJena, hostWoni, cardBeauty } = portfolioAssets;

export const PORTFOLIO_FILTER_OPTIONS: PortfolioFilterKey[] = [
  '전체',
  '뷰티',
  '패션',
  '푸드',
  '라이프',
];

const PORTFOLIO_LIST_SOURCE: PortfolioListItemView[] = [
  {
    id: 'host-may',
    name: '메이',
    summary: '밝고 사랑스러운 톤으로 제품의 매력을 자연스럽게 전달하는 쇼호스트',
    profileImage: hostMay,
    category: '뷰티',
    experienceYears: 1,
  },
  {
    id: 'host-jena',
    name: '제나',
    summary: '차분하고 신뢰감 있는 진행으로 브랜드 메시지를 선명하게 전달하는 쇼호스트',
    profileImage: hostJena,
    category: '패션',
    experienceYears: 1,
  },
  {
    id: 'host-woni',
    name: '원이',
    summary: '친근한 에너지와 감각적인 표현으로 시청자와 빠르게 연결되는 쇼호스트',
    profileImage: hostWoni,
    category: '푸드',
    experienceYears: 1,
  },
  {
    id: 'host-4',
    name: '이서연',
    summary: 'K-뷰티 전문, 자연스러운 제품 시연과 구매 포인트 전달',
    profileImage: cardBeauty,
    category: '뷰티',
    experienceYears: 7,
  },
];

const PORTFOLIO_DETAIL_EXTRA: Record<string, PortfolioDetailExtraView> = {
  'host-may': {
    registerType: '개인 쇼호스트',
    responseTone: '밝고 사랑스러운 톤',
    mainStrength: '뷰티 제품의 사용감과 컬러감을 자연스럽게 표현합니다.',
    portfolioFileName: '쇼호스트 메이 포트폴리오.pdf',
    recentLiveTitle: '톤업 선케어 신제품 라이브',
    recentLiveUrl: 'https://shoppinglive.example.com/host-may-toneup-suncare',
    liveUrlLabel: '최근 진행 라이브',
    joinedAt: '2026.06.01',
    profileStatus: '프로필 공개 · 계약 전 정보 비공개',
    tags: ['뷰티', '라이브 1년', '톤업'],
    description:
      '안녕하세요! 뷰티 라이브를 중심으로 활동하는 쇼호스트 메이입니다. 제품 사용감과 컬러 표현에 강점이 있습니다.',
    location: '서울',
  },
  'host-jena': {
    registerType: '소속 쇼호스트',
    responseTone: '차분하고 신뢰감 있는 톤',
    mainStrength: '패션 상품의 핏과 소재 포인트를 안정적으로 설명합니다.',
    portfolioFileName: '쇼호스트 제나 포트폴리오.pdf',
    recentLiveTitle: '프리미엄 데일리룩 스타일링',
    recentLiveUrl: 'https://shoppinglive.example.com/host-jena-dailylook',
    liveUrlLabel: '최근 진행 라이브',
    joinedAt: '2026.06.03',
    profileStatus: '프로필 공개 · 계약 전 정보 비공개',
    tags: ['패션', '스타일링', '데일리룩'],
    description: '패션 브랜드와 함께한 스타일링 라이브 경험을 바탕으로 안정적인 진행을 제공합니다.',
    location: '경기',
  },
  'host-woni': {
    registerType: '프리랜서',
    responseTone: '친근하고 생동감 있는 톤',
    mainStrength: '식품과 체험형 상품을 쉽고 맛있게 전달합니다.',
    portfolioFileName: '쇼호스트 원이 포트폴리오.pdf',
    recentLiveTitle: '신제품 디저트 런칭 라이브',
    recentLiveUrl: 'https://shoppinglive.example.com/host-woni-dessert-launching',
    liveUrlLabel: '최근 진행 라이브',
    joinedAt: '2026.06.05',
    profileStatus: '프로필 공개 · 계약 전 정보 비공개',
    tags: ['푸드', '체험형', '친근한 톤'],
    description: '푸드·라이프 카테고리에서 시청자와 빠르게 친밀감을 형성하는 진행이 강점입니다.',
    location: '부산',
  },
  'host-4': {
    registerType: '전문 쇼호스트',
    responseTone: '전문적이고 설득력 있는 톤',
    mainStrength: 'K-뷰티 제품의 핵심 구매 포인트를 빠르게 정리합니다.',
    portfolioFileName: '쇼호스트 유리 포트폴리오.pdf',
    recentLiveTitle: '감성 뷰티 브랜드 라이브',
    recentLiveUrl: 'https://shoppinglive.example.com/host-yuri-kbeauty',
    liveUrlLabel: '최근 진행 라이브',
    joinedAt: '2026.06.07',
    profileStatus: '프로필 공개 · 계약 전 정보 비공개',
    tags: ['K-뷰티', '경력 7년', '전문 쇼호스트'],
    description: '다양한 뷰티 브랜드 라이브 경험을 바탕으로 구매 전환에 강점을 보입니다.',
    location: '서울',
  },
};

// 목록 엔티티로 변환
const toPortfolioEntity = (item: PortfolioListItemView): Portfolio => ({
  id: item.id,
  nickname: item.name,
  oneLineIntro: item.summary,
  mainThumbnailUrl: item.profileImage,
  experienceYears: item.experienceYears,
  detailedRegion: PORTFOLIO_DETAIL_EXTRA[item.id]?.location ?? null,
  height: null,
});

// 상세 엔티티로 변환
const toPortfolioDetail = (item: PortfolioListItemView): PortfolioDetail => {
  const extra = PORTFOLIO_DETAIL_EXTRA[item.id] ?? PORTFOLIO_DETAIL_EXTRA['host-may'];

  return {
    id: item.id,
    user: `user-${item.id}`,
    nickname: item.name,
    oneLineIntro: item.summary,
    detailedIntro: extra.description ?? item.summary,
    experienceYears: item.experienceYears,
    age: null,
    mainThumbnailUrl: item.profileImage,
    backgroundImageUrl: null,
    subThumbnailUrls: [item.profileImage, hostJena, hostWoni, cardBeauty].slice(0, 6),
    status: 'active',
    isAgePublic: false,
    detailedRegion: extra.location ?? null,
    gender: null,
    height: null,
    weight: null,
    topSize: null,
    bottomSize: null,
    shoeSize: null,
    isSizingPublic: false,
    websiteUrl: null,
    instagramUrl: null,
    youtubeUrl: null,
    tiktokUrl: null,
    publicScope: 'public',
    isReceivingOffers: true,
    recentLives: [
      {
        title: extra.recentLiveTitle,
        url: extra.recentLiveUrl,
        date: extra.joinedAt,
      },
    ],
    attachedFileUrl: null,
    createdAt: extra.joinedAt,
    updatedAt: extra.joinedAt,
  };
};

export const PORTFOLIO_MOCK_LIST: Portfolio[] = PORTFOLIO_LIST_SOURCE.map(toPortfolioEntity);

export const PORTFOLIO_MOCK_LIST_VIEWS: PortfolioListItemView[] = PORTFOLIO_LIST_SOURCE;

// 필터·검색 적용 목록 조회
export const filterPortfolioMockList = (
  filter: PortfolioFilterKey,
  search?: string,
): PortfolioListItemView[] => {
  const keyword = search?.trim().toLowerCase();

  return PORTFOLIO_LIST_SOURCE.filter((item) => {
    const matchesFilter = filter === '전체' || item.category === filter;
    const matchesSearch =
      !keyword ||
      item.name.toLowerCase().includes(keyword) ||
      item.summary.toLowerCase().includes(keyword) ||
      item.category.toLowerCase().includes(keyword);

    return matchesFilter && matchesSearch;
  });
};

// 상세 목데이터 조회
export const getPortfolioMockDetail = (id: string): PortfolioDetail | null => {
  const item = PORTFOLIO_LIST_SOURCE.find((host) => host.id === id);
  return item ? toPortfolioDetail(item) : null;
};

// 상세 보조 뷰 데이터 조회
export const getPortfolioMockDetailExtra = (id: string): PortfolioDetailExtraView => {
  return PORTFOLIO_DETAIL_EXTRA[id] ?? PORTFOLIO_DETAIL_EXTRA['host-may'];
};

// 갤러리 이미지 목록 생성
export const getPortfolioMockGallery = (id: string): string[] => {
  const item = PORTFOLIO_LIST_SOURCE.find((host) => host.id === id) ?? PORTFOLIO_LIST_SOURCE[0];

  return Array.from(
    new Set([item.profileImage, hostMay, hostJena, hostWoni, cardBeauty]),
  ).slice(0, 9);
};
