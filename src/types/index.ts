export type OrderStatus =
  | 'awaiting_payment'
  | 'payment_submitted'
  | 'payment_confirmed'
  | 'processing'
  | 'delivered'
  | 'failed'
  | 'refund_pending'
  | 'refunded'
  | 'cancelled';

export type PaymentMethod = 'wave' | 'afrimoney' | 'qmoney' | 'bank';

export interface Game {
  id: string;
  slug: string;
  name: string;
  description: string;
  artwork: string;          // URL or imported asset
  categories: string[];
  popular: boolean;
  recentlyAdded: boolean;
  active: boolean;
}

export interface Package {
  id: string;
  gameId: string;
  label: string;            // e.g. "310 Diamonds"
  denomination: number;
  priceGMD: number;         // selling price
  supplierCostGMD?: number; // only used in admin – never exposed to customer
  available: boolean;
  estimatedDelivery?: string; // e.g. "Instant – 15 min"
  requiresFields: PlayerField[];
}

export interface PlayerField {
  key: string;
  label: string;
  placeholder?: string;
  required: boolean;
  type: 'text' | 'number' | 'select';
  options?: string[];       // for select
}

export interface Order {
  id: string;
  reference: string;
  gameId: string;
  gameName: string;
  packageLabel: string;
  amountGMD: number;
  status: OrderStatus;
  createdAt: string;        // ISO
  playerInfo: Record<string, string>;
  paymentMethod?: PaymentMethod;
  paymentReference?: string;
  timeline: OrderEvent[];
}

export interface OrderEvent {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  verified: boolean;
  createdAt: string;
}

export interface SavedPlayerId {
  id: string;
  gameId: string;
  gameName: string;
  label: string;            // e.g. "Main account"
  fields: Record<string, string>;
}