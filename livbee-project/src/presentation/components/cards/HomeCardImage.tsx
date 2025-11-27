import React from 'react';
import styled from 'styled-components';
import PlaceholderImage from '@/presentation/components/ui/PlaceholderImage';

const ImageWrapper = styled.div<{ $aspectRatio: string }>`
  width: 100%;
  aspect-ratio: ${({ $aspectRatio }) => $aspectRatio};
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const ImageElement = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;

  ${ImageWrapper}:hover & {
    transform: scale(1.05);
  }
`;

export interface HomeCardImageProps {
  src?: string;
  alt: string;
  aspectRatio?: string;
  children?: React.ReactNode;
}

export const HomeCardImage: React.FC<HomeCardImageProps> = ({ src, alt, aspectRatio = '1 / 1', children }) => {
  return (
    <ImageWrapper $aspectRatio={aspectRatio}>
      {src ? <ImageElement src={src} alt={alt} loading="lazy" decoding="async" /> : <PlaceholderImage size={48} />}
      {children}
    </ImageWrapper>
  );
};

