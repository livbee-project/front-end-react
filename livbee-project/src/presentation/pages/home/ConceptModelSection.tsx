import React from 'react';
import { useNavigate } from 'react-router-dom';
// (추가) 필요한 공통 컴포넌트 임포트
import SectionContainer from '../../components/common/SectionContainer';
import PortraitCard from '../../components/cards/PortraitCard'; // PortraitCard 재사용
// (추가) 스크롤바 숨기기 CSS 임포트
import '../../styles/global.css';

/**
 * "컨셉에 맞는 모델찾기" 섹션 컴포넌트
 * Flutter 원본을 기반으로 함
 */
const ConceptModelSection: React.FC = () => {
  const navigate = useNavigate();
  // (추가) 섹션에서 사용할 임시 데이터
  const conceptModelItems = [
    { id: 1, title: '모델이름 1', content: '한줄소개한줄소개한줄소개...' },
    { id: 2, title: '모델이름 2', content: '한줄소개한줄소개한줄소개...' },
    { id: 3, title: '모델이름 3', content: '한줄소개한줄소개한줄소개...' },
    { id: 4, title: '모델이름 4', content: '한줄소개한줄소개한줄소개...' },
  ];

  return (
    // 1. 섹션 컨테이너 (재사용)
    <SectionContainer
      title="컨셉에 맞는 모델 찾기"
      onMorePressed={() => navigate('/models')}
    >
      {/* 2. 가로 스크롤 컨테이너 */}
      <div
        className="hide-scrollbar"
        style={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          height: 488, // Flutter 원본 높이
          gap: 10, // Flutter 원본(separatorBuilder)
          padding: '0 10px', // Flutter 원본(padding)
        }}
      >
        {/* 3. PortraitCard 렌더링 */}
        {conceptModelItems.map((item) => (
          <PortraitCard
            key={item.id}
            title={item.title}
            content={item.content}
            // imageUrl={item.imageUrl} (테스트용 이미지)
            onPress={() => navigate(`/models/${item.id}`)}
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default ConceptModelSection;