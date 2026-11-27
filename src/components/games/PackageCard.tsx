import React from 'react';
import type { Package } from '../../types';

interface PackageCardProps {
  pkg: Package;
  selected: boolean;
  onSelect: () => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, selected, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    aria-pressed={selected}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 4,
      padding: '14px 16px',
      borderRadius: 'var(--radius-md)',
      border: `2px solid ${selected ? 'var(--lime)' : 'var(--grey-200)'}`,
      background: selected ? 'rgba(163,230,53,0.08)' : 'var(--white)',
      transition: 'border-color 150ms ease, background 150ms ease',
      textAlign: 'left',
      width: '100%',
      cursor: 'pointer',
    }}
  >
    <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--grey-900)' }}>
      {pkg.label}
    </span>
    <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--grey-900)' }}>
      D {pkg.priceGMD.toLocaleString()}
    </span>
    {pkg.estimatedDelivery && (
      <span style={{ fontSize: '0.75rem', color: 'var(--grey-600)' }}>
        {pkg.estimatedDelivery}
      </span>
    )}
  </button>
);