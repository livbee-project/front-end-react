import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Button from '@/presentation/components/ui/Button';
import InputWrapper from '@/presentation/components/forms/inputs/InputWrapper';
import { Input } from '@/presentation/components/styled/CommonStyles';
import { useAuth } from '@/presentation/hooks/useAuth';
import { useToast } from '@/presentation/contexts/ToastContext';
import liveelogo from '@/presentation/assets/images/liveelogo.png';

/**
 * 사용자 타입 (브랜드 또는 쇼호스트)
 */
type UserType = 'brand' | 'showhost';

/**
 * 로그인 페이지 컴포넌트입니다.
 */
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const [userType, setUserType] = useState<UserType>('brand');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const showhostButtonRef = useRef<HTMLButtonElement>(null);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const [bubbleLeft, setBubbleLeft] = useState<string>('75%');

  /**
   * 이미 로그인된 경우 마이페이지로 리다이렉트
   */
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/mypage', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  /**
   * 로그인 버튼 클릭 핸들러
   */
  const handleLogin = async () => {
    // 입력 검증
    if (!email.trim()) {
      const errorMsg = '이메일을 입력해주세요.';
      setError(errorMsg);
      showToast(errorMsg, undefined, 'error');
      return;
    }
    if (!password.trim()) {
      const errorMsg = '비밀번호를 입력해주세요.';
      setError(errorMsg);
      showToast(errorMsg, undefined, 'error');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await login({
        email: email.trim(),
        password,
        role: userType,
      });
      // 로그인 성공 시 useAuth에서 자동으로 마이페이지로 이동
      showToast('로그인되었습니다.');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '로그인에 실패했습니다.';
      setError(errorMessage);
      showToast(errorMessage, undefined, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Enter 키 입력 핸들러
   */
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleLogin();
    }
  };

  /**
   * 회원가입 링크 클릭 핸들러
   */
  const handleSignUp = () => {
    console.log('회원가입 클릭');
    // TODO: 회원가입 페이지로 이동
  };

  /**
   * 쇼호스트 버튼의 중앙 위치를 계산하여 말풍선 뾰족점 위치 설정
   */
  useEffect(() => {
    const updateBubblePosition = () => {
      if (showhostButtonRef.current && tabContainerRef.current) {
        const buttonRect = showhostButtonRef.current.getBoundingClientRect();
        const containerRect = tabContainerRef.current.getBoundingClientRect();
        
        // 쇼호스트 버튼의 중앙 X 좌표
        const buttonCenterX = buttonRect.left + buttonRect.width / 2;
        // 탭 컨테이너의 왼쪽 X 좌표
        const containerLeftX = containerRect.left;
        // 탭 컨테이너 기준 상대 위치 (픽셀)
        const relativeX = buttonCenterX - containerLeftX;
        // 탭 컨테이너 너비 기준 퍼센트
        const percentX = (relativeX / containerRect.width) * 100;
        
        setBubbleLeft(`${percentX}%`);
      }
    };

    // 초기 위치 계산 (약간의 지연을 두어 DOM이 완전히 렌더링된 후 계산)
    const timer = setTimeout(updateBubblePosition, 0);

    // 윈도우 리사이즈 시 위치 재계산
    window.addEventListener('resize', updateBubblePosition);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateBubblePosition);
    };
  }, [userType]); // userType이 변경되면 버튼 스타일이 바뀔 수 있으므로 재계산

  return (
    <PageWrapper>
        {/* 로고 영역 */}
        <LogoWrapper>
          <LogoImage src={liveelogo} alt="라이비 로고" />
        </LogoWrapper>

        {/* 사용자 타입 탭 */}
        <TabsWrapper ref={tabContainerRef}>
          <BubbleContainer $left={bubbleLeft}>
            <Bubble>
              모델도 여기!
              <BubblePointer />
            </Bubble>
          </BubbleContainer>
          <TypeTabButton
            type="button"
            $active={userType === 'brand'}
            onClick={() => setUserType('brand')}
          >
            브랜드
          </TypeTabButton>
          <TypeTabButton
            type="button"
            ref={showhostButtonRef}
            $active={userType === 'showhost'}
            onClick={() => setUserType('showhost')}
          >
            쇼호스트
          </TypeTabButton>
        </TabsWrapper>

      {/* 로그인 폼 */}
      <FormContainer>
        <InputWrapper>
          <StyledInput
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
        </InputWrapper>

        <InputWrapper>
          <StyledInput
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
        </InputWrapper>

        {/* 에러 메시지 표시 */}
        {error && <ErrorText>{error}</ErrorText>}

        <ButtonSpacer>
          <Button variant="primary" fullWidth onClick={handleLogin} disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </Button>
        </ButtonSpacer>

        {/* 회원가입 링크 */}
        <SignUpRow>
          <span>아직 계정이 없으신가요?</span>
          <SignUpLink
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
          >
            회원가입
          </SignUpLink>
        </SignUpRow>
      </FormContainer>
      </PageWrapper>
  );
};

export default LoginPage;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing['5xl']} ${theme.spacing.lg}`};
  box-sizing: border-box;
  gap: ${({ theme }) => theme.spacing['3xl']};
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

const LogoImage = styled.img`
  max-width: 300px;
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const bounceVertical = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const TabsWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  background: ${({ theme }) => theme.colors.secondary};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing.xs};
  gap: ${({ theme }) => theme.spacing.xs};
  position: relative;
`;

const BubbleContainer = styled.div<{ $left: string }>`
  position: absolute;
  left: ${({ $left }) => $left};
  transform: translateX(-50%);
  bottom: calc(100% + ${({ theme }) => theme.spacing.xl} + 10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${bounceVertical} 2s ease-in-out infinite;
`;

const Bubble = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primaryForeground};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radii.md};
  font: ${({ theme }) => theme.fonts.caption};
  font-weight: 500;
  position: relative;
  white-space: nowrap;
`;

const BubblePointer = styled.span`
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid ${({ theme }) => theme.colors.primary};
`;

const TypeTabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border: none;
  background: ${({ theme, $active }) => ($active ? theme.colors.card : 'transparent')};
  color: ${({ theme }) => theme.colors.foreground};
  font: ${({ theme }) => theme.fonts.body};
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;
  box-shadow: ${({ $active }) => ($active ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none')};
  transition: background 0.2s, box-shadow 0.2s;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const StyledInput = styled(Input)`
  padding-right: ${({ theme }) => theme.spacing.lg};
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  font: ${({ theme }) => theme.fonts.caption};
  margin: 0;
  text-align: center;
`;

const ButtonSpacer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const SignUpRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font: ${({ theme }) => theme.fonts.caption};
  color: ${({ theme }) => theme.colors.muted};
`;

const SignUpLink = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  text-decoration: none;
  font-weight: 500;
`;

