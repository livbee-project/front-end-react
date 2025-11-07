import React, { useState } from 'react';
import TextInput from '@/presentation/components/forms/TextInput';
import ToggleSwitch from '@/presentation/components/common/ToggleSwitch';
import FileUpload from '@/presentation/components/common/FileUpload';
import ImageUpload from '@/presentation/components/common/ImageUpload';
import VerticalList from '@/presentation/components/common/VerticalList';
import ListItem from '@/presentation/components/common/ListItem';

/**
 * 모델 등록 페이지
 */
const ModelRegisterPage: React.FC = () => {
  // 폼 상태 관리
  const [formData, setFormData] = useState({
    name: '',
    registrationType: '',
    oneLineIntro: '',
    detailedIntro: '',
    websites: [
      { related: '', content: '' },
      { related: '', content: '' },
      { related: '', content: '' },
    ],
    contact: '',
    openChat: '',
    tags: [
      { label: '키', value: '' },
      { label: '몸무게', value: '' },
      { label: '사이즈', value: '' },
      { label: '경력', value: '' },
      { label: '나이', value: '' },
    ],
  });

  const [toggles, setToggles] = useState({
    websites: [true, true, true],
    contact: true,
    openChat: true,
    tags: [true, true, true, true, true],
  });

  const handleInputChange = (
    field: string,
    value: string,
    index?: number,
    subField?: string
  ) => {
    if (index !== undefined) {
      if (field === 'websites') {
        const newArray = [...formData.websites];
        if (subField) {
          newArray[index] = { ...newArray[index], [subField]: value };
        }
        setFormData({ ...formData, websites: newArray });
      } else if (field === 'tags') {
        const newArray = [...formData.tags];
        newArray[index] = { ...newArray[index], value };
        setFormData({ ...formData, tags: newArray });
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
    console.log('모델 등록:', formData);
    // TODO: 실제 등록 로직 구현
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '24px',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: 'var(--h3)',
    fontWeight: 400,
    color: 'var(--black)',
    marginBottom: '12px',
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
            <div style={sectionTitleStyle}>이름</div>
            <TextInput
              placeholder="내용을 입력해주세요"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          </div>
          <ImageUpload size={100} />
        </div>
      </div>

      {/* 등록구분 */}
      <div style={sectionStyle}>
        <TextInput
          label="등록구분"
          placeholder="내용을 입력해주세요"
          value={formData.registrationType}
          onChange={(e) => handleInputChange('registrationType', e.target.value)}
        />
      </div>

      {/* 한 줄 소개 */}
      <div style={sectionStyle}>
        <TextInput
          label="한 줄 소개"
          placeholder="내용을 입력해주세요"
          value={formData.oneLineIntro}
          onChange={(e) => handleInputChange('oneLineIntro', e.target.value)}
        />
      </div>

      {/* 상세 소개 */}
      <div style={sectionStyle}>
        <TextInput
          label="상세 소개"
          placeholder="내용을 입력해주세요"
          value={formData.detailedIntro}
          onChange={(e) => handleInputChange('detailedIntro', e.target.value)}
        />
      </div>

      {/* 웹사이트 */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>웹사이트</div>
        <VerticalList showDividers={false}>
          {[0, 1, 2].map((index) => (
            <ListItem key={index} style={{ padding: '0', marginBottom: '12px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={rowStyle}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <TextInput
                      placeholder="관련 입력값"
                      value={formData.websites[index].related}
                      onChange={(e) =>
                        handleInputChange('websites', e.target.value, index, 'related')
                      }
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <TextInput
                      placeholder="내용을 입력해주세요"
                      value={formData.websites[index].content}
                      onChange={(e) =>
                        handleInputChange('websites', e.target.value, index, 'content')
                      }
                    />
                  </div>
                  <ToggleSwitch
                    checked={toggles.websites[index]}
                    onChange={() => handleToggleChange('websites', index)}
                  />
                </div>
              </div>
            </ListItem>
          ))}
        </VerticalList>
      </div>

      {/* 포트폴리오 */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>포트폴리오</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <FileUpload label="아바타" />
          <FileUpload label="모드볼륨2" />
        </div>
      </div>

      {/* 연락처 */}
      <div style={sectionStyle}>
        <div style={sectionTitleStyle}>연락처</div>
        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <TextInput
              placeholder="내용을 입력해주세요"
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
        <div style={sectionTitleStyle}>오픈채팅방</div>
        <div style={rowStyle}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <TextInput
              placeholder="내용을 입력해주세요"
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
        <div style={sectionTitleStyle}>태그</div>
        <VerticalList showDividers={false}>
          {formData.tags.map((tag, index) => (
            <ListItem key={index} style={{ padding: '0', marginBottom: '12px' }}>
              <div style={rowStyle}>
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--dark-gray)',
                    flexShrink: 0,
                    width: '60px',
                  }}
                >
                  {tag.label}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <TextInput
                    placeholder="내용을 입력해주세요"
                    value={tag.value}
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
        <div style={sectionTitleStyle}>갤러리</div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
          }}
        >
          {Array.from({ length: 9 }).map((_, index) => (
            <ImageUpload key={index} size={100} />
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div style={{ marginTop: '32px' }}>
        <button
          onClick={handleSubmit}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: 'var(--primary)',
            color: 'var(--white)',
            border: 'none',
            borderRadius: 12,
            fontSize: 'var(--h3)',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          BUTTON
        </button>
      </div>
    </div>
  );
};

export default ModelRegisterPage;

