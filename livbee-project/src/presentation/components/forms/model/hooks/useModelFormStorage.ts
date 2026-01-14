import type { ModelFormData, ModelToggleState } from '@/presentation/components/forms/model/types';
import { clearImageUrls } from '@/presentation/components/forms/model/utils/modelImageStorage';
import { useFormStorage } from '@/presentation/components/forms/shared/hooks/useFormStorage';

const FORM_STORAGE_KEY = 'model-register-form';
const TOGGLE_STORAGE_KEY = 'model-register-toggles';

const INITIAL_FORM_DATA: ModelFormData = {
  name: '',
  registrationType: 'model',
  oneLineIntro: '',
  detailedIntro: '',
  websites: [
    { related: '', content: '' },
    { related: '', content: '' },
    { related: '', content: '' },
  ],
  contact: '',
  openChat: '',
  tags: [
    { label: '키', value: '' },
    { label: '몸무게', value: '' },
    { label: '사이즈', value: '' },
    { label: '경력', value: '' },
    { label: '나이', value: '' },
  ],
};

const INITIAL_TOGGLE_STATE: ModelToggleState = {
  websites: [true, true, true],
  contact: true,
  openChat: true,
  tags: [true, true, true, true, true],
};

interface UseModelFormStorageOptions {
  formData: ModelFormData;
  setFormData: (data: ModelFormData) => void;
  toggles: ModelToggleState;
  setToggles: (data: ModelToggleState) => void;
  hasStoredImages: boolean;
  mainThumbnailUrl: string;
  galleryImageUrls: string[];
  onImageRestored?: () => void;
}

/**
 * 모델 등록 폼의 sessionStorage 관리 로직을 처리하는 훅
 * 제네릭 useFormStorage 훅을 사용하여 구현
 */
export const useModelFormStorage = ({
  formData,
  setFormData,
  toggles,
  setToggles,
  hasStoredImages,
  mainThumbnailUrl,
  galleryImageUrls,
  onImageRestored,
}: UseModelFormStorageOptions) => {
  return useFormStorage<ModelFormData, ModelToggleState>({
    formData,
    setFormData,
    toggles,
    setToggles,
    hasStoredImages,
    mainThumbnailUrl,
    galleryImageUrls,
    onImageRestored,
    formStorageKey: FORM_STORAGE_KEY,
    toggleStorageKey: TOGGLE_STORAGE_KEY,
    initialFormData: INITIAL_FORM_DATA,
    initialToggleState: INITIAL_TOGGLE_STATE,
    registerPagePath: '/models/register',
    clearImageUrls,
    hookName: 'useModelFormStorage',
  });
};

