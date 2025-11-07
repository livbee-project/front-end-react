import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import TextInput from '@/presentation/components/forms/TextInput';
import ToggleSwitch from '@/presentation/components/common/ToggleSwitch';
import FileUpload from '@/presentation/components/common/FileUpload';
import ImageUpload from '@/presentation/components/common/ImageUpload';
import VerticalList from '@/presentation/components/common/VerticalList';
import ListItem from '@/presentation/components/common/ListItem';
import Button from '@/presentation/components/common/Button';
import SectionTitle from '@/presentation/components/common/SectionTitle';
import RegisterPageLayout from '@/presentation/layouts/RegisterPageLayout';
import FormSection from '@/presentation/components/common/FormSection';
import FormRow from '@/presentation/components/common/FormRow';

/**
 * 포트폴리오 등록 페이지
 */
const PortfolioRegisterPage: React.FC = () => {
  // const navigate = useNavigate(); // TODO: 추후 사용 예정

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    registrationType: '',
    name: '',
    oneLineIntro: '',
    detailedIntro: '',
    websites: ['', '', ''],
    recentLiveLink: '',
    contact: '',
    openChat: '',
    tags: ['', '', '', '', ''],
  });

  const [toggles, setToggles] = useState({
    websites: [true, true, true],
    contact: true,
    openChat: true,
    tags: [true, true, true, true, true],
  });

  const handleInputChange = (field: string, value: string, index?: number) => {
    if (index !== undefined) {
      if (field === 'websites' || field === 'tags') {
        const newArray = [...formData[field as keyof typeof formData] as string[]];
        newArray[index] = value;
        setFormData({ ...formData, [field]: newArray });
      }
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleToggleChange = (field: string, index?: number) => {
    if (index !== undefined) {
      const newArray = [...toggles[field as keyof typeof toggles] as boolean[]];
      newArray[index] = !newArray[index];
      setToggles({ ...toggles, [field]: newArray });
    } else {
      setToggles({ ...toggles, [field]: !toggles[field as keyof typeof toggles] });
    }
  };

  const handleSubmit = () => {
    console.log('포트폴리오 등록:', formData);
    // TODO: 실제 등록 로직 구현
  };

  return (
    <RegisterPageLayout>
      {/* 이름 섹션 (이미지 업로드 포함) */}
      <FormSection>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <SectionTitle variant="default" marginBottom="12px">이름</SectionTitle>
            <div
              style={{
                fontSize: '12px',
                color: 'var(--dark-gray)',
                marginBottom: '12px',
              }}
            >
              P.농해물과 백두산이 마르고 덮도록
            </div>
          </div>
          <ImageUpload size={100} />
        </div>
      </FormSection>

      {/* 등록구분 */}
      <FormSection>
        <TextInput
          label="등록구분"
          placeholder="내용을 입력해주세요."
          value={formData.registrationType}
          onChange={(e) => handleInputChange('registrationType', e.target.value)}
        />
      </FormSection>

      {/* 이름 (두 번째) */}
      <FormSection>
        <TextInput
          label="이름"
          placeholder="내용을 입력해주세요."
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </FormSection>

      {/* 한줄 소개 */}
      <FormSection>
        <TextInput
          label="한줄 소개"
          placeholder="내용을 입력해주세요."
          value={formData.oneLineIntro}
          onChange={(e) => handleInputChange('oneLineIntro', e.target.value)}
        />
      </FormSection>

      {/* 상세소개 */}
      <FormSection>
        <TextInput
          label="상세소개"
          placeholder="내용을 입력해주세요."
          value={formData.detailedIntro}
          onChange={(e) => handleInputChange('detailedIntro', e.target.value)}
        />
      </FormSection>

      {/* 웹사이트 */}
      <FormSection title="웹사이트">
        <VerticalList showDividers={false}>
          {[0, 1, 2].map((index) => (
            <ListItem key={index} style={{ padding: '0', marginBottom: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <FormRow>
                  <span
                    style={{
                      fontSize: '12px',
                      color: 'var(--dark-gray)',
                      flexShrink: 0,
                      width: '80px',
                    }}
                  >
                    관리자 입력
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <TextInput
                      placeholder="내용을 입력해주세요."
                      value={formData.websites[index]}
                      onChange={(e) =>
                        handleInputChange('websites', e.target.value, index)
                      }
                    />
                  </div>
                  <ToggleSwitch
                    checked={toggles.websites[index]}
                    onChange={() => handleToggleChange('websites', index)}
                  />
                </FormRow>
              </div>
            </ListItem>
          ))}
        </VerticalList>
      </FormSection>

      {/* 최근 라이브 링크 */}
      <FormSection>
        <TextInput
          label="최근 라이브 링크"
          placeholder="내용을 입력해주세요."
          value={formData.recentLiveLink}
          onChange={(e) => handleInputChange('recentLiveLink', e.target.value)}
        />
      </FormSection>

      {/* 포트폴리오 */}
      <FormSection title="포트폴리오">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <FileUpload label="이력서" />
          <FileUpload label="포트폴리오" />
        </div>
      </FormSection>

      {/* 연락처 */}
      <FormSection title="연락처">
        <FormRow>
          <div style={{ flex: 1, minWidth: 0 }}>
            <TextInput
              placeholder="내용을 입력해주세요."
              value={formData.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
            />
          </div>
          <ToggleSwitch
            checked={toggles.contact}
            onChange={() => handleToggleChange('contact')}
          />
        </FormRow>
      </FormSection>

      {/* 오픈채팅방 */}
      <FormSection title="오픈채팅방">
        <FormRow>
          <div style={{ flex: 1, minWidth: 0 }}>
            <TextInput
              placeholder="내용을 입력해주세요."
              value={formData.openChat}
              onChange={(e) => handleInputChange('openChat', e.target.value)}
            />
          </div>
          <ToggleSwitch
            checked={toggles.openChat}
            onChange={() => handleToggleChange('openChat')}
          />
        </FormRow>
      </FormSection>

      {/* 태그 */}
      <FormSection title="태그">
        <VerticalList showDividers={false}>
          {[0, 1, 2, 3, 4].map((index) => (
            <ListItem key={index} style={{ padding: '0', marginBottom: '12px' }}>
              <FormRow>
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--dark-gray)',
                    flexShrink: 0,
                    width: '80px',
                  }}
                >
                  관리자 입력
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <TextInput
                    placeholder="내용을 입력해주세요."
                    value={formData.tags[index]}
                    onChange={(e) =>
                      handleInputChange('tags', e.target.value, index)
                    }
                  />
                </div>
                <ToggleSwitch
                  checked={toggles.tags[index]}
                  onChange={() => handleToggleChange('tags', index)}
                />
              </FormRow>
            </ListItem>
          ))}
        </VerticalList>
      </FormSection>

      {/* 갤러리 */}
      <FormSection title="갤러리">
        <ImageUpload size={120} />
      </FormSection>

      {/* 하단 버튼 */}
      <div style={{ marginTop: '32px' }}>
        <Button
          variant="primary"
          size="medium"
          fullWidth
          onClick={handleSubmit}
        >
          BUTTON
        </Button>
      </div>
    </RegisterPageLayout>
  );
};

export default PortfolioRegisterPage;

