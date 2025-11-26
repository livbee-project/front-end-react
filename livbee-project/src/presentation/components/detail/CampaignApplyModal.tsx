import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from '@/presentation/components/ui/Modal';
import { useToast } from '@/presentation/contexts/ToastContext';
import { H2, H3, PMuted, Caption } from '@/presentation/components/styled/Typography';
import Button from '@/presentation/components/ui/Button';
import { Badge } from '@/presentation/components/styled/CommonStyles';
import { CampaignRepository } from '@/data/repositories/CampaignRepository';
import { useRepository } from '@/presentation/hooks/useRepository';
import { MOCK_PORTFOLIOS } from '@/shared/constants/portfolio';

const MAX_MESSAGE_LENGTH = 400;

interface PortfolioOption {
  id: number;
  title: string;
  summary: string;
  imageUrl?: string;
  tags: string[];
}

const FALLBACK_PORTFOLIOS: PortfolioOption[] = [
  {
    id: 1,
    title: '패션 쇼핑라이브 포트폴리오',
    summary: '봄/여름 시즌 패션 아이템 라이브 영상 모음',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80',
    tags: ['패션', '뷰티'],
  },
  {
    id: 2,
    title: '뷰티 제품 리뷰',
    summary: '스킨케어 및 메이크업 제품 상세 리뷰',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=200&q=80',
    tags: ['뷰티'],
  },
  {
    id: 3,
    title: '홈리빙 큐레이션',
    summary: '인테리어 소품 및 생활용품 소개 라이브',
    imageUrl: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=200&q=80',
    tags: ['리빙', '홈데코'],
  },
];

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
  const { showToast } = useToast();
  const [selectedPortfolio, setSelectedPortfolio] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [availableDate, setAvailableDate] = useState('');
  const [availableTime, setAvailableTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const campaignRepository = useRepository(CampaignRepository);

  const portfolioOptions: PortfolioOption[] = useMemo(() => {
    return (MOCK_PORTFOLIOS ?? FALLBACK_PORTFOLIOS).map((portfolio) => ({
      id: portfolio.id,
      title: portfolio.title,
      summary: portfolio.summary,
      imageUrl: portfolio.imageUrl,
      tags: portfolio.categories || [],
    }));
  }, []);

  const selectedPortfolioData = selectedPortfolio
    ? portfolioOptions.find((portfolio) => portfolio.id === selectedPortfolio)
    : null;

  useEffect(() => {
    if (!isOpen) {
      setSelectedPortfolio(null);
      setMessage('');
      setAvailableDate('');
      setAvailableTime('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!selectedPortfolio || !message.trim()) {
      showToast('포트폴리오 선택과 메시지를 입력해주세요.', undefined, 'error');
      return;
    }
    if (!availableDate || !availableTime) {
      showToast('촬영 가능 날짜와 시간을 선택해주세요.', undefined, 'error');
      return;
    }
    if (!campaignId) {
      showToast('캠페인 정보가 올바르지 않습니다.', undefined, 'error');
      return;
    }

    const trimmedMessage = message.trim();
    setIsSubmitting(true);

    try {
      const response = await campaignRepository.applyToCampaign({
        campaignId,
        portfolioId: String(selectedPortfolio),
        message: trimmedMessage,
        availableDate,
        availableTime,
      });

      // 디버깅: 응답 구조 확인
      console.log('[CampaignApplyModal] 지원 응답:', response);
      
      // 백엔드가 snake_case를 사용할 수 있으므로 두 가지 필드명 모두 확인
      const chatRoomId = response.chatRoomId || (response as any).chat_room_id || (response as any).roomId;
      
      console.log('[CampaignApplyModal] chatRoomId:', chatRoomId);

      showToast('지원서가 제출되었습니다.');
      onClose();
      
      if (chatRoomId) {
        onApplied?.(chatRoomId);
        console.log('[CampaignApplyModal] 채팅방으로 이동:', `/chat/${chatRoomId}`);
        navigate(`/chat/${chatRoomId}`, {
          state: {
            campaignTitle,
            portfolioTitle: selectedPortfolioData?.title,
            availableDate,
            availableTime,
            message: trimmedMessage,
            roomId: chatRoomId,
          },
        });
      } else {
        console.warn('[CampaignApplyModal] chatRoomId가 없어 채팅 목록으로 이동');
        navigate('/mypage/messages', {
          state: {
            campaignTitle,
            portfolioTitle: selectedPortfolioData?.title,
            availableDate,
            availableTime,
            message: trimmedMessage,
          },
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '지원에 실패했습니다.';
      showToast(errorMessage, undefined, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
            disabled={
              isSubmitting ||
              !selectedPortfolio ||
              !message.trim() ||
              !availableDate ||
              !availableTime
            }
          >
            {isSubmitting ? '지원 중...' : '지원하기'}
          </Button>
        </ActionRow>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.div`
  border-radius: ${({ theme }) => theme.radii.xl};
  max-height: 80vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ModalTitle = styled(H2)`
  margin: 0;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const SectionLabel = styled(PMuted)`
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 600;
`;

const CampaignName = styled(H3)`
  margin: 0;
`;

const PortfolioList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const PortfolioCard = styled.button<{ $selected: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 2px solid ${({ theme, $selected }) => ($selected ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme }) => theme.colors.card};
  cursor: pointer;
  text-align: left;
`;

const PortfolioHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Thumbnail = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PortfolioInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const PortfolioTitle = styled(H3)`
  margin: 0;
`;

const PortfolioSummary = styled(PMuted)`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
`;

const TagGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
`;

const TagBadge = styled(Badge)``;

const Indicator = styled.span<{ $selected: boolean }>`
  width: 18px;
  height: 18px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: 2px solid ${({ theme, $selected }) => ($selected ? theme.colors.primary : theme.colors.border)};
  background: ${({ theme, $selected }) => ($selected ? theme.colors.primary : 'transparent')};
  flex-shrink: 0;
`;

const MessageInput = styled.textarea`
  width: 100%;
  min-height: 110px;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md};
  font: ${({ theme }) => theme.fonts.body};
  resize: vertical;
`;

const ScheduleRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const InputLabel = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

const DateInput = styled.input`
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font: ${({ theme }) => theme.fonts.body};
`;

const TimeInput = styled(DateInput)``;

const HelperText = styled(Caption)`
  color: ${({ theme }) => theme.colors.muted};
`;

const WarningBox = styled.div`
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme }) => theme.primaryOpacity['10']};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: flex-start;
`;

const WarningIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.primaryOpacity['20']};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const WarningTitle = styled(Caption)`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
`;

const WarningText = styled(PMuted)`
  margin: 0;
  color: ${({ theme }) => theme.colors.foreground};
`;

const ActionRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export default CampaignApplyModal;

