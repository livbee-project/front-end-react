import { palette } from '@/presentation/styles/tokens';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const groups = [
  {
    title: '페이지 & 레이아웃',
    items: [
      { label: '홈 상단 네비게이션', path: '/?path=/docs/layouts-topnavlayout--docs', desc: '상단 바 + 탭 구조' },
      { label: 'ListPageLayout', path: '/?path=/docs/layouts-listpagelayout--docs', desc: '목록/필터 기본 틀' },
      { label: 'DetailPageLayout', path: '/?path=/docs/layouts-detailpagelayout--docs', desc: '상세 페이지 영역' },
      { label: 'RegisterPageLayout', path: '/?path=/docs/layouts-registerpagelayout--docs', desc: '등록 폼 패딩/스크롤' },
    ],
  },
  {
    title: '카드 & 콘텐츠',
    items: [
      { label: 'CampaignCard', path: '/?path=/docs/cards-campaigncard--docs', desc: '모집 공고 카드' },
      { label: 'PortfolioCard', path: '/?path=/docs/cards-portfoliocard--docs', desc: '포트폴리오 목록 카드' },
      { label: 'MyPortfolioCard', path: '/?path=/docs/cards-myportfoliocard--docs', desc: '내 포트폴리오 카드' },
      { label: 'HomeCard', path: '/?path=/docs/cards-homecard--docs', desc: '홈 섹션 카드' },
      { label: 'ClipCard', path: '/?path=/docs/cards-clipcard--docs', desc: '숏클립 카드' },
    ],
  },
  {
    title: '폼 & 인터랙션',
    items: [
      { label: 'TextInput', path: '/?path=/docs/forms-textinput--docs', desc: '입력 필드 세트' },
      { label: 'FormField', path: '/?path=/docs/forms-formfield--docs', desc: '레이블/도움말 패턴' },
      { label: 'CampaignApplyModal', path: '/?path=/docs/campaign-detail-campaignapplymodal--docs', desc: '지원 플로우 모달' },
      { label: 'Toast', path: '/?path=/docs/ui-components-toast--docs', desc: '피드백/알림' },
    ],
  },
  {
    title: '디자인 시스템',
    items: [
      { label: 'Theme Tokens', path: '/?path=/docs/design-system-theme--docs', desc: '컬러·간격·브레이크포인트' },
      { label: 'Typography', path: '/?path=/docs/design-system-typography--docs', desc: '텍스트 스케일' },
      { label: 'HomeSectionHeader', path: '/?path=/docs/sections-homesectionheader--docs', desc: '섹션 헤더' },
    ],
  },
];

