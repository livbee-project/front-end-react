/* eslint-disable react-refresh/only-export-components */
import React, { useState } from 'react';
import styled from 'styled-components';
import SelectInput from './SelectInput';

export const selectSampleOptions = [
  { value: '', label: '선택하세요' },
  { value: 'option1', label: '옵션 1' },
  { value: 'option2', label: '옵션 2' },
  { value: 'option3', label: '옵션 3' },
];

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

export const SelectInputOptionsDemo: React.FC = () => {
  const [category, setCategory] = useState('');
  const [region, setRegion] = useState('');

  return (
    <OptionContainer>
      <SelectInput options={categoryOptions} value={category} onChange={(e) => setCategory(e.target.value)} />
      <SelectInput options={regionOptions} value={region} onChange={(e) => setRegion(e.target.value)} />
    </OptionContainer>
  );
};

export const SelectInputStatesDemo: React.FC = () => {
  const [selected, setSelected] = useState('option2');

  return (
    <OptionContainer>
      <SelectInput options={selectSampleOptions} value="" onChange={() => {}} />
      <SelectInput options={selectSampleOptions} value={selected} onChange={(e) => setSelected(e.target.value)} />
      <SelectInput options={selectSampleOptions} value="option1" onChange={() => {}} disabled />
    </OptionContainer>
  );
};

export const SelectInputUsageDemo: React.FC = () => {
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
      <SelectInput options={userTypeOptions} value={userType} onChange={(e) => setUserType(e.target.value)} />
      <SelectInput options={genderOptions} value={gender} onChange={(e) => setGender(e.target.value)} />
      <SelectInput options={ageRangeOptions} value={ageRange} onChange={(e) => setAgeRange(e.target.value)} />
    </OptionContainer>
  );
};

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 400px;
`;

