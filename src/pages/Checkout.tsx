import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, CheckCircle2, Clock } from 'lucide-react';
import type { Game, Package, PaymentMethod } from '../types';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { PaymentMethodCard } from '../components/checkout/PaymentMethodCard';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';

type Step = 'review' | 'payment' | 'instructions' | 'confirmation';

const METHODS: PaymentMethod[] = ['wave', 'afrimoney', 'qmoney', 'bank'];

export const Checkout: React.FC = () => {
  const { state } = useLocation() as {
    state?: { game: Game; pkg: Package; playerInfo: Record<string, string> };
  };
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('review');
  const [method, setMethod] = useState<PaymentMethod>('wave');
  const [reference, setReference] = useState('');
  const [receipt, setReceipt] = useState<File | null>(null);
  const [orderRef, setOrderRef] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const game = state?.game;
  const pkg = state?.pkg;
  const playerInfo = state?.playerInfo ?? {};

  const canSubmit = useMemo(() => {
    if (method === 'bank') return receipt !== null && reference.trim().length > 0;
    return reference.trim().length > 0;
  }, [method, receipt, reference]);

  if (!game || !pkg) {
    return (
      <div style={{ padding: 32, textAlign: 'center' }}>
        <p style={{ color: 'var(--grey-400)' }}>No checkout data. Please select a package first.</p>
        <Button onClick={() => navigate('/games')} style={{ marginTop: 16 }}>
          Browse games
        </Button>
      </div>
    );
  }

  const handleSubmit = async () => {
    setSubmitting(true);
    // integration point: POST /api/orders
    await new Promise(r => setTimeout(r, 800));
    setOrderRef('G4G-' + Date.now().toString().slice(-8));
    setStep('confirmation');
    setSubmitting(false);
  };

  return (
    <div className="page-enter" style={{ background: 'var(--grey-50)', minHeight: '100dvh', paddingBottom: 32 }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '12px 16px',
          paddingTop: 'calc(12px + var(--safe-top))',
          background: 'var(--white)',
          borderBottom: '1px solid var(--grey-200)',
          position: 'sticky',
          top: 0,
          zIndex: 30,
        }}
      >
        <button onClick={() => navigate(-1)} aria-label="Back" style={{ color: 'var(--grey-900)' }}>
          <ArrowLeft size={22} />
        </button>
        <span style={{ fontWeight: 700, color: 'var(--grey-900)' }}>Checkout</span>
      </div>

      <div style={{ maxWidth: 560, margin: '0 auto', padding: 16 }}>
        {/* Progress */}
        <StepIndicator current={step} />

        {step === 'review' && (
          <>
            <OrderSummary game={game} pkg={pkg} playerInfo={playerInfo} />
            <div style={{ marginTop: 20 }}>
              <Button fullWidth size="lg" onClick={() => setStep('payment')}>
                Continue to payment
              </Button>
            </div>
          </>
        )}

        {step === 'payment' && (
          <>
            <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--grey-900)', marginBottom: 12 }}>
              Payment method
            </h2>
            <div style={{ display: 'grid', gap: 10 }}>
              {METHODS.map(m => (
                <PaymentMethodCard
                  key={m}
                  method={m}
                  selected={method === m}
                  onSelect={() => setMethod(m)}
                />
              ))}
            </div>
            <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
              <Button variant="secondary" onClick={() => setStep('review')} style={{ flex: 1 }}>
                Back
              </Button>
              <Button onClick={() => setStep('instructions')} style={{ flex: 2 }}>
                Continue
              </Button>
            </div>
          </>
        )}

        {step === 'instructions' && (
          <>
            <div
              style={{
                background: 'var(--white)',
                borderRadius: 'var(--radius-lg)',
                padding: 20,
                color: 'var(--grey-900)',
              }}
            >
              <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: 4 }}>
                Payment instructions
              </h2>
              <p style={{ fontSize: '0.8125rem', color: 'var(--grey-600)', marginBottom: 16 }}>
                Send <strong>D {pkg.priceGMD.toLocaleString()}</strong> using {method === 'bank' ? 'bank transfer' : method.toUpperCase()}. Use the reference below and upload your receipt.
              </p>

              <div
                style={{
                  background: 'var(--grey-100)',
                  borderRadius: 'var(--radius-md)',
                  padding: 14,
                  marginBottom: 16,
                  fontSize: '0.875rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: 'var(--grey-600)' }}>Recipient</span>
                  <span style={{ fontWeight: 600 }}>Game4Gambia Ltd</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: 'var(--grey-600)' }}>Amount</span>
                  <span style={{ fontWeight: 600 }}>D {pkg.priceGMD.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--grey-600)' }}>Reference</span>
                  <span style={{ fontWeight: 700, color: 'var(--lime-dark)' }}>
                    {orderRef ?? 'G4G-XXXXXXXX'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'grid', gap: 12 }}>
                <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--grey-900)' }}>
                  Transaction reference
                  <input
                    value={reference}
                    onChange={e => setReference(e.target.value)}
                    placeholder="e.g. WAVE-123456"
                    style={{
                      display: 'block',
                      width: '100%',
                      marginTop: 6,
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--grey-200)',
                      fontSize: '0.9375rem',
                      outline: 'none',
                    }}
                  />
                </label>

                <label style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--grey-900)' }}>
                  Receipt (required for bank transfer)
                  <div
                    style={{
                      marginTop: 6,
                      border: '2px dashed var(--grey-200)',
                      borderRadius: 'var(--radius-md)',
                      padding: 20,
                      textAlign: 'center',
                      cursor: 'pointer',
                      color: 'var(--grey-600)',
                    }}
                    onClick={() => document.getElementById('receipt-upload')?.click()}
                  >
                    <Upload size={20} style={{ marginBottom: 6 }} />
                    <div style={{ fontSize: '0.8125rem' }}>
                      {receipt ? receipt.name : 'Tap to upload receipt'}
                    </div>
                    <input
                      id="receipt-upload"
                      type="file"
                      accept="image/*,.pdf"
                      hidden
                      onChange={e => setReceipt(e.target.files?.[0] ?? null)}
                    />
                  </div>
                </label>
              </div>
            </div>

            <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
              <Button variant="secondary" onClick={() => setStep('payment')} style={{ flex: 1 }}>
                Back
              </Button>
              <Button onClick={handleSubmit} loading={submitting} disabled={!canSubmit} style={{ flex: 2 }}>
                Submit payment
              </Button>
            </div>
          </>
        )}

        {step === 'confirmation' && (
          <div
            style={{
              background: 'var(--white)',
              borderRadius: 'var(--radius-lg)',
              padding: 28,
              textAlign: 'center',
              color: 'var(--grey-900)',
            }}
          >
            <CheckCircle2 size={48} color="var(--lime-dark)" style={{ marginBottom: 12 }} />
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: 4 }}>Payment submitted</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--grey-600)', marginBottom: 20 }}>
              Your payment is awaiting verification. You will be notified once it is confirmed.
            </p>
            <div
              style={{
                background: 'var(--grey-100)',
                borderRadius: 'var(--radius-md)',
                padding: 14,
                marginBottom: 20,
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: '0.75rem', color: 'var(--grey-600)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Order number
              </div>
              <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>{orderRef}</div>
              <div style={{ marginTop: 8 }}>
                <StatusBadge status="payment_submitted" />
              </div>
            </div>
            <Button fullWidth onClick={() => navigate('/orders')}>
              View my orders
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ---------- Step indicator ---------- */

const STEPS: { key: Step; label: string }[] = [
  { key: 'review', label: 'Review' },
  { key: 'payment', label: 'Payment' },
  { key: 'instructions', label: 'Instructions' },
  { key: 'confirmation', label: 'Done' },
];

const StepIndicator: React.FC<{ current: Step }> = ({ current }) => {
  const index = STEPS.findIndex(s => s.key === current);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 20 }}>
      {STEPS.map((s, i) => (
        <React.Fragment key={s.key}>
          <div
            style={{
              flex: 1,
              height: 4,
              borderRadius: 2,
              background: i <= index ? 'var(--lime)' : 'var(--grey-200)',
              transition: 'background 200ms ease',
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
};