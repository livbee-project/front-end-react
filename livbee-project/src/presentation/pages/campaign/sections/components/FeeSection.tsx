import React from 'react';
import TextInput from '@/presentation/components/forms/inputs/TextInput';
import {
  FeeContainer,
  FeeInputWrapper,
  CheckboxContainer,
  CheckboxInput,
  CheckboxLabel,
} from '@/presentation/pages/campaign/sections/styles/campaignRegisterSectionStyles';

interface FeeSectionProps {
  fee: string;
  feeNegotiable: boolean;
  onFeeChange: (value: string) => void;
  onFeeNegotiableChange: (checked: boolean) => void;
}

/**
 * 수당 입력 섹션 컴포넌트
 */
export const FeeSection: React.FC<FeeSectionProps> = ({
  fee,
  feeNegotiable,
  onFeeChange,
  onFeeNegotiableChange,
}) => {
  return (
    <FeeContainer>
      <FeeInputWrapper>
        <TextInput
          type="number"
          placeholder="금액을 입력해주세요"
          value={fee}
          onChange={(e) => onFeeChange(e.target.value)}
          disabled={feeNegotiable}
        />
      </FeeInputWrapper>
      <CheckboxContainer>
        <CheckboxInput
          type="checkbox"
          id="feeNegotiable"
          checked={feeNegotiable}
          onChange={(e) => {
            const isChecked = e.target.checked;
            onFeeNegotiableChange(isChecked);
            // 협의 가능으로 체크하면 수당 필드 초기화
            if (isChecked) {
              onFeeChange('');
            }
          }}
        />
        <CheckboxLabel htmlFor="feeNegotiable">협의 가능</CheckboxLabel>
      </CheckboxContainer>
    </FeeContainer>
  );
};

