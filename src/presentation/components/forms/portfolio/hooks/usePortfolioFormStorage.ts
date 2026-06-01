import type { PortfolioFormData, PortfolioToggleState } from '@/presentation/components/forms/portfolio/types';
import { clearImageUrls } from '@/presentation/components/forms/portfolio/utils/portfolioImageStorage';
import { useFormStorage } from '@/presentation/components/forms/shared/hooks/useFormStorage';

const FORM_STORAGE_KEY = 'portfolio-register-form';
const TOGGLE_STORAGE_KEY = 'portfolio-register-toggles';

const INITIAL_FORM_DATA: PortfolioFormData = {
  registrationType: 'showhost',
  name: '',
  oneLineIntro: '',
  detailedIntro: '',
  websites: ['', '', ''],
  recentLiveLink: '',
  contact: '',
  openChat: '',
  tags: ['', '', '', '', ''],
};

const INITIAL_TOGGLE_STATE: PortfolioToggleState = {
  websites: [true, true, true],
  contact: true,
  openChat: true,
  tags: [true, true, true, true, true],
};

interface UsePortfolioFormStorageOptions {
  formData: PortfolioFormData;
  setFormData: (data: PortfolioFormData) => void;
  toggles: PortfolioToggleState;
  setToggles: (data: PortfolioToggleState) => void;
  hasStoredImages: boolean;
  mainThumbnailUrl: string;
  galleryImageUrls: string[];
  onImageRestored?: () => void;
}

/**
 * 포트폴리오 등록 폼의 sessionStorage 관리 로직을 처리하는 훅
 * 제네릭 useFormStorage 훅을 사용하여 구현
 */
export const usePortfolioFormStorage = ({
  formData,
  setFormData,
  toggles,
  setToggles,
  hasStoredImages,
  mainThumbnailUrl,
  galleryImageUrls,
  onImageRestored,
}: UsePortfolioFormStorageOptions) => {
  return useFormStorage<PortfolioFormData, PortfolioToggleState>({
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
    registerPagePath: '/portfolios/register',
    clearImageUrls,
    hookName: 'usePortfolioFormStorage',
  });
};