// 시스템 흐름도 컴포넌트 (일반인용)
const SystemFlowDiagram: React.FC = () => {
  const screenBox: React.CSSProperties = {
    padding: '20px 24px',
    borderRadius: 12,
    border: '2px solid',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 600,
    minWidth: 140,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  };

  const arrow: React.CSSProperties = {
    fontSize: 24,
    color: 'palette.primary',
    fontWeight: 'bold',
    margin: '0 12px',
  };

  const featureCard: React.CSSProperties = {
    padding: '20px',
    borderRadius: 12,
    border: '2px solid',
    backgroundColor: 'palette.surface',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  };

  return (
    <div
      style={{
        backgroundColor: 'palette.surface',
        border: '1px solid #e0e0e0',
        borderRadius: 16,
        padding: '40px',
        overflowX: 'auto',
      }}
    >
      {/* 메인 화면 구조 */}
      <div style={{ marginBottom: 48 }}>
        <h3 style={{ marginBottom: 24, fontSize: 20, fontWeight: 700, color: 'palette.text' }}>
          📱 앱의 주요 화면
        </h3>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 16,
            padding: '24px',
            backgroundColor: 'palette.background',
            borderRadius: 12,
          }}
        >
          <div
            style={{
              ...screenBox,
              backgroundColor: 'palette.surface',
              borderColor: 'palette.primary',
              color: 'palette.text',
            }}
          >
            🏠 홈
          </div>
          <span style={arrow}>→</span>
          <div
            style={{
              ...screenBox,
              backgroundColor: 'palette.surface',
              borderColor: '#0ea5e9',
              color: 'palette.text',
            }}
          >
            📋 모집공고
          </div>
          <span style={arrow}>→</span>
          <div
            style={{
              ...screenBox,
              backgroundColor: 'palette.surface',
              borderColor: '#10b981',
              color: 'palette.text',
            }}
          >
            👤 모델
          </div>
          <span style={arrow}>→</span>
          <div
            style={{
              ...screenBox,
              backgroundColor: 'palette.surface',
              borderColor: '#f59e0b',
              color: 'palette.text',
            }}
          >
            🎨 포트폴리오
          </div>
          <span style={arrow}>→</span>
          <div
            style={{
              ...screenBox,
              backgroundColor: 'palette.surface',
              borderColor: '#ef4444',
              color: 'palette.text',
            }}
          >
            👤 마이페이지
          </div>
        </div>
        <div style={{ marginTop: 16, fontSize: 14, color: 'palette.subText', textAlign: 'center' }}>
          하단 네비게이션 바를 통해 언제든지 이동 가능
        </div>
      </div>

      {/* 사용자 여정 */}
      <div style={{ marginBottom: 48 }}>
        <h3 style={{ marginBottom: 24, fontSize: 20, fontWeight: 700, color: 'palette.text' }}>
          🎯 주요 사용 흐름
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* 흐름 1 */}
          <div
            style={{
              padding: '24px',
              backgroundColor: 'palette.background',
              borderRadius: 12,
              border: '1px solid palette.primary',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: 'palette.text' }}>
              1️⃣ 모집공고 찾기 & 지원하기
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 12,
                marginTop: 16,
              }}
            >
              <div style={{ ...featureCard, borderColor: 'palette.primary' }}>모집공고 목록</div>
              <span style={arrow}>→</span>
              <div style={{ ...featureCard, borderColor: 'palette.primary' }}>상세 정보 보기</div>
              <span style={arrow}>→</span>
              <div style={{ ...featureCard, borderColor: 'palette.primary' }}>지원하기</div>
              <span style={arrow}>→</span>
              <div style={{ ...featureCard, borderColor: 'palette.primary' }}>채팅으로 소통</div>
            </div>
          </div>

          {/* 흐름 2 */}
          <div
            style={{
              padding: '24px',
              backgroundColor: '#F0F9FF',
              borderRadius: 12,
              border: '1px solid #0ea5e9',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: 'palette.text' }}>
              2️⃣ 모델 프로필 등록하기
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 12,
                marginTop: 16,
              }}
            >
              <div style={{ ...featureCard, borderColor: '#0ea5e9' }}>로그인</div>
              <span style={arrow}>→</span>
              <div style={{ ...featureCard, borderColor: '#0ea5e9' }}>모델 등록</div>
              <span style={arrow}>→</span>
              <div style={{ ...featureCard, borderColor: '#0ea5e9' }}>포트폴리오 업로드</div>
              <span style={arrow}>→</span>
              <div style={{ ...featureCard, borderColor: '#0ea5e9' }}>프로필 완성</div>
            </div>
          </div>

          {/* 흐름 3 */}
          <div
            style={{
              padding: '24px',
              backgroundColor: '#F0FDF4',
              borderRadius: 12,
              border: '1px solid #10b981',
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: 'palette.text' }}>
              3️⃣ 포트폴리오 관리하기
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: 12,
                marginTop: 16,
              }}
            >
              <div style={{ ...featureCard, borderColor: '#10b981' }}>포트폴리오 목록</div>
              <span style={arrow}>→</span>
              <div style={{ ...featureCard, borderColor: '#10b981' }}>새 포트폴리오 등록</div>
              <span style={arrow}>→</span>
              <div style={{ ...featureCard, borderColor: '#10b981' }}>이미지 업로드</div>
              <span style={arrow}>→</span>
              <div style={{ ...featureCard, borderColor: '#10b981' }}>공개/수정</div>
            </div>
          </div>
        </div>
      </div>

      {/* 주요 기능 */}
      <div>
        <h3 style={{ marginBottom: 24, fontSize: 20, fontWeight: 700, color: 'palette.text' }}>
          ⭐ 주요 기능
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 16,
          }}
        >
          {[
            { icon: '📋', name: '모집공고', desc: '브랜드가 모델을 모집하는 공고를 확인하고 지원할 수 있어요', color: 'palette.primary' },
            { icon: '👤', name: '모델 프로필', desc: '모델 정보를 등록하고 관리할 수 있어요', color: '#0ea5e9' },
            { icon: '🎨', name: '포트폴리오', desc: '작업 사진과 경력을 포트폴리오로 관리해요', color: '#10b981' },
            { icon: '💬', name: '실시간 채팅', desc: '지원 후 브랜드와 실시간으로 소통할 수 있어요', color: '#f59e0b' },
            { icon: '🔐', name: '로그인/회원가입', desc: '안전하게 계정을 만들고 로그인할 수 있어요', color: '#ef4444' },
            { icon: '📸', name: '이미지 관리', desc: '사진을 업로드하고 편집할 수 있어요', color: '#8b5cf6' },
          ].map((feature) => (
            <div
              key={feature.name}
              style={{
                ...featureCard,
                borderColor: feature.color,
                padding: '24px 20px',
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{feature.icon}</div>
              <div style={{ fontWeight: 700, color: feature.color, marginBottom: 8, fontSize: 16 }}>
                {feature.name}
              </div>
              <div style={{ fontSize: 13, color: 'palette.subText', lineHeight: 1.5 }}>
                {feature.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const OverviewDoc = () => (
  <div style={{ padding: '40px 24px', maxWidth: 1200, margin: '0 auto', fontSize: 16, lineHeight: 1.6 }}>
    <h1 style={{ marginBottom: 8 }}>LIVBEE Front-End UI/UX Overview</h1>
    <p style={{ marginTop: 0, color: '#5f6368' }}>Storybook documentation for product review, onboarding, and portfolio sharing.</p>

    <section style={{ marginTop: 48, marginBottom: 48 }}>
      <h2 style={{ marginBottom: 24, fontSize: 24, fontWeight: 600 }}>시스템 흐름도 (System Flow Diagram)</h2>
      <SystemFlowDiagram />
    </section>

    <section style={{ marginTop: 32 }}>
      <h2>콘텐츠 맵</h2>
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        {groups.map((group) => (
          <article key={group.title} style={{ border: '1px solid rgba(0,0,0,0.08)', borderRadius: 12, padding: 16 }}>
            <h3 style={{ marginTop: 0 }}>{group.title}</h3>
            <ul style={{ listStyle: 'disc', paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {group.items.map((item) => (
                <li key={item.label}>
                  <a href={item.path}>{item.label}</a> — {item.desc}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>

    <section style={{ marginTop: 32 }}>
      <h2>화면 흐름</h2>
      <ol>
        <li>
          <strong>홈:</strong> TopNavLayout → HomeSectionHeader → 카드 (CampaignCard / PortfolioRowCard / ProductCard)
        </li>
        <li>
          <strong>목록:</strong> ListPageLayout + 검색/필터(CampaignSearchSection, SearchInput, Filters)
        </li>
        <li>
          <strong>상세 & 지원:</strong> DetailPageLayout → DetailSection → CampaignApplyModal
        </li>
        <li>
          <strong>등록/폼:</strong> RegisterPageLayout → FormField + 입력 컴포넌트 → 제출
        </li>
      </ol>
    </section>

    <section style={{ marginTop: 32 }}>
      <h2>스토리 작성 & 탐색 가이드</h2>
      <ul>
        <li>ThemeProvider + GlobalStyle이 모든 스토리에 적용되어 실제 UI와 동일한 상태를 보여줍니다.</li>
        <li>Default / Variations / States 구조로 대표 케이스와 엣지 케이스를 문서화했습니다.</li>
        <li>새 컴포넌트 스토리에는 argTypes를 정의해 조작 가능한 API 문서를 제공합니다.</li>
        <li>dev 브랜치를 푸시하면 자동으로 dev-sb.livbee.co.kr에 반영됩니다.</li>
      </ul>
    </section>

    <section style={{ marginTop: 32 }}>
      <h2>Next steps</h2>
      <p>홈 섹션과 실제 페이지 스토리를 연결한 시나리오 문서를 추가로 준비 중입니다. PT나 포트폴리오 발표 시 이 페이지를 시작 화면으로 사용하세요.</p>
    </section>
  </div>
);

const meta: Meta<typeof OverviewDoc> = {
  title: 'Overview/Introduction',
  component: OverviewDoc,
  parameters: {
    layout: 'fullscreen',
    viewMode: 'docs',
    docs: {
      page: OverviewDoc,
    },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof OverviewDoc>;

export const Introduction: Story = {};

