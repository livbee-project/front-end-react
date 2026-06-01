import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/app/routes/routeMeta';
import { CommunityRepository } from '@/data/repositories/CommunityRepository';
import type { CommunityCategoryCode } from '@/domain/entities/Community';
import { CreateCommunityPostUseCase } from '@/domain/usecases/community/CreateCommunityPostUseCase';
import { useRepository } from '@/presentation/hooks/common/useRepository';
import { useToast } from '@/presentation/contexts/ToastContext';
import { useCloudinaryUpload } from '@/presentation/hooks/common/useCloudinaryUpload';

const MAX_TITLE_LENGTH = 100;
const MAX_CONTENT_LENGTH = 2000;
const MAX_IMAGES = 5;

type FieldErrors = {
  category?: string;
  title?: string;
  content?: string;
  images?: string;
};

export interface CommunityPostImage {
  id: string;
  file: File;
  previewUrl: string;
}

export const useCommunityPostWriteForm = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const communityRepository = useRepository(CommunityRepository);
  const createPostUseCase = useMemo(
    () => new CreateCommunityPostUseCase(communityRepository),
    [communityRepository]
  );
  const { uploadFile, isUploading: isImageUploading } = useCloudinaryUpload();

  const [category, setCategory] = useState<CommunityCategoryCode>('free');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<CommunityPostImage[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const titleLength = title.length;
  const contentLength = content.length;

  const handleCategoryChange = useCallback((nextCategory: CommunityCategoryCode) => {
    setCategory(nextCategory);
    setErrors((prev) => ({ ...prev, category: undefined }));
  }, []);

  const handleTitleChange = useCallback((value: string) => {
    const trimmed = value.slice(0, MAX_TITLE_LENGTH);
    setTitle(trimmed);
    setErrors((prev) => ({ ...prev, title: undefined }));
  }, []);

  const handleContentChange = useCallback((value: string) => {
    const trimmed = value.slice(0, MAX_CONTENT_LENGTH);
    setContent(trimmed);
    setErrors((prev) => ({ ...prev, content: undefined }));
  }, []);

  const handleImageAdd = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) {
        return;
      }

      const currentCount = images.length;
      const availableSlots = MAX_IMAGES - currentCount;

      if (availableSlots <= 0) {
        showToast(`이미지는 최대 ${MAX_IMAGES}장까지 업로드 가능합니다.`, undefined, 'error');
        return;
      }

      const selectedFiles = Array.from(files).slice(0, availableSlots);
      const nextImages: CommunityPostImage[] = [];

      selectedFiles.forEach((file) => {
        if (!file.type.startsWith('image/')) {
          return;
        }

        const previewUrl = URL.createObjectURL(file);
        nextImages.push({
          id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2)}`,
          file,
          previewUrl,
        });
      });

      if (nextImages.length === 0) {
        return;
      }

      setImages((prev) => [...prev, ...nextImages]);
      setErrors((prev) => ({ ...prev, images: undefined }));
    },
    [images.length, showToast]
  );

  const handleImageRemove = useCallback((id: string) => {
    setImages((prev) => {
      const target = prev.find((image) => image.id === id);
      if (target) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((image) => image.id !== id);
    });
  }, []);

  const validate = useCallback((): FieldErrors => {
    const nextErrors: FieldErrors = {};
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!category) {
      nextErrors.category = '카테고리를 선택해주세요.';
    }

    if (!trimmedTitle) {
      nextErrors.title = '제목을 입력해주세요.';
    } else if (trimmedTitle.length > MAX_TITLE_LENGTH) {
      nextErrors.title = `제목은 최대 ${MAX_TITLE_LENGTH}자까지 입력할 수 있습니다.`;
    }

    if (!trimmedContent) {
      nextErrors.content = '내용을 입력해주세요.';
    } else if (trimmedContent.length > MAX_CONTENT_LENGTH) {
      nextErrors.content = `내용은 최대 ${MAX_CONTENT_LENGTH}자까지 입력할 수 있습니다.`;
    }

    if (images.length > MAX_IMAGES) {
      nextErrors.images = `이미지는 최대 ${MAX_IMAGES}장까지 업로드 가능합니다.`;
    }

    return nextErrors;
  }, [category, content, images.length, title]);

  const canSubmit = useMemo(() => {
    const hasBasicValues = category && title.trim().length > 0 && content.trim().length > 0;
    return hasBasicValues && !isSubmitting && !isImageUploading;
  }, [category, content, isImageUploading, isSubmitting, title]);

  const submit = useCallback(async () => {
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      const firstError = nextErrors.category || nextErrors.title || nextErrors.content || nextErrors.images;
      if (firstError) {
        showToast(firstError, undefined, 'error');
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const imageUrls: string[] = [];

      for (const image of images) {
        const url = await uploadFile(image.file, {
          type: 'image',
          category: 'news',
        });

        if (!url) {
          showToast('이미지 업로드에 실패했습니다. 로그인 상태를 확인해주세요.', undefined, 'error');
          setIsSubmitting(false);
          return;
        }

        imageUrls.push(url);
      }

      const created = await createPostUseCase.execute({
        category,
        title: title.trim(),
        content: content.trim(),
        images: imageUrls,
      });

      showToast('게시글이 등록되었습니다.', undefined, 'success');

      navigate(ROUTE_PATHS.communityDetail.replace(':id', created.id), {
        replace: true,
      });
    } catch (error) {
       
      console.error('[useCommunityPostWriteForm] 게시글 생성 실패:', error);
      showToast('게시글 등록 중 오류가 발생했습니다.', undefined, 'error');
    } finally {
      setIsSubmitting(false);
    }
  }, [
    category,
    content,
    createPostUseCase,
    images,
    navigate,
    showToast,
    title,
    uploadFile,
    validate,
  ]);

  const handleSubmitForm = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!canSubmit) {
        const nextErrors = validate();
        setErrors(nextErrors);
        const firstError =
          nextErrors.category || nextErrors.title || nextErrors.content || nextErrors.images;
        if (firstError) {
          showToast(firstError, undefined, 'error');
        }
        return;
      }

      void submit();
    },
    [canSubmit, submit, validate, showToast]
  );

  return {
    category,
    title,
    content,
    images,
    errors,
    titleLength,
    contentLength,
    isSubmitting,
    isImageUploading,
    canSubmit,
    handleCategoryChange,
    handleTitleChange,
    handleContentChange,
    handleImageAdd,
    handleImageRemove,
    handleSubmitForm,
  };
};

