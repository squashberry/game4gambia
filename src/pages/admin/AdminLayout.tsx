import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Gamepad2, Box, Truck, BarChart3 } from 'lucide-react';

const LINKS = [
  { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { to: '/admin/games', label: 'Games', icon: Gamepad2 },
  { to: '/admin/products', label: 'Products', icon: Box },
  { to: '/admin/suppliers', label: 'Suppliers', icon: Truck },
  { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
];

export const AdminLayout: React.FC = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100dvh', background: 'var(--black)' }}>
      {/* Sidebar – desktop */}
      <aside
        style={{
          width: 220,
          borderRight: '1px solid var(--border-dark)',
          padding: 16,
          display: 'none',
        }}
        className="admin-sidebar"
      >
        <div style={{ fontWeight: 800, fontSize: '1.125rem', marginBottom: 24, color: 'var(--lime)' }}>
          G4G Admin
        </div>
        <nav style={{ display: 'grid', gap: 4 }}>
          {LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: isActive ? 'var(--lime)' : 'var(--grey-400)',
                background: isActive ? 'rgba(163,230,53,0.08)' : 'transparent',
              })}
            >
              <l.icon size={18} /> {l.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div style={{ flex: 1, minWidth: 0 }}>
        {/* Mobile admin top bar */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            overflowX: 'auto',
            padding: '8px 12px',
            borderBottom: '1px solid var(--border-dark)',
          }}
          className="admin-mobile-nav no-scrollbar"
        >
          {LINKS.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              style={({ isActive }) => ({
                padding: '8px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8125rem',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                color: isActive ? '#0a0a0a' : 'var(--grey-400)',
                background: isActive ? 'var(--lime)' : 'var(--card-dark)',
              })}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
        <div style={{ padding: 16, maxWidth: 1100, margin: '0 auto' }}>
          <Outlet />
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .admin-sidebar { display: block !important; }
          .admin-mobile-nav { display: none !important; }
        }
      `}</style>
    </div>
  );
};