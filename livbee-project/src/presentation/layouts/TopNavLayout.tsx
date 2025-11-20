import React from 'react';
import { Outlet } from 'react-router-dom';
import HomeNavigation from '@/presentation/components/navigation/HomeNavigation';
import TopTabs from '@/presentation/components/navigation/TopTabs';

const TopNavLayout: React.FC = () => {
  return (
    <div>
      <HomeNavigation />
      <TopTabs />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default TopNavLayout;