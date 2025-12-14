import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from '@/presentation/components/ui/Modal';
import Button from '@/presentation/components/ui/Button';
import { useCampaignApplyForm, MAX_MESSAGE_LENGTH } from '@/presentation/components/campaign/detail/apply/hooks/useCampaignApplyForm';
import {
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Section,
  SectionLabel,
  CampaignName,
  PortfolioList,
  PortfolioCard,
  PortfolioHeader,
  Thumbnail,
  Indicator,
  PortfolioInfo,
  PortfolioTitle,
  PortfolioSummary,
  TagGroup,
  TagBadge,
  MessageInput,
  ScheduleRow,
  InputWrapper,
  InputLabel,
  DateInput,
  TimeInput,
  HelperText,
  WarningBox,
  WarningIcon,
  WarningTitle,
  WarningText,
  ActionRow,
} from '@/presentation/components/campaign/detail/apply/styles/CampaignApplyModal.styles';

interface CampaignApplyModalProps {
  isOpen: boolean;
  campaignId: string;
  campaignTitle: string;
  onClose: () => void;
  onApplied?: (chatRoomId: string) => void;
}

const CampaignApplyModal: React.FC<CampaignApplyModalProps> = ({
  isOpen,
  campaignId,
  campaignTitle,
  onClose,
  onApplied,
}) => {
  const {
    portfolioOptions,
    selectedPortfolio,
    setSelectedPortfolio,
    message,
    setMessage,
    availableDate,
    setAvailableDate,
    availableTime,
    setAvailableTime,
    isSubmitting,
    handleSubmit,
    isSubmitDisabled,
  } = useCampaignApplyForm({
    campaignId,
    campaignTitle,
    isOpen,
    onClose,
    onApplied,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="420px" width="94%">
      <ModalContainer className="hide-scrollbar">
        <ModalHeader>
          <ModalTitle>지원하기</ModalTitle>
          <CloseButton onClick={onClose} type="button" aria-label="모달 닫기">
            ×
          </CloseButton>
        </ModalHeader>

        <Section>
          <SectionLabel>캠페인</SectionLabel>
          <CampaignName>{campaignTitle}</CampaignName>
        </Section>

        <Section>
          <SectionLabel>포트폴리오 선택 *</SectionLabel>
          <PortfolioList>
            {portfolioOptions.map((portfolio) => (
              <PortfolioCard
                key={portfolio.id}
                $selected={selectedPortfolio === portfolio.id}
                onClick={() => setSelectedPortfolio(portfolio.id)}
              >
                <PortfolioHeader>
                  <Thumbnail>
                    {portfolio.imageUrl ? <img src={portfolio.imageUrl} alt={portfolio.title} /> : <span>?</span>}
                  </Thumbnail>
                  <Indicator $selected={selectedPortfolio === portfolio.id} aria-hidden="true" />
                </PortfolioHeader>
                <PortfolioInfo>
                  <PortfolioTitle>{portfolio.title}</PortfolioTitle>
                  <PortfolioSummary>{portfolio.summary || '포트폴리오 설명이 없습니다.'}</PortfolioSummary>
                  <TagGroup>
                    {(portfolio.tags?.length ? portfolio.tags : ['등록된 태그 없음']).map((tag) => (
                      <TagBadge key={`${portfolio.id}-${tag}`} $variant="secondary">
                        {tag}
                      </TagBadge>
                    ))}
                  </TagGroup>
                </PortfolioInfo>
              </PortfolioCard>
            ))}
          </PortfolioList>
          {portfolioOptions.length === 0 && (
            <HelperText>등록된 포트폴리오가 없습니다. 먼저 포트폴리오를 등록해 주세요.</HelperText>
          )}
        </Section>

        <Section>
          <SectionLabel>메시지 *</SectionLabel>
          <MessageInput
            value={message}
            maxLength={MAX_MESSAGE_LENGTH}
            placeholder="지원 메시지를 작성해주세요. 자신의 강점과 이 캠페인에 적합한 이유를 작성하면 좋습니다."
            onChange={(event) => setMessage(event.target.value)}
          />
          <HelperText>{message.trim().length}/{MAX_MESSAGE_LENGTH}자</HelperText>
        </Section>

        <Section>
          <SectionLabel>촬영 가능 일정 *</SectionLabel>
          <ScheduleRow>
            <InputWrapper>
              <InputLabel>날짜</InputLabel>
              <DateInput type="date" value={availableDate} onChange={(event) => setAvailableDate(event.target.value)} />
            </InputWrapper>
            <InputWrapper>
              <InputLabel>시간</InputLabel>
              <TimeInput type="time" value={availableTime} onChange={(event) => setAvailableTime(event.target.value)} />
            </InputWrapper>
          </ScheduleRow>
          <HelperText>촬영 가능한 날짜와 시간을 입력해주세요.</HelperText>
        </Section>

        <WarningBox>
          <WarningIcon>
            <AlertTriangle size={16} />
          </WarningIcon>
          <div>
            <WarningTitle>플랫폼 외 계약 진행 주의</WarningTitle>
            <WarningText>
              본 플랫폼을 통하지 않고 직접 계약 진행 시 발생하는 이슈(미입금·일정 지연 등)는 책임지지 않습니다. 가급적 플랫폼을 통해 안전하게 거래해 주세요.
            </WarningText>
          </div>
        </WarningBox>

        <ActionRow>
          <Button variant="secondary" fullWidth onClick={onClose}>
            취소
          </Button>
          <Button
            variant="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            {isSubmitting ? '지원 중...' : '지원하기'}
          </Button>
        </ActionRow>
      </ModalContainer>
    </Modal>
  );
};
export default CampaignApplyModal;

