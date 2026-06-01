import React from 'react';
import styled from 'styled-components';

const SkeletonItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  animation: pulse 1.4s ease infinite;

  @keyframes pulse {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.6;
    }
  }
`;

const SkeletonAvatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.border};
`;

const SkeletonTextGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SkeletonLine = styled.div<{ $width?: string }>`
  height: 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.border};
  width: ${({ $width }) => $width || '100%'};
`;

interface MessageItemSkeletonProps {
  count?: number;
}

export const MessageItemSkeleton: React.FC<MessageItemSkeletonProps> = ({ count = 4 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonItem key={`skeleton-${index}`}>
          <SkeletonAvatar />
          <SkeletonTextGroup>
            <SkeletonLine $width="40%" />
            <SkeletonLine />
            <SkeletonLine $width="70%" />
          </SkeletonTextGroup>
        </SkeletonItem>
      ))}
    </>
  );
};

