import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, ShieldCheck } from 'lucide-react';
import { fetchGameBySlug, fetchPackages } from '../services/api';
import type { Game, Package } from '../types';
import { PackageCard } from '../components/games/PackageCard';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';

export const GameDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<Game | null | undefined>(undefined);
  const [packages, setPackages] = useState<Package[] | null>(null);
  const [selected, setSelected] = useState<Package | null>(null);
  const [fields, setFields] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!slug) return;
    fetchGameBySlug(slug).then(g => {
      setGame(g ?? null);
      if (g) {
        fetchPackages(g.id).then(pkgs => {
          setPackages(pkgs);
          if (pkgs.length) setSelected(pkgs[0]);
        });
      }
    });
  }, [slug]);

  if (game === undefined) {
    return (
      <div style={{ padding: 16 }}>
        <Skeleton height="220px" radius="16px" />
        <div style={{ height: 16 }} />
        <Skeleton height="120px" radius="16px" />
      </div>
    );
  }

  if (game === null) {
    return <div style={{ padding: 32, textAlign: 'center', color: 'var(--grey-400)' }}>Game not found.</div>;
  }

  const handleBuy = () => {
    if (!selected) return;
    navigate('/checkout', {
      state: { game, pkg: selected, playerInfo: fields },
    });
  };

  const allFieldsFilled = selected
    ? selected.requiresFields.filter(f => f.required).every(f => fields[f.key]?.trim())
    : false;

  return (
    <div className="page-enter">
      {/* Dark hero */}
      <div style={{ position: 'relative' }}>
        <img
          src={game.artwork}
          alt={game.name}
          style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(5,5,5,0.2) 0%, var(--black) 100%)',
          }}
        />
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          style={{
            position: 'absolute',
            top: 'calc(12px + var(--safe-top))',
            left: 12,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            display: 'grid',
            placeItems: 'center',
            color: 'white',
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{game.name}</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--grey-400)', marginTop: 4 }}>{game.description}</p>
        </div>
      </div>

      {/* Light product surface */}
      <div
        style={{
          background: 'var(--grey-50)',
          borderRadius: '24px 24px 0 0',
          marginTop: -12,
          padding: '20px 16px 32px',
          color: 'var(--grey-900)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: 12 }}>Choose a package</h2>

        {!packages ? (
          <div style={{ display: 'grid', gap: 10 }}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} height="76px" radius="12px" />
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 10 }}>
            {packages.map(pkg => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                selected={selected?.id === pkg.id}
                onSelect={() => setSelected(pkg)}
              />
            ))}
          </div>
        )}

        {/* Player information */}
        {selected && (
          <div style={{ marginTop: 24 }}>
            <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: 12 }}>
              Player information
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {selected.requiresFields.map(f => (
                <Input
                  key={f.key}
                  label={f.label}
                  placeholder={f.placeholder}
                  required={f.required}
                  value={fields[f.key] ?? ''}
                  onChange={e => setFields(prev => ({ ...prev, [f.key]: e.target.value }))}
                />
              ))}
            </div>
          </div>
        )}

        {/* Delivery info */}
        <div
          style={{
            display: 'flex',
            gap: 10,
            marginTop: 20,
            padding: 14,
            background: 'var(--white)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--grey-200)',
          }}
        >
          <ShieldCheck size={18} color="var(--lime-dark)" style={{ flexShrink: 0, marginTop: 1 }} />
          <div style={{ fontSize: '0.8125rem', color: 'var(--grey-600)', lineHeight: 1.5 }}>
            We never ask for your game password. Delivery is made directly to your player ID.
            {selected?.estimatedDelivery && (
              <span style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <Clock size={13} /> {selected.estimatedDelivery}
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 24 }}>
          <Button
            size="lg"
            fullWidth
            disabled={!selected || !allFieldsFilled}
            onClick={handleBuy}
          >
            {selected
              ? `Buy for D ${selected.priceGMD.toLocaleString()}`
              : 'Select a package'}
          </Button>
        </div>
      </div>
    </div>
  );
};