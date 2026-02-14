const CART_STORAGE_KEY = "react_food_cart_items";

const readRawItems = () => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (_) {
    return [];
  }
};

const writeRawItems = (items) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

export const getCartItems = () => readRawItems();

export const addCartItem = (item) => {
  const items = readRawItems();
  const existing = items.find((entry) => entry.id === item.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    items.push({ ...item, quantity: 1 });
  }

  writeRawItems(items);
  return items;
};

export const removeCartItem = (id) => {
  const items = readRawItems();
  const nextItems = items
    .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
    .filter((item) => item.quantity > 0);

  writeRawItems(nextItems);
  return nextItems;
};

export const clearCart = () => {
  writeRawItems([]);
  return [];
};
