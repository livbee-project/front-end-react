import React from 'react';
import styled from 'styled-components';
import { H1, PMuted, Highlight } from '@/presentation/components/styled/Typography';

interface CampaignListHeaderProps {
  title: string;
  description: string;
  highlightText?: string;
}

export const CampaignListHeader: React.FC<CampaignListHeaderProps> = ({
  title,
  description,
  highlightText,
}) => {
  const [prefix = '', suffix = ''] =
    highlightText && title.includes(highlightText) ? title.split(highlightText) : [title, ''];

  return (
    <HeaderContainer>
      <PageTitle>
        {highlightText && prefix !== title ? (
          <>
            {prefix}
            <Highlight>{highlightText}</Highlight>
            {suffix}
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

