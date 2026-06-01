import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.secondary};
  padding-bottom: 80px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 500;
`;

export const HeaderSection = styled.div`
  padding: 20px 16px;
  background: ${({ theme }) => theme.colors.surface};
`;

export const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 8px 0;
`;

export const PageSubtitle = styled.p`
  font-size: 0.875rem;
  color: #9297af;
  margin: 0 0 20px 0;
`;

export const ContentSection = styled.div`
  padding: 20px 16px;
`;

export const FilterSection = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s;

  background: ${({ $active }) => ($active ? '#5a64ff' : '${({ theme }) => theme.colors.surface}')};
  color: ${({ $active }) => ($active ? '${({ theme }) => theme.colors.surface}' : '${({ theme }) => theme.colors.text}')};
  border: ${({ $active }) => ($active ? 'none' : '1px solid ${({ theme }) => theme.colors.border}')};

  &:hover {
    background: ${({ $active }) => ($active ? '#4a54e8' : '${({ theme }) => theme.colors.secondary}')};
  }
`;

export const CampaignCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const CompanyName = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const StatusBadges = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const StatusBadge = styled.span<{
  $variant: 'accepted' | 'pending' | 'rejected' | 'in-progress' | 'recruiting' | 'completed';
}>`
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;

  ${({ $variant }) => {
    switch ($variant) {
      case 'accepted':
        return 'background: #3cd25a; color: ${({ theme }) => theme.colors.surface};';
      case 'pending':
        return 'background: #ffa726; color: ${({ theme }) => theme.colors.surface};';
      case 'rejected':
        return 'background: #ff4757; color: ${({ theme }) => theme.colors.surface};';
      case 'in-progress':
        return 'background: #edf0ff; color: #5a64ff;';
      case 'recruiting':
        return 'background: #e8f5e9; color: #2e7d32;';
      case 'completed':
        return 'background: #f5f5f5; color: #757575;';
      default:
        return 'background: ${({ theme }) => theme.colors.secondary}; color: ${({ theme }) => theme.colors.text};';
    }
  }}
`;

export const CampaignTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 12px 0;
`;

export const CampaignInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
`;

export const CategoryTag = styled.span`
  padding: 4px 10px;
  border-radius: 12px;
  background: #f4f5ff;
  color: #5a64ff;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};

  svg {
    width: 16px;
    height: 16px;
    color: #9297af;
  }
`;

export const Requirement = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Compensation = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};

  svg {
    width: 16px;
    height: 16px;
    color: #5a64ff;
  }
`;

export const ApplicationDate = styled.div`
  font-size: 0.875rem;
  color: #9297af;
`;

