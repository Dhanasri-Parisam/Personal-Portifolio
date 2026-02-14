import { useEffect, useMemo, useState } from "react";
import { clearCart, getCartItems, removeCartItem } from "../utils/cartStorage";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCartItems());
  }, []);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0),
    [items]
  );

  const handleRemove = (id) => {
    setItems(removeCartItem(id));
  };

  const handleClear = () => {
    setItems(clearCart());
  };

  return (
    <section className="mx-auto max-w-4xl px-4 py-8">
      <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm md:p-6">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Cart</h1>
          {items.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="rounded-full border border-orange-300 px-4 py-2 text-xs font-semibold text-orange-700 hover:bg-orange-50"
            >
              Clear Cart
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <p className="rounded-xl bg-slate-50 px-4 py-5 text-sm text-slate-600">
            Your cart is empty. Add items from restaurant menu.
          </p>
        ) : (
          <>
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 p-4"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.restaurantName}</p>
                    <p className="mt-1 text-xs text-slate-700">
                      {"\u20B9"} {item.price} x {item.quantity}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-xl bg-orange-50 px-4 py-3 text-right">
              <p className="text-sm font-semibold text-slate-900">Total: {"\u20B9"} {total}</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
