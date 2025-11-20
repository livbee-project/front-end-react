import { useCallback, useState } from 'react';

export const useListFilters = <T>(initialFilter: T) => {
  const [activeFilter, setActiveFilter] = useState<T>(initialFilter);

  const handleFilterChange = useCallback((value: T) => {
    setActiveFilter(value);
  }, []);

  const resetFilter = useCallback(() => {
    setActiveFilter(initialFilter);
  }, [initialFilter]);

  return {
    activeFilter,
    setActiveFilter: handleFilterChange,
    resetFilter,
  };
};

