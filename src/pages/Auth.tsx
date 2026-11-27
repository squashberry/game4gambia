import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';

type Mode = 'login' | 'register' | 'forgot';

export const Auth: React.FC = () => {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await signIn(email, password);
        navigate('/');
      } else if (mode === 'register') {
        await signUp(email, password);
        navigate('/');
      } else {
        // password reset – integration point
        await new Promise(r => setTimeout(r, 600));
        setMode('login');
      }
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="page-enter"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '24px 16px',
        background: 'var(--black)',
      }}
    >
      <div style={{ maxWidth: 400, margin: '0 auto', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'var(--lime)',
              display: 'grid',
              placeItems: 'center',
              fontWeight: 800,
              fontSize: 18,
              color: '#0a0a0a',
              margin: '0 auto 16px',
            }}
          >
            G4
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
            {mode === 'login' ? 'Welcome back' : mode === 'register' ? 'Create account' : 'Reset password'}
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--grey-400)', marginTop: 4 }}>
            {mode === 'login'
              ? 'Sign in to continue.'
              : mode === 'register'
              ? 'Join Game4Gambia.'
              : 'We’ll send a reset link to your email.'}
          </p>
        </div>

        <form onSubmit={submit} style={{ display: 'grid', gap: 16 }}>
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          {mode !== 'forgot' && (
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          )}

          {error && (
            <div style={{ fontSize: '0.8125rem', color: 'var(--status-failed)' }}>{error}</div>
          )}

          <Button type="submit" fullWidth size="lg" loading={loading}>
            {mode === 'login' ? 'Sign in' : mode === 'register' ? 'Create account' : 'Send reset link'}
          </Button>
        </form>

        <div style={{ marginTop: 20, textAlign: 'center', fontSize: '0.8125rem', color: 'var(--grey-400)' }}>
          {mode === 'login' && (
            <>
              Don’t have an account?{' '}
              <button onClick={() => setMode('register')} style={{ color: 'var(--lime)', fontWeight: 600 }}>
                Register
              </button>
              <br />
              <button onClick={() => setMode('forgot')} style={{ color: 'var(--grey-400)', marginTop: 8 }}>
                Forgot password?
              </button>
            </>
          )}
          {mode === 'register' && (
            <>
              Already have an account?{' '}
              <button onClick={() => setMode('login')} style={{ color: 'var(--lime)', fontWeight: 600 }}>
                Sign in
              </button>
            </>
          )}
          {mode === 'forgot' && (
            <button onClick={() => setMode('login')} style={{ color: 'var(--lime)', fontWeight: 600 }}>
              Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  );
};