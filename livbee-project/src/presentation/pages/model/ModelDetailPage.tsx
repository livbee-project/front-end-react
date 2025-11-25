import React, { useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FileText, CheckCircle, Briefcase, MapPin, Calendar, Clock, DollarSign, Tag, ChevronLeft } from 'lucide-react';
import Button from '@/presentation/components/ui/Button';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';
import { ModelRepository } from '@/data/repositories/ModelRepository';
import type { ModelDetail } from '@/domain/entities/Model';
import { useRepository } from '@/presentation/hooks/useRepository';
import { useDetailData } from '@/presentation/hooks/useDetailData';

const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f4f5fb;
  padding-bottom: 80px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: #1f1f25;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 500;
`;

const HeaderImage = styled.div`
  width: 100%;
  height: 400px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
`;

const HeaderImageContent = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeaderInfo = styled.div`
  background: #ffffff;
  padding: 20px 16px;
  border-radius: 20px 20px 0 0;
  margin-top: -20px;
  position: relative;
  z-index: 1;
`;

const BrandName = styled.div`
  font-size: 0.875rem;
  color: #9297af;
  margin-bottom: 8px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
`;

const Title = styled.h1`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1f1f25;
  margin: 0;
  flex: 1;
`;

const TagGroup = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 12px;
`;

const TagBadge = styled.span<{ $variant?: 'primary' | 'secondary' }>`
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${({ $variant }) => ($variant === 'primary' ? '#5a64ff' : '#ffffff')};
  color: ${({ $variant }) => ($variant === 'primary' ? '#ffffff' : '#1f1f25')};
  border: ${({ $variant }) => ($variant === 'primary' ? 'none' : '1px solid #eceff7')};
`;

const ContentCard = styled.div`
  background: #ffffff;
  margin: 0 16px;
  padding: 24px 20px;
  border-radius: 0 0 20px 20px;
`;

const Section = styled.div`
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const SectionIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #5a64ff;
`;

const SectionTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #1f1f25;
  margin: 0;
`;

const SectionContent = styled.div`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #434659;
  white-space: pre-wrap;
`;

const BulletList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BulletItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 0.95rem;
  line-height: 1.6;
  color: #434659;
`;

const BulletDot = styled.span`
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #5a64ff;
  margin-top: 8px;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: #5a64ff;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const InfoLabel = styled.span`
  font-size: 0.875rem;
  color: #9297af;
  font-weight: 500;
`;

const InfoValue = styled.span`
  font-size: 0.95rem;
  color: #1f1f25;
  font-weight: 600;
`;

const Divider = styled.div`
  height: 1px;
  background: #eceff7;
  margin: 24px 0;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

const ModelDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const modelRepository = useRepository(ModelRepository);

  // fetchFunction 메모이제이션
  const fetchModel = useCallback(
    (id: string, signal?: AbortSignal) => {
      return modelRepository.getModelById(id, signal);
    },
    [modelRepository]
  );

  const { data: model, loading: isLoading, error } = useDetailData<ModelDetail>(
    fetchModel,
    id,
    '모델을 불러오는데 실패했습니다.'
  );

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

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingState padding="16px" />
      </PageContainer>
    );
  }

  if (error || !model) {
    return (
      <PageContainer>
        <ErrorState
          message={error || '모델을 찾을 수 없습니다.'}
          padding="16px"
          onRetry={() => navigate('/models')}
          retryLabel="목록으로 돌아가기"
        />
      </PageContainer>
    );
  }

  // 실제 데이터가 있으면 사용, 없으면 하드코딩 데이터 사용
  const categories: string[] = [];
  const description = model.oneLineIntro || '';
  if (description.includes('패션')) categories.push('패션');
  if (description.includes('뷰티')) categories.push('뷰티');
  if (description.includes('식품')) categories.push('식품');
  if (description.includes('가전')) categories.push('가전');
  if (description.includes('생활') || description.includes('리빙')) categories.push('생활/리빙');

  const tags: string[] = [];
  if (model.isSizingPublic && model.height != null) tags.push(`키 ${model.height}cm`);
  if (model.isSizingPublic && model.weight != null) tags.push(`몸무게 ${model.weight}kg`);
  if (model.isSizingPublic && model.topSize) tags.push(`사이즈 ${model.topSize}`);
  if (model.experienceYears != null && model.experienceYears > 0) tags.push(`경력 ${model.experienceYears}년`);

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
      <BackButton onClick={handleBack}>
        <ChevronLeft size={18} />
        뒤로가기
      </BackButton>

      <HeaderImage>
        <HeaderImageContent src={displayData.imageUrl} alt={displayData.brandName} />
      </HeaderImage>

      <HeaderInfo>
        <BrandName>{displayData.brandName}</BrandName>
        <TitleRow>
          <Title>{displayData.title}</Title>
        </TitleRow>
        <TagGroup>
          {displayData.tags.map((tag, index) => (
            <TagBadge key={index} $variant={index === 0 ? 'primary' : 'secondary'}>
              {tag}
            </TagBadge>
          ))}
        </TagGroup>
      </HeaderInfo>

      <ContentCard>
        {/* 모델 소개 */}
        <Section>
          <SectionHeader>
            <SectionIcon>
              <FileText size={20} />
            </SectionIcon>
            <SectionTitle>모델 소개</SectionTitle>
          </SectionHeader>
          <SectionContent>{displayData.modelIntro}</SectionContent>
        </Section>

        {/* 자격요건 */}
        <Section>
          <SectionHeader>
            <SectionIcon>
              <CheckCircle size={20} />
            </SectionIcon>
            <SectionTitle>자격요건</SectionTitle>
          </SectionHeader>
          <BulletList>
            {displayData.qualifications.map((qualification, index) => (
              <BulletItem key={index}>
                <BulletDot />
                <span>{qualification}</span>
              </BulletItem>
            ))}
          </BulletList>
        </Section>

        {/* 촬영 정보 */}
        <Section>
          <SectionHeader>
            <SectionIcon>
              <Briefcase size={20} />
            </SectionIcon>
            <SectionTitle>촬영 정보</SectionTitle>
          </SectionHeader>
          <InfoGrid>
            <InfoRow>
              <InfoIcon>
                <MapPin size={18} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>장소</InfoLabel>
                <InfoValue>{displayData.location}</InfoValue>
              </InfoContent>
            </InfoRow>
            <InfoRow>
              <InfoIcon>
                <Calendar size={18} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>촬영일</InfoLabel>
                <InfoValue>{displayData.shootDate}</InfoValue>
              </InfoContent>
            </InfoRow>
          </InfoGrid>
        </Section>

        <Divider />

        {/* 촬영 시간 */}
        <InfoRow>
          <InfoIcon>
            <Clock size={18} />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>촬영 시간</InfoLabel>
            <InfoValue>{displayData.shootTime}</InfoValue>
          </InfoContent>
        </InfoRow>

        {/* 지원 마감일 */}
        <InfoRow>
          <InfoIcon>
            <Calendar size={18} />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>지원 마감일</InfoLabel>
            <InfoValue>{displayData.deadline}</InfoValue>
          </InfoContent>
        </InfoRow>

        {/* 출연료 */}
        <InfoRow>
          <InfoIcon>
            <DollarSign size={18} />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>출연료</InfoLabel>
            <InfoValue>{displayData.fee}</InfoValue>
          </InfoContent>
        </InfoRow>

        {/* 상품 정보 */}
        <Divider />
        <InfoRow>
          <InfoIcon>
            <Tag size={18} />
          </InfoIcon>
          <InfoContent>
            <InfoLabel>상품 정보</InfoLabel>
            <InfoValue>{displayData.productInfo}</InfoValue>
          </InfoContent>
        </InfoRow>

        {/* 액션 버튼 */}
        <ActionButtons>
          <Button variant="secondary" fullWidth onClick={handleBack}>
            목록으로
          </Button>
          <Button variant="primary" fullWidth onClick={handleOffer}>
            제안하기
          </Button>
        </ActionButtons>
      </ContentCard>
    </PageContainer>
  );
};

export default ModelDetailPage;
