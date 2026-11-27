import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AuthProvider } from './hooks/useAuth';
import { usePWA } from './hooks/usePWA';

export default function App() {
  usePWA(); // registers service worker + install prompt handling
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}