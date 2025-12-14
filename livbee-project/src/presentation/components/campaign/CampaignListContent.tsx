import React from 'react';
import styled from 'styled-components';
import Pagination from '@/presentation/components/list/Pagination';
import { ListStatePlaceholder } from '@/presentation/components/list/ListStatePlaceholder';
import { CampaignCard } from '@/presentation/components/campaign/CampaignCard';
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
  return (
    <ListStatePlaceholder
      data={campaigns}
      loading={loading}
      error={error}
      onRetry={onRetry}
      emptyMessage="등록된 공고가 없습니다."
      showEmptyState={filteredCampaigns.length === 0}
    >
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
    </ListStatePlaceholder>
  );
};

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

