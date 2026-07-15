import { createContext, useReducer, useEffect } from 'react';

export const CartContext = createContext();

const CART_STORAGE_KEY = 'zomato_cart';

const initialState = {
  items: [],
  deliveryFee: 4.99,
  promoDiscount: 0,
  promoCode: '',
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      let newItems;
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      return { ...state, items: newItems };
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    }

    case 'INCREMENT': {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }

    case 'DECREMENT': {
      const item = state.items.find((item) => item.id === action.payload);
      if (item && item.quantity === 1) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
    }

    case 'APPLY_PROMO': {
      if (action.payload.toLowerCase() === 'zomato60') {
        return { ...state, promoCode: 'ZOMATO60', promoDiscount: 10 };
      }
      return state;
    }

    case 'REMOVE_PROMO': {
      return { ...state, promoCode: '', promoDiscount: 0 };
    }

    case 'CLEAR_CART': {
      return { ...state, items: [], promoCode: '', promoDiscount: 0 };
    }

    case 'LOAD_CART': {
      return action.payload;
    }

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      try {
        dispatch({ type: 'LOAD_CART', payload: JSON.parse(stored) });
      } catch (e) {
        console.error('Failed to load cart state', e);
      }
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Derived values
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const serviceFee = subtotal > 0 ? 2.50 : 0;
  const tax = Number((subtotal * 0.085).toFixed(2));
  const deliveryFee = subtotal > 30 ? 0 : (subtotal > 0 ? state.deliveryFee : 0);
  const total = Number((subtotal + deliveryFee + serviceFee + tax - state.promoDiscount).toFixed(2));
  const itemCount = state.items.reduce((count, item) => count + item.quantity, 0);

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const incrementQuantity = (id) => dispatch({ type: 'INCREMENT', payload: id });
  const decrementQuantity = (id) => dispatch({ type: 'DECREMENT', payload: id });
  const applyPromo = (code) => dispatch({ type: 'APPLY_PROMO', payload: code });
  const removePromo = () => dispatch({ type: 'REMOVE_PROMO' });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        deliveryFee,
        serviceFee,
        tax,
        promoCode: state.promoCode,
        promoDiscount: state.promoDiscount,
        subtotal,
        total: total < 0 ? 0 : total,
        itemCount,
        addItem,
        removeItem,
        incrementQuantity,
        decrementQuantity,
        applyPromo,
        removePromo,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
