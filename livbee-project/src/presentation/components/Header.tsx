import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
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
      <span
        style={{
          fontSize: 'var(--h2)',
          color: 'var(--dark-gray)',
          fontWeight: 700
        }}
      >
        더보기
      </span>
    </div>
  );
};

export default Header;
