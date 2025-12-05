import type { Model } from '@/domain/entities/Model';

/**
 * 하드코딩된 모델 데이터 (백엔드 데이터가 없을 때 사용)
 */
export const mockModels: Model[] = [
  {
    id: '1',
    nickname: '한지우',
    oneLineIntro: '청순하고 자연스러운 이미지의 모델',
    mainThumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    experienceYears: 3,
    detailedRegion: '서울',
    height: 168,
    gender: null,
    concept: '청순/내추럴',
    categories: ['패션', '뷰티'],
  },
  {
    id: '2',
    nickname: '강민서',
    oneLineIntro: '시크하고 모던한 스타일의 모델',
    mainThumbnailUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
    experienceYears: 4,
    detailedRegion: '서울',
    height: 172,
    gender: null,
    concept: '시크/모던',
    categories: ['패션'],
  },
  {
    id: '3',
    nickname: '최유정',
    oneLineIntro: '옷 잘입는 모델',
    mainThumbnailUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    experienceYears: 2,
    detailedRegion: '부산',
    height: 170,
    gender: null,
    concept: '엘레강스',
    categories: ['패션', '뷰티'],
  },
  {
    id: '4',
    nickname: '이수아',
    oneLineIntro: '깔끔한 이미지의 모델',
    mainThumbnailUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=400&q=80',
    experienceYears: 1,
    detailedRegion: '서울',
    height: 165,
    gender: null,
    concept: '청순/내추럴',
    categories: ['패션'],
  },
];

/**
 * 모델 필터 옵션
 */
export const modelFilters = ['전체', '청순/내추럴', '시크/모던', '엘레강스'];

