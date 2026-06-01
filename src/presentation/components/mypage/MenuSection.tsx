import React from 'react';
import styled from 'styled-components';
import { ChevronRight } from 'lucide-react';
import { H3, PMuted } from '@/presentation/components/styled/Typography';
import { PrimaryBadge } from '@/presentation/components/styled/CommonStyles';
import { Card } from '@/presentation/components/styled/SectionStyles';
import type { MenuItemData } from '@/types/mypage';

interface MenuSectionProps {
  menuItems: MenuItemData[][];
}

export const MenuSection: React.FC<MenuSectionProps> = ({ menuItems }) => {
  return (
    <>
      {menuItems.map((menuGroup, groupIndex) => (
        <MenuCard key={groupIndex}>
          {menuGroup.map((item, itemIndex) => (
            <MenuItem
              key={item.label}
              $isLast={itemIndex === menuGroup.length - 1}
              onClick={item.onClick}
            >
              <MenuIcon>
                <item.icon size={20} strokeWidth={2} />
              </MenuIcon>
              <MenuContent>
                <MenuHeader>
                  <MenuLabel as={H3}>{item.label}</MenuLabel>
                  {item.count != null && <CountBadge>{item.count}</CountBadge>}
                </MenuHeader>
                <MenuDescription as={PMuted}>{item.description}</MenuDescription>
              </MenuContent>
              <MenuChevron>
                <ChevronRight size={20} />
              </MenuChevron>
            </MenuItem>
          ))}
        </MenuCard>
      ))}
    </>
  );
};

const MenuCard = styled(Card)`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  overflow: hidden;
  padding: 0;
`;

const MenuItem = styled.button<{ $isLast: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  align-items: center;
  background: transparent;
  border: none;
  border-bottom: ${({ $isLast, theme }) => ($isLast ? 'none' : `1px solid ${theme.colors.border}`)};
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background: ${({ theme }) => theme.primaryOpacity['10']};
  }
`;

const MenuIcon = styled.div`
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;

const MenuContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const MenuHeader = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const MenuLabel = styled(H3)``;

const CountBadge = styled(PrimaryBadge)``;

const MenuDescription = styled(PMuted)``;

const MenuChevron = styled.div`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.muted};
`;

