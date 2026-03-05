import React, { useState } from 'react';
import styled from 'styled-components';
import { Caption, PMuted } from '@/presentation/components/styled/Typography';
import { useCommunityComments } from '@/presentation/hooks/community/useCommunityComments';

interface CommunityCommentsProps {
  postId: string;
}

export const CommunityComments: React.FC<CommunityCommentsProps> = ({ postId }) => {
  const { comments, loading, error, submitting, create } = useCommunityComments(postId);
  const [value, setValue] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void create(value).then(() => {
      setValue('');
    });
  };

  return (
    <Wrapper>
      <HeaderRow>
        <Title>댓글</Title>
        <Count>{comments.length}</Count>
      </HeaderRow>

      <Form onSubmit={handleSubmit}>
        <TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="따뜻한 응원이나 의견을 남겨주세요."
          rows={3}
          disabled={submitting}
        />
        <SubmitButton type="submit" disabled={submitting}>
          {submitting ? '등록 중...' : '등록'}
        </SubmitButton>
      </Form>

      {loading && comments.length === 0 && (
        <InfoText>댓글을 불러오는 중입니다...</InfoText>
      )}

      {!loading && error && comments.length === 0 && <InfoText>{error}</InfoText>}

      {!loading && !error && comments.length === 0 && (
        <InfoText>첫 번째 댓글을 남겨보세요.</InfoText>
      )}

      <List>
        {comments.map((comment) => (
          <Item key={comment.id}>
            <Author>
              <AuthorName>사용자</AuthorName>
              <Dot>·</Dot>
              <CreatedAt>{formatRelativeTime(comment.createdAt)}</CreatedAt>
            </Author>
            <Content>{comment.content}</Content>
          </Item>
        ))}
      </List>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Title = styled.h3`
  margin: 0;
  font: ${({ theme }) => theme.fonts.h3};
  color: ${({ theme }) => theme.colors.foreground};
`;

const Count = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TextArea = styled.textarea`
  width: 100%;
  resize: vertical;
  min-height: 80px;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.foreground};
  font: ${({ theme }) => theme.fonts.body};
  outline: none;

  &:focus-visible {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary}33;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
  }
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  font: ${({ theme }) => theme.fonts.button};
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s, opacity 0.1s;

  &:active:enabled {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Item = styled.li`
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.card};
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const AuthorName = styled(Caption)`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.foreground};
`;

const Dot = styled.span`
  color: ${({ theme }) => theme.colors.muted};
`;

const CreatedAt = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

const Content = styled(PMuted)`
  white-space: pre-wrap;
`;

const InfoText = styled(PMuted)`
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

