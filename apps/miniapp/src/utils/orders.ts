export interface StoredOrderItem {
  title: string;
  qty: number;
}

export interface StoredOrder {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  items: StoredOrderItem[];
}

const STORAGE_KEY = 'tanso_bot_orders_v1';

export const getStoredOrders = (): StoredOrder[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveStoredOrder = (order: StoredOrder) => {
  try {
    const existing = getStoredOrders();
    localStorage.setItem(STORAGE_KEY, JSON.stringify([order, ...existing].slice(0, 50)));
  } catch {
    // Best-effort only — losing local order history is non-critical since
    // the lead itself is already safely stored server-side in the CRM.
  }
};
