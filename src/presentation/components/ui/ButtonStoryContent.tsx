import React from 'react';
import styled from 'styled-components';
import Button from '@/presentation/components/ui/Button';

export const ButtonVariantsSection: React.FC = () => (
  <SectionContainer>
    <VariantRow label="Primary">
      <Button variant="primary">Primary Button</Button>
    </VariantRow>
    <VariantRow label="Secondary">
      <Button variant="secondary">Secondary Button</Button>
    </VariantRow>
    <VariantRow label="Outline">
      <Button variant="outline">Outline Button</Button>
    </VariantRow>
  </SectionContainer>
);

export const ButtonSizesSection: React.FC = () => (
  <SectionContainer>
    <VariantRow label="Small">
      <Button size="small">Small Button</Button>
    </VariantRow>
    <VariantRow label="Medium">
      <Button size="medium">Medium Button</Button>
    </VariantRow>
    <VariantRow label="Large">
      <Button size="large">Large Button</Button>
    </VariantRow>
  </SectionContainer>
);

export const ButtonStatesSection: React.FC = () => (
  <SectionContainer>
    <VariantRow label="Default">
      <Button>Default Button</Button>
    </VariantRow>
    <VariantRow label="Disabled">
      <Button disabled>Disabled Button</Button>
    </VariantRow>
    <VariantRow label="Full Width">
      <Button fullWidth>Full Width Button</Button>
    </VariantRow>
  </SectionContainer>
);

export const ButtonCombinationsSection: React.FC = () => (
  <CombinationGrid>
    <CombinationCard>
      <CombinationTitle>Primary Small</CombinationTitle>
      <Button variant="primary" size="small">
        작은 주요 버튼
      </Button>
    </CombinationCard>
    <CombinationCard>
      <CombinationTitle>Secondary Medium</CombinationTitle>
      <Button variant="secondary" size="medium">
        보조 버튼
      </Button>
    </CombinationCard>
    <CombinationCard>
      <CombinationTitle>Outline Large</CombinationTitle>
      <Button variant="outline" size="large">
        큰 경계선 버튼
      </Button>
    </CombinationCard>
    <CombinationCard>
      <CombinationTitle>Primary Disabled</CombinationTitle>
      <Button variant="primary" disabled>
        비활성화 버튼
      </Button>
    </CombinationCard>
  </CombinationGrid>
);

interface VariantRowProps {
  label: string;
  children: React.ReactNode;
}

const VariantRow: React.FC<VariantRowProps> = ({ label, children }) => (
  <Row>
    <Label>{label}</Label>
    {children}
  </Row>
);

const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const Row = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const Label = styled.div`
  min-width: 100px;
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

const CombinationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const CombinationCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
`;

const CombinationTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.foreground};
`;

