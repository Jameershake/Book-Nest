import React, { createContext, useReducer } from 'react';

// --- Context Initialization ---
export const Store = createContext();

// --- Action Types ---
const USER_LOGIN = 'USER_LOGIN';
const USER_LOGOUT = 'USER_LOGOUT';
const CART_ADD_ITEM = 'CART_ADD_ITEM';
const CART_REMOVE_ITEM = 'CART_REMOVE_ITEM';

// --- Local Storage Helpers ---
const getLocalStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set localStorage for ${key}:`, error);
  }
};

const removeLocalStorage = key => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove localStorage for ${key}:`, error);
  }
};

// --- Initial State ---
const initialState = {
  userInfo: getLocalStorage('userInfo', null),
  cart: {
    items: getLocalStorage('cartItems', []),
  },
};

// --- Reducer ---
function reducer(state, action) {
  switch (action.type) {
    case USER_LOGIN: {
      const userData = action.payload;
      setLocalStorage('userInfo', userData);
      return { ...state, userInfo: userData };
    }

    case USER_LOGOUT:
      removeLocalStorage('userInfo');
      removeLocalStorage('cartItems');
      return {
        userInfo: null,
        cart: { items: [] },
      };

    case CART_ADD_ITEM: {
      const newItem = action.payload;
      const existItem = state.cart.items.find(x => x.book === newItem.book);

      const updatedItems = existItem
        ? state.cart.items.map(x => (x.book === existItem.book ? newItem : x))
        : [...state.cart.items, newItem];

      setLocalStorage('cartItems', updatedItems);
      return {
        ...state,
        cart: { items: updatedItems },
      };
    }

    case CART_REMOVE_ITEM: {
      const updatedItems = state.cart.items.filter(x => x.book !== action.payload.book);
      setLocalStorage('cartItems', updatedItems);
      return {
        ...state,
        cart: { items: updatedItems },
      };
    }

    default:
      return state;
  }
}

// --- Store Provider ---
export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>
      {children}
    </Store.Provider>
  );
}
