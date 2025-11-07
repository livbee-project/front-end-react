import { useState } from 'react';

/**
 * useSearch 훅의 반환 타입
 */
interface UseSearchReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearchSubmit: (query: string) => void;
}

/**
 * 검색 기능을 위한 커스텀 훅입니다.
 * 검색어 상태 관리와 검색 실행 로직을 제공합니다.
 */
const useSearch = (onSearch?: (query: string) => void): UseSearchReturn => {
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * 검색 실행 핸들러
   */
  const handleSearchSubmit = (query: string) => {
    console.log('검색 실행:', query);
    if (onSearch) {
      onSearch(query);
    }
    // TODO: 추후 ViewModel(데이터 관리 로직)과 연결
  };

  return {
    searchQuery,
    setSearchQuery,
    handleSearchSubmit,
  };
};

export default useSearch;

