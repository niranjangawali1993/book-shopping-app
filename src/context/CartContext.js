import { createContext, useContext, useReducer } from 'react';
import { cartReducer } from '../reducers';

const cartInitialState = {
  cartList: [],
  total: 0,
};

const CartContext = createContext(cartInitialState);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (product) => {
    const updatedList = state.cartList.concat(product);
    const updatedTotal = state.total + product.price;
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        products: updatedList,
        total: updatedTotal,
      },
    });
  };

  const removeFromCart = (product) => {
    const updatedList = state.cartList.filter((prod) => prod.id !== product.id);
    const updatedTotal = state.total - product.price;

    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: {
        products: updatedList,
        total: updatedTotal,
      },
    });
  };

  const clearCart = () => {
    dispatch({
      type: 'CLEAR_CART',
      payload: {
        products: [],
        total: 0,
      },
    });
  };

  const value = {
    cartList: state.cartList,
    total: state.total,
    addToCart,
    removeFromCart,
    clearCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
