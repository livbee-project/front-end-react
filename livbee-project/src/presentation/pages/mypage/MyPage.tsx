import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiArrowRightSLine } from 'react-icons/ri';
import VerticalList from '@/presentation/components/list/VerticalList';
import ListItem from '@/presentation/components/list/ListItem';
import SectionTitle from '@/presentation/components/ui/SectionTitle';
import { useAuth } from '@/presentation/hooks/useAuth';
import { useToast } from '@/presentation/contexts/ToastContext';

const PLACEHOLDER_SUBTITLE = 'P.동해물과 백두산이 마르고 닳도록';

/**
 * 마이페이지 메뉴 아이템 컴포넌트
 */
interface MenuItemProps {
  title: string;
  subtitle?: string;
  onTap?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ title, subtitle, onTap }) => {
  return (
    <ListItem onTap={onTap}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
          <span
            style={{
              fontSize: 'var(--h3)', // 16px
              fontWeight: 400,
              color: 'var(--black)',
            }}
          >
            {title}
          </span>
          {subtitle && (
            <span
              style={{
                fontSize: '12px',
                fontWeight: 400,
                color: 'var(--dark-gray)',
              }}
            >
              {subtitle}
            </span>
          )}
        </div>
        <RiArrowRightSLine
          size={20}
          style={{
            color: 'var(--dark-gray)',
            flexShrink: 0,
            marginLeft: '16px',
          }}
        />
      </div>
    </ListItem>
  );
};


const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { showToast } = useToast();

  /**
   * 로그아웃 핸들러
   */
  const handleLogout = () => {
    logout();
    showToast('로그아웃되었습니다.');
  };

  return (
    <div style={{ padding: '0' }}>
      {/* 공통 섹션 */}
      <div style={{ padding: '16px 16px 16px 16px' }}>
        <SectionTitle variant="subtitle" marginBottom="0">공통</SectionTitle>
      </div>
      <div style={{ padding: '0 16px' }}>
        <VerticalList showDividers={true}>
          <MenuItem
            title="개인정보 관리"
            subtitle={PLACEHOLDER_SUBTITLE}
            onTap={() => console.log('개인정보 관리 클릭')}
          />
          <MenuItem
            title="알림 설정"
            subtitle={PLACEHOLDER_SUBTITLE}
            onTap={() => console.log('알림 설정 클릭')}
          />
          <MenuItem
            title="메시지"
            subtitle={PLACEHOLDER_SUBTITLE}
            onTap={() => console.log('메시지 클릭')}
          />
          <MenuItem
            title="로그아웃"
            onTap={handleLogout}
          />
        </VerticalList>
      </div>

      {/* 브랜드 섹션 */}
      <div style={{ padding: '32px 16px 16px 16px' }}>
        <SectionTitle variant="subtitle" marginBottom="0">브랜드</SectionTitle>
      </div>
      <div style={{ padding: '0 16px' }}>
        <VerticalList showDividers={true}>
          <MenuItem
            title="캠페인 목록"
            subtitle={PLACEHOLDER_SUBTITLE}
            onTap={() => console.log('캠페인 목록 클릭')}
          />
          <MenuItem
            title="지원자 현황"
            subtitle={PLACEHOLDER_SUBTITLE}
            onTap={() => console.log('지원자 현황 클릭')}
          />
          <MenuItem
            title="받은 제안"
            subtitle={PLACEHOLDER_SUBTITLE}
            onTap={() => console.log('받은 제안 클릭')}
          />
          <MenuItem
            title="계약 및 정산"
            subtitle={PLACEHOLDER_SUBTITLE}
            onTap={() => console.log('계약 및 정산 클릭')}
          />
        </VerticalList>
      </div>

      {/* 쇼호스트 & 모델 섹션 */}
      <div style={{ padding: '32px 16px 16px 16px' }}>
        <SectionTitle variant="subtitle" marginBottom="0">쇼호스트 & 모델</SectionTitle>
      </div>
      <div style={{ padding: '0 16px' }}>
        <VerticalList showDividers={true}>
          <MenuItem
            title="내가 지원한 캠페인"
            subtitle={PLACEHOLDER_SUBTITLE}
            onTap={() => console.log('내가 지원한 캠페인 클릭')}
          />
          <MenuItem
            title="쇼호스트 포트폴리오 관리"
            subtitle={PLACEHOLDER_SUBTITLE}
            onTap={() => navigate('/mypage/portfolios')}
          />
          <MenuItem
            title="모델 포트폴리오 관리"
            subtitle={PLACEHOLDER_SUBTITLE}
            onTap={() => console.log('모델 포트폴리오 관리 클릭')}
          />
          <MenuItem
            title="숏클립 관리"
            subtitle={PLACEHOLDER_SUBTITLE}
            onTap={() => navigate('/mypage/clips')}
          />
          <MenuItem
            title="받은 제안"
            subtitle={PLACEHOLDER_SUBTITLE}
            onTap={() => console.log('받은 제안 클릭')}
          />
          <MenuItem
            title="계약 및 정산"
            subtitle={PLACEHOLDER_SUBTITLE}
            onTap={() => console.log('계약 및 정산 클릭')}
          />
        </VerticalList>
      </div>
    </div>
  );
};

export default MyPage;

