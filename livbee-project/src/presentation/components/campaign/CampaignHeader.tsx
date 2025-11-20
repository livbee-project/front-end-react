import React from 'react';
import styled from 'styled-components';
import { H1, PMuted, Highlight } from '@/presentation/components/styled/Typography';

interface CampaignHeaderProps {
  title: string;
  description: string;
  highlightText?: string;
}

export const CampaignHeader: React.FC<CampaignHeaderProps> = ({
  title,
  description,
  highlightText,
}) => {
  return (
    <HeaderContainer>
      <PageTitle>
        {highlightText ? (
          <>
            {title.split(highlightText)[0]}
            <Highlight>{highlightText}</Highlight>
            {title.split(highlightText)[1]}
          </>
        ) : (
          title
        )}
      </PageTitle>
      <PageDescription>{description}</PageDescription>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing['2xl']};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const PageTitle = styled(H1)`
  font-size: 1.75rem;
  line-height: 1.3;
`;

const PageDescription = styled(PMuted)`
  font-size: 1rem;
`;

