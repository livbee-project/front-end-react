import type { UserType } from '@/domain/entities/User';
import type { ProfileData, MenuItemData } from '@/types/mypage';
import {
  Briefcase,
  Users,
  Send,
  CreditCard,
  FileText,
  Video,
  Mail,
  User,
  Bell,
  MessageSquare,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { debug } from '@/shared/utils/logger';
import { ROUTE_PATHS } from '@/app/routes/routeMeta';

/**
 * 사용자 타입별 전략 인터페이스
 * OCP 준수: 새로운 타입 추가 시 이 인터페이스를 구현하는 새 전략만 추가하면 됨
 */
export interface UserTypeStrategy {
  getProfileData(): ProfileData;
  getMenuItems(commonMenu: MenuItemData[]): MenuItemData[][];
}

/**
 * 공통 메뉴 생성 함수
 */
const createCommonMenu = (navigate: ReturnType<typeof useNavigate>): MenuItemData[] => [
  {
    icon: User,
    label: '개인정보 관리',
    description: '비밀번호 변경 및 인증',
    onClick: () => debug('useMyPageData', '개인정보 관리 클릭'),
  },
  {
    icon: Bell,
    label: '알림 설정',
    description: '알림 수신 설정 관리',
    onClick: () => debug('useMyPageData', '알림 설정 클릭'),
  },
  {
    icon: MessageSquare,
    label: '메시지',
    description: '받은 메시지 확인',
    onClick: () => navigate('/mypage/messages'),
  },
];

/**
 * 브랜드 타입 전략
 */
export class BrandStrategy implements UserTypeStrategy {
  private navigate: ReturnType<typeof useNavigate>;

  constructor(navigate: ReturnType<typeof useNavigate>) {
    this.navigate = navigate;
  }

  getProfileData(): ProfileData {
    return {
      name: '스타일코리아',
      role: '패션 브랜드',
      badges: ['패션', '브랜드'],
      contact: '021234567',
      stats: [
        { label: '진행 캠페인', value: 5, unit: '개', format: 'count' },
        { label: '계약 호스트', value: 12, unit: '명', format: 'count' },
        { label: '평점', value: 4.9, format: 'rating' },
      ],
    };
  }

  getMenuItems(commonMenu: MenuItemData[]): MenuItemData[][] {
    return [
      [
        {
          icon: Briefcase,
          label: '캠페인 목록',
          description: '등록한 캠페인 관리',
          onClick: () => {
            debug('useMyPageData', '캠페인 목록 클릭');
            this.navigate(ROUTE_PATHS.campaigns, { state: { onlyMine: true } });
          },
        },
        {
          icon: Users,
          label: '지원자 현황',
          description: '지원자 확인 및 관리',
          onClick: () => debug('useMyPageData', '지원자 현황 클릭'),
        },
        {
          icon: Send,
          label: '보낸 제안',
          description: '보낸 제안 내역',
          onClick: () => debug('useMyPageData', '보낸 제안 클릭'),
        },
        {
          icon: CreditCard,
          label: '계약 및 정산',
          description: '계약서 및 정산 내역',
          onClick: () => debug('useMyPageData', '계약 및 정산 클릭'),
        },
      ],
      commonMenu,
    ];
  }
}

/**
 * 쇼호스트 타입 전략
 */
export class ShowhostStrategy implements UserTypeStrategy {
  private navigate: ReturnType<typeof useNavigate>;

  constructor(navigate: ReturnType<typeof useNavigate>) {
    this.navigate = navigate;
  }

  getProfileData(): ProfileData {
    return {
      name: '김지현',
      role: '패션 전문 쇼호스트',
      badges: ['패션', '뷰티'],
      contact: '01012345678',
      stats: [
        { label: '라이브', value: 24, unit: '회', format: 'count' },
        { label: '팔로워', value: 1200, unit: '명', format: 'compact' },
        { label: '평점', value: 4.8, format: 'rating' },
      ],
    };
  }

  getMenuItems(commonMenu: MenuItemData[]): MenuItemData[][] {
    return [
      [
        {
          icon: Briefcase,
          label: '내가 지원한 캠페인',
          description: '지원한 캠페인 확인',
          onClick: () => this.navigate('/mypage/applied-campaigns'),
        },
        {
          icon: FileText,
          label: '포트폴리오 관리',
          description: '포트폴리오 수정 및 관리',
          onClick: () => this.navigate('/mypage/portfolios', { state: { role: 'showhost' } }),
        },
        {
          icon: Video,
          label: '숏클립 관리',
          description: '숏클립 업로드 및 관리',
          onClick: () => this.navigate('/mypage/clips'),
        },
        {
          icon: Mail,
          label: '받은 제안',
          description: '받은 제안 확인',
          onClick: () => debug('useMyPageData', '받은 제안 클릭'),
        },
        {
          icon: CreditCard,
          label: '계약 정산',
          description: '계약서 및 정산 내역',
          onClick: () => debug('useMyPageData', '계약 정산 클릭'),
        },
      ],
      commonMenu,
    ];
  }
}

/**
 * 모델 타입 전략
 */
export class ModelStrategy implements UserTypeStrategy {
  private navigate: ReturnType<typeof useNavigate>;

  constructor(navigate: ReturnType<typeof useNavigate>) {
    this.navigate = navigate;
  }

  getProfileData(): ProfileData {
    return {
      name: '한지우',
      role: '프리랜스 모델',
      badges: ['패션', '뷰티'],
      contact: '01087654321',
      stats: [
        { label: '촬영', value: 32, unit: '회', format: 'count' },
        { label: '팔로워', value: 2500, unit: '명', format: 'compact' },
        { label: '평점', value: 4.9, format: 'rating' },
      ],
    };
  }

  getMenuItems(commonMenu: MenuItemData[]): MenuItemData[][] {
    return [
      [
        {
          icon: Briefcase,
          label: '내가 지원한 캠페인',
          description: '지원한 캠페인 확인',
          onClick: () => this.navigate('/mypage/applied-campaigns'),
        },
        {
          icon: FileText,
          label: '포트폴리오 관리',
          description: '포트폴리오 수정 및 관리',
          onClick: () => this.navigate('/mypage/portfolios', { state: { role: 'model' } }),
        },
        {
          icon: Video,
          label: '숏클립 관리',
          description: '숏클립 업로드 및 관리',
          onClick: () => this.navigate('/mypage/clips'),
        },
        {
          icon: Mail,
          label: '받은 제안',
          description: '받은 제안 확인',
          onClick: () => debug('useMyPageData', '받은 제안 클릭'),
        },
        {
          icon: CreditCard,
          label: '계약 정산',
          description: '계약서 및 정산 내역',
          onClick: () => debug('useMyPageData', '계약 정산 클릭'),
        },
      ],
      commonMenu,
    ];
  }
}

/**
 * 전략 팩토리
 * OCP 준수: 새로운 타입 추가 시 이 팩토리에만 새 전략을 등록하면 됨
 */
export class UserTypeStrategyFactory {
  static createStrategy(
    userType: UserType,
    navigate: ReturnType<typeof useNavigate>
  ): UserTypeStrategy {
    switch (userType) {
      case 'brand':
        return new BrandStrategy(navigate);
      case 'showhost':
        return new ShowhostStrategy(navigate);
      case 'model':
        return new ModelStrategy(navigate);
      default:
        // 기본값으로 브랜드 전략 사용
        return new BrandStrategy(navigate);
    }
  }
}

/**
 * 공통 메뉴 생성 함수 export
 */
export { createCommonMenu };

