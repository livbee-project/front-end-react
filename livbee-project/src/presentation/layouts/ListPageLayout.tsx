import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import SearchInput from '@/presentation/components/search/SearchInput';
import ListPageHint from '@/presentation/components/list/ListPageHint';
import FloatingActionButton from '@/presentation/components/ui/FloatingActionButton';

/**
 * ListPageLayout 컴포넌트가 받을 props 타입을 정의합니다.
 * @param searchPlaceholder - 검색 입력 필드 placeholder
 * @param hintText - 안내 문구 텍스트 (선택)
 * @param floatingActionButtonPath - 플로팅 액션 버튼 클릭 시 이동할 경로
 * @param onSearch - 검색 실행 시 호출될 함수 (선택)
 * @param pageStyle - 페이지 컨테이너 커스텀 스타일 (선택)
 * @param children - 페이지 내부에 렌더링될 컨텐츠 (리스트 등)
 */
interface ListPageLayoutProps {
  searchPlaceholder: string;
  hintText?: string;
  floatingActionButtonPath: string;
  onSearch?: (query: string) => void;
  pageStyle?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * 리스트 페이지의 공통 레이아웃 컴포넌트입니다.
 * 검색 입력, 안내 문구, 플로팅 액션 버튼을 포함합니다.
 */
const ListPageLayout: React.FC<ListPageLayoutProps> = ({
  searchPlaceholder,
  hintText,
  floatingActionButtonPath,
  onSearch,
  pageStyle: customPageStyle,
  children,
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  /**
   * 검색 실행 핸들러
   */
  const handleSearchSubmit = (query: string) => {
    console.log('검색 실행:', query);
    if (onSearch) {
      onSearch(query);
    }
    // TODO: 추후 ViewModel(데이터 관리 로직)과 연결
  };

  return (
    <PageContainer $customStyle={customPageStyle}>
      {/* 검색 입력 및 안내 문구 */}
      <SearchWrapper>
        <SearchInput
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onSearchSubmit={handleSearchSubmit}
        />
        <ListPageHint text={hintText} />
      </SearchWrapper>

      {/* 리스트 컨텐츠 */}
      {children}

      {/* 플로팅 액션 버튼 */}
      <FloatingActionButton onClick={() => navigate(floatingActionButtonPath)} />
    </PageContainer>
  );
};

const PageContainer = styled.div<{ $customStyle?: React.CSSProperties }>`
  padding: ${({ $customStyle, theme }) =>
    $customStyle?.padding || theme.spacing.sm};
`;

const SearchWrapper = styled.div`
  padding: 0;
`;

export default ListPageLayout;

