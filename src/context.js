import React, { useContext, useReducer, useEffect } from "react";
import cartItems from "./data";
import reducer from "./reducer";

const url = "https://course-api.com/react-useReducer-cart-project";
const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // set clear cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  // set remove item
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  // set increase
  const increase = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };

  // set decrease
  const decrease = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };

  // fetch the data from API
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    const res = await fetch(url);
    const cart = await res.json();
    dispatch({ type: "DISPLAY_ITEMS", payload: cart });
  };

  // toggle the amount
  const toggleAmount = (id, type) => {
    dispatch({ type: "TOGGLE_AMOUNT", payload: { id, type } });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: "GET_TOTALS" });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        removeItem,
        increase,
        decrease,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// use custom hooks
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
