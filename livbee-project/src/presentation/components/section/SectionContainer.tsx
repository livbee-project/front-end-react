import React from 'react';
import styled from 'styled-components';
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
const SectionContainer: React.FC<SectionContainerProps> = ({ title, onMorePressed, children }) => {
  return (
    <SectionWrapper>
      <HomeSectionHeader title={title} onMorePressed={onMorePressed} />
      {children}
    </SectionWrapper>
  );
};

const SectionWrapper = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

export default SectionContainer;