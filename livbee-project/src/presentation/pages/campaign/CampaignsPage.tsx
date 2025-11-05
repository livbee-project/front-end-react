import React, { useState } from 'react';
import SearchInput from '@/presentation/components/SearchInput';

const CampaignsPage: React.FC = () => {
  // (추가) SearchInput의 값을 제어하기 위한 React State
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * (추가) SearchInput에서 Enter 키를 누르거나 검색을 실행할 때 호출될 함수
   */
  const handleSearchSubmit = (query: string) => {
    console.log('검색 실행:', query);
    // TODO: 추후 ViewModel(데이터 관리 로직)과 연결
  };

  return (
    /*
      (수정) Flutter 원본의 ListHeaderSection이
      가지고 있던 'padding: const EdgeInsets.all(16.0)'을 적용합니다.
    */
    <div style={{ padding: '16px' }}>
      {/*
        (수정) 기존 <h1>, <p> 태그 대신
        SearchInput 컴포넌트를 렌더링합니다.
      */}
      <SearchInput
        // Flutter 원본의 searchHintText를 적용
        placeholder="제목·내용·브랜드로 검색"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSearchSubmit={handleSearchSubmit}
      />

      {/*
        TODO: 추후 이 아래에 정렬 드롭다운, 총 N건,
        그리고 공고 카드 리스트가 렌더링될 예정입니다.
      */}
    </div>
  );
};

export default CampaignsPage;