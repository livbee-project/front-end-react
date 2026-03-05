import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { X, Eye, MessageCircle, Heart } from 'lucide-react';
import { H2, PMuted, Caption } from '@/presentation/components/styled/Typography';
import { useCommunityDetail } from '@/presentation/hooks/community/useCommunityDetail';
import { LoadingState } from '@/presentation/components/states/LoadingState';
import { ErrorState } from '@/presentation/components/states/ErrorState';

const CommunityDetailModal: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { post, loading, error } = useCommunityDetail(id);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <Overlay>
      <ModalContainer>
        <ModalHeader>
          <HeaderTitle>게시글</HeaderTitle>
          <CloseButton type="button" onClick={handleClose} aria-label="닫기">
            <X size={20} />
          </CloseButton>
        </ModalHeader>

        <ModalBody>
          {loading && !post && <LoadingState padding="24px" />}
          {error && !post && <ErrorState message={error} padding="24px" />}
          {!loading && !error && !post && <ErrorState message="게시글을 찾을 수 없습니다." padding="24px" />}

          {post && (
            <>
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
            </>
          )}
        </ModalBody>
      </ModalContainer>
    </Overlay>
  );
};

export default CommunityDetailModal;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.35);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 4rem 1rem 2rem;
  z-index: 120;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: center;
  }
`;

const ModalContainer = styled.div`
  width: 100%;
  max-width: 480px;
  max-height: 100%;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const HeaderTitle = styled.span`
  font: ${({ theme }) => theme.fonts.h2};
  color: ${({ theme }) => theme.colors.foreground};
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.muted};
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

const ModalBody = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
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
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const Paragraph = styled(PMuted)`
  white-space: pre-wrap;
`;

const PlaceholderSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md};
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

