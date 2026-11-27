import React from 'react';
import type { PaymentMethod } from '../../types';

const LABELS: Record<PaymentMethod, string> = {
  wave: 'Wave',
  afrimoney: 'Afrimoney',
  qmoney: 'QMoney',
  bank: 'Bank transfer',
};

const COLORS: Record<PaymentMethod, string> = {
  wave: '#1dc4ff',
  afrimoney: '#ff6b00',
  qmoney: '#e60000',
  bank: '#4b5563',
};

interface Props {
  method: PaymentMethod;
  selected: boolean;
  onSelect: () => void;
}

export const PaymentMethodCard: React.FC<Props> = ({ method, selected, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    aria-pressed={selected}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      borderRadius: 'var(--radius-md)',
      border: `2px solid ${selected ? 'var(--lime)' : 'var(--grey-200)'}`,
      background: selected ? 'rgba(163,230,53,0.06)' : 'var(--white)',
      width: '100%',
      cursor: 'pointer',
      transition: 'border-color 150ms ease',
    }}
  >
    <span
      style={{
        width: 36,
        height: 36,
        borderRadius: 10,
        background: COLORS[method],
        display: 'grid',
        placeItems: 'center',
        color: 'white',
        fontWeight: 800,
        fontSize: 11,
        flexShrink: 0,
      }}
    >
      {LABELS[method].slice(0, 2).toUpperCase()}
    </span>
    <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--grey-900)' }}>
      {LABELS[method]}
    </span>
    <span
      style={{
        marginLeft: 'auto',
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: `2px solid ${selected ? 'var(--lime)' : 'var(--grey-400)'}`,
        display: 'grid',
        placeItems: 'center',
        flexShrink: 0,
      }}
    >
      {selected && (
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--lime)' }} />
      )}
    </span>
  </button>
);