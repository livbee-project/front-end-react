import React from 'react';
import HomeSectionHeader from '@/presentation/components/section/HomeSectionHeader';

/**
 * SectionContainer가 받을 props 타입을 정의합니다.
 * @param title - Header에 표시될 섹션 제목 (필수)
 * @param onMorePressed - Header의 '더보기' 버튼 클릭 시 실행될 함수 (선택)
 * @param children - 섹션의 실제 내용 (가로 스크롤 리스트 등)이 될 React 노드 (필수)
 */
interface SectionContainerProps {
  title: string;
  onMorePressed?: () => void;
  children: React.ReactNode;
}

/**
 * 홈 화면의 각 섹션(헤더 + 컨텐츠)을 감싸는 공통 컨테이너 컴포넌트입니다.
 * Flutter의 SectionContainer 위젯과 동일한 역할을 합니다.
 */
const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  onMorePressed,
  children,
}) => {
  return (
    // <section> 태그를 사용하여 시맨틱한 마크업을 구성합니다.
    // Flutter 원본의 섹션 하단 간격(SizedBox(height: 24))을 적용합니다.
    <section style={{ marginBottom: 24 }}>
      {/*
        1. "제목 + 더보기" 헤더 영역
        props로 받은 title과 onMorePressed를 Header 컴포넌트에 그대로 전달합니다.
      */}
      <HomeSectionHeader title={title} onMorePressed={onMorePressed} />

      {/*
        2. 섹션의 실제 컨텐츠 영역
        props.children을 통해 이 컴포넌트를 사용하는 곳에서 넣은
        가로 스크롤 리스트(<div className="hide-scrollbar">...</div>)가
        이 자리에 렌더링됩니다.
      */}
      {children}
    </section>
  );
};

export default SectionContainer;