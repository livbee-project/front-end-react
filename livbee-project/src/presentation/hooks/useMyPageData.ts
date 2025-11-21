import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
import type { UserType, ProfileData, MenuItemData } from '@/types/mypage';

/**
 * 마이페이지 데이터를 생성하는 커스텀 훅
 */
export const useMyPageData = (userType: UserType) => {
  const navigate = useNavigate();

  // 유저 타입별 프로필 데이터
  const profileData = useMemo<ProfileData>(() => {
    switch (userType) {
      case 'brand':
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
      case 'showhost':
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
      case 'model':
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
  }, [userType]);

  // 유저 타입별 메뉴 데이터
  const menuItems = useMemo<MenuItemData[][]>(() => {
    const commonMenu: MenuItemData[] = [
      {
        icon: User,
        label: '개인정보 관리',
        description: '비밀번호 변경 및 인증',
        onClick: () => console.log('개인정보 관리 클릭'),
      },
      {
        icon: Bell,
        label: '알림 설정',
        description: '알림 수신 설정 관리',
        onClick: () => console.log('알림 설정 클릭'),
      },
      {
        icon: MessageSquare,
        label: '메시지',
        description: '받은 메시지 확인',
        onClick: () => navigate('/mypage/messages'),
      },
    ];

    switch (userType) {
      case 'brand':
        return [
          [
            {
              icon: Briefcase,
              label: '캠페인 목록',
              description: '등록한 캠페인 관리',
              onClick: () => console.log('캠페인 목록 클릭'),
            },
            {
              icon: Users,
              label: '지원자 현황',
              description: '지원자 확인 및 관리',
              onClick: () => console.log('지원자 현황 클릭'),
            },
            {
              icon: Send,
              label: '보낸 제안',
              description: '보낸 제안 내역',
              onClick: () => console.log('보낸 제안 클릭'),
            },
            {
              icon: CreditCard,
              label: '계약 및 정산',
              description: '계약서 및 정산 내역',
              onClick: () => console.log('계약 및 정산 클릭'),
            },
          ],
          commonMenu,
        ];
      case 'showhost':
      case 'model':
        return [
          [
            {
              icon: Briefcase,
              label: '내가 지원한 캠페인',
              description: '지원한 캠페인 확인',
              onClick: () => navigate('/mypage/applied-campaigns'),
            },
            {
              icon: FileText,
              label: '포트폴리오 관리',
              description: '포트폴리오 수정 및 관리',
              onClick: () =>
                navigate('/mypage/portfolios', { state: { role: userType } }),
            },
            {
              icon: Video,
              label: '숏클립 관리',
              description: '숏클립 업로드 및 관리',
              onClick: () => navigate('/mypage/clips'),
            },
            {
              icon: Mail,
              label: '받은 제안',
              description: '받은 제안 확인',
              onClick: () => console.log('받은 제안 클릭'),
            },
            {
              icon: CreditCard,
              label: '계약 정산',
              description: '계약서 및 정산 내역',
              onClick: () => console.log('계약 정산 클릭'),
            },
          ],
          commonMenu,
        ];
    }
  }, [userType, navigate]);

  return {
    profileData,
    menuItems,
  };
};

