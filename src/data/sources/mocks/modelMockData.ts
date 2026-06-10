import type { Model, ModelDetail } from '@/domain/entities/Model';
import { homeAssets } from '@/presentation/pages/home/config/homeAssets';
import type { HomeProfileItem } from '@/presentation/pages/home/types/homeView';
import type {
  ModelDetailExtraView,
  ModelFilterKey,
  ModelListItemView,
} from '@/presentation/pages/model/types/modelView';

const { cardFashion, hostMay, hostJena, hostWoni, modelJang, modelYujimin } = homeAssets;

export const MODEL_FILTER_OPTIONS: ModelFilterKey[] = [
  '전체',
  '뷰티',
  '패션',
  '피팅',
  '라이프',
  '키즈',
];

const MODEL_LIST_SOURCE: ModelListItemView[] = [
  {
    id: 'model-jang',
    name: '장원영',
    summary: '화사하고 고급스러운 이미지로 뷰티와 패션 브랜드 무드를 선명하게 표현하는 모델',
    profileImage: modelJang,
    modelType: '키즈모델',
    filterKey: '키즈',
    height: 173,
    location: '서울',
    tags: ['뷰티', '패션', '프리미엄'],
    description:
      '화사하고 고급스러운 이미지로 뷰티·패션 브랜드 촬영에 강점을 보이는 모델입니다.',
  },
  {
    id: 'model-yujimin',
    name: '유지민',
    summary: '도회적이고 시크한 분위기로 패션, 뷰티, 테크 브랜드 촬영에 잘 어울리는 모델',
    profileImage: modelYujimin,
    modelType: '패션모델',
    filterKey: '패션',
    height: 168,
    location: '서울',
    tags: ['패션', '뷰티', '화보'],
    description: '도회적이고 시크한 무드로 패션 화보와 브랜드 캠페인에 적합합니다.',
  },
  {
    id: 'model-may',
    name: '메이',
    summary: '청순하고 맑은 분위기로 뷰티와 패션 이미지를 섬세하게 표현하는 모델',
    profileImage: hostMay,
    modelType: '뷰티모델',
    filterKey: '뷰티',
    location: '경기',
    tags: ['뷰티', '청순', '데일리'],
    description: '청순하고 맑은 분위기로 뷰티 제품 촬영에 강점이 있습니다.',
  },
  {
    id: 'model-jena',
    name: '제나',
    summary: '세련되고 도회적인 이미지로 패션과 브랜드 화보에 잘 어울리는 모델',
    profileImage: hostJena,
    modelType: '패션모델',
    filterKey: '패션',
    location: '서울',
    tags: ['패션', '룩북', '브랜드'],
    description: '세련된 무드로 패션 룩북과 브랜드 화보 촬영에 적합합니다.',
  },
  {
    id: 'model-woni',
    name: '원이',
    summary: '밝고 생동감 있는 이미지로 라이프스타일과 데일리룩 촬영에 적합한 모델',
    profileImage: hostWoni,
    modelType: '피팅모델',
    filterKey: '피팅',
    location: '부산',
    tags: ['피팅', '라이프', '데일리'],
    description: '밝고 생동감 있는 이미지로 라이프스타일 촬영에 강점이 있습니다.',
  },
  {
    id: 'model-arin',
    name: '아린',
    summary: '자연스러운 라이프스타일 이미지와 편안한 데일리 무드',
    profileImage: cardFashion,
    modelType: '라이프모델',
    filterKey: '라이프',
    height: 170,
    location: '전국',
    tags: ['리빙', '데일리', '자연스러움'],
    description: '자연스럽고 편안한 무드로 리빙·라이프스타일 촬영에 적합합니다.',
  },
];

const MODEL_DETAIL_EXTRA: Record<string, ModelDetailExtraView> = {
  'model-jang': {
    mood: '화사하고 고급스러운 무드',
    mainStrength: '뷰티, 패션, 프리미엄 브랜드 촬영에서 첫인상을 선명하게 전달합니다.',
    portfolioFileName: '모델 장원영 포트폴리오.pdf',
    fileSize: '3.1MB',
    joinedAt: '2026.06.01',
    profileStatus: '프로필 공개 · 계약 전 정보 비공개',
    tags: ['뷰티', '패션', '프리미엄'],
    description:
      '화사하고 고급스러운 이미지로 뷰티·패션 브랜드 촬영에 강점을 보이는 모델입니다.',
  },
  'model-yujimin': {
    mood: '도회적이고 시크한 무드',
    mainStrength: '패션 화보, 뷰티 캠페인, 감도 높은 제품 촬영에 적합합니다.',
    portfolioFileName: '모델 유지민 포트폴리오.pdf',
    fileSize: '2.8MB',
    joinedAt: '2026.06.03',
    profileStatus: '프로필 공개 · 계약 전 정보 비공개',
    tags: ['패션', '뷰티', '화보'],
  },
  'model-may': {
    mood: '청순하고 맑은 무드',
    mainStrength: '뷰티 제품의 깨끗한 이미지와 데일리 패션의 부드러운 분위기를 표현합니다.',
    portfolioFileName: '모델 메이 포트폴리오.pdf',
    fileSize: '2.5MB',
    joinedAt: '2026.06.05',
    profileStatus: '프로필 공개 · 계약 전 정보 비공개',
    tags: ['뷰티', '청순', '데일리'],
  },
  'model-jena': {
    mood: '세련되고 도회적인 무드',
    mainStrength: '패션 룩북, 브랜드 화보, 고급스러운 라이프스타일 촬영에 잘 어울립니다.',
    portfolioFileName: '모델 제나 포트폴리오.pdf',
    fileSize: '2.7MB',
    joinedAt: '2026.06.07',
    profileStatus: '프로필 공개 · 계약 전 정보 비공개',
    tags: ['패션', '룩북', '브랜드'],
  },
  'model-woni': {
    mood: '밝고 생동감 있는 무드',
    mainStrength: '라이프스타일, 데일리룩, 식품 및 뷰티 콘텐츠에서 친근한 이미지를 전달합니다.',
    portfolioFileName: '모델 원이 포트폴리오.pdf',
    fileSize: '2.2MB',
    joinedAt: '2026.06.10',
    profileStatus: '프로필 공개 · 계약 전 정보 비공개',
    tags: ['피팅', '라이프', '데일리'],
  },
  'model-arin': {
    mood: '자연스럽고 편안한 무드',
    mainStrength: '리빙, 데일리, 자연스러운 브랜드 촬영에 적합합니다.',
    portfolioFileName: '모델 아린 포트폴리오.pdf',
    fileSize: '2.0MB',
    joinedAt: '2026.06.12',
    profileStatus: '프로필 공개 · 계약 전 정보 비공개',
    tags: ['리빙', '데일리', '자연스러움'],
  },
};

