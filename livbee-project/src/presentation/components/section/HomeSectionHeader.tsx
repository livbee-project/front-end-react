import React from 'react';

interface HomeSectionHeaderProps {
  title: string;
  onMorePressed?: () => void;
}

const highlightMap: Record<string, string> = {
  '지금 뜨는 쇼핑라이브': '쇼핑라이브',
  '브랜드 PICK': 'PICK',
  '라이비 뉴스': '뉴스',
  '이런 쇼호스트는 어떠세요?': '쇼호스트는 어떠세요?',
  '컨셉에 맞는 모델 찾기': '모델 찾기',
  'HOT CLIP': 'CLIP',
};

const HomeSectionHeader: React.FC<HomeSectionHeaderProps> = ({ title, onMorePressed }) => {
  const renderTitleWithHighlight = () => {
    const highlightText = highlightMap[title];
    if (!highlightText) {
      return <span>{title}</span>;
    }

    const highlightIndex = title.indexOf(highlightText);
    if (highlightIndex === -1) {
      return <span>{title}</span>;
    }

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

export default HomeSectionHeader;

