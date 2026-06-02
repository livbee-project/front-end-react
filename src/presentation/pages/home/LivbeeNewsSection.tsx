import React from 'react';
import { debug } from '@/shared/utils/logger';
import HomeSection from '@/presentation/pages/home/components/HomeSection';
import { ContentCard } from '@/presentation/components/cards/content/ContentCard';
import { ContentCardGrid } from '@/presentation/components/cards/content/ContentCardGrid';

const newsItems = [
  {
    id: 1,
    title: '라이비, 2025년 상반기 파트너사 모집',
    supplementary: '라이브 뉴스 · 2025.05.20',
    imageUrl:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    title: '새로운 기능 업데이트 안내 (v1.2)',
    supplementary: '라이브 뉴스 · 2025.05.18',
    imageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    title: '2025 라이브커머스 트렌드 리포트',
    supplementary: '라이브 뉴스 · 2025.05.15',
    imageUrl:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 4,
    title: '쇼호스트 성장 프로그램 오픈',
    supplementary: '라이브 뉴스 · 2025.05.10',
    imageUrl:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  },
];

const LivbeeNewsSection: React.FC = () => (
  <HomeSection title="뉴스" onMore={() => debug('LivbeeNewsSection', '뉴스 더보기 클릭')}>
    <ContentCardGrid>
      {newsItems.map((news) => (
        <ContentCard
          key={news.id}
          variant="news"
          imageUrl={news.imageUrl}
          imageAlt={news.title}
          heading={news.title}
          supplementary={news.supplementary}
          onClick={() => debug('LivbeeNewsSection', `뉴스 클릭: ${news.id}`)}
        />
      ))}
    </ContentCardGrid>
  </HomeSection>
);

export default LivbeeNewsSection;
