import React from 'react';

// (수정) onMorePressed prop 타입을 HeaderProps에 추가합니다.
interface HeaderProps {
  title: string;
  onMorePressed?: () => void; // '?'를 붙여 선택적 prop으로 만듭니다.
}

const Header: React.FC<HeaderProps> = ({ title, onMorePressed }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 32,
        marginBottom: 24,
        marginLeft: 10,
        marginRight: 10
      }}
    >
      <span
        style={{
          fontWeight: 700,
          fontSize: 'var(--h1)',
          color: 'var(--black)'
        }}
      >
        {title}
      </span>
      {/* --- (수정된 '더보기' 섹션) --- */}
      {/*
        onMorePressed prop이 전달된 경우에만 '더보기' 텍스트를 렌더링합니다.
        Flutter의 if (onMorePressed != null)와 동일합니다.
      */}
      {onMorePressed && (
        <span
          onClick={onMorePressed} // (추가) 클릭 이벤트를 prop과 연결
          style={{
            fontSize: 'var(--h2)',
            color: 'var(--dark-gray)',
            fontWeight: 700,
            cursor: 'pointer', // (추가) 클릭 가능한 요소임을 알려주기 위해 커서 변경
          }}
        >
          더보기
        </span>
      )}
    </div>
  );
};

export default Header;
