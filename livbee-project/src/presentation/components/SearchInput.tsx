import React from 'react';
// 1. Remix Icon 라이브러리 임포트 (규칙 준수)
import { RiSearchLine } from 'react-icons/ri';
// 2. 절대 경로 임포트 (규칙 준수)
import '@/presentation/styles/global.css';

/**
 * 부모(Page)로부터 받을 props 정의
 * (React.InputHTMLAttributes는 'value', 'onChange', 'placeholder' 등을 모두 포함)
 */
interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  // 나중에 엔터 키 입력을 처리할 콜백 (기능 확장용)
  onSearchSubmit?: (value: string) => void;
}

/**
 * "모집공고", "포트폴리오" 등에서 사용될 공통 검색바 UI 컴포넌트
 * Flutter의 list_header_section 또는
 * portfolio_screen의 TextField에 해당합니다.
 */
const SearchInput: React.FC<SearchInputProps> = ({
  onSearchSubmit,
  placeholder = '검색', // 이미지와 동일한 기본값
  ...rest // 'value', 'onChange' 등 나머지 input props
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

  // --- 스타일 정의 ---

  /** 검색바 전체를 감싸는 래퍼 스타일 */
  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '12px 16px', // (임의) 적절한 패딩
    backgroundColor: 'var(--white)',
    borderRadius: 12, // (임의) 둥근 모서리
    // global.css의 --paint-gray 또는 --border 색상
    border: '1px solid var(--paint-gray, #E5E7ED)',
    // 이미지의 그림자
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
    boxSizing: 'border-box',
  };

  /** Remix Icon 스타일 */
  const iconStyle: React.CSSProperties = {
    // 이미지의 회색 아이콘
    color: 'var(--dark-gray)',
    marginRight: 10, // 아이콘과 텍스트 사이 간격
    flexShrink: 0,
  };

  /** <input> 태그 기본 스타일 제거 */
  const inputStyle: React.CSSProperties = {
    flex: 1, // 남은 공간 모두 차지
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    padding: 0,
    margin: 0,
    // global.css의 폰트 스타일 참고
    fontSize: 'var(--h3)', // 16px
    color: 'var(--black)',
    fontWeight: 400,
    // (참고: placeholder 색상은 CSS 파일에서 ::placeholder로 제어해야 합니다)
  };

  // --- 렌더링 ---
  return (
    <div style={wrapperStyle}>
      {/* 1. 리믹스 아이콘 적용 */}
      <RiSearchLine size={24} style={iconStyle} />

      {/* 2. <input> 태그 */}
      <input
        type="text"
        style={inputStyle}
        placeholder={placeholder} // '검색'
        onKeyDown={handleKeyDown}
        {...rest} // value, onChange 등이 여기에 적용됨
      />
    </div>
  );
};

export default SearchInput;