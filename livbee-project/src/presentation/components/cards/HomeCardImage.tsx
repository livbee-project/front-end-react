import React from 'react';
import styled from 'styled-components';
import PlaceholderImage from '@/presentation/components/ui/PlaceholderImage';

const ImageWrapper = styled.div<{ $ratio: string }>`
  width: 100%;
  aspect-ratio: ${({ $ratio }) => $ratio};
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
  ratio?: string;
  children?: React.ReactNode;
}

export const HomeCardImage: React.FC<HomeCardImageProps> = ({ src, alt, ratio = '1 / 1', children }) => {
  return (
    <ImageWrapper $ratio={ratio}>
      {src ? <ImageElement src={src} alt={alt} /> : <PlaceholderImage size={48} />}
      {children}
    </ImageWrapper>
  );
};

