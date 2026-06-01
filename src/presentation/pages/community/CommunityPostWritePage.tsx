import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Image as ImageIcon } from 'lucide-react';
import { CommunityPostCategorySelector } from '@/presentation/components/community/CommunityPostCategorySelector';
import { useCommunityPostWriteForm } from '@/presentation/hooks/community/useCommunityPostWriteForm';
import {
  CounterRow,
  CounterText,
  ErrorText,
  FooterButton,
  FooterButtonRow,
  Form,
  FormContainer,
  Header,
  HeaderIconButton,
  HeaderSpacer,
  HeaderTitle,
  HiddenFileInput,
  HintText,
  ImagePreview,
  ImagePreviewGrid,
  ImagePreviewItem,
  ImageRemoveButton,
  ImageUploadBox,
  ImageUploadButton,
  ImageUploadHint,
  ImageUploadTopRow,
  Input,
  PageWrapper,
  RequiredMark,
  Section,
  SectionLabel,
  SectionLabelRow,
  Sheet,
  Textarea,
} from '@/presentation/pages/community/CommunityPostWritePage.styles';

interface CommunityPostWritePageProps {
  variant?: 'page' | 'modal';
}

const CommunityPostWritePage: React.FC<CommunityPostWritePageProps> = ({ variant = 'page' }) => {
  const navigate = useNavigate();
  const {
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
  } = useCommunityPostWriteForm();

  const isBusy = isSubmitting || isImageUploading;

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <PageWrapper $variant={variant}>
      <FormContainer>
        <Sheet $variant={variant}>
          <Header>
            <HeaderIconButton type="button" onClick={handleCancel} aria-label="닫기">
              <X size={18} />
            </HeaderIconButton>
            <HeaderTitle>글쓰기</HeaderTitle>
            <HeaderSpacer />
          </Header>

          <Form onSubmit={handleSubmitForm}>
            <Section>
              <SectionLabelRow>
                <SectionLabel>
                  카테고리
                  <RequiredMark>*</RequiredMark>
                </SectionLabel>
              </SectionLabelRow>
              <CommunityPostCategorySelector value={category} onChange={handleCategoryChange} />
              {errors.category && <ErrorText>{errors.category}</ErrorText>}
            </Section>

            <Section>
              <SectionLabelRow>
                <SectionLabel>
                  제목
                  <RequiredMark>*</RequiredMark>
                </SectionLabel>
              </SectionLabelRow>
              <Input
                value={title}
                placeholder="제목을 입력하세요"
                onChange={(event) => handleTitleChange(event.target.value)}
              />
              <CounterRow>
                <CounterText>
                  {titleLength}
                  /100
                </CounterText>
              </CounterRow>
              {errors.title && <ErrorText>{errors.title}</ErrorText>}
            </Section>

            <Section>
              <SectionLabelRow>
                <SectionLabel>
                  내용
                  <RequiredMark>*</RequiredMark>
                </SectionLabel>
              </SectionLabelRow>
              <Textarea
                value={content}
                placeholder={
                  '내용을 입력해주세요\n\n• 쇼핑라이브/커머스 관련 내용을 작성해주세요\n• 욕설, 비방, 광고성 게시글은 삭제될 수 있습니다\n• 타인의 권리를 침해하는 내용을 작성하지 말아주세요'
                }
                onChange={(event) => handleContentChange(event.target.value)}
              />
              <CounterRow>
                <CounterText>
                  {contentLength}
                  /2000
                </CounterText>
              </CounterRow>
              {errors.content && <ErrorText>{errors.content}</ErrorText>}
            </Section>

            <Section>
              <SectionLabelRow>
                <SectionLabel>이미지 (선택)</SectionLabel>
              </SectionLabelRow>
              <ImageUploadBox>
                <ImageUploadTopRow>
                  <ImageUploadButton>
                    <ImageIcon size={16} />
                    이미지 추가
                    <HiddenFileInput
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(event) => handleImageAdd(event.target.files)}
                    />
                  </ImageUploadButton>
                  <ImageUploadHint>최대 5장까지 업로드 가능합니다.</ImageUploadHint>
                </ImageUploadTopRow>

                {images.length === 0 && (
                  <HintText>상품 사진, 캡처 이미지 등 글과 함께 보여줄 이미지를 올려주세요.</HintText>
                )}

                {images.length > 0 && (
                  <ImagePreviewGrid>
                    {images.map((image) => (
                      <ImagePreviewItem key={image.id}>
                        <ImagePreview src={image.previewUrl} alt="선택한 이미지 미리보기" />
                        <ImageRemoveButton
                          type="button"
                          onClick={() => handleImageRemove(image.id)}
                          aria-label="이미지 삭제"
                        >
                          <Trash2 size={14} />
                        </ImageRemoveButton>
                      </ImagePreviewItem>
                    ))}
                  </ImagePreviewGrid>
                )}

                {errors.images && <ErrorText>{errors.images}</ErrorText>}
              </ImageUploadBox>
            </Section>

            <FooterButtonRow>
              <FooterButton
                type="button"
                $variant="ghost"
                onClick={handleCancel}
                disabled={isBusy}
              >
                취소
              </FooterButton>
              <FooterButton type="submit" $variant="primary" disabled={!canSubmit || isBusy}>
                {isBusy ? '등록 중...' : '등록하기'}
              </FooterButton>
            </FooterButtonRow>
          </Form>
        </Sheet>
      </FormContainer>
    </PageWrapper>
  );
};

export default CommunityPostWritePage;

