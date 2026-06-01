const API_ERROR_EVENT = 'livbee:api-error';

export interface ApiErrorEventDetail {
  message: string;
  status?: number;
  context?: string;
}

export const emitApiErrorEvent = (detail: ApiErrorEventDetail) => {
  if (typeof window === 'undefined') {
    return;
  }
  window.dispatchEvent(new CustomEvent<ApiErrorEventDetail>(API_ERROR_EVENT, { detail }));
};

export const subscribeApiErrorEvent = (handler: (detail: ApiErrorEventDetail) => void) => {
  if (typeof window === 'undefined') {
    return () => {};
  }
  const listener = (event: Event) => {
    const customEvent = event as CustomEvent<ApiErrorEventDetail>;
    handler(customEvent.detail);
  };
  window.addEventListener(API_ERROR_EVENT, listener as EventListener);
  return () => window.removeEventListener(API_ERROR_EVENT, listener as EventListener);
};

