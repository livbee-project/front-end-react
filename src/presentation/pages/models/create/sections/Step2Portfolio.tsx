import type { GalleryImageItem, PortfolioFileItem } from '@/domain/entities/modelProfile'
import type { ModelProfileFormErrors, ModelProfileFormValues } from '@/domain/entities/modelProfile'
import { MODEL_PROFILE_LIMITS } from '@/domain/usecases/modelProfile/validateModelProfileForm'
import { isValidUrl } from '@/shared/utils/urlValidation'
import { Button } from '@/presentation/components/ui/Button'
import { Input } from '@/presentation/components/ui/Input'
import {
  AddSlot,
  FileRow,
  FormStack,
  GalleryGrid,
  GallerySlot,
  RemoveBtn,
  SectionDesc,
  SectionHeading,
  SectionTitle,
} from '@/presentation/pages/models/create/styles/modelCreate.styles'
import { theme } from '@/presentation/styles/theme'
import styled from 'styled-components'
import { useState, type ChangeEvent } from 'react'

interface Step2PortfolioProps {
  values: ModelProfileFormValues
  errors: ModelProfileFormErrors
  onChange: (patch: Partial<ModelProfileFormValues>) => void
}

/** STEP 2 — 갤러리·파일·활동 링크 입력 섹션 */
export function Step2Portfolio({ values, errors, onChange }: Step2PortfolioProps) {
  const [urlVerified, setUrlVerified] = useState(false)

  /** 갤러리 이미지 추가 */
  const handleGalleryAdd = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const remaining = MODEL_PROFILE_LIMITS.galleryImages - values.galleryImages.length
    const newItems: GalleryImageItem[] = Array.from(files)
      .slice(0, remaining)
      .map((f) => ({
        id: `${Date.now()}-${f.name}`,
        name: f.name,
        url: URL.createObjectURL(f),
      }))
    onChange({ galleryImages: [...values.galleryImages, ...newItems] })
    e.target.value = ''
  }

  /** 갤러리 이미지 삭제 */
  const removeGallery = (id: string) => {
    onChange({ galleryImages: values.galleryImages.filter((g) => g.id !== id) })
  }

  /** 포트폴리오 파일 추가 */
  const handleFileAdd = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const remaining = MODEL_PROFILE_LIMITS.portfolioFiles - values.portfolioFiles.length
    const newItems: PortfolioFileItem[] = Array.from(files)
      .slice(0, remaining)
      .map((f) => ({
        id: `${Date.now()}-${f.name}`,
        name: f.name,
        mimeType: f.type,
        size: f.size,
        url: URL.createObjectURL(f),
      }))
    onChange({ portfolioFiles: [...values.portfolioFiles, ...newItems] })
    e.target.value = ''
  }

  /** 포트폴리오 파일 삭제 */
  const removeFile = (id: string) => {
    onChange({ portfolioFiles: values.portfolioFiles.filter((f) => f.id !== id) })
  }

  /** 활동 링크 URL 검증 */
  const verifyUrl = () => {
    setUrlVerified(isValidUrl(values.recentWorkUrl))
  }

  /** 파일 크기를 읽기 쉬운 단위로 변환 */
  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
  }

  return (
    <>
      <SectionHeading>
        <SectionTitle>포트폴리오</SectionTitle>
        <SectionDesc>갤러리 이미지, 파일, 최근 활동 링크를 등록합니다.</SectionDesc>
      </SectionHeading>

      <FormStack>
        <div>
          <FieldLabel>
            갤러리 이미지 <small>({values.galleryImages.length}/{MODEL_PROFILE_LIMITS.galleryImages})</small>
          </FieldLabel>
          <GalleryGrid>
            {values.galleryImages.map((img) => (
              <GallerySlot key={img.id}>
                <img src={img.url} alt={img.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <RemoveBtn type="button" onClick={() => removeGallery(img.id)}>×</RemoveBtn>
              </GallerySlot>
            ))}
            {values.galleryImages.length < MODEL_PROFILE_LIMITS.galleryImages && (
              <AddSlot>
                + 이미지 추가
                <input type="file" accept="image/jpeg,image/png" multiple onChange={handleGalleryAdd} />
              </AddSlot>
            )}
          </GalleryGrid>
          {errors.galleryImages && <ErrorMsg>{errors.galleryImages}</ErrorMsg>}
        </div>

        <div>
          <FieldLabel>
            포트폴리오 파일 <small>({values.portfolioFiles.length}/{MODEL_PROFILE_LIMITS.portfolioFiles})</small>
          </FieldLabel>
          <AddSlot style={{ aspectRatio: 'auto', padding: '16px', marginBottom: 10 }}>
            + 파일 추가
            <input
              type="file"
              accept="image/jpeg,image/png,application/pdf,video/mp4,video/quicktime"
              multiple
              onChange={handleFileAdd}
            />
          </AddSlot>
          {values.portfolioFiles.map((f) => (
            <FileRow key={f.id} style={{ marginBottom: 8 }}>
              <span>{f.name} · {formatSize(f.size)}</span>
              <RemoveBtn type="button" style={{ position: 'static' }} onClick={() => removeFile(f.id)}>×</RemoveBtn>
            </FileRow>
          ))}
          {errors.portfolioFiles && <ErrorMsg>{errors.portfolioFiles}</ErrorMsg>}
        </div>

        <div>
          <Input
            label="최근 활동 링크"
            value={values.recentWorkUrl}
            placeholder="https://instagram.com/..."
            hint="인스타그램 등 최근 활동 URL"
            error={errors.recentWorkUrl}
            onChange={(e) => {
              setUrlVerified(false)
              onChange({ recentWorkUrl: e.target.value })
            }}
          />
          <UrlRow>
            <Button type="button" variant="outline" size="sm" onClick={verifyUrl}>
              URL 검증
            </Button>
            {urlVerified && values.recentWorkUrl && (
              <SuccessMsg>유효한 URL 형식입니다.</SuccessMsg>
            )}
          </UrlRow>
        </div>
      </FormStack>
    </>
  )
}

const FieldLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  text-align: left;

  small { font-weight: 400; color: ${theme.colors.textMuted}; }
`

const ErrorMsg = styled.span`
  font-size: 12px;
  color: ${theme.colors.error};
  display: block;
  margin-top: 6px;
  text-align: left;
`

const UrlRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
`

const SuccessMsg = styled.span`
  font-size: 13px;
  color: ${theme.colors.success};
`
