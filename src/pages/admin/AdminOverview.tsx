import React, { useEffect, useState } from 'react';
import { fetchAdminStats } from '../../services/api';
import { Skeleton } from '../../components/ui/Skeleton';

export const AdminOverview: React.FC = () => {
  const [stats, setStats] = useState<Awaited<ReturnType<typeof fetchAdminStats>> | null>(null);

  useEffect(() => {
    fetchAdminStats().then(setStats);
  }, []);

  if (!stats) {
    return (
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} height="100px" radius="16px" />
        ))}
      </div>
    );
  }

  const cards = [
    { label: 'Total orders', value: stats.totalOrders.toLocaleString() },
    { label: 'Revenue', value: `D ${stats.revenueGMD.toLocaleString()}` },
    { label: 'Gross profit', value: `D ${stats.grossProfitGMD.toLocaleString()}` },
    { label: 'Pending payments', value: stats.pendingPayments.toString() },
    { label: 'Awaiting fulfilment', value: stats.awaitingFulfilment.toString() },
    { label: 'Failed orders', value: stats.failedOrders.toString() },
  ];

  return (
    <div>
      <h1 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: 4 }}>Overview</h1>
      <p style={{ fontSize: '0.8125rem', color: 'var(--grey-400)', marginBottom: 20 }}>
        Illustrative figures – connect to live backend data before launch.
      </p>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
        {cards.map(c => (
          <div
            key={c.label}
            style={{
              background: 'var(--card-dark)',
              border: '1px solid var(--border-dark)',
              borderRadius: 'var(--radius-lg)',
              padding: 16,
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--grey-400)', marginBottom: 6 }}>{c.label}</div>
            <div style={{ fontSize: '1.375rem', fontWeight: 800 }}>{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
};