import React from 'react';
import styled from 'styled-components';
import Pagination from '@/presentation/components/list/Pagination';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';
import { EmptyState } from '@/presentation/components/states/EmptyState';
import { CampaignCard } from './CampaignCard';
import type { Campaign } from '@/domain/entities/Campaign';

interface CampaignListContentProps {
  campaigns: Campaign[];
  filteredCampaigns: Campaign[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages?: number;
  isScrapped: (id: string) => boolean;
  onCardClick: (campaignId: string) => void;
  onScrapClick: (campaignId: string, event: React.MouseEvent) => void;
  onPageChange: (page: number) => void;
  onRetry: () => void;
}

export const CampaignListContent: React.FC<CampaignListContentProps> = ({
  campaigns,
  filteredCampaigns,
  loading,
  error,
  currentPage,
  totalPages,
  isScrapped,
  onCardClick,
  onScrapClick,
  onPageChange,
  onRetry,
}) => {
  if (loading && campaigns.length === 0) {
    return (
      <StateWrapper>
        <LoadingState />
      </StateWrapper>
    );
  }

  if (error && campaigns.length === 0) {
    return (
      <StateWrapper>
        <ErrorState message={error} onRetry={onRetry} />
      </StateWrapper>
    );
  }

  if (!loading && filteredCampaigns.length === 0) {
    return (
      <StateWrapper>
        <EmptyState message="등록된 공고가 없습니다." />
      </StateWrapper>
    );
  }

  return (
    <>
      <CardsColumn>
        {filteredCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            isScrapped={isScrapped(campaign.id)}
            onCardClick={() => onCardClick(campaign.id)}
            onScrapClick={(event) => onScrapClick(campaign.id, event)}
          />
        ))}
      </CardsColumn>

      {totalPages && totalPages > 1 && (
        <PaginationWrapper>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </PaginationWrapper>
      )}
    </>
  );
};

const StateWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing['2xl']} 0;
`;

const CardsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const PaginationWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  display: flex;
  justify-content: center;
`;

