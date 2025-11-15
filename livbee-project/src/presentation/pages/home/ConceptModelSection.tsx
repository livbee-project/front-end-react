import React from 'react';
import { useNavigate } from 'react-router-dom';
import SectionContainer from '@/presentation/components/section/SectionContainer';
import PortraitCard from '@/presentation/components/cards/PortraitCard';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { EmptyState } from '@/presentation/components/states/EmptyState';
import { SPACING } from '@/presentation/styles/constants';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import type { Model } from '@/domain/entities/Model';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useListData } from '@/presentation/hooks/useListData';
import '@/presentation/styles/global.css';

/**
 * "컨셉에 맞는 모델찾기" 섹션 컴포넌트
 * Flutter 원본을 기반으로 함
 */
const ConceptModelSection: React.FC = () => {
  const navigate = useNavigate();

  // modelRepository를 useRepository 훅으로 관리
  const modelRepository = useRepository(ModelRepository);

  // 목록 데이터 조회
  const { data: models, loading: isLoading } = useListData<Model, { page: number; limit: number }, { items: Model[] }>(
    (query, signal) => modelRepository.getModelList(query, signal),
    {
      page: 1,
      limit: 10, // 홈 페이지에서는 최대 10개 표시 (가로 스크롤)
    },
    [],
    '모델 목록을 불러오는 중 오류가 발생했습니다.'
  );

  // 로딩 중
  if (isLoading) {
    return (
      <SectionContainer
        title="컨셉에 맞는 모델 찾기"
        onMorePressed={() => navigate('/models')}
      >
        <LoadingState />
      </SectionContainer>
    );
  }

  return (
    <SectionContainer
      title="컨셉에 맞는 모델 찾기"
      onMorePressed={() => navigate('/models')}
    >
      {models.length === 0 ? (
        <EmptyState message="데이터가 없습니다." />
      ) : (
        <div
          className="hide-scrollbar"
          style={{
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden',
            height: 488, // Flutter 원본 높이
            gap: 10, // Flutter 원본(separatorBuilder)
            padding: `0 ${SPACING.SM}`, // Flutter 원본(padding)
          }}
        >
          {/* PortraitCard 렌더링 */}
          {models.map((model) => (
            <PortraitCard
              key={model.id}
              title={model.nickname || '이름 없음'}
              content={model.oneLineIntro || '소개 없음'}
              imageUrl={model.mainThumbnailUrl || undefined}
              onPress={() => navigate(`/models/${model.id}`)}
            />
          ))}
        </div>
      )}
    </SectionContainer>
  );
};

export default ConceptModelSection;