import React from 'react';
import Header from '../components/Header';

const Home: React.FC = () => {
  return (
    <section
      style={{
        width: '100%'
      }}
    >
      {/* 1200px 가운데 정렬 컨테이너 */}
      <div className="app-container">
        {/* Header 컴포넌트로 분리 */}
        <Header title="지금 뜨는 쇼핑라이브" />
        {/* 300px 컨테이너: 사각형 + (브랜드명 + CH) */}
        <div
          style={{
            width: 300,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 12
          }}
        >
          {/* 사각형 박스 */}
          <div
            style={{
              width: 300,
              height: 400,
              border: '1px solid var(--dark-gray)',
              borderRadius: 10
            }}
          />
          {/* 브랜드명 + CH를 Row처럼 배치 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              gap: 10
            }}
          >
            <span
              style={{
                color: 'var(--primary)',
                fontSize: 'var(--h3)',
                fontWeight: 700
              }}
            >
              브랜드명
            </span>
            <span style={{ flex: 1 }} />
            <span
              style={{
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 40,
                height: 40,
                background: 'var(--primary)',
                color: 'var(--white)',
                fontSize: 'var(--p2)',
                fontWeight: 400,
                borderRadius: '50%'
              }}
            >
              CH
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
