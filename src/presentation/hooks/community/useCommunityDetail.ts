import { useEffect, useState, useCallback } from 'react';
import { CommunityRepository } from '@/data/repositories/CommunityRepository';
import type { CommunityPostDetail } from '@/domain/entities/Community';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useToast } from '@/presentation/contexts/ToastContext';
import { error as logError } from '@/shared/utils/logger';

interface UseCommunityDetailResult {
  post: CommunityPostDetail | null;
  loading: boolean;
  error: string | null;
  liking: boolean;
  toggleLike: () => Promise<void>;
}

export const useCommunityDetail = (id?: string): UseCommunityDetailResult => {
  const communityRepository = useRepository(CommunityRepository);
  const { showToast } = useToast();

  const [post, setPost] = useState<CommunityPostDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [liking, setLiking] = useState<boolean>(false);

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

  const toggleLike = useCallback(async () => {
    if (!post || liking) {
      return;
    }

    setLiking(true);
    const prev = post;
    const optimistic: CommunityPostDetail = {
      ...prev,
      isLiked: !prev.isLiked,
      likeCount: prev.likeCount + (prev.isLiked ? -1 : 1),
    };
    setPost(optimistic);

    try {
      const response = prev.isLiked
        ? await communityRepository.unlikePost(prev.id)
        : await communityRepository.likePost(prev.id);

      setPost((current) =>
        current
          ? {
              ...current,
              isLiked: response.data.isLiked,
              likeCount: response.data.likeCount,
            }
          : current
      );
    } catch (err) {
      // 롤백
      setPost(prev);
       
      logError('useCommunityDetail', '좋아요 토글 실패', err);
      showToast('좋아요 처리 중 오류가 발생했습니다.', undefined, 'error');
    } finally {
      setLiking(false);
    }
  }, [communityRepository, liking, post, showToast]);

  return {
    post,
    loading,
    error,
    liking,
    toggleLike,
  };
};

