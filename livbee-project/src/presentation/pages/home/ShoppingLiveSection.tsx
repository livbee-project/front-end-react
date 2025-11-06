import React from 'react';
import { useNavigate } from 'react-router-dom';
// 공통 컴포넌트 임포트
import SectionContainer from '../../components/SectionContainer';
import RecruitCard from '../../components/RecruitCard';
// 스크롤바 숨기기 CSS 임포트
import '../../styles/global.css';

/**
 * "지금 뜨는 쇼핑라이브" 섹션 컴포넌트
 * Home.tsx에 있던 로직을 이 파일로 그대로 이동
 */
const ShoppingLiveSection: React.FC = () => {
  const navigate = useNavigate();
  // 가로 스크롤 리스트를 시연하기 위한 임시 데이터
  const shoppingLiveItems = [1, 2, 3, 4, 5];

  return (
    <SectionContainer
      title="지금 뜨는 쇼핑라이브"
      onMorePressed={() => navigate('/campaigns')}
    >
      {/* 가로 스크롤 리스트 컨테이너 */}
      <div
        className="hide-scrollbar"
        style={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          height: 610, // Flutter 원본 높이
          gap: 10,
          padding: '0 10px',
        }}
      >
        {/* RecruitCard 렌더링 로직 (Home.tsx에서 그대로 복사) */}
        {shoppingLiveItems.map((item) => (
          <RecruitCard
            key={item}
            // --- 1. 공통 Props 전달 ---
            brandName={`브랜드명 ${item}`}
            title={`[${item}] 지금 뜨는 라이브 제목`}
            content={`[${item}] 라이브 내용 요약이 여기에 표시됩니다...`}
            onPress={() => console.log(`쇼핑라이브 Card ${item} 클릭`)}
            // --- 2. 상단 (TopContent) Prop 전달 ---
            topContent={
              <div
                style={{
                  width: 300,
                  height: 400,
                  border: '1px solid var(--dark-gray)',
                  borderRadius: 10,
                  position: 'relative',
                  backgroundColor: '#f0f0f0',
                  overflow: 'hidden',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 10,
                    padding: '4px 17px',
                    background: 'var(--primary)',
                    color: 'var(--white)',
                    fontSize: 'var(--h3)',
                    fontWeight: 400,
                    borderRadius: 20,
                  }}
                >
                  CH
                </span>
              </div>
            }
            // --- 3. 하단 (BottomContent) Prop 전달 ---
            bottomContent={
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  gap: 20,
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    background: 'var(--dark-gray)',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontWeight: 400,
                    fontSize: '12px',
                    color: 'var(--dark-gray)',
                    flex: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  상품명 {item}이 노출됩니다.
                </span>
              </div>
            }
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default ShoppingLiveSection;