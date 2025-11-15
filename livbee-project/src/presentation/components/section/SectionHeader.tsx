import React from 'react';

/**
 * SectionHeader 컴포넌트가 받을 props 타입을 정의합니다.
 * @param title - 섹션 제목
 * @param onMorePressed - '더보기' 버튼 클릭 시 실행될 함수 (선택)
 */
interface SectionHeaderProps {
  title: string;
  onMorePressed?: () => void;
}

/**
 * 홈 화면의 섹션 헤더 컴포넌트입니다.
 * 제목과 '더보기' 버튼을 표시합니다.
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({ title, onMorePressed }) => {
  /**
   * 제목에서 강조할 부분을 찾아서 분리하는 함수
   */
  const renderTitleWithHighlight = () => {
    // 강조할 키워드와 제목 매핑
    const highlightMap: { [key: string]: string } = {
      '지금 뜨는 쇼핑라이브': '쇼핑라이브',
      '브랜드 PICK': 'PICK',
      '라이비 뉴스': '뉴스',
      '이런 쇼호스트는 어떠세요?': '쇼호스트는 어떠세요?',
      '컨셉에 맞는 모델 찾기': '모델 찾기',
      'HOT CLIP': 'CLIP',
    };

    const highlightText = highlightMap[title];
    
    if (!highlightText) {
      // 강조할 부분이 없으면 그대로 반환
      return <span>{title}</span>;
    }

    // 강조할 부분의 시작 인덱스 찾기
    const highlightIndex = title.indexOf(highlightText);
    
    if (highlightIndex === -1) {
      // 찾지 못하면 그대로 반환
      return <span>{title}</span>;
    }

    // 제목을 세 부분으로 나눔: 앞부분, 강조부분, 뒷부분
    const beforeText = title.substring(0, highlightIndex);
    const highlightPart = title.substring(highlightIndex, highlightIndex + highlightText.length);
    const afterText = title.substring(highlightIndex + highlightText.length);

    return (
      <>
        {beforeText && <span>{beforeText}</span>}
        <span style={{ color: 'var(--primary)' }}>{highlightPart}</span>
        {afterText && <span>{afterText}</span>}
      </>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 32,
        marginBottom: 24,
        marginLeft: 10,
        marginRight: 10,
      }}
    >
      <span
        style={{
          fontWeight: 700,
          fontSize: 'var(--h1)',
          color: 'var(--black)',
        }}
      >
        {renderTitleWithHighlight()}
      </span>
      {onMorePressed && (
        <span
          onClick={onMorePressed}
          style={{
            fontSize: 'var(--h2)',
            color: 'var(--dark-gray)',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          더보기
        </span>
      )}
    </div>
  );
};

export default SectionHeader;

