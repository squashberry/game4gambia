import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { Header } from './Header';

export const AppShell: React.FC = () => (
  <div className="app-shell">
    <Header />
    <main className="app-main">
      <Outlet />
    </main>
    <BottomNav />
  </div>
);