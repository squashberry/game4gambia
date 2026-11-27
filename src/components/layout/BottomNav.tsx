import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Gamepad2, Package, Headphones, User } from 'lucide-react';

const NAV = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/games', label: 'Games', icon: Gamepad2 },
  { to: '/orders', label: 'Orders', icon: Package },
  { to: '/support', label: 'Support', icon: Headphones },
  { to: '/account', label: 'Account', icon: User },
];

export const BottomNav: React.FC = () => {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(5,5,5,0.96)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border-dark)',
        paddingBottom: 'var(--safe-bottom)',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 'calc(60px + var(--safe-bottom))',
        maxWidth: 1366,
        margin: '0 auto',
      }}
      className="bottom-nav"
    >
      {NAV.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
            padding: '6px 12px',
            borderRadius: 'var(--radius-md)',
            color: isActive ? 'var(--lime)' : 'var(--grey-400)',
            fontSize: '0.6875rem',
            fontWeight: isActive ? 600 : 500,
            transition: 'color 150ms ease',
            position: 'relative',
            minWidth: 56,
          })}
        >
          {({ isActive }) => (
            <>
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    top: 0,
                    width: 20,
                    height: 3,
                    borderRadius: '0 0 4px 4px',
                    background: 'var(--lime)',
                  }}
                />
              )}
              <Icon size={22} strokeWidth={isActive ? 2.4 : 2} />
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};