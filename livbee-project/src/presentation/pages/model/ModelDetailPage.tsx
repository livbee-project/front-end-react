import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@/presentation/components/ui/Button';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import type { ModelDetail } from '@/domain/entities/Model';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useDetailFetcher } from '@/presentation/hooks/useDetailFetcher';
import { useDetailPageState } from '@/presentation/hooks/useDetailPageState';
import { extractCategories, generateProfileTags } from '@/shared/utils/detailPageUtils';
import { ModelHeader } from '@/presentation/components/model/detail/ModelHeader';
import { ModelInfoSection } from '@/presentation/components/model/detail/ModelInfoSection';
import { ActionButtons, PageContainer } from './styled/ModelDetailPageStyles';

const ModelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const modelRepository = useRepository(ModelRepository);

  const {
    data: model,
    loading: isLoading,
    error,
  } = useDetailFetcher<ModelDetail, ModelRepository>({
    repository: modelRepository,
    method: 'getModelById',
    id,
    errorMessage: '모델을 불러오는데 실패했습니다.',
  });

  // 로딩/에러 상태 처리
  const { renderState, isReady } = useDetailPageState({
    data: model,
    loading: isLoading,
    error,
    notFoundMessage: '모델을 찾을 수 없습니다.',
    listPath: '/models',
    LayoutComponent: PageContainer,
  });

  const categories = useMemo(() => {
    if (!model?.oneLineIntro) {
      return [];
    }
    return extractCategories({ description: model.oneLineIntro });
  }, [model?.oneLineIntro]);

  const tags = useMemo(() => {
    if (!model) {
      return [];
    }
    return generateProfileTags({
      height: model.height,
      weight: model.weight,
      topSize: model.topSize,
      experienceYears: model.experienceYears,
      isSizingPublic: model.isSizingPublic,
    });
  }, [model]);

  // 로딩/에러 상태일 경우 UI 반환
  if (renderState) {
    return <>{renderState}</>;
  }

  // 데이터가 준비되지 않았으면 아무것도 렌더링하지 않음 (방어 코드)
  if (!isReady || !model) {
    return null;
  }

  // 하드코딩된 데이터 (API 데이터가 없을 때 사용)
  const mockData = {
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    brandName: '이수아',
    title: '프로페셔널 패션 모델',
    tags: ['패션', '뷰티', '라이프스타일'],
    modelIntro: '다양한 패션 브랜드와 협업 경험이 풍부한 프로페셔널 모델입니다. 패션, 뷰티, 라이프스타일 분야에서 활발히 활동하고 있으며, 카메라 앞에서 자연스러운 포즈와 표현력을 자랑합니다.',
    qualifications: [
      '패션 모델 경력 3년 이상',
      '카메라 앞에서 자연스러운 표현력',
      '다양한 스타일 소화 가능',
      '트렌드에 대한 높은 이해도',
    ],
    location: '서울 강남구',
    shootDate: '2024.12.25',
    shootTime: '오후 2:00 ~ 오후 4:00',
    deadline: '2024.12.20',
    fee: '100,000원',
    productInfo: '패션 화보 및 광고 촬영',
  };

  const displayData = {
    imageUrl: model.mainThumbnailUrl || model.backgroundImageUrl || mockData.imageUrl,
    brandName: model.nickname || mockData.brandName,
    title: model.oneLineIntro || mockData.title,
    tags: categories.length > 0 ? categories : mockData.tags,
    modelIntro: model.detailedIntro || model.oneLineIntro || mockData.modelIntro,
    qualifications: tags.length > 0 ? tags : mockData.qualifications,
    location: model.detailedRegion || mockData.location,
    shootDate: mockData.shootDate,
    shootTime: mockData.shootTime,
    deadline: mockData.deadline,
    fee: mockData.fee,
    productInfo: mockData.productInfo,
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleOffer = () => {
    // TODO: 제안하기 기능 구현
  };

  return (
    <PageContainer>
      <ModelHeader
        brandName={displayData.brandName}
        title={displayData.title}
        tags={displayData.tags}
        imageUrl={displayData.imageUrl}
        onBack={handleBack}
      />

      <ModelInfoSection
        modelIntro={displayData.modelIntro}
        qualifications={displayData.qualifications}
        location={displayData.location}
        shootDate={displayData.shootDate}
        shootTime={displayData.shootTime}
        deadline={displayData.deadline}
        fee={displayData.fee}
        productInfo={displayData.productInfo}
      />

      <ActionButtons>
        <Button variant="secondary" fullWidth onClick={handleBack}>
          목록으로
        </Button>
        <Button variant="primary" fullWidth onClick={handleOffer}>
          제안하기
        </Button>
      </ActionButtons>
    </PageContainer>
  );
};

export default ModelDetailPage;
