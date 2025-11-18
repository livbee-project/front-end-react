import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import TopTabBar from '@/presentation/components/navigation/TopTabBar';

const TopNavLayout: React.FC = () => {
  const location = useLocation();
  const shouldRenderTabs = location.pathname !== '/';

  return (
    <div>
      {shouldRenderTabs && <TopTabBar />}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default TopNavLayout;