import React from 'react';
import { useNavigate } from 'react-router-dom';
// 공통 컴포넌트 임포트
import SectionContainer from '../../components/common/SectionContainer';
import RecruitCard from '../../components/cards/RecruitCard';
// 스크롤바 숨기기 CSS 임포트
import '../../styles/global.css';

/**
 * "브랜드 픽" 섹션 컴포넌트
 * Home.tsx에 있던 로직을 이 파일로 이동
 */
const BrandPickSection: React.FC = () => {
  const navigate = useNavigate();
  // (추가) "브랜드 픽" 섹션을 위한 임시 데이터 (Home.tsx에서 가져옴)
  const brandPickItems = [1, 2, 3, 4, 5];

  return (
    <SectionContainer
      title="브랜드 PICK"
      onMorePressed={() => navigate('/campaigns')}
    >
      {/* 가로 스크롤 리스트 컨테이너 (Home.tsx에서 그대로 복사) */}
      <div
        className="hide-scrollbar"
        style={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          height: 360, // Flutter 원본 높이
          gap: 10,
          padding: '0 10px',
        }}
      >
        {/* RecruitCard 렌더링 로직 (Home.tsx에서 그대로 복사) */}
        {brandPickItems.map((item) => (
          <RecruitCard
            key={item}
            // --- 1. 공통 Props 전달 ---
            brandName={`브랜드 ${item}`}
            title={`[${item}] 브랜드 픽 제목`}
            content={`[${item}] 브랜드 픽 내용 요약...`}
            onPress={() => navigate(`/campaigns/${item}`)}
            // --- 2. 상단 (TopContent) Prop 전달 ---
            // "브랜드 픽"에 맞는 150px 높이의 이미지 영역 UI
            topContent={
              <div
                style={{
                  width: 300,
                  height: 150, // Flutter 원본 높이
                  border: '1px solid var(--dark-gray)',
                  borderRadius: 10,
                  position: 'relative',
                  backgroundColor: '#f0f0f0',
                  overflow: 'hidden',
                }}
              >
                {/* 원형 뱃지 스타일 */}
                <span
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 10,
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 40,
                    height: 40,
                    background: 'var(--primary)',
                    color: 'var(--white)',
                    fontSize: 'var(--h3)',
                    fontWeight: 400,
                    borderRadius: '50%',
                  }}
                >
                  CH
                </span>
              </div>
            }
            // --- 3. 하단 (BottomContent) Prop 전달 ---
            // "브랜드 픽"에 맞는 'BUTTON' UI
            bottomContent={
              <div
                style={{
                  width: '100%',
                  padding: '10px 0',
                  background: 'var(--primary)',
                  color: 'var(--white)',
                  borderRadius: 10,
                  textAlign: 'center',
                  fontSize: 'var(--p2)',
                  fontWeight: 400,
                  cursor: 'pointer',
                }}
              >
                BUTTON
              </div>
            }
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default BrandPickSection;