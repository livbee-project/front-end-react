import React from 'react';
import Tag from '@/presentation/components/ui/Tag';

/**
 * TagContainer 컴포넌트가 받을 props 타입을 정의합니다.
 * @param tags - 태그 배열 (각 태그는 label과 variant를 포함)
 */
interface TagContainerProps {
  tags: Array<{ label: string; variant?: 'rounded' | 'circle' }>;
}

/**
 * 태그들을 표시하는 공통 컨테이너 컴포넌트입니다.
 * 일관된 레이아웃과 스타일을 제공합니다.
 */
const TagContainer: React.FC<TagContainerProps> = ({ tags }) => {
  /**
   * 태그 컨테이너 스타일
   */
  const tagContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  };

  return (
    <div style={tagContainerStyle}>
      {tags.map((tag, index) => (
        <Tag key={index} label={tag.label} variant={tag.variant || 'rounded'} />
      ))}
    </div>
  );
};

export default TagContainer;