// 목록 엔티티로 변환
const toModelEntity = (item: ModelListItemView): Model => ({
  id: item.id,
  nickname: item.name,
  oneLineIntro: item.summary,
  mainThumbnailUrl: item.profileImage,
  experienceYears: null,
  detailedRegion: item.location ?? null,
  height: item.height ?? null,
  gender: null,
  concept: item.modelType,
  categories: [item.filterKey],
});

// 갤러리 이미지 목록 생성
export const getModelMockGallery = (id: string): string[] => {
  const item = MODEL_LIST_SOURCE.find((model) => model.id === id) ?? MODEL_LIST_SOURCE[0];

  return Array.from(
    new Set([item.profileImage, modelJang, modelYujimin, hostMay, hostJena, hostWoni, cardFashion]),
  ).slice(0, 9);
};

// 상세 엔티티로 변환
const toModelDetail = (item: ModelListItemView): ModelDetail => {
  const extra = MODEL_DETAIL_EXTRA[item.id] ?? MODEL_DETAIL_EXTRA['model-jang'];

  return {
    id: item.id,
    user: `user-${item.id}`,
    nickname: item.name,
    oneLineIntro: item.summary,
    detailedIntro: extra.description ?? item.description ?? item.summary,
    experienceYears: null,
    age: null,
    isAgePublic: false,
    mainThumbnailUrl: item.profileImage,
    backgroundImageUrl: null,
    subThumbnailUrls: getModelMockGallery(item.id),
    status: 'active',
    detailedRegion: item.location ?? null,
    gender: null,
    height: item.height ?? null,
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
    attachedFileUrl: null,
    createdAt: extra.joinedAt,
    updatedAt: extra.joinedAt,
  };
};

/** 홈 추천 모델 섹션 SSOT — 목록·상세와 동일 ID */
export const HOME_MODEL_PROFILES: HomeProfileItem[] = MODEL_LIST_SOURCE.map((item) => ({
  id: item.id,
  profileImage: item.profileImage,
  name: item.name,
  summary: item.summary,
  modelType: item.modelType,
  height: item.height,
}));

export const MODEL_MOCK_LIST: Model[] = MODEL_LIST_SOURCE.map(toModelEntity);

export const MODEL_MOCK_LIST_VIEWS: ModelListItemView[] = MODEL_LIST_SOURCE;

// 필터·검색 적용 목록 조회
export const filterModelMockList = (
  filter: ModelFilterKey,
  search?: string,
): ModelListItemView[] => {
  const keyword = search?.trim().toLowerCase();

  return MODEL_LIST_SOURCE.filter((item) => {
    const matchesFilter = filter === '전체' || item.filterKey === filter;
    const matchesSearch =
      !keyword ||
      item.name.toLowerCase().includes(keyword) ||
      item.summary.toLowerCase().includes(keyword) ||
      item.modelType.toLowerCase().includes(keyword);

    return matchesFilter && matchesSearch;
  });
};

// 상세 목데이터 조회
export const getModelMockDetail = (id: string): ModelDetail | null => {
  const item = MODEL_LIST_SOURCE.find((model) => model.id === id);
  return item ? toModelDetail(item) : null;
};

// 상세 보조 뷰 데이터 조회
export const getModelMockDetailExtra = (id: string): ModelDetailExtraView => {
  return MODEL_DETAIL_EXTRA[id] ?? MODEL_DETAIL_EXTRA['model-jang'];
};

// 목록 뷰 1건 조회
export const getModelMockListItem = (id: string): ModelListItemView | undefined =>
  MODEL_LIST_SOURCE.find((model) => model.id === id);

// 촬영무드 stat용 연관 캠페인 수 mock
export const getModelMockShootMoodCount = (id: string): number => {
  const counts: Record<string, number> = {
    'model-jang': 3,
    'model-yujimin': 3,
    'model-may': 2,
    'model-jena': 3,
    'model-woni': 2,
    'model-arin': 2,
  };

  return counts[id] ?? 2;
};
