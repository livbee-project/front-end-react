/**
 * 폼 데이터 옵션
 */
export interface FormDataOptions<TFormData, TToggleState> {
  formData: TFormData;
  toggles: TToggleState;
}

/**
 * 파일 업로드 옵션
 */
export interface FileUploadOptions {
  mainThumbnailFile: File | null;
  galleryImageFiles: File[];
  portfolioFile?: File | null;
  resumeFile?: File | null;
  portfolioFileErrorMessage?: string;
  resumeFileErrorMessage?: string;
}

/**
 * 유효성 검사 옵션
 */
export interface ValidationOptions<TFormData, TToggleState> {
  validateForm: (formData: TFormData, toggles: TToggleState) => {
    isValid: boolean;
    errorMessage?: string;
  };
}

/**
 * 요청 빌더 옵션
 */
export interface RequestBuilderOptions<TFormData> {
  buildRequest: (
    formData: TFormData,
    mainThumbnailUrl: string | undefined,
    galleryUrls: string[],
    attachedFileUrl: string | undefined
  ) => unknown;
}

/**
 * 엔티티 생성 옵션
 */
export interface EntityCreationOptions {
  createEntity: (request: unknown) => Promise<{ ok: boolean }>;
}

/**
 * 스토리지 정리 옵션
 */
export interface StorageOptions {
  clearStorage: () => void;
  clearToggleStorage: () => void;
  clearImageUrls: () => void;
}

/**
 * 성공 처리 옵션
 */
export interface SuccessOptions {
  successMessage: string;
  successNavigatePath: string;
}

/**
 * useFormSubmit의 통합 옵션
 * ISP 준수: 각 책임별로 인터페이스를 분리하여 클라이언트가 필요한 것만 사용
 */
export interface UseFormSubmitOptions<TFormData, TToggleState>
  extends FormDataOptions<TFormData, TToggleState>,
    FileUploadOptions,
    ValidationOptions<TFormData, TToggleState>,
    RequestBuilderOptions<TFormData>,
    EntityCreationOptions,
    StorageOptions,
    SuccessOptions {}

