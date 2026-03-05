import React from 'react';
import styled from 'styled-components';
import { Eye, MessageCircle, Heart } from 'lucide-react';
import type { CommunityPost } from '@/domain/entities/Community';
import { H3, PMuted, Caption } from '@/presentation/components/styled/Typography';
import { Badge } from '@/presentation/components/styled/CommonStyles';

interface CommunityPostCardProps {
  post: CommunityPost;
  onClick?: () => void;
}

export const CommunityPostCard: React.FC<CommunityPostCardProps> = ({ post, onClick }) => {
  return (
    <CardContainer type="button" onClick={onClick}>
      <CardHeader>
        <LeftTags>
          {post.topicTag && (
            <TagBadge $variant="secondary">
              <Caption>{post.topicTag}</Caption>
            </TagBadge>
          )}
          <CategoryBadge $variant="outline">
            <Caption>{post.categoryLabel}</Caption>
          </CategoryBadge>
        </LeftTags>
        {post.isHot && (
          <HotBadge>
            <Caption>HOT</Caption>
          </HotBadge>
        )}
      </CardHeader>

      <CardBody>
        <Title as={H3}>{post.title}</Title>
        <Preview as={PMuted}>{post.preview}</Preview>
      </CardBody>

      <CardFooter>
        <AuthorInfo>
          <AuthorName>{post.authorName}</AuthorName>
          {post.authorLevel && <AuthorLevel>{post.authorLevel}</AuthorLevel>}
          <Dot>·</Dot>
          <MetaText>{formatRelativeTime(post.createdAt)}</MetaText>
        </AuthorInfo>
        <Metrics>
          <MetricItem>
            <Eye size={14} />
            <MetricText>{post.viewCount}</MetricText>
          </MetricItem>
          <MetricItem>
            <MessageCircle size={14} />
            <MetricText>{post.commentCount}</MetricText>
          </MetricItem>
          <MetricItem>
            <Heart size={14} />
            <MetricText>{post.likeCount}</MetricText>
          </MetricItem>
        </Metrics>
      </CardFooter>
    </CardContainer>
  );
};

const CardContainer = styled.button`
  width: 100%;
  border: none;
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.card};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.06);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  cursor: pointer;
  text-align: left;
  transition: transform 0.12s ease-out, box-shadow 0.12s ease-out, background-color 0.12s ease-out;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const LeftTags = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
`;

const TagBadge = styled(Badge).attrs({ $variant: 'secondary' as const })`
  padding-inline: ${({ theme }) => theme.spacing.sm};
  padding-block: ${({ theme }) => theme.spacing.xs};
`;

const CategoryBadge = styled(Badge).attrs({ $variant: 'outline' as const })`
  padding-inline: ${({ theme }) => theme.spacing.sm};
  padding-block: ${({ theme }) => theme.spacing.xs};
`;

const HotBadge = styled(Badge)`
  padding-inline: ${({ theme }) => theme.spacing.sm};
  padding-block: ${({ theme }) => theme.spacing.xs};
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Title = styled(H3)`
  color: ${({ theme }) => theme.colors.foreground};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`;

const Preview = styled(PMuted)`
  color: ${({ theme }) => theme.colors.muted};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  min-width: 0;
`;

const AuthorName = styled(Caption)`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.foreground};
`;

const AuthorLevel = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

const Dot = styled.span`
  color: ${({ theme }) => theme.colors.muted};
`;

const MetaText = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

const Metrics = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 0;
`;

const MetricItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.muted};
`;

const MetricText = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

const formatRelativeTime = (isoDate: string): string => {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}일 전`;
  }
  if (hours > 0) {
    return `${hours}시간 전`;
  }
  if (minutes > 0) {
    return `${minutes}분 전`;
  }
  return '방금 전';
};

