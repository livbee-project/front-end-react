import React from 'react';
import { Outlet } from 'react-router-dom';
import HomeNavBar from '@/presentation/components/navigation/HomeNavBar';
import HomeTopTabs from '@/presentation/components/navigation/HomeTopTabs';

const TopNavLayout: React.FC = () => {
  return (
    <div>
      <HomeNavBar />
      <HomeTopTabs />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default TopNavLayout;