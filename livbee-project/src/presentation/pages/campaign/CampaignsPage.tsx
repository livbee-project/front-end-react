import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import CampaignCard from '@/presentation/components/cards/CampaignCard';
import VerticalList from '@/presentation/components/list/VerticalList';
import ListItem from '@/presentation/components/list/ListItem';
import ListPageLayout from '@/presentation/layouts/ListPageLayout';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import type { Campaign } from '@/domain/entities/Campaign';

const CampaignsPage: React.FC = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [_totalItems, setTotalItems] = useState<number>(0);

  // campaignRepository를 useRef로 관리하여 매 렌더링마다 재생성되지 않도록 함
  const campaignRepositoryRef = useRef<CampaignRepository | null>(null);
  if (!campaignRepositoryRef.current) {
    campaignRepositoryRef.current = new CampaignRepository();
  }
  const campaignRepository = campaignRepositoryRef.current;

  /**
   * 초기 로드 및 페이지 변경 시 데이터 조회
   */
  useEffect(() => {
    let isCancelled = false;

    const loadData = async () => {
      try {
        if (!isCancelled) {
          setLoading(true);
          setError(null);
        }

        const response = await campaignRepository.getCampaignList({
          page: currentPage,
          limit: 20, // 페이지당 20개 항목
          search: searchQuery || undefined,
          sort: 'latest', // 기본값: 최신순
        });

        if (!isCancelled) {
          setCampaigns(response.items);
          setCurrentPage(response.currentPage);
          setTotalPages(response.totalPages);
          setTotalItems(response.totalItems);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('캠페인 목록 조회 실패:', err);
          setError('캠페인 목록을 불러오는 중 오류가 발생했습니다.');
          setCampaigns([]);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadData();

    // cleanup 함수: 컴포넌트가 언마운트되거나 currentPage/searchQuery가 변경되면 이전 요청을 취소
    return () => {
      isCancelled = true;
    };
  }, [currentPage, searchQuery, campaignRepository]);

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
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>로딩 중...</p>
        </div>
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
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p style={{ color: 'red' }}>{error}</p>
          <button
            onClick={() => {
              setCurrentPage(1);
              setSearchQuery('');
            }}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              cursor: 'pointer',
            }}
          >
            다시 시도
          </button>
        </div>
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
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>등록된 공고가 없습니다.</p>
        </div>
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

          {/* 페이지네이션 (향후 개선 예정) */}
          {totalPages > 1 && (
            <div
              style={{
                padding: '20px',
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: '8px 16px',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  opacity: currentPage === 1 ? 0.5 : 1,
                }}
              >
                이전
              </button>
              <span style={{ padding: '8px 16px' }}>
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                style={{
                  padding: '8px 16px',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  opacity: currentPage === totalPages ? 0.5 : 1,
                }}
              >
                다음
              </button>
            </div>
          )}
        </>
      )}
    </ListPageLayout>
  );
};

export default CampaignsPage;
