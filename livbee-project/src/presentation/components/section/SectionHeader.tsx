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
        {title}
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

