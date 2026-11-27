import React from 'react';
import { Link } from 'react-router-dom';
import type { Game } from '../../types';

interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => (
  <Link
    to={`/games/${game.slug}`}
    style={{
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--card-dark)',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--border-dark)',
      transition: 'transform 150ms ease, border-color 150ms ease',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.borderColor = 'var(--lime-dark)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.borderColor = 'var(--border-dark)';
    }}
  >
    <div style={{ aspectRatio: '5/3', overflow: 'hidden', background: '#111' }}>
      <img
        src={game.artwork}
        alt={game.name}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </div>
    <div style={{ padding: '10px 12px 12px' }}>
      <div style={{ fontSize: '0.9375rem', fontWeight: 600, lineHeight: 1.3 }}>{game.name}</div>
      <div style={{ fontSize: '0.75rem', color: 'var(--grey-400)', marginTop: 2 }}>
        {game.categories.join(' · ')}
      </div>
    </div>
  </Link>
);