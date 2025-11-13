import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionContainer from '@/presentation/components/section/SectionContainer';
import PortraitCard from '@/presentation/components/cards/PortraitCard';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import type { Model } from '@/domain/entities/Model';
import '@/presentation/styles/global.css';

/**
 * "컨셉에 맞는 모델찾기" 섹션 컴포넌트
 * Flutter 원본을 기반으로 함
 */
const ConceptModelSection: React.FC = () => {
  const navigate = useNavigate();
  const [models, setModels] = useState<Model[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // modelRepository를 useRef로 관리하여 매 렌더링마다 재생성되지 않도록 함
  const modelRepositoryRef = useRef<ModelRepository | null>(null);
  if (!modelRepositoryRef.current) {
    modelRepositoryRef.current = new ModelRepository();
  }
  const modelRepository = modelRepositoryRef.current;

  /**
   * 모델 목록 조회
   */
  useEffect(() => {
    const fetchModels = async () => {
      try {
        setIsLoading(true);
        const response = await modelRepository.getModelList({
          page: 1,
          limit: 10, // 홈 페이지에서는 최대 10개 표시 (가로 스크롤)
        });
        setModels(response.items);
      } catch (error) {
        console.error('모델 목록 조회 실패:', error);
        setModels([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // modelRepository는 ref로 관리되므로 의존성 배열에서 제외

  // 로딩 중
  if (isLoading) {
    return (
      <SectionContainer
        title="컨셉에 맞는 모델 찾기"
        onMorePressed={() => navigate('/models')}
      >
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p>로딩 중...</p>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer
      title="컨셉에 맞는 모델 찾기"
      onMorePressed={() => navigate('/models')}
    >
      {models.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <p style={{ color: 'var(--dark-gray)', fontSize: 'var(--p2)' }}>
            데이터가 없습니다.
          </p>
        </div>
      ) : (
        <div
          className="hide-scrollbar"
          style={{
            display: 'flex',
            overflowX: 'auto',
            overflowY: 'hidden',
            height: 488, // Flutter 원본 높이
            gap: 10, // Flutter 원본(separatorBuilder)
            padding: '0 10px', // Flutter 원본(padding)
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