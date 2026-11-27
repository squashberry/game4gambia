import { createBrowserRouter } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import { Home } from './pages/Home';
import { Games } from './pages/Games';
import { GameDetails } from './pages/GameDetails';
import { Checkout } from './pages/Checkout';
import { Orders } from './pages/Orders';
import { OrderDetail } from './pages/OrderDetail';
import { Support } from './pages/Support';
import { Account } from './pages/Account';
import { Auth } from './pages/Auth';
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminOverview } from './pages/admin/AdminOverview';
import { AdminOrders } from './pages/admin/AdminOrders';

export const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/games', element: <Games /> },
      { path: '/games/:slug', element: <GameDetails /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/orders', element: <Orders /> },
      { path: '/orders/:id', element: <OrderDetail /> },
      { path: '/support', element: <Support /> },
      { path: '/account', element: <Account /> },
    ],
  },
  { path: '/auth', element: <Auth /> },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminOverview /> },
      { path: 'orders', element: <AdminOrders /> },
      // ... other admin routes
    ],
  },
], { basename: '/game4gambia' });