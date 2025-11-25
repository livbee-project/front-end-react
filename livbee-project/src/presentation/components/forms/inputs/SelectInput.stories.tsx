import type { Meta, StoryObj } from '@storybook/react';
import SelectInput from './SelectInput';
import styled from 'styled-components';
import React, { useState } from 'react';

const meta: Meta<typeof SelectInput> = {
  title: 'Forms/SelectInput',
  component: SelectInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '선택 입력 필드 컴포넌트입니다. 드롭다운 메뉴에서 옵션을 선택할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: '선택 가능한 옵션 리스트',
    },
    value: {
      control: 'text',
      description: '선택된 값',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectInput>;

const sampleOptions = [
  { value: '', label: '선택하세요' },
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];

// ===== 기본 선택 =====
export const Default: Story = {
  args: {
    options: sampleOptions,
    value: '',
  },
};

// ===== 다양한 옵션 =====
const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 400px;
`;

const categoryOptions = [
  { value: '', label: '카테고리 선택' },
  { value: 'fashion', label: '패션' },
  { value: 'beauty', label: '뷰티' },
  { value: 'lifestyle', label: '라이프스타일' },
  { value: 'tech', label: '테크' },
];

const regionOptions = [
  { value: '', label: '지역 선택' },
  { value: 'seoul', label: '서울' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' },
  { value: 'incheon', label: '인천' },
  { value: 'gwangju', label: '광주' },
  { value: 'daejeon', label: '대전' },
  { value: 'ulsan', label: '울산' },
];

export const Options: Story = {
  render: () => {
    const [category, setCategory] = useState('');
    const [region, setRegion] = useState('');

    return (
      <OptionContainer>
        <SelectInput
          options={categoryOptions}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <SelectInput
          options={regionOptions}
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
      </OptionContainer>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '다양한 옵션을 가진 선택 필드입니다.',
      },
    },
  },
};

// ===== 상태 =====
export const States: Story = {
  render: () => {
    const [selected, setSelected] = useState('option2');

    return (
      <OptionContainer>
        <SelectInput
          options={sampleOptions}
          value=""
          onChange={() => {}}
        />
        <SelectInput
          options={sampleOptions}
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
        />
        <SelectInput
          options={sampleOptions}
          value="option1"
          onChange={() => {}}
          disabled
        />
      </OptionContainer>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '선택 필드의 다양한 상태입니다. 기본, 선택됨, 비활성화 상태를 보여줍니다.',
      },
    },
  },
};

// ===== 사용 예시 =====
export const UsageExamples: Story = {
  render: () => {
    const [userType, setUserType] = useState('');
    const [gender, setGender] = useState('');
    const [ageRange, setAgeRange] = useState('');

    const userTypeOptions = [
      { value: '', label: '사용자 유형 선택' },
      { value: 'model', label: '모델' },
      { value: 'brand', label: '브랜드' },
      { value: 'general', label: '일반 사용자' },
    ];

    const genderOptions = [
      { value: '', label: '성별 선택' },
      { value: 'male', label: '남성' },
      { value: 'female', label: '여성' },
      { value: 'other', label: '기타' },
    ];

    const ageRangeOptions = [
      { value: '', label: '연령대 선택' },
      { value: '10s', label: '10대' },
      { value: '20s', label: '20대' },
      { value: '30s', label: '30대' },
      { value: '40s', label: '40대' },
      { value: '50s', label: '50대 이상' },
    ];

    return (
      <OptionContainer>
        <SelectInput
          options={userTypeOptions}
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        />
        <SelectInput
          options={genderOptions}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <SelectInput
          options={ageRangeOptions}
          value={ageRange}
          onChange={(e) => setAgeRange(e.target.value)}
        />
      </OptionContainer>
    );
  },
  parameters: {
    docs: {
      description: {
        story: '실제 사용 예시입니다. 폼에서 다양한 선택 필드로 사용할 수 있습니다.',
      },
    },
  },
};

