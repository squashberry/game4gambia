import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Search, ShieldCheck, Zap, CreditCard } from 'lucide-react';
import { fetchGames } from '../services/api';
import type { Game } from '../types';
import { GameCard } from '../components/games/GameCard';
import { Skeleton } from '../components/ui/Skeleton';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
  const [games, setGames] = useState<Game[] | null>(null);

  useEffect(() => {
    fetchGames().then(setGames).catch(() => setGames([]));
  }, []);

  const popular = games?.filter(g => g.popular) ?? [];
  const recent = games?.filter(g => g.recentlyAdded) ?? [];

  return (
    <div className="page-enter">
      {/* Hero */}
      <section
        style={{
          padding: '28px 16px 24px',
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(163,230,53,0.12), transparent)',
        }}
      >
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            maxWidth: 560,
          }}
        >
          Your favourite games.
          <br />
          <span style={{ color: 'var(--lime)' }}>Your local payment.</span>
        </h1>
        <p
          style={{
            marginTop: 12,
            fontSize: '0.9375rem',
            color: 'var(--grey-400)',
            maxWidth: 460,
            lineHeight: 1.6,
          }}
        >
          Top up your games using Wave, Afrimoney, QMoney and more. No international card needed.
        </p>
        <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/games">
            <Button size="lg">Explore Games</Button>
          </Link>
          <Link to="/support">
            <Button size="lg" variant="secondary">
              How it works
            </Button>
          </Link>
        </div>
      </section>

      {/* Search bar */}
      <div style={{ padding: '0 16px 16px' }}>
        <Link
          to="/games"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'var(--card-dark)',
            border: '1px solid var(--border-dark)',
            borderRadius: 'var(--radius-full)',
            padding: '12px 16px',
            color: 'var(--grey-400)',
            fontSize: '0.875rem',
          }}
        >
          <Search size={18} />
          Search games, diamonds, coins, gift cards…
        </Link>
      </div>

      {/* Popular games */}
      <Section title="Popular games" link="/games">
        {!games ? (
          <CardGrid>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height="180px" radius="16px" />
            ))}
          </CardGrid>
        ) : (
          <CardGrid>
            {popular.map(g => (
              <GameCard key={g.id} game={g} />
            ))}
          </CardGrid>
        )}
      </Section>

      {/* Recently added */}
      {recent.length > 0 && (
        <Section title="Recently added" link="/games">
          <CardGrid>
            {recent.map(g => (
              <GameCard key={g.id} game={g} />
            ))}
          </CardGrid>
        </Section>
      )}

      {/* How it works */}
      <Section title="How Game4Gambia works">
        <div style={{ display: 'grid', gap: 12 }}>
          {[
            { icon: <Search size={18} />, title: 'Choose your game', text: 'Pick a game and a top‑up package.' },
            { icon: <CreditCard size={18} />, title: 'Pay locally', text: 'Use Wave, Afrimoney, QMoney or bank transfer.' },
            { icon: <Zap size={18} />, title: 'Get your top‑up', text: 'We deliver directly to your game account.' },
          ].map(step => (
            <div
              key={step.title}
              style={{
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
                background: 'var(--card-dark)',
                border: '1px solid var(--border-dark)',
                borderRadius: 'var(--radius-lg)',
                padding: 16,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'rgba(163,230,53,0.12)',
                  color: 'var(--lime)',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0,
                }}
              >
                {step.icon}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{step.title}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--grey-400)', marginTop: 2, lineHeight: 1.5 }}>
                  {step.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Payment methods */}
      <Section title="Supported payment methods">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[
            { name: 'Wave', color: '#1dc4ff' },
            { name: 'Afrimoney', color: '#ff6b00' },
            { name: 'QMoney', color: '#e60000' },
            { name: 'Bank transfer', color: '#4b5563' },
          ].map(pm => (
            <div
              key={pm.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'var(--card-dark)',
                border: '1px solid var(--border-dark)',
                borderRadius: 'var(--radius-full)',
                padding: '8px 14px',
                fontSize: '0.8125rem',
                fontWeight: 500,
              }}
            >
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: pm.color }} />
              {pm.name}
            </div>
          ))}
        </div>
      </Section>

      {/* Support CTA */}
      <div style={{ padding: '8px 16px 32px' }}>
        <Link
          to="/support"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'linear-gradient(135deg, rgba(163,230,53,0.12), rgba(163,230,53,0.03))',
            border: '1px solid rgba(163,230,53,0.25)',
            borderRadius: 'var(--radius-lg)',
            padding: 16,
          }}
        >
          <ShieldCheck size={22} color="var(--lime)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>Need help?</div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--grey-400)' }}>
              Our support team is here for you.
            </div>
          </div>
          <ChevronRight size={18} color="var(--grey-400)" />
        </Link>
      </div>
    </div>
  );
};

/* ---------- small layout helpers ---------- */

const Section: React.FC<{
  title: string;
  link?: string;
  children: React.ReactNode;
}> = ({ title, link, children }) => (
  <section style={{ padding: '8px 16px 20px' }}>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}
    >
      <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, letterSpacing: '-0.01em' }}>{title}</h2>
      {link && (
        <Link
          to={link}
          style={{ fontSize: '0.8125rem', color: 'var(--lime)', fontWeight: 500 }}
        >
          See all
        </Link>
      )}
    </div>
    {children}
  </section>
);

const CardGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      gap: 12,
    }}
  >
    {children}
  </div>
);