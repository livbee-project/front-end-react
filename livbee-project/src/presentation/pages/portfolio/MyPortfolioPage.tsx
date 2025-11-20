import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Star, Pencil, Trash2 } from 'lucide-react';
import Pagination from '@/presentation/components/list/Pagination';
import FloatingActionButton from '@/presentation/components/ui/FloatingActionButton';
import { H2, PMuted, Caption } from '@/presentation/components/styled/Typography';
import { Badge } from '@/presentation/components/styled/CommonStyles';
import { useToast } from '@/presentation/contexts/ToastContext';
import { EmptyState } from '@/presentation/components/states/EmptyState';

type PortfolioRole = 'showhost' | 'model';

interface MyPortfolioItem {
  id: number;
  title: string;
  summary: string;
  categories: string[];
  updatedAt: string;
  imageUrl?: string;
  isPinned?: boolean;
  isDefault?: boolean;
  role: PortfolioRole;
}

const MOCK_PORTFOLIOS: MyPortfolioItem[] = [
  {
    id: 1,
    title: '패션 쇼핑라이브 포트폴리오',
    summary: '봄/여름 시즌 패션 아이템 라이브 진행 영상 모음',
    categories: ['패션', '뷰티'],
    updatedAt: '2024-11-01',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80',
    isPinned: true,
    isDefault: true,
    role: 'showhost',
  },
  {
    id: 2,
    title: '뷰티 제품 리뷰',
    summary: '스킨케어 및 메이크업 제품 상세 리뷰 영상',
    categories: ['뷰티'],
    updatedAt: '2024-10-15',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
    role: 'showhost',
  },
  {
    id: 3,
    title: '홈리빙 큐레이션',
    summary: '인테리어 소품 및 생활용품 소개 라이브 영상',
    categories: ['리빙', '홈데코'],
    updatedAt: '2024-09-20',
    imageUrl: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=400&q=80',
    role: 'showhost',
  },
  {
    id: 4,
    title: '하이패션 룩북',
    summary: 'FW 시즌 하이패션 의상 촬영 컷 & 라이브 영상',
    categories: ['패션'],
    updatedAt: '2024-10-05',
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    role: 'model',
    isPinned: true,
    isDefault: true,
  },
  {
    id: 5,
    title: '바디 프로필 & 워킹 영상',
    summary: '바디 프로필 촬영 및 런웨이 워킹 영상 모음',
    categories: ['피트니스'],
    updatedAt: '2024-08-12',
    role: 'model',
  },
];

const ITEMS_PER_PAGE = 3;

const formatDateLabel = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('ko-KR').replace(/\s/g, '');
};

const MyPortfolioPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeRole: PortfolioRole =
    (location.state as { role?: PortfolioRole } | null)?.role ?? 'showhost';
  const { showToast } = useToast();
  const [portfolios, setPortfolios] = useState<MyPortfolioItem[]>(MOCK_PORTFOLIOS);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPortfolios = useMemo(
    () => portfolios.filter((item) => item.role === activeRole),
    [portfolios, activeRole]
  );

  const totalPages = Math.max(1, Math.ceil(filteredPortfolios.length / ITEMS_PER_PAGE));
  const pageItems = filteredPortfolios.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTogglePinned = (id: number) => {
    setPortfolios((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isPinned: !item.isPinned } : item
      )
    );
  };

  const handleSetDefault = (id: number) => {
    setPortfolios((prev) =>
      prev.map((item) =>
        item.role === activeRole
          ? { ...item, isDefault: item.id === id }
          : item
      )
    );
    showToast('기본 포트폴리오가 변경되었습니다.');
  };

  const handleEdit = (id: number) => {
    navigate('/portfolios/register', { state: { portfolioId: id } });
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('해당 포트폴리오를 삭제하시겠어요?')) {
      return;
    }
    setPortfolios((prev) => prev.filter((item) => item.id !== id));
    showToast('포트폴리오가 삭제되었습니다.');
  };

  const handleCardClick = (id: number) => {
    navigate(`/portfolios/${id}`);
  };

  const handleRegisterClick = () => {
    navigate('/portfolios/register');
  };

  return (
    <PageWrapper>
      <HeaderRow>
        <div>
          <PageTitle>{activeRole === 'showhost' ? '쇼호스트 포트폴리오' : '모델 포트폴리오'}</PageTitle>
          <PageDescription>나의 포트폴리오를 관리하고 기본 포트폴리오를 설정하세요.</PageDescription>
        </div>
        <HeaderButton type="button" onClick={handleRegisterClick}>
          관리
        </HeaderButton>
      </HeaderRow>

      {pageItems.length === 0 ? (
        <EmptyState message="등록된 포트폴리오가 없습니다." />
      ) : (
        <CardList>
          {pageItems.map((item) => (
            <PortfolioCard key={item.id} onClick={() => handleCardClick(item.id)}>
              <CardHeader>
                <Thumbnail $hasImage={Boolean(item.imageUrl)}>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.title} />
                  ) : (
                    <span>?</span>
                  )}
                </Thumbnail>
                <CardBody>
                  <TitleRow>
                    <CardTitle>{item.title}</CardTitle>
                    <PinButton
                      type="button"
                      aria-label="즐겨찾기"
                      $active={Boolean(item.isPinned)}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleTogglePinned(item.id);
                      }}
                    >
                      <Star size={16} fill={item.isPinned ? 'currentColor' : 'none'} />
                    </PinButton>
                  </TitleRow>
                  <CardSummary>{item.summary}</CardSummary>
                  <MetaRow>
                    <ChipGroup>
                      {item.categories.map((category) => (
                        <Chip key={`${item.id}-${category}`} $variant="secondary">
                          {category}
                        </Chip>
                      ))}
                    </ChipGroup>
                    <UpdatedAt>{formatDateLabel(item.updatedAt)}</UpdatedAt>
                  </MetaRow>
                </CardBody>
              </CardHeader>

              <ButtonRow onClick={(event) => event.stopPropagation()}>
                <DefaultButton
                  type="button"
                  $active={Boolean(item.isDefault)}
                  onClick={() => handleSetDefault(item.id)}
                >
                  <Star size={14} fill={item.isDefault ? 'currentColor' : 'none'} />
                  기본
                </DefaultButton>
                <OutlineButton type="button" onClick={() => handleEdit(item.id)}>
                  <Pencil size={14} />
                  편집
                </OutlineButton>
                <DangerButton type="button" onClick={() => handleDelete(item.id)}>
                  <Trash2 size={14} />
                  삭제
                </DangerButton>
              </ButtonRow>
            </PortfolioCard>
          ))}
        </CardList>
      )}

      {filteredPortfolios.length > ITEMS_PER_PAGE && (
        <PaginationWrapper>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </PaginationWrapper>
      )}

      <FloatingActionButton onClick={handleRegisterClick} />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['2xl']};
`;

const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: flex-start;
`;

const PageTitle = styled(H2)`
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
`;

const PageDescription = styled(PMuted)`
  color: ${({ theme }) => theme.colors.muted};
`;

const HeaderButton = styled.button`
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  font: ${({ theme }) => theme.fonts.button};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
`;

const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const PortfolioCard = styled.article`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 12px 24px ${({ theme }) => theme.primaryOpacity['10']};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  cursor: pointer;
`;

const CardHeader = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Thumbnail = styled.div<{ $hasImage: boolean }>`
  width: 72px;
  height: 72px;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme, $hasImage }) =>
    $hasImage ? 'transparent' : theme.colors.secondary};
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const CardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CardTitle = styled(H2)`
  margin: 0;
  font-size: 1rem;
`;

const PinButton = styled.button<{ $active: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background: ${({ theme, $active }) => ($active ? theme.primaryOpacity['20'] : theme.colors.secondary)};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.muted)};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const CardSummary = styled(PMuted)`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
`;

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const ChipGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
`;

const Chip = styled(Badge)`
  font-size: 12px;
`;

const UpdatedAt = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

const ButtonRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const ActionButtonBase = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  font: ${({ theme }) => theme.fonts.button};
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s;
`;

const DefaultButton = styled(ActionButtonBase)<{ $active: boolean }>`
  border: none;
  background: ${({ theme, $active }) => ($active ? theme.primaryOpacity['25'] : theme.colors.secondary)};
  color: ${({ theme, $active }) => ($active ? theme.colors.primary : theme.colors.foreground)};
`;

const OutlineButton = styled(ActionButtonBase)`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: transparent;
  color: ${({ theme }) => theme.colors.foreground};
`;

const DangerButton = styled(ActionButtonBase)`
  border: 1px solid ${({ theme }) => theme.colors.error};
  background: transparent;
  color: ${({ theme }) => theme.colors.error};
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default MyPortfolioPage;

