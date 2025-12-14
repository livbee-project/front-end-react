import { useCallback, useState } from 'react';
import type { FormEvent } from 'react';

export const useListSearch = (initialValue = '') => {
  const [searchInputValue, setSearchInputValue] = useState(initialValue);
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleInputChange = useCallback((value: string) => {
    setSearchInputValue(value);
  }, []);

  const handleSearchSubmit = useCallback(
    (event?: FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      setSearchQuery(searchInputValue.trim());
    },
    [searchInputValue]
  );

  const clearSearch = useCallback(() => {
    setSearchInputValue('');
    setSearchQuery('');
  }, []);

  return {
    searchInputValue,
    setSearchInputValue: handleInputChange,
    searchQuery,
    handleSearchSubmit,
    clearSearch,
  };
};

