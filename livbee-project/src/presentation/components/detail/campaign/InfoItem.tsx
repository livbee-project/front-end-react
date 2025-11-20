import React from 'react';

interface InfoItemProps {
  title: string;
  content?: string | number | null;
  children?: React.ReactNode;
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  padding: '12px 0',
  borderBottom: '1px solid #F1F3F5',
};

const titleStyle: React.CSSProperties = {
  fontSize: 'var(--p2)',
  color: 'var(--dark-gray)',
  fontWeight: 500,
};

const contentStyle: React.CSSProperties = {
  fontSize: 'var(--p2)',
  color: 'var(--black)',
  fontWeight: 600,
  lineHeight: 1.5,
};

const InfoItem: React.FC<InfoItemProps> = ({ title, content, children }) => {
  return (
    <div style={containerStyle}>
      <span style={titleStyle}>{title}</span>
      {children ?? <span style={contentStyle}>{content || '-'}</span>}
    </div>
  );
};

export default InfoItem;

