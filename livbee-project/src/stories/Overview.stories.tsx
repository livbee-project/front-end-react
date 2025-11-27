import type { Meta, StoryObj } from '@storybook/react';

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
      { label: 'CampaignApplyModal', path: '/?path=/docs/detail-campaignapplymodal--docs', desc: '지원 플로우 모달' },
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

const OverviewDoc = () => (
  <div style={{ padding: '40px 24px', maxWidth: 1200, margin: '0 auto', fontSize: 16, lineHeight: 1.6 }}>
    <h1 style={{ marginBottom: 8 }}>LIVBEE Front-End UI/UX Overview</h1>
    <p style={{ marginTop: 0, color: '#5f6368' }}>Storybook documentation for product review, onboarding, and portfolio sharing.</p>

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

