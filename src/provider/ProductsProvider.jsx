/* eslint-disable react/prop-types */
import { useState } from "react";
import { ProductsContext } from "../context";

const ProductsProvider = ({ children }) => {
  const [editProducts, setEditProducts] = useState({});
  return (
    <ProductsContext.Provider value={{ editProducts, setEditProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider };
