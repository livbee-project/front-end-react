import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import React from 'react';
import { CampaignInfoSection } from '../CampaignInfoSection';

describe('CampaignInfoSection', () => {
  it('캠페인 정보와 자격 요건을 렌더링한다', () => {
    render(
      <CampaignInfoSection
        campaignIntro="테스트 소개"
        qualifications={['조건 A', '조건 B']}
        location="서울"
        shootDate="2024-01-01"
        shootTime="10:00-12:00"
        deadline="2023-12-28"
        fee="300만원"
        productInfo="테스트 상품"
      />
    );

    expect(screen.getByText('테스트 소개')).toBeInTheDocument();
    expect(screen.getByText('조건 A')).toBeInTheDocument();
    expect(screen.getByText('서울')).toBeInTheDocument();
    expect(screen.getByText('300만원')).toBeInTheDocument();
  });
});

