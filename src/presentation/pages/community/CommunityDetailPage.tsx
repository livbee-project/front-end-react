import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import StickyHeader from '@/presentation/components/detail/common/StickyHeader';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';
import { H2, PMuted, Caption } from '@/presentation/components/styled/Typography';
import { Eye, MessageCircle, Heart } from 'lucide-react';
import { useCommunityDetail } from '@/presentation/hooks/community/useCommunityDetail';
import { CommunityComments } from '@/presentation/components/community/CommunityComments';

const CommunityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { post, loading, error, liking, toggleLike } = useCommunityDetail(id);

  if (loading && !post) {
    return (
      <DetailPageLayout>
        <StickyHeader title="커뮤니티" />
        <LoadingState padding="40px" />
      </DetailPageLayout>
    );
  }

  if (error) {
    return (
      <DetailPageLayout>
        <StickyHeader title="커뮤니티" />
        <ErrorState
          message={error}
          padding="40px"
          onRetry={undefined}
        />
      </DetailPageLayout>
    );
  }

  if (!post) {
    return (
      <DetailPageLayout>
        <StickyHeader title="커뮤니티" />
        <ErrorState message="게시글을 찾을 수 없습니다." padding="40px" />
      </DetailPageLayout>
    );
  }

  return (
    <DetailPageLayout>
      <StickyHeader title="커뮤니티" />
      <DetailWrapper>
        <HeaderSection>
          <TagsRow>
            {post.topicTag && <TagBadge>{post.topicTag}</TagBadge>}
            <CategoryBadge>{post.categoryLabel}</CategoryBadge>
            {post.isHot && <HotBadge>HOT</HotBadge>}
          </TagsRow>
          <Title as={H2}>{post.title}</Title>
          <MetaRow>
            <Author>{post.authorName ?? '작성자'}</Author>
            {post.authorRole && (
              <AuthorRoleBadge>{post.authorRole === 'brand' ? '브랜드' : '쇼호스트'}</AuthorRoleBadge>
            )}
            <Dot>·</Dot>
            <MetaText>{formatRelativeTime(post.createdAt)}</MetaText>
          </MetaRow>
          <MetricsRow>
            <Metric>
              <Eye size={16} />
              <MetricText>{post.viewCount}</MetricText>
            </Metric>
            <Metric>
              <MessageCircle size={16} />
              <MetricText>{post.commentCount}</MetricText>
            </Metric>
            <LikeMetricButton
              type="button"
              onClick={() => {
                void toggleLike();
              }}
              disabled={liking}
              aria-pressed={post.isLiked === true}
            >
              <Heart
                size={16}
                color={post.isLiked ? '${({ theme }) => theme.colors.error}' : undefined}
                fill={post.isLiked ? '${({ theme }) => theme.colors.error}' : 'none'}
              />
              <MetricText>{post.likeCount}</MetricText>
            </LikeMetricButton>
          </MetricsRow>
        </HeaderSection>

        <ContentSection>
          {post.content.split('\n').map((line) => (
            <Paragraph key={line}>{line}</Paragraph>
          ))}
        </ContentSection>

        <CommunityComments postId={post.id} />
      </DetailWrapper>
    </DetailPageLayout>
  );
};

const DetailWrapper = styled.div`
  padding-top: ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const HeaderSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TagsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
`;

const TagBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.secondaryForeground};
  font: ${({ theme }) => theme.fonts.caption};
`;

const CategoryBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  font: ${({ theme }) => theme.fonts.caption};
`;

const HotBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  font: ${({ theme }) => theme.fonts.caption};
`;

const Title = styled(H2)`
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Author = styled(Caption)`
  font-weight: 500;
`;

const AuthorRoleBadge = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

const Dot = styled.span`
  color: ${({ theme }) => theme.colors.muted};
`;

const MetaText = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

const MetricsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

const Metric = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${({ theme }) => theme.colors.muted};
`;

const LikeMetricButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  border: none;
  padding: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

const MetricText = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

const ContentSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Paragraph = styled(PMuted)`
  white-space: pre-wrap;
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

export default CommunityDetailPage;

