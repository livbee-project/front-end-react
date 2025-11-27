import { useState, useMemo } from 'react';

interface Model {
  id: string;
  nickname?: string;
  oneLineIntro?: string;
  concept?: string | null;
  categories?: string[];
}

interface UseModelFilterOptions {
  models: Model[];
  filters: string[];
  initialFilter?: string;
}

export const useModelFilter = ({ models, filters, initialFilter = '전체' }: UseModelFilterOptions) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      // 필터링
      if (selectedFilter !== '전체') {
        // concept가 없으면 필터링에서 제외 (모든 필터에 표시)
        if (!model.concept) {
          return true;
        }
        if (model.concept !== selectedFilter) {
          return false;
        }
      }
      
      // 검색
      if (searchQuery && model.nickname && model.oneLineIntro) {
        const query = searchQuery.toLowerCase();
        if (
          !model.nickname.toLowerCase().includes(query) &&
          !model.oneLineIntro.toLowerCase().includes(query)
        ) {
          return false;
        }
      }
      
      return true;
    });
  }, [models, selectedFilter, searchQuery]);

  return {
    selectedFilter,
    setSelectedFilter,
    searchQuery,
    setSearchQuery,
    filteredModels,
    filters,
  };
};

