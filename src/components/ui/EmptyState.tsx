import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description, action }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '48px 24px',
      gap: '12px',
      color: 'var(--grey-400)',
    }}
  >
    {icon && <div style={{ opacity: 0.7, marginBottom: 8 }}>{icon}</div>}
    <h3 style={{ color: 'var(--white)', fontSize: '1.125rem', fontWeight: 600 }}>{title}</h3>
    <p style={{ maxWidth: 320, fontSize: '0.875rem', lineHeight: 1.5 }}>{description}</p>
    {action && <div style={{ marginTop: 12 }}>{action}</div>}
  </div>
);