import React from 'react';
import styled from 'styled-components';
import HomeSectionHeader from '@/presentation/components/section/HomeSectionHeader';
import type { SectionContainerProps } from '@/types/components';

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