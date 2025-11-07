import React from 'react';
import { useNavigate } from 'react-router-dom';
import PortraitCard from '@/presentation/components/cards/PortraitCard';
import ListPageLayout from '@/presentation/layouts/ListPageLayout';

/**
 * 리스트 렌더링을 위한 임시 목업 데이터
 */
const MOCK_MODELS = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `모델이름 ${i + 1}`,
  content: `한줄소개한줄소개한줄소개... ${i + 1}`,
}));

const ModelsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ListPageLayout
      searchPlaceholder="모델명·소개로 검색"
      floatingActionButtonPath="/models/register"
      pageStyle={{ padding: '16px 0' }}
    >
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
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '0 30px',
            width: '100%',
            boxSizing: 'border-box',
            minWidth: 0,
          }}
        >
          {MOCK_MODELS.map((model) => (
            <div
              key={model.id}
              style={{
                width: '100%',
                minWidth: 0,
                marginBottom: '20px',
                boxSizing: 'border-box',
              }}
            >
              <PortraitCard
                title={model.name}
                content={model.content}
                width="100%"
                onPress={() => navigate(`/models/${model.id}`)}
              />
            </div>
          ))}
        </div>
      </div>
    </ListPageLayout>
  );
};

export default ModelsPage;

