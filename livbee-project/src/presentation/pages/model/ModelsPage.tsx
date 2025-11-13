import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PortraitCard from '@/presentation/components/cards/PortraitCard';
import ListPageLayout from '@/presentation/layouts/ListPageLayout';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import type { Model } from '@/domain/entities/Model';

const ModelsPage: React.FC = () => {
  const navigate = useNavigate();
  const [models, setModels] = useState<Model[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [_totalPages, setTotalPages] = useState<number>(1);

  // modelRepository를 useRef로 관리하여 매 렌더링마다 재생성되지 않도록 함
  const modelRepositoryRef = useRef<ModelRepository | null>(null);
  if (!modelRepositoryRef.current) {
    modelRepositoryRef.current = new ModelRepository();
  }
  const modelRepository = modelRepositoryRef.current;

  /**
   * 초기 로드 및 페이지 변경 시 데이터 조회
   */
  useEffect(() => {
    const abortController = new AbortController();
    let isCancelled = false;

    const loadData = async () => {
      try {
        if (!isCancelled) {
          setLoading(true);
          setError(null);
        }

        const response = await modelRepository.getModelList(
          {
            page: currentPage,
            limit: 20, // 페이지당 20개 항목
          },
          abortController.signal
        );

        if (!isCancelled && !abortController.signal.aborted) {
          setModels(response.items);
          setCurrentPage(response.currentPage || currentPage);
          setTotalPages(response.totalPages || 1);
        }
      } catch (err) {
        // AbortError는 무시 (요청이 취소된 경우)
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        if (!isCancelled && !abortController.signal.aborted) {
          console.error('모델 목록 조회 실패:', err);
          setError('모델 목록을 불러오는 중 오류가 발생했습니다.');
          setModels([]);
        }
      } finally {
        if (!isCancelled && !abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadData();

    // cleanup 함수: 컴포넌트가 언마운트되거나 currentPage가 변경되면 이전 요청을 취소
    return () => {
      isCancelled = true;
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]); // modelRepository는 ref로 관리되므로 의존성 배열에서 제외

  // 로딩 중
  if (loading) {
    return (
      <ListPageLayout
        searchPlaceholder="모델명·소개로 검색"
        floatingActionButtonPath="/models/register"
        pageStyle={{ padding: '16px 0' }}
      >
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>로딩 중...</p>
        </div>
      </ListPageLayout>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <ListPageLayout
        searchPlaceholder="모델명·소개로 검색"
        floatingActionButtonPath="/models/register"
        pageStyle={{ padding: '16px 0' }}
      >
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p style={{ color: 'var(--error)' }}>{error}</p>
        </div>
      </ListPageLayout>
    );
  }

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

