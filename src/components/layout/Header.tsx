import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Header: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        paddingTop: 'calc(12px + var(--safe-top))',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        background: 'rgba(5,5,5,0.92)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-dark)',
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: 'var(--lime)',
            display: 'grid',
            placeItems: 'center',
            fontWeight: 800,
            fontSize: 14,
            color: '#0a0a0a',
          }}
        >
          G4
        </div>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: '1.0625rem',
            letterSpacing: '-0.02em',
          }}
        >
          Game4Gambia
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Link
          to="/games"
          aria-label="Search games"
          style={{ padding: 10, borderRadius: 'var(--radius-full)', color: 'var(--grey-200)' }}
        >
          <Search size={20} strokeWidth={2} />
        </Link>
        <button
          aria-label="Notifications"
          style={{ padding: 10, borderRadius: 'var(--radius-full)', color: 'var(--grey-200)' }}
        >
          <Bell size={20} strokeWidth={2} />
        </button>
        <Link
          to={user ? '/account' : '/auth'}
          aria-label="Account"
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'var(--card-dark)',
            border: '1px solid var(--border-dark)',
            display: 'grid',
            placeItems: 'center',
            marginLeft: 4,
            color: 'var(--grey-200)',
          }}
        >
          <User size={16} />
        </Link>
      </div>
    </header>
  );
};