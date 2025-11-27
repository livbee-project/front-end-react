import { useEffect } from 'react';
import { useToast } from '@/presentation/contexts/ToastContext';
import { subscribeApiErrorEvent } from '@/shared/utils/apiEvents';

export const ApiErrorToastListener: React.FC = () => {
  const { showToast } = useToast();

  useEffect(() => {
    return subscribeApiErrorEvent(({ message }) => {
      showToast(message, undefined, 'error');
    });
  }, [showToast]);

  return null;
};

