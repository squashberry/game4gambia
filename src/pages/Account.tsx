import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, User as UserIcon, Bell, HelpCircle, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';

export const Account: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ padding: '48px 24px', textAlign: 'center' }}>
        <UserIcon size={48} color="var(--grey-400)" style={{ marginBottom: 16 }} />
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: 8 }}>Sign in to your account</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--grey-400)', marginBottom: 24 }}>
          Access your orders, saved player IDs and more.
        </p>
        <Button onClick={() => navigate('/auth')} fullWidth>
          Sign in / Register
        </Button>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ padding: '16px' }}>
      {/* Profile header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'var(--card-dark)',
            border: '2px solid var(--lime)',
            display: 'grid',
            placeItems: 'center',
            fontSize: 20,
            fontWeight: 700,
            color: 'var(--lime)',
          }}
        >
          {user.displayName.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1.0625rem' }}>{user.displayName}</div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--grey-400)' }}>{user.email}</div>
        </div>
      </div>

      {/* Menu */}
      <div style={{ display: 'grid', gap: 2, marginBottom: 24 }}>
        <MenuRow to="/orders" icon={<Package size={18} />} label="Order history" />
        <MenuRow to="/account/saved-ids" icon={<UserIcon size={18} />} label="Saved player IDs" />
        <MenuRow to="/account/notifications" icon={<Bell size={18} />} label="Notifications" />
        <MenuRow to="/support" icon={<HelpCircle size={18} />} label="Help & support" />
      </div>

      <Button
        variant="secondary"
        fullWidth
        onClick={() => {
          signOut();
          navigate('/');
        }}
        style={{ justifyContent: 'center', gap: 8, color: 'var(--status-failed)' }}
      >
        <LogOut size={16} /> Log out
      </Button>
    </div>
  );
};

const MenuRow: React.FC<{ to: string; icon: React.ReactNode; label: string }> = ({ to, icon, label }) => (
  <Link
    to={to}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 12px',
      borderRadius: 'var(--radius-md)',
      fontSize: '0.9375rem',
      fontWeight: 500,
    }}
  >
    <span style={{ color: 'var(--grey-400)' }}>{icon}</span>
    <span style={{ flex: 1 }}>{label}</span>
    <ChevronRight size={16} color="var(--grey-600)" />
  </Link>
);