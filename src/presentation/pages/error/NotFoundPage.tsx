import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalErrorFallback } from '@/presentation/components/error/GlobalErrorFallback';
import { useToast } from '@/presentation/contexts/ToastContext';
import { ROUTE_PATHS } from '@/app/routes/routeMeta';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  useEffect(() => {
    showToast('요청하신 페이지를 찾을 수 없습니다.', undefined, 'error');
  }, [showToast]);

  const handleGoHome = () => {
    navigate(ROUTE_PATHS.home, { replace: true });
  };

  return (
    <GlobalErrorFallback
      message="요청하신 페이지가 존재하지 않거나 이동되었습니다."
      onReset={handleGoHome}
    />
  );
};

export default NotFoundPage;
