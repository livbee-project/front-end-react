import { useState, useMemo } from 'react';

interface FilterableModel {
  id: string;
  nickname?: string | null;
  oneLineIntro?: string | null;
  concept?: string | null;
  categories?: string[] | null;
}

interface UseModelFilterOptions<T extends FilterableModel> {
  models: T[];
  filters: string[];
  initialFilter?: string;
}

export const useModelFilter = <T extends FilterableModel>({
  models,
  filters,
  initialFilter = '전체',
}: UseModelFilterOptions<T>) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      if (selectedFilter !== '전체') {
        if (model.concept && model.concept !== selectedFilter) {
          return false;
        }
      }

      if (searchQuery) {
        const nickname = (model.nickname ?? '').toLowerCase();
        const intro = (model.oneLineIntro ?? '').toLowerCase();
        const query = searchQuery.toLowerCase();

        if (!nickname.includes(query) && !intro.includes(query)) {
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

