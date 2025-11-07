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

  const sectionStyle: React.CSSProperties = {
    marginBottom: '24px',
  };


  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '12px',
  };

  return (
    <div style={{ padding: '16px', paddingBottom: '32px' }}>
      {/* 이름 섹션 (이미지 업로드 포함) */}
      <div style={sectionStyle}>
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
      </div>

      {/* 등록구분 */}
      <div style={sectionStyle}>
        <TextInput
          label="등록구분"
          placeholder="내용을 입력해주세요."
          value={formData.registrationType}
          onChange={(e) => handleInputChange('registrationType', e.target.value)}
        />
      </div>

      {/* 이름 (두 번째) */}
      <div style={sectionStyle}>
        <TextInput
          label="이름"
          placeholder="내용을 입력해주세요."
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
      </div>

      {/* 한줄 소개 */}
      <div style={sectionStyle}>
        <TextInput
          label="한줄 소개"
          placeholder="내용을 입력해주세요."
          value={formData.oneLineIntro}
          onChange={(e) => handleInputChange('oneLineIntro', e.target.value)}
        />
      </div>

      {/* 상세소개 */}
      <div style={sectionStyle}>
        <TextInput
          label="상세소개"
          placeholder="내용을 입력해주세요."
          value={formData.detailedIntro}
          onChange={(e) => handleInputChange('detailedIntro', e.target.value)}
        />
      </div>

      {/* 웹사이트 */}
      <div style={sectionStyle}>
        <SectionTitle variant="default" marginBottom="12px">웹사이트</SectionTitle>
        <VerticalList showDividers={false}>
          {[0, 1, 2].map((index) => (
            <ListItem key={index} style={{ padding: '0', marginBottom: '12px' }}>
              <div style={rowStyle}>
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
              </div>
            </ListItem>
          ))}
        </VerticalList>
      </div>

      {/* 최근 라이브 링크 */}
      <div style={sectionStyle}>
        <TextInput
          label="최근 라이브 링크"
          placeholder="내용을 입력해주세요."
          value={formData.recentLiveLink}
          onChange={(e) => handleInputChange('recentLiveLink', e.target.value)}
        />
      </div>

      {/* 포트폴리오 */}
      <div style={sectionStyle}>
        <SectionTitle variant="default" marginBottom="12px">포트폴리오</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <FileUpload label="이력서" />
          <FileUpload label="포트폴리오" />
        </div>
      </div>

      {/* 연락처 */}
      <div style={sectionStyle}>
        <SectionTitle variant="default" marginBottom="12px">연락처</SectionTitle>
        <div style={rowStyle}>
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
        </div>
      </div>

      {/* 오픈채팅방 */}
      <div style={sectionStyle}>
        <SectionTitle variant="default" marginBottom="12px">오픈채팅방</SectionTitle>
        <div style={rowStyle}>
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
        </div>
      </div>

      {/* 태그 */}
      <div style={sectionStyle}>
        <SectionTitle variant="default" marginBottom="12px">태그</SectionTitle>
        <VerticalList showDividers={false}>
          {[0, 1, 2, 3, 4].map((index) => (
            <ListItem key={index} style={{ padding: '0', marginBottom: '12px' }}>
              <div style={rowStyle}>
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
              </div>
            </ListItem>
          ))}
        </VerticalList>
      </div>

      {/* 갤러리 */}
      <div style={sectionStyle}>
        <SectionTitle variant="default" marginBottom="12px">갤러리</SectionTitle>
        <ImageUpload size={120} />
      </div>

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
    </div>
  );
};

export default PortfolioRegisterPage;

