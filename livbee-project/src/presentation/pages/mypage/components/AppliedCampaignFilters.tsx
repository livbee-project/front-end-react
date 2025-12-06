import React from 'react';
import { FilterButton, FilterSection } from '@/presentation/pages/mypage/styled/MyAppliedCampaignsStyles';

interface AppliedCampaignFiltersProps {
  filters: string[];
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const AppliedCampaignFilters: React.FC<AppliedCampaignFiltersProps> = ({
  filters,
  selectedFilter,
  onFilterChange,
}) => {
  return (
    <FilterSection>
      {filters.map((filter) => (
        <FilterButton key={filter} $active={selectedFilter === filter} onClick={() => onFilterChange(filter)}>
          {filter}
        </FilterButton>
      ))}
    </FilterSection>
  );
};

export default AppliedCampaignFilters;

