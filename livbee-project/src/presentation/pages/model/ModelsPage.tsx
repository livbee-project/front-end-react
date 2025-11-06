import React, { useState } from 'react';
import SearchInput from '@/presentation/components/SearchInput';
import PortraitCard from '@/presentation/components/PortraitCard';

/**
 * 리스트 렌더링을 위한 임시 목업 데이터
 */
const MOCK_MODELS = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `모델이름 ${i + 1}`,
  content: `한줄소개한줄소개한줄소개... ${i + 1}`,
}));

const ModelsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (query: string) => {
    console.log('검색 실행:', query);
    // TODO: 추후 ViewModel(데이터 관리 로직)과 연결
  };

  return (
    <div style={{ padding: '16px 0' }}>
      <div style={{ padding: '0 10px' }}>
        <SearchInput
          placeholder="모델명·소개로 검색"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearchSubmit={handleSearchSubmit}
        />

        <p
          style={{
            marginBlockStart: '40px',
            marginBlockEnd: 0,
            fontSize: '12px',
            color: 'var(--dark-gray)',
            marginBottom: '20px',
          }}
        >
          카드를 누르면 상세 정보를 보실 수 있습니다.
        </p>
      </div>

      {/* 모델 리스트 - 2열 그리드 구조 */}
      <div
        style={{
          padding: '0 10px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', // minmax로 오버플로우 방지
            gap: '0 30px', // 열 사이 간격 30px
            width: '100%',
            boxSizing: 'border-box',
            minWidth: 0, // 오버플로우 방지
          }}
        >
          {MOCK_MODELS.map((model) => (
            <div
              key={model.id}
              style={{
                width: '100%',
                minWidth: 0, // 오버플로우 방지
                marginBottom: '20px',
                boxSizing: 'border-box',
              }}
            >
              <PortraitCard
                title={model.name}
                content={model.content}
                width="100%"
                onPress={() => console.log(`Model ${model.id} 클릭`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelsPage;

