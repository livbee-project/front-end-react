import { useEffect, useState } from 'react';
import { CommunityRepository } from '@/data/repositories/CommunityRepository';
import type { CommunityPostDetail } from '@/domain/entities/Community';
import { useRepository } from '@/presentation/hooks/common/useRepository';

interface UseCommunityDetailResult {
  post: CommunityPostDetail | null;
  loading: boolean;
  error: string | null;
}

export const useCommunityDetail = (id?: string): UseCommunityDetailResult => {
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

  return {
    post,
    loading,
    error,
  };
};

