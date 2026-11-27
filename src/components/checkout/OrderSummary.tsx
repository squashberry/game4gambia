import React from 'react';
import type { Game, Package } from '../../types';

interface OrderSummaryProps {
  game: Game;
  pkg: Package;
  playerInfo: Record<string, string>;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ game, pkg, playerInfo }) => (
  <div
    style={{
      background: 'var(--white)',
      borderRadius: 'var(--radius-lg)',
      padding: 20,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      color: 'var(--grey-900)',
    }}
  >
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <img
        src={game.artwork}
        alt=""
        style={{ width: 56, height: 56, borderRadius: 10, objectFit: 'cover' }}
      />
      <div>
        <div style={{ fontWeight: 700 }}>{game.name}</div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--grey-600)' }}>{pkg.label}</div>
      </div>
    </div>

    <hr style={{ border: 'none', borderTop: '1px solid var(--grey-200)' }} />

    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--grey-600)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        Player information
      </div>
      {Object.entries(playerInfo).map(([key, value]) => (
        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
          <span style={{ color: 'var(--grey-600)' }}>{key}</span>
          <span style={{ fontWeight: 600 }}>{value}</span>
        </div>
      ))}
    </div>

    <hr style={{ border: 'none', borderTop: '1px solid var(--grey-200)' }} />

    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
        <span style={{ color: 'var(--grey-600)' }}>Subtotal</span>
        <span>D {pkg.priceGMD.toLocaleString()}</span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
        <span style={{ color: 'var(--grey-600)' }}>Service fee</span>
        <span>D 0</span>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '1.125rem',
          fontWeight: 700,
          marginTop: 4,
        }}
      >
        <span>Total</span>
        <span>D {pkg.priceGMD.toLocaleString()}</span>
      </div>
    </div>
  </div>
);