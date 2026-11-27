import React, { useEffect, useState } from 'react';
import { fetchOrders, updateOrderStatus } from '../../services/api';
import type { Order, OrderStatus } from '../../types';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { Skeleton } from '../../components/ui/Skeleton';

const STATUSES: OrderStatus[] = [
  'awaiting_payment',
  'payment_submitted',
  'payment_confirmed',
  'processing',
  'delivered',
  'failed',
];

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  const filtered = (orders ?? []).filter(o => filter === 'all' || o.status === filter);

  const changeStatus = async (id: string, status: OrderStatus) => {
    await updateOrderStatus(id, status);
    setOrders(prev => prev?.map(o => (o.id === id ? { ...o, status } : o)) ?? null);
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: 16 }}>Orders</h1>

      <div className="no-scrollbar" style={{ display: 'flex', gap: 6, overflowX: 'auto', marginBottom: 16 }}>
        {(['all', ...STATUSES] as const).map(s => (
          <button
            key={s}
            onClick={() => setFilter(s as any)}
            style={{
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              background: filter === s ? 'var(--lime)' : 'var(--card-dark)',
              color: filter === s ? '#0a0a0a' : 'var(--grey-400)',
            }}
          >
            {s === 'all' ? 'All' : s.replace(/_/g, ' ')}
          </button>
        ))}
      </div>

      {!orders ? (
        <Skeleton height="200px" radius="12px" />
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>
          {filtered.map(o => (
            <div
              key={o.id}
              style={{
                background: 'var(--card-dark)',
                border: '1px solid var(--border-dark)',
                borderRadius: 'var(--radius-md)',
                padding: 14,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--grey-400)' }}>{o.reference}</div>
                <div style={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  {o.gameName} – {o.packageLabel}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--grey-400)' }}>
                  D {o.amountGMD.toLocaleString()} · {new Date(o.createdAt).toLocaleDateString()}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <StatusBadge status={o.status} />
                <select
                  value={o.status}
                  onChange={e => changeStatus(o.id, e.target.value as OrderStatus)}
                  style={{
                    background: 'var(--black)',
                    color: 'var(--white)',
                    border: '1px solid var(--border-dark)',
                    borderRadius: 8,
                    padding: '6px 8px',
                    fontSize: '0.75rem',
                  }}
                >
                  {STATUSES.map(s => (
                    <option key={s} value={s}>
                      {s.replace(/_/g, ' ')}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};