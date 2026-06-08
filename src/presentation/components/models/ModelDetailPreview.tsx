import styled from 'styled-components'
import type { ModelProfileFormValues } from '@/domain/entities/modelProfile'
import { theme } from '@/presentation/styles/theme'

interface ModelDetailPreviewProps {
  values: ModelProfileFormValues
}

/** 상세 페이지 노출 블록 미리보기 */
export function ModelDetailPreview({ values }: ModelDetailPreviewProps) {
  const publicContacts = [
    values.contactEmailPublic && values.contactEmail && { label: '이메일', value: values.contactEmail },
    values.contactPhonePublic && values.contactPhone && { label: '연락처', value: values.contactPhone },
    values.openChatPublic && values.openChatUrl && { label: '오픈채팅', value: values.openChatUrl },
    values.recentWorkUrlPublic && values.recentWorkUrl && { label: '활동 링크', value: values.recentWorkUrl },
  ].filter(Boolean) as { label: string; value: string }[]

  return (
    <Wrap>
      <SectionTitle>상세 페이지 미리보기</SectionTitle>

      {(values.summary || values.description) && (
        <Block>
          <BlockTitle>소개</BlockTitle>
          {values.summary && <Summary>{values.summary}</Summary>}
          {values.description && <Desc>{values.description}</Desc>}
        </Block>
      )}

      {values.galleryImages.length > 0 && (
        <Block>
          <BlockTitle>갤러리 ({values.galleryImages.length}/9)</BlockTitle>
          <GalleryGrid>
            {values.galleryImages.slice(0, 5).map((img) => (
              <GalleryThumb key={img.id}>
                <img src={img.url} alt={img.name} />
              </GalleryThumb>
            ))}
            {values.galleryImages.length > 5 && (
              <MoreBadge>+{values.galleryImages.length - 5}</MoreBadge>
            )}
          </GalleryGrid>
        </Block>
      )}

      {values.portfolioFiles.length > 0 && (
        <Block>
          <BlockTitle>포트폴리오</BlockTitle>
          <FileList>
            {values.portfolioFiles.map((f) => (
              <FileItem key={f.id}>{f.name}</FileItem>
            ))}
          </FileList>
        </Block>
      )}

      <Block>
        <BlockTitle>연락처 (공개 항목만)</BlockTitle>
        {publicContacts.length === 0 ? (
          <Muted>공개된 연락처가 없습니다.</Muted>
        ) : (
          <ContactList>
            {publicContacts.map((c) => (
              <ContactChip key={c.label}>
                <strong>{c.label}</strong> {c.value}
              </ContactChip>
            ))}
          </ContactList>
        )}
      </Block>

      {values.tags.length > 0 && (
        <Block>
          <BlockTitle>태그</BlockTitle>
          <TagRow>
            {values.tags.map((tag) => (
              <Tag key={tag}>#{tag}</Tag>
            ))}
          </TagRow>
        </Block>
      )}

      {(values.weight || values.location) && (
        <Stats>
          {values.modelType && <Stat>유형 {values.modelType}</Stat>}
          {values.height && <Stat>키 {values.height}cm</Stat>}
          {values.weight && <Stat>몸무게 {values.weight}kg</Stat>}
          {values.location && <Stat>지역 {values.location}</Stat>}
        </Stats>
      )}
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  text-align: left;
`

const SectionTitle = styled.h4`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
`

const Block = styled.div`
  padding: 12px;
  background: ${theme.colors.backgroundSubtle};
  border-radius: ${theme.radius.md};
`

const BlockTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${theme.colors.textSecondary};
  margin-bottom: 8px;
`

const Summary = styled.p`
  margin: 0 0 6px;
  font-size: 14px;
  font-weight: 600;
`

const Desc = styled.p`
  margin: 0;
  font-size: 13px;
  color: ${theme.colors.textSecondary};
  line-height: 1.5;
  white-space: pre-wrap;
`

const GalleryGrid = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`

const GalleryThumb = styled.div`
  width: 48px;
  height: 64px;
  border-radius: 6px;
  overflow: hidden;

  img { width: 100%; height: 100%; object-fit: cover; }
`

const MoreBadge = styled.div`
  width: 48px;
  height: 64px;
  border-radius: 6px;
  background: ${theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${theme.colors.textSecondary};
`

const FileList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

const FileItem = styled.li`
  font-size: 13px;
  padding: 4px 0;
`

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const ContactChip = styled.div`
  font-size: 12px;
  padding: 8px;
  background: ${theme.colors.white};
  border-radius: ${theme.radius.sm};

  strong { margin-right: 6px; }
`

const Muted = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${theme.colors.textMuted};
`

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`

const Tag = styled.span`
  font-size: 12px;
  padding: 4px 10px;
  background: ${theme.colors.primaryLight};
  color: ${theme.colors.primary};
  border-radius: ${theme.radius.full};
`

const Stats = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Stat = styled.span`
  font-size: 12px;
  padding: 4px 10px;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.full};
`
