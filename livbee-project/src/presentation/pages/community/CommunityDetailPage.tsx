import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import DetailPageLayout from '@/presentation/layouts/DetailPageLayout';
import StickyHeader from '@/presentation/components/detail/common/StickyHeader';
import { CommunityRepository } from '@/data/repositories/CommunityRepository';
import type { CommunityPostDetail } from '@/domain/entities/Community';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';
import { H2, PMuted, Caption } from '@/presentation/components/styled/Typography';
import { Eye, MessageCircle, Heart } from 'lucide-react';

const CommunityDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const communityRepository = useRepository(CommunityRepository);

  const [post, setPost] = useState<CommunityPostDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('게시글 ID가 올바르지 않습니다.');
      setLoading(false);
      return;
    }

    const abortController = new AbortController();

    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await communityRepository.getPostDetail(id, abortController.signal);
        setPost(response.data);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError('게시글을 불러오는 중 오류가 발생했습니다.');
        setPost(null);
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchDetail();

    return () => {
      abortController.abort();
    };
  }, [communityRepository, id]);

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
            <Author>{post.authorName}</Author>
            {post.authorLevel && <AuthorLevel>{post.authorLevel}</AuthorLevel>}
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
            <Metric>
              <Heart size={16} />
              <MetricText>{post.likeCount}</MetricText>
            </Metric>
          </MetricsRow>
        </HeaderSection>

        <ContentSection>
          {post.content.split('\n').map((line) => (
            <Paragraph key={line}>{line}</Paragraph>
          ))}
        </ContentSection>

        <PlaceholderSection>
          <PlaceholderText>댓글 기능은 추후 제공 예정입니다.</PlaceholderText>
        </PlaceholderSection>
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

const AuthorLevel = styled(Caption)`
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

const PlaceholderSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.colors.secondary};
`;

const PlaceholderText = styled(PMuted)`
  text-align: center;
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

