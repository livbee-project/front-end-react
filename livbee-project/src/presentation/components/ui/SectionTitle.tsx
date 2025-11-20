import React from 'react';
import styled, { css } from 'styled-components';

interface SectionTitleProps {
  children: React.ReactNode;
  variant?: 'default' | 'subtitle' | 'detail';
  showBullet?: boolean;
  marginBottom?: string;
}

const variantStyles = {
  default: css`
    font: ${({ theme }) => theme.fonts.h2};
    color: ${({ theme }) => theme.colors.foreground};
    font-weight: 700;
  `,
  subtitle: css`
    font: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.muted};
    font-weight: 500;
  `,
  detail: css`
    font: ${({ theme }) => theme.fonts.h2};
    color: ${({ theme }) => theme.colors.foreground};
    font-weight: 700;
  `,
} as const;

const Title = styled.h2<{ $variant: NonNullable<SectionTitleProps['variant']>; $marginBottom: string }>`
  margin: 0;
  margin-bottom: ${({ $marginBottom }) => $marginBottom};
  ${({ $variant }) => variantStyles[$variant]}
`;

const Bullet = styled.span`
  margin-right: ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.primary};
`;

const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  variant = 'default',
  showBullet = false,
  marginBottom = '16px',
}) => {
  return (
    <Title $variant={variant} $marginBottom={marginBottom}>
      {showBullet && <Bullet>■</Bullet>}
      {children}
    </Title>
  );
};

export default SectionTitle;

