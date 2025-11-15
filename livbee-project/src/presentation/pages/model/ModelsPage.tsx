import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PortraitCard from '@/presentation/components/cards/PortraitCard';
import ListPageLayout from '@/presentation/layouts/ListPageLayout';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import type { Model } from '@/domain/entities/Model';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useListData } from '@/presentation/hooks/useListData';

const ModelsPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage] = useState<number>(1);

  // modelRepository를 useRepository 훅으로 관리
  const modelRepository = useRepository(ModelRepository);

  // 목록 데이터 조회
  const { data: models, loading, error } = useListData<Model, { page: number; limit: number }, { items: Model[]; currentPage?: number; totalPages?: number }>(
    (query, signal) => modelRepository.getModelList(query, signal),
    { page: currentPage, limit: 20 },
    [currentPage],
    '모델 목록을 불러오는 중 오류가 발생했습니다.'
  );

  // 로딩 중
  if (loading) {
    return (
      <ListPageLayout
        searchPlaceholder="모델명·소개로 검색"
        floatingActionButtonPath="/models/register"
      >
        <LoadingState />
      </ListPageLayout>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <ListPageLayout
        searchPlaceholder="모델명·소개로 검색"
        floatingActionButtonPath="/models/register"
      >
        <ErrorState message={error} />
      </ListPageLayout>
    );
  }

  return (
    <ListPageLayout
      searchPlaceholder="모델명·소개로 검색"
      floatingActionButtonPath="/models/register"
    >
      {/* 모델 리스트 - 2열 그리드 구조 */}
      <div
        style={{
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
          {models.map((model) => (
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
                title={model.nickname || '이름 없음'}
                content={model.oneLineIntro || '소개 없음'}
                imageUrl={model.mainThumbnailUrl || undefined}
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

