import { useCallback, useEffect, useState } from 'react';
import { CommunityRepository } from '@/data/repositories/CommunityRepository';
import type { CommunityComment } from '@/domain/entities/Community';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useToast } from '@/presentation/contexts/ToastContext';
import { error as logError } from '@/shared/utils/logger';

interface UseCommunityCommentsResult {
  comments: CommunityComment[];
  loading: boolean;
  error: string | null;
  submitting: boolean;
  load: () => void;
  create: (content: string) => Promise<void>;
}

export const useCommunityComments = (postId?: string): UseCommunityCommentsResult => {
  const communityRepository = useRepository(CommunityRepository);
  const { showToast } = useToast();

  const [comments, setComments] = useState<CommunityComment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const load = useCallback(() => {
    if (!postId) {
      setError('게시글 ID가 올바르지 않습니다.');
      return;
    }

    const abortController = new AbortController();

    setLoading(true);
    setError(null);

    communityRepository
      .getComments(postId, abortController.signal)
      .then((response) => {
        setComments(response.items);
      })
      .catch((err) => {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError('댓글을 불러오는 중 오류가 발생했습니다.');
        setComments([]);
      })
      .finally(() => {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      });
  }, [communityRepository, postId]);

  useEffect(() => {
    load();
  }, [load]);

  const create = useCallback(
    async (content: string) => {
      if (!postId) {
        showToast('게시글 정보가 올바르지 않습니다.', undefined, 'error');
        return;
      }

      const trimmed = content.trim();
      if (!trimmed) {
        showToast('댓글 내용을 입력해주세요.', undefined, 'error');
        return;
      }

      setSubmitting(true);
      try {
        await communityRepository.createComment(postId, { content: trimmed }, undefined);
        const refreshed = await communityRepository.getComments(postId, undefined);
        setComments(refreshed.items);
      } catch (error) {
         
        logError('useCommunityComments', '댓글 작성 실패', error);
        showToast('댓글 작성 중 오류가 발생했습니다.', undefined, 'error');
      } finally {
        setSubmitting(false);
      }
    },
    [communityRepository, postId, showToast]
  );

  return {
    comments,
    loading,
    error,
    submitting,
    load,
    create,
  };
};

