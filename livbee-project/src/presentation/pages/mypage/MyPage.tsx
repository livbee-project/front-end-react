import React from 'react';
import { RiArrowRightSLine } from 'react-icons/ri';
import VerticalList from '@/presentation/components/VerticalList';
import ListItem from '@/presentation/components/ListItem';

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

/**
 * 섹션 제목 컴포넌트
 */
interface SectionTitleProps {
  title: string;
  isFirst?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, isFirst = false }) => {
  return (
    <h2
      style={{
        fontSize: 'var(--h3)', // 16px
        fontWeight: 500,
        color: 'var(--dark-gray)',
        margin: 0,
        padding: isFirst ? '16px 16px 16px 16px' : '32px 16px 16px 16px',
      }}
    >
      {title}
    </h2>
  );
};

const MyPage: React.FC = () => {
  return (
    <div style={{ padding: '0' }}>
      {/* 공통 섹션 */}
      <SectionTitle title="공통" isFirst={true} />
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
            onTap={() => console.log('로그아웃 클릭')}
          />
        </VerticalList>
      </div>

      {/* 브랜드 섹션 */}
      <SectionTitle title="브랜드" />
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
      <SectionTitle title="쇼호스트 & 모델" />
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
            onTap={() => console.log('쇼호스트 포트폴리오 관리 클릭')}
          />
          <MenuItem
            title="모델 포트폴리오 관리"
            subtitle={PLACEHOLDER_SUBTITLE}
            onTap={() => console.log('모델 포트폴리오 관리 클릭')}
          />
          <MenuItem
            title="숏클립 관리"
            subtitle={PLACEHOLDER_SUBTITLE}
            onTap={() => console.log('숏클립 관리 클릭')}
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

