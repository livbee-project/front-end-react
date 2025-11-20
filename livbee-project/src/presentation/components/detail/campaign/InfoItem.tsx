import React from 'react';
import styled from 'styled-components';
import { PMuted } from '@/presentation/components/styled/Typography';

interface InfoItemProps {
  title: string;
  content?: string | number | null;
  children?: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => `${theme.spacing.md} 0`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const TitleText = styled(PMuted)`
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 500;
`;

const ContentText = styled(PMuted)`
  color: ${({ theme }) => theme.colors.foreground};
  font-weight: 600;
`;

const InfoItem: React.FC<InfoItemProps> = ({ title, content, children }) => {
  const displayContent = content ?? '-';
  return (
    <Container>
      <TitleText>{title}</TitleText>
      {children ?? <ContentText>{displayContent}</ContentText>}
    </Container>
  );
};

export default InfoItem;

