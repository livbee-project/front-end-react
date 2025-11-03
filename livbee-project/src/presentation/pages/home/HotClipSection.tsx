import React from 'react';
// 공통 컴포넌트 임포트
import SectionContainer from '../../components/SectionContainer';
import PortraitCard from '../../components/PortraitCard'; // PortraitCard 재사용
// 스크롤바 숨기기 CSS 임포트
import '../../styles/global.css';

/**
 * "HOT CLIP" 섹션 컴포넌트
 * "컨셉 모델 찾기" 섹션과 
 * 동일한 PortraitCard를 사용합니다.
 */
const HotClipSection: React.FC = () => {
  // (추가) 섹션에서 사용할 임시 데이터
  const hotClipItems = [
    { id: 1, title: '영상제목 1', content: '한줄소개한줄소개한줄소개...' },
    { id: 2, title: '영상제목 2', content: '한줄소개한줄소개한줄소개...' },
    { id: 3, title: '영상제목 3', content: '한줄소개한줄소개한줄소개...' },
    { id: 4, title: '영상제목 4', content: '한줄소개한줄소개한줄소개...' },
  ];

  return (
    // 1. 섹션 컨테이너 (재사용)
    <SectionContainer
      title="HOT CLIP"
      onMorePressed={() => console.log('HOT CLIP 더보기 클릭')}
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
        {hotClipItems.map((item) => (
          <PortraitCard
            key={item.id}
            title={item.title}
            content={item.content}
            // imageUrl={item.imageUrl} (테스트용 이미지)
            onPress={() => console.log(`클립 ${item.id} 클릭`)}
          />
        ))}
      </div>
    </SectionContainer>
  );
};

export default HotClipSection;