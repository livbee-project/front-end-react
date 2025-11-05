import React, { useState } from 'react';
import SearchInput from '@/presentation/components/SearchInput';

const CampaignsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (query: string) => {
    console.log('검색 실행:', query);
    // TODO: 추후 ViewModel(데이터 관리 로직)과 연결
  };

  return (
    <div style={{ padding: '16px' }}>
      <SearchInput
        placeholder="제목·내용·브랜드로 검색"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* --- (추가) 안내 텍스트 --- */}
      {/*
        Flutter 원본의 안내 문구와
        요청하신 40px 상단 여백을 적용합니다.
      */}
      {/* --- (수정) 안내 텍스트 --- */}
      <p
        style={{
          // (제거) marginTop: '40px',

          // (수정) marginBlockStart를 0이 아닌 '40px'로 설정
          marginBlockStart: '40px',

          // (유지) <p> 태그의 하단 마진은 0으로 유지
          marginBlockEnd: 0,

          // (유지) 텍스트 스타일
          fontSize: '12px',
          color: 'var(--dark-gray)',
        }}
      >
        카드를 누르면 상세 정보를 보실 수 있습니다.
      </p>

      {/*
        TODO: 추후 이 아래에 공고 카드 리스트가 렌더링될 예정입니다.
      */}
    </div>
  );
};

export default CampaignsPage;
