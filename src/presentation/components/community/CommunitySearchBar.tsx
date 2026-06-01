import React from 'react';
import styled from 'styled-components';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/presentation/components/styled/CommonStyles';

interface CommunitySearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
}

export const CommunitySearchBar: React.FC<CommunitySearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  placeholder = '검색어를 입력해주세요',
}) => {
  return (
    <SearchForm onSubmit={onSubmit}>
      <SearchIconWrapper size={18} aria-hidden="true" />
      <StyledInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </SearchForm>
  );
};

const SearchForm = styled.form`
  position: relative;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StyledInput = styled(Input)`
  padding-left: 2.5rem;
`;

const SearchIconWrapper = styled(SearchIcon)`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.muted};
`;

