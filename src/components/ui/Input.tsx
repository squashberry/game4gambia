import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, hint, id, ...rest }) => {
  const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--grey-200)' }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        style={{
          background: 'var(--card-dark)',
          border: `1px solid ${error ? 'var(--status-failed)' : 'var(--border-dark)'}`,
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          color: 'var(--white)',
          fontSize: '0.9375rem',
          outline: 'none',
          minHeight: 48,
          width: '100%',
        }}
        {...rest}
      />
      {hint && !error && (
        <span style={{ fontSize: '0.75rem', color: 'var(--grey-400)' }}>{hint}</span>
      )}
      {error && (
        <span style={{ fontSize: '0.75rem', color: 'var(--status-failed)' }}>{error}</span>
      )}
    </div>
  );
};