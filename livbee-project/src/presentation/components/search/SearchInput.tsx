import React from 'react';
import styled from 'styled-components';
import { RiSearchLine } from 'react-icons/ri';
import { Input } from '@/presentation/components/styled/CommonStyles';

/**
 * 부모(Page)로부터 받을 props 정의
 * (React.InputHTMLAttributes는 'value', 'onChange', 'placeholder' 등을 모두 포함)
 */
interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // 나중에 엔터 키 입력을 처리할 콜백 (기능 확장용)
  onSearchSubmit?: (value: string) => void;
}

/**
 * 검색 입력 래퍼 스타일
 */
const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.xl};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  gap: ${({ theme }) => theme.spacing.sm};
`;

/**
 * 검색 아이콘 스타일
 */
const SearchIcon = styled(RiSearchLine)`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.muted};
`;

/**
 * 검색 입력 필드 스타일
 */
const SearchInputField = styled(Input)`
  flex: 1;
  padding: 0;
  border: none;
  background: transparent;
  box-shadow: none;

  &:focus {
    box-shadow: none;
    border: none;
  }
`;

/**
 * "모집공고", "포트폴리오" 등에서 사용될 공통 검색바 UI 컴포넌트
 * Flutter의 list_header_section 또는
 * portfolio_screen의 TextField에 해당합니다.
 */
const SearchInput: React.FC<SearchInputProps> = ({
  onSearchSubmit,
  placeholder = '검색',
  ...rest
}) => {
  /**
   * (기능) 엔터 키 핸들러 (나중을 위해 미리 구현)
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearchSubmit) {
      onSearchSubmit(e.currentTarget.value);
    }
    // 부모로부터 받은 onKeyDown도 실행 (필요한 경우)
    if (rest.onKeyDown) {
      rest.onKeyDown(e);
    }
  };

  return (
    <SearchWrapper>
      <SearchIcon size={24} />
      <SearchInputField
        type="text"
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        {...rest}
      />
    </SearchWrapper>
  );
};

export default SearchInput;
