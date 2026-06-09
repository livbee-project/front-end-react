import React from 'react';

export type BottomNavIconType = 'home' | 'hosts' | 'models' | 'campaigns' | 'mypage';

export const BottomNavIcon: React.FC<{ type: BottomNavIconType }> = ({ type }) => {
  if (type === 'home') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 11.2 12 4l8 7.2" />
        <path d="M6.5 10.5V20h11v-9.5" />
        <path d="M9.8 20v-5.8h4.4V20" />
      </svg>
    );
  }

  if (type === 'hosts') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 4v9" />
        <path d="M8.5 8.2v3.1a3.5 3.5 0 0 0 7 0V8.2a3.5 3.5 0 0 0-7 0Z" />
        <path d="M6 11.2a6 6 0 0 0 12 0" />
        <path d="M12 17.2V21" />
        <path d="M8.5 21h7" />
      </svg>
    );
  }

  if (type === 'models') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 12.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z" />
        <path d="M5.5 20.2c.9-3.5 3.2-5.2 6.5-5.2s5.6 1.7 6.5 5.2" />
      </svg>
    );
  }

  if (type === 'campaigns') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 10.5v3.8" />
        <path d="M7.3 15.2 10 20" />
        <path d="M5 10.5 18.5 5.8v13L5 14.3v-3.8Z" />
        <path d="M18.5 9.3c1.2.5 2 1.5 2 3s-.8 2.5-2 3" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 12.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M4.8 20.2c1-3.7 3.6-5.6 7.2-5.6s6.2 1.9 7.2 5.6" />
      <path d="M17.7 5.2 19 6.5l1.3-1.3" />
    </svg>
  );
};
