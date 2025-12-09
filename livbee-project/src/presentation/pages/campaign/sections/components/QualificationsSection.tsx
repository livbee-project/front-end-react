import React from 'react';
import styled from 'styled-components';
import { Plus, X } from 'lucide-react';
import TextInput from '@/presentation/components/forms/inputs/TextInput';

interface QualificationsSectionProps {
  qualifications: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
}

const QualificationsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const QualificationItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const QualificationInput = styled.div`
  flex: 1;
`;

const RemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.error};
  color: white;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.error};
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px dashed ${({ theme }) => theme.colors.border || '#ddd'};
  border-radius: ${({ theme }) => theme.radii.md};
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.primaryOpacity['10']};
  }
`;

const MAX_QUALIFICATIONS = 10;

export const QualificationsSection: React.FC<QualificationsSectionProps> = ({
  qualifications,
  onAdd,
  onRemove,
  onChange,
}) => {
  const canAdd = qualifications.length < MAX_QUALIFICATIONS;
  // 첫번째 항목도 삭제 가능 (초기화됨)
  const canRemove = qualifications.length > 0;

  return (
    <QualificationsList>
      {qualifications.map((qualification, index) => (
        <QualificationItem key={index}>
          <QualificationInput>
            <TextInput
              placeholder="자격 요건을 입력해주세요"
              value={qualification}
              onChange={(e) => onChange(index, e.target.value)}
            />
          </QualificationInput>
          <RemoveButton
            type="button"
            onClick={() => onRemove(index)}
            disabled={!canRemove}
            aria-label="자격 요건 삭제"
          >
            <X size={16} />
          </RemoveButton>
        </QualificationItem>
      ))}
      {canAdd && (
        <AddButton type="button" onClick={onAdd}>
          <Plus size={20} />
          <span>항목 추가</span>
        </AddButton>
      )}
    </QualificationsList>
  );
};

