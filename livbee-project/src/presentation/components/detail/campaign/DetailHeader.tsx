import React from 'react';
import Tag from '@/presentation/components/ui/Tag';
import PlaceholderImage from '@/presentation/components/ui/PlaceholderImage';

interface DetailHeaderProps {
  imageUrl?: string;
  brandName: string;
  deadlineDay?: string;
  title: string;
  content: string;
  onImageClick?: () => void;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({
  imageUrl,
  brandName,
  deadlineDay,
  title,
  content,
  onImageClick,
}) => {
  const imageContainerStyle: React.CSSProperties = {
    width: '100%',
    aspectRatio: '16 / 9',
    backgroundColor: '#F7F8FA',
    border: '1px solid #ECEFF1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: onImageClick ? 'pointer' : 'default',
    overflow: 'hidden',
    position: 'relative',
  };

  const imageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const infoContainerStyle: React.CSSProperties = {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  };

  const brandTagContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  };

  const brandNameStyle: React.CSSProperties = {
    fontSize: 'var(--p2)',
    fontWeight: 400,
    color: 'var(--dark-gray)',
    flex: 1,
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 'var(--h1)',
    fontWeight: 700,
    color: 'var(--black)',
    lineHeight: 1.4,
  };

  const contentStyle: React.CSSProperties = {
    fontSize: 'var(--p2)',
    fontWeight: 400,
    color: 'var(--dark-gray)',
    lineHeight: 1.5,
  };

  return (
    <div>
      <div style={imageContainerStyle} onClick={onImageClick}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} style={imageStyle} />
        ) : (
          <PlaceholderImage size={64} />
        )}
      </div>

      <div style={infoContainerStyle}>
        <div style={brandTagContainerStyle}>
          <span style={brandNameStyle}>{brandName}</span>
          {deadlineDay && <Tag label={`마감 ${deadlineDay}`} variant="rounded" />}
        </div>
        <h1 style={titleStyle}>{title}</h1>
        <p style={contentStyle}>{content}</p>
      </div>
    </div>
  );
};

export default DetailHeader;

