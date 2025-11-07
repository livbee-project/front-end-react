import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/presentation/components/ui/Button';
import InputWrapper from '@/presentation/components/forms/InputWrapper';
import { SPACING, BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, TEXT_COLOR, INPUT_BASE_STYLE } from '@/presentation/styles/constants';
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
  const [userType, setUserType] = useState<UserType>('brand');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const showhostButtonRef = useRef<HTMLButtonElement>(null);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  const [bubbleLeft, setBubbleLeft] = useState<string>('75%');

  /**
   * 로그인 버튼 클릭 핸들러
   */
  const handleLogin = () => {
    // TODO: 실제 로그인 로직 구현
    console.log('로그인 시도:', { userType, email, password });
    // 로그인 성공 시 마이페이지로 이동
    navigate('/mypage');
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

  /**
   * 페이지 컨테이너 스타일
   */
  const pageStyle: React.CSSProperties = {
    minHeight: '100vh',
    backgroundColor: TEXT_COLOR.WHITE,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${SPACING.XXXL} ${SPACING.LG}`,
    boxSizing: 'border-box',
  };

  /**
   * 로고 컨테이너 스타일
   */
  const logoContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: `${parseInt(SPACING.XXL) * 2.5}px`, // 2.5배 여백 (60px)
    position: 'relative',
    width: '100%',
  };

  /**
   * 로고 이미지 스타일
   */
  const logoImageStyle: React.CSSProperties = {
    width: 'auto',
    height: 'auto',
    maxWidth: '300px', // 200px * 1.5 = 300px
    objectFit: 'contain',
  };

  /**
   * 모델도 여기 말풍선 컨테이너 스타일 (애니메이션용)
   * 쇼호스트 버튼 너비의 정확한 절반 지점(중앙)에 뾰족점이 오도록 설정
   * useRef와 useEffect를 사용하여 실제 DOM 요소의 위치를 측정
   */
  const modelBubbleContainerStyle: React.CSSProperties = {
    position: 'absolute',
    left: bubbleLeft, // 쇼호스트 버튼의 실제 중앙 위치 (동적으로 계산)
    transform: 'translateX(-50%)', // 말풍선의 중심(뾰족점)을 버튼 중앙에 맞춤
    bottom: `calc(100% + ${SPACING.LG} + 10px)`, // 탭 섹션보다 10px 위
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: 'bounceVertical 2s ease-in-out infinite',
    width: 'fit-content', // 말풍선의 실제 너비에 맞춤
  };

  /**
   * 모델도 여기 말풍선 스타일
   */
  const modelBubbleStyle: React.CSSProperties = {
    backgroundColor: 'var(--primary)', // 프라이머리 색상
    color: TEXT_COLOR.WHITE,
    padding: `${SPACING.XS} ${SPACING.MD}`,
    borderRadius: BORDER_RADIUS.MD,
    fontSize: FONT_SIZE.XS,
    fontWeight: FONT_WEIGHT.MEDIUM,
    position: 'relative',
    whiteSpace: 'nowrap', // 텍스트가 한 줄로 유지되도록
  };

  /**
   * 말풍선 뾰족점 스타일 (가운데 정렬)
   */
  const bubblePointerStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '-8px',
    left: '50%',
    transform: 'translateX(-50%)', // 가운데 정렬
    width: 0,
    height: 0,
    borderLeft: '8px solid transparent',
    borderRight: '8px solid transparent',
    borderTop: `8px solid var(--primary)`, // 프라이머리 색상
  };

  /**
   * 탭 컨테이너 스타일 (말풍선 위치 기준점)
   */
  const tabContainerStyle: React.CSSProperties = {
    display: 'flex',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#F5F5F5',
    borderRadius: BORDER_RADIUS.LG,
    padding: SPACING.XS,
    marginBottom: SPACING.XXL,
    gap: SPACING.XS,
    position: 'relative',
  };

  /**
   * 탭 버튼 스타일
   */
  const getTabStyle = (isActive: boolean): React.CSSProperties => ({
    flex: 1,
    padding: `${SPACING.MD} ${SPACING.LG}`,
    borderRadius: BORDER_RADIUS.MD,
    border: 'none',
    backgroundColor: isActive ? TEXT_COLOR.WHITE : 'transparent',
    color: TEXT_COLOR.BLACK,
    fontSize: FONT_SIZE.MD,
    fontWeight: isActive ? FONT_WEIGHT.MEDIUM : FONT_WEIGHT.NORMAL,
    cursor: 'pointer',
    boxShadow: isActive ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
    transition: 'all 0.2s',
  });

  /**
   * 폼 컨테이너 스타일
   */
  const formContainerStyle: React.CSSProperties = {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: SPACING.LG,
  };

  /**
   * 입력 필드 스타일
   */
  const inputStyle: React.CSSProperties = {
    ...INPUT_BASE_STYLE,
    paddingRight: SPACING.LG,
  };

  /**
   * 회원가입 링크 컨테이너 스타일
   */
  const signUpContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.XS,
    marginTop: SPACING.MD,
    fontSize: FONT_SIZE.SM,
    color: TEXT_COLOR.DARK_GRAY,
  };

  /**
   * 회원가입 링크 스타일
   */
  const signUpLinkStyle: React.CSSProperties = {
    color: '#4A90E2',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: FONT_WEIGHT.MEDIUM,
  };

  return (
    <>
      {/* 애니메이션 스타일 정의 */}
      <style>
        {`
          @keyframes bounceVertical {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
      <div style={pageStyle}>
        {/* 로고 영역 */}
        <div style={logoContainerStyle}>
          <img src={liveelogo} alt="라이비 로고" style={logoImageStyle} />
        </div>

        {/* 사용자 타입 탭 */}
        <div ref={tabContainerRef} style={tabContainerStyle}>
          {/* 모델도 여기 말풍선 (탭 섹션 위에 배치) */}
          <div style={modelBubbleContainerStyle}>
            <div style={modelBubbleStyle}>
              모델도 여기!
              <div style={bubblePointerStyle} />
            </div>
          </div>
        <button
          style={getTabStyle(userType === 'brand')}
          onClick={() => setUserType('brand')}
        >
          브랜드
        </button>
        <button
          ref={showhostButtonRef}
          style={getTabStyle(userType === 'showhost')}
          onClick={() => setUserType('showhost')}
        >
          쇼호스트
        </button>
      </div>

      {/* 로그인 폼 */}
      <div style={formContainerStyle}>
        <InputWrapper>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </InputWrapper>

        <InputWrapper>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </InputWrapper>

        <Button
          variant="primary"
          fullWidth
          onClick={handleLogin}
          style={{ marginTop: SPACING.MD }}
        >
          로그인
        </Button>

        {/* 회원가입 링크 */}
        <div style={signUpContainerStyle}>
          <span>아직 계정이 없으신가요?</span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleSignUp();
            }}
            style={signUpLinkStyle}
          >
            회원가입
          </a>
        </div>
      </div>
      </div>
    </>
  );
};

export default LoginPage;

