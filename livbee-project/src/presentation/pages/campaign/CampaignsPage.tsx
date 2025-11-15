import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignCard from '@/presentation/components/cards/CampaignCard';
import VerticalList from '@/presentation/components/list/VerticalList';
import ListItem from '@/presentation/components/list/ListItem';
import ListPageLayout from '@/presentation/layouts/ListPageLayout';
import Pagination from '@/presentation/components/list/Pagination';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';
import { EmptyState } from '@/presentation/components/states/EmptyState';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { Campaign } from '@/domain/entities/Campaign';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useListData } from '@/presentation/hooks/useListData';

const CampaignsPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  // campaignRepository를 useRepository 훅으로 관리
  const campaignRepository = useRepository(CampaignRepository);

  // 목록 데이터 조회
  const { data: campaigns, loading, error, totalPages } = useListData<Campaign, { page: number; limit: number; search?: string; sort?: 'latest' | 'deadline' }, { items: Campaign[]; currentPage?: number; totalPages?: number; totalItems?: number }>(
    (query, signal) => campaignRepository.getCampaignList(query, signal),
    {
      page: currentPage,
      limit: 20,
      search: searchQuery || undefined,
      sort: 'latest' as const,
    },
    [currentPage, searchQuery],
    '캠페인 목록을 불러오는 중 오류가 발생했습니다.'
  );

  /**
   * 검색 실행 핸들러
   */
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // 검색 시 첫 페이지로 리셋 (useEffect가 자동으로 호출됨)
  };

  /**
   * 로딩 상태 표시
   */
  if (loading && campaigns.length === 0) {
    return (
      <ListPageLayout
        searchPlaceholder="제목·내용·브랜드로 검색"
        floatingActionButtonPath="/campaigns/register"
        onSearch={handleSearch}
      >
        <LoadingState />
      </ListPageLayout>
    );
  }

  /**
   * 에러 상태 표시
   */
  if (error && campaigns.length === 0) {
    return (
      <ListPageLayout
        searchPlaceholder="제목·내용·브랜드로 검색"
        floatingActionButtonPath="/campaigns/register"
        onSearch={handleSearch}
      >
        <ErrorState
          message={error}
          onRetry={() => {
            setCurrentPage(1);
            setSearchQuery('');
          }}
        />
      </ListPageLayout>
    );
  }

  return (
    <ListPageLayout
      searchPlaceholder="제목·내용·브랜드로 검색"
      floatingActionButtonPath="/campaigns/register"
      onSearch={handleSearch}
    >
      {/* 모집 공고 리스트 */}
      {campaigns.length === 0 ? (
        <EmptyState message="등록된 공고가 없습니다." />
      ) : (
        <>
          <VerticalList showDividers={false}>
            {campaigns.map((campaign) => (
              <ListItem
                key={campaign.id}
                onTap={() => navigate(`/campaigns/${campaign.id}`)}
                style={{ borderBottom: 'none' }}
              >
                <CampaignCard
                  brandName={campaign.brandName}
                  title={campaign.title}
                  content={campaign.content}
                />
              </ListItem>
            ))}
          </VerticalList>

          {/* 페이지네이션 */}
          {totalPages && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </>
      )}
    </ListPageLayout>
  );
};

export default CampaignsPage;
