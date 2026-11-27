import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Package } from 'lucide-react';
import { fetchOrders } from '../services/api';
import type { Order } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';

const TABS = ['All', 'Pending', 'Processing', 'Completed', 'Failed'] as const;

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [tab, setTab] = useState<(typeof TABS)[number]>('All');

  useEffect(() => {
    fetchOrders().then(setOrders).catch(() => setOrders([]));
  }, []);

  const filtered = (orders ?? []).filter(o => {
    if (tab === 'All') return true;
    if (tab === 'Pending') return ['awaiting_payment', 'payment_submitted'].includes(o.status);
    if (tab === 'Processing') return ['payment_confirmed', 'processing'].includes(o.status);
    if (tab === 'Completed') return o.status === 'delivered';
    if (tab === 'Failed') return o.status === 'failed';
    return true;
  });

  return (
    <div className="page-enter" style={{ padding: '16px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 16 }}>
        My Orders
      </h1>

      {/* Tabs */}
      <div className="no-scrollbar" style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 16 }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              background: tab === t ? 'var(--lime)' : 'var(--card-dark)',
              color: tab === t ? '#0a0a0a' : 'var(--grey-200)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              border: '1px solid',
              borderColor: tab === t ? 'var(--lime)' : 'var(--border-dark)',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {!orders ? (
        <div style={{ display: 'grid', gap: 12 }}>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} height="100px" radius="16px" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Package size={40} />}
          title="No orders yet"
          description="Your top‑up orders will appear here."
          action={
            <Link to="/games" style={{ color: 'var(--lime)', fontWeight: 600, fontSize: '0.875rem' }}>
              Browse games
            </Link>
          }
        />
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {filtered.map(order => (
            <Link
              key={order.id}
              to={`/orders/${order.id}`}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                background: 'var(--card-dark)',
                border: '1px solid var(--border-dark)',
                borderRadius: 'var(--radius-lg)',
                padding: 16,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--grey-400)' }}>{order.reference}</span>
                <StatusBadge status={order.status} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{order.gameName}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--grey-400)' }}>
                    {order.packageLabel}
                  </div>
                  <div style={{ fontSize: '0.6875rem', color: 'var(--grey-600)', marginTop: 4 }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <div style={{ fontWeight: 700, fontSize: '1.0625rem' }}>
                  D {order.amountGMD.toLocaleString()}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};