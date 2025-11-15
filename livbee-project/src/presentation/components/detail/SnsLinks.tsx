import React from 'react';
import InfoItem from '@/presentation/components/detail/InfoItem';

interface SnsLink {
  label: string;
  url: string;
}

interface SnsLinksProps {
  links: SnsLink[];
}

/**
 * SNS 링크를 표시하는 컴포넌트
 */
export const SnsLinks: React.FC<SnsLinksProps> = ({ links }) => {
  if (links.length === 0) {
    return null;
  }

  return (
    <InfoItem title="SNS">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--primary)',
              textDecoration: 'none',
              fontSize: 'var(--p2)',
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </InfoItem>
  );
};

