/**
 * All methods are stubs that would be replaced by real HTTP calls.
 * They are typed so the UI can be developed without a backend.
 * No secrets are hard-coded.
 */

import type { Game, Package, Order, User, SavedPlayerId, PaymentMethod, OrderStatus } from '../types';

const DELAY = 400; // simulate network

function wait<T>(data: T): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), DELAY));
}

/* ---------- Catalogue ---------- */
export async function fetchGames(): Promise<Game[]> {
  // return fetch('/api/games').then(r => r.json());
  const { MOCK_GAMES } = await import('./mockData');
  return wait(MOCK_GAMES);
}

export async function fetchGameBySlug(slug: string): Promise<Game | undefined> {
  const games = await fetchGames();
  return games.find(g => g.slug === slug);
}

export async function fetchPackages(gameId: string): Promise<Package[]> {
  const { MOCK_PACKAGES } = await import('./mockData');
  return wait(MOCK_PACKAGES.filter(p => p.gameId === gameId && p.available));
}

/* ---------- Orders ---------- */
export async function fetchOrders(): Promise<Order[]> {
  const { MOCK_ORDERS } = await import('./mockData');
  return wait(MOCK_ORDERS);
}

export async function fetchOrder(id: string): Promise<Order | undefined> {
  const orders = await fetchOrders();
  return orders.find(o => o.id === id);
}

export async function createOrder(payload: {
  gameId: string;
  packageId: string;
  playerInfo: Record<string, string>;
  paymentMethod: PaymentMethod;
}): Promise<Order> {
  // POST /api/orders
  console.log('createOrder', payload);
  const order: Order = {
    id: crypto.randomUUID(),
    reference: 'G4G-' + Date.now(),
    gameId: payload.gameId,
    gameName: 'Demo Game',
    packageLabel: 'Demo Package',
    amountGMD: 0,
    status: 'awaiting_payment',
    createdAt: new Date().toISOString(),
    playerInfo: payload.playerInfo,
    paymentMethod: payload.paymentMethod,
    timeline: [{ status: 'awaiting_payment', timestamp: new Date().toISOString() }],
  };
  return wait(order);
}

export async function uploadReceipt(orderId: string, file: File): Promise<void> {
  // POST /api/orders/:id/receipt  (multipart/form-data)
  console.log('uploadReceipt', orderId, file.name);
  return wait(undefined);
}

/* ---------- Auth (integration-ready) ---------- */
export async function login(email: string, password: string): Promise<User> {
  // POST /api/auth/login
  if (!email || !password) throw new Error('Missing credentials');
  return wait({
    id: 'u1',
    email,
    displayName: email.split('@')[0],
    verified: true,
    createdAt: new Date().toISOString(),
  });
}

export async function register(email: string, password: string): Promise<User> {
  // POST /api/auth/register
  return login(email, password); // stub
}

export async function logout(): Promise<void> {
  // POST /api/auth/logout
  return wait(undefined);
}

/* ---------- Saved player IDs ---------- */
export async function fetchSavedPlayerIds(): Promise<SavedPlayerId[]> {
  const { MOCK_SAVED_IDS } = await import('./mockData');
  return wait(MOCK_SAVED_IDS);
}

/* ---------- Admin (protected – real implementation must verify role) ---------- */
export async function fetchAdminStats(): Promise<{
  totalOrders: number;
  revenueGMD: number;
  grossProfitGMD: number;
  pendingPayments: number;
  awaitingFulfilment: number;
  failedOrders: number;
}> {
  // IMPORTANT: backend must enforce role-based access.
  // These figures are illustrative only.
  return wait({
    totalOrders: 128,
    revenueGMD: 482_500,
    grossProfitGMD: 96_400,
    pendingPayments: 14,
    awaitingFulfilment: 9,
    failedOrders: 3,
  });
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  note?: string
): Promise<void> {
  // PATCH /api/admin/orders/:id
  console.log('updateOrderStatus', orderId, status, note);
  return wait(undefined);
}