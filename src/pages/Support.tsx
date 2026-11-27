import React, { useState } from 'react';
import { ChevronDown, MessageCircle, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';

const FAQS = [
  {
    q: 'How long does delivery take?',
    a: 'Most top‑ups are delivered within minutes. Some products may take up to 24 hours depending on the game.',
  },
  {
    q: 'Do you need my game password?',
    a: 'Never. We only ask for your player ID or account identifier. Never share your password with anyone.',
  },
  {
    q: 'Which payment methods do you accept?',
    a: 'Wave, Afrimoney, QMoney and bank transfer.',
  },
  {
    q: 'What if my payment is not confirmed?',
    a: 'If you submitted a payment and it is still pending after 30 minutes, contact support with your order number and receipt.',
  },
];

export const Support: React.FC = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="page-enter" style={{ padding: '16px' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>
        Support
      </h1>
      <p style={{ fontSize: '0.875rem', color: 'var(--grey-400)', marginBottom: 20 }}>
        We’re here to help.
      </p>

      {/* FAQ */}
      <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: 12 }}>
        Frequently asked questions
      </h2>
      <div style={{ display: 'grid', gap: 8, marginBottom: 24 }}>
        {FAQS.map((faq, i) => (
          <div
            key={i}
            style={{
              background: 'var(--card-dark)',
              border: '1px solid var(--border-dark)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                padding: '14px 16px',
                textAlign: 'left',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              {faq.q}
              <ChevronDown
                size={16}
                style={{
                  transition: 'transform 200ms ease',
                  transform: open === i ? 'rotate(180deg)' : 'none',
                  flexShrink: 0,
                }}
              />
            </button>
            {open === i && (
              <div style={{ padding: '0 16px 14px', fontSize: '0.8125rem', color: 'var(--grey-400)', lineHeight: 1.6 }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Contact */}
      <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, marginBottom: 12 }}>Contact support</h2>
      <div style={{ display: 'grid', gap: 10 }}>
        <Button variant="secondary" fullWidth style={{ justifyContent: 'flex-start', gap: 12 }}>
          <MessageCircle size={18} /> WhatsApp support
        </Button>
        <Button variant="secondary" fullWidth style={{ justifyContent: 'flex-start', gap: 12 }}>
          <Send size={18} /> Submit a ticket
        </Button>
      </div>

      {/* Existing tickets */}
      <h2 style={{ fontSize: '1.0625rem', fontWeight: 700, margin: '24px 0 12px' }}>
        My support requests
      </h2>
      <div
        style={{
          background: 'var(--card-dark)',
          border: '1px solid var(--border-dark)',
          borderRadius: 'var(--radius-md)',
          padding: 16,
          fontSize: '0.8125rem',
          color: 'var(--grey-400)',
          textAlign: 'center',
        }}
      >
        No open support requests.
      </div>
    </div>
  );
};