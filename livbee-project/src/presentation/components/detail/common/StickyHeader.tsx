import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';
import { H1 } from '@/presentation/components/styled/Typography';
import type { StickyHeaderProps } from '@/types/components';
import { debug } from '@/shared/utils/logger';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const HeaderInner = styled.div`
  max-width: 672px;
  margin: 0 auto;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};
`;

const BackButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.md};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Title = styled(H1)`
  flex: 1;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

const ShareButton = styled.button`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.foreground};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radii.md};
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`;

/**
 * 상세 페이지의 고정 헤더 컴포넌트입니다.
 * 스크롤 시에도 상단에 고정되며, 뒤로가기, 제목, 공유 버튼을 포함합니다.
 */
const StickyHeader: React.FC<StickyHeaderProps> = ({ title, onShare, showShare = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = (e: React.MouseEvent) => {
    debug('StickyHeader', '🔙 뒤로가기 버튼 클릭', {
      currentPath: location.pathname,
      historyLength: window.history.length,
      timestamp: Date.now(),
    });
    
    e.preventDefault();
    e.stopPropagation();
    
    debug('StickyHeader', '🔙 이벤트 처리 완료, 네비게이션 시작', {
      currentPath: location.pathname,
    });
    
    // 등록 페이지인 경우 명시적으로 /campaigns로 이동
    if (location.pathname === '/campaigns/register') {
      debug('StickyHeader', '🔙 모집공고 등록 페이지에서 /campaigns로 이동');
      navigate('/campaigns', { replace: false });
      return;
    }
    
    // 다른 페이지인 경우 navigate(-1) 사용
    if (window.history.length <= 1) {
      debug('StickyHeader', '🔙 히스토리 없음, 홈으로 이동');
      navigate('/', { replace: true });
    } else {
      debug('StickyHeader', '🔙 navigate(-1) 호출', {
        beforePath: location.pathname,
        historyLength: window.history.length,
      });
      
      navigate(-1);
      
      debug('StickyHeader', '🔙 navigate(-1) 호출 완료', {
        afterPath: location.pathname,
      });
    }
  };

  const handleShare = () => {
    if (onShare) {
      onShare();
    } else {
      // 기본 공유 동작 (Web Share API 또는 클립보드 복사)
      if (navigator.share) {
        navigator.share({
          title: title,
          url: window.location.href,
        }).catch(() => {
          // 공유 취소 또는 실패 시 무시
        });
      } else {
        // 클립보드에 URL 복사
        navigator.clipboard.writeText(window.location.href).then(() => {
          // TODO: 토스트 메시지 표시
        });
      }
    }
  };

  return (
    <HeaderContainer>
      <HeaderInner>
        <BackButton onClick={handleBack} aria-label="뒤로가기">
          <ArrowLeft size={20} />
        </BackButton>
        <Title>{title}</Title>
        {showShare && (
          <ShareButton onClick={handleShare} aria-label="공유">
            <Share2 size={20} />
          </ShareButton>
        )}
        {!showShare && <div style={{ width: '40px' }} />}
      </HeaderInner>
    </HeaderContainer>
  );
};

export default StickyHeader;

