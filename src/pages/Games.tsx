import React, { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { fetchGames } from '../services/api';
import type { Game } from '../types';
import { GameCard } from '../components/games/GameCard';
import { Skeleton } from '../components/ui/Skeleton';
import { EmptyState } from '../components/ui/EmptyState';

const CATEGORIES = ['All', 'Popular', 'Battle Royale', 'Shooter', 'Sports', 'MOBA', 'RPG'];

export const Games: React.FC = () => {
  const [games, setGames] = useState<Game[] | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    fetchGames().then(setGames).catch(() => setGames([]));
  }, []);

  const filtered = useMemo(() => {
    if (!games) return [];
    return games.filter(g => {
      const matchesQuery =
        !query ||
        g.name.toLowerCase().includes(query.toLowerCase()) ||
        g.categories.some(c => c.toLowerCase().includes(query.toLowerCase()));
      const matchesCategory =
        category === 'All' ||
        (category === 'Popular' && g.popular) ||
        g.categories.some(c => c.toLowerCase() === category.toLowerCase());
      return matchesQuery && matchesCategory;
    });
  }, [games, query, category]);

  return (
    <div className="page-enter" style={{ padding: '16px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 16 }}>
        Games
      </h1>

      {/* Search */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'var(--card-dark)',
          border: '1px solid var(--border-dark)',
          borderRadius: 'var(--radius-full)',
          padding: '10px 16px',
          marginBottom: 16,
        }}
      >
        <Search size={18} color="var(--grey-400)" />
        <input
          type="search"
          placeholder="Search games…"
          value={query}
          onChange={e => setQuery(e.target.value)}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--white)',
            fontSize: '0.9375rem',
            width: '100%',
          }}
        />
      </div>

      {/* Category chips */}
      <div
        className="no-scrollbar"
        style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 8, marginBottom: 16 }}
      >
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              background: category === cat ? 'var(--lime)' : 'var(--card-dark)',
              color: category === cat ? '#0a0a0a' : 'var(--grey-200)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              border: '1px solid',
              borderColor: category === cat ? 'var(--lime)' : 'var(--border-dark)',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {!games ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} height="180px" radius="16px" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<Search size={40} />}
          title="No games found"
          description="Try a different search term or category."
        />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
          {filtered.map(g => (
            <GameCard key={g.id} game={g} />
          ))}
        </div>
      )}
    </div>
  );
};