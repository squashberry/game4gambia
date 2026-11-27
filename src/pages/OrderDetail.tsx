import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { fetchOrder } from '../services/api';
import type { Order } from '../types';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Skeleton } from '../components/ui/Skeleton';

const STATUS_LABELS: Record<string, string> = {
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

export const OrderDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    if (id) fetchOrder(id).then(o => setOrder(o ?? null));
  }, [id]);

  if (order === undefined) {
    return (
      <div style={{ padding: 16 }}>
        <Skeleton height="40px" />
        <div style={{ height: 16 }} />
        <Skeleton height="200px" radius="16px" />
      </div>
    );
  }

  if (order === null) {
    return <div style={{ padding: 32, textAlign: 'center', color: 'var(--grey-400)' }}>Order not found.</div>;
  }

  return (
    <div className="page-enter" style={{ paddingBottom: 32 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 16px',
          paddingTop: 'calc(12px + var(--safe-top))',
          borderBottom: '1px solid var(--border-dark)',
        }}
      >
        <button onClick={() => navigate(-1)} aria-label="Back" style={{ color: 'white' }}>
          <ArrowLeft size={22} />
        </button>
        <span style={{ fontWeight: 700 }}>Order details</span>
      </div>

      <div style={{ padding: 16 }}>
        {/* Summary card */}
        <div
          style={{
            background: 'var(--card-dark)',
            border: '1px solid var(--border-dark)',
            borderRadius: 'var(--radius-lg)',
            padding: 20,
            marginBottom: 20,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--grey-400)' }}>{order.reference}</span>
            <StatusBadge status={order.status} />
          </div>
          <div style={{ fontSize: '1.125rem', fontWeight: 700 }}>{order.gameName}</div>
          <div style={{ fontSize: '0.875rem', color: 'var(--grey-400)', marginBottom: 12 }}>
            {order.packageLabel}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
            <span style={{ color: 'var(--grey-400)' }}>Amount</span>
            <span style={{ fontWeight: 700 }}>D {order.amountGMD.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginTop: 4 }}>
            <span style={{ color: 'var(--grey-400)' }}>Date</span>
            <span>{new Date(order.createdAt).toLocaleString()}</span>
          </div>
        </div>

        {/* Timeline */}
        <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: 16 }}>Status timeline</h2>
        <div style={{ position: 'relative', paddingLeft: 24 }}>
          {/* vertical line */}
          <div
            style={{
              position: 'absolute',
              left: 7,
              top: 6,
              bottom: 6,
              width: 2,
              background: 'var(--border-dark)',
            }}
          />
          {order.timeline.map((event, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: 20 }}>
              <div
                style={{
                  position: 'absolute',
                  left: -24 + 1,
                  top: 4,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: i === order.timeline.length - 1 ? 'var(--lime)' : 'var(--border-dark)',
                  border: '2px solid var(--black)',
                }}
              />
              <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                {STATUS_LABELS[event.status] ?? event.status}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--grey-400)' }}>
                {new Date(event.timestamp).toLocaleString()}
              </div>
              {event.note && (
                <div style={{ fontSize: '0.75rem', color: 'var(--grey-400)', marginTop: 2 }}>
                  {event.note}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};