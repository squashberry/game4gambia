import React from 'react';
import type { OrderStatus } from '../../types';

const LABELS: Record<OrderStatus, string> = {
  awaiting_payment: 'Awaiting payment',
  payment_submitted: 'Payment submitted',
  payment_confirmed: 'Payment confirmed',
  processing: 'Processing',
  delivered: 'Delivered',
  failed: 'Failed',
  refund_pending: 'Refund pending',
  refunded: 'Refunded',
  cancelled: 'Cancelled',
};

const COLORS: Record<OrderStatus, string> = {
  awaiting_payment: 'var(--status-pending)',
  payment_submitted: '#fbbf24',
  payment_confirmed: '#60a5fa',
  processing: 'var(--status-processing)',
  delivered: 'var(--status-delivered)',
  failed: 'var(--status-failed)',
  refund_pending: '#c084fc',
  refunded: 'var(--status-refund)',
  cancelled: '#6b7280',
};

export const StatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '4px 10px',
      borderRadius: 'var(--radius-full)',
      fontSize: '0.75rem',
      fontWeight: 600,
      background: `${COLORS[status]}22`,
      color: COLORS[status],
      whiteSpace: 'nowrap',
    }}
  >
    <span
      style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: COLORS[status],
        flexShrink: 0,
      }}
    />
    {LABELS[status]}
  </span>
);