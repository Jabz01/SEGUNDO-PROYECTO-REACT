import React, { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { auth } from "../firebase.js";  
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";  
import { Product } from "models/Product.js";

const LOCAL_CART_KEY = "gaster_blaster_cart";

interface CartContextType {
    products: any[];
    addProduct: (product: any) => void;
    deleteProduct: (id: number) => void;
}

const defaultCartContext: CartContextType = {
    products: [],
    addProduct: (product: any) => {},
    deleteProduct: (id: number) => {}
};

// Creamos el contexto
export const CartContext = createContext<CartContextType>(defaultCartContext);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  let [products, setProducts] = useState([]);

  // Verificar si hay una sesión existente al cargar
  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem(LOCAL_CART_KEY) || "[]"))
  }, []);

  const addProduct = (product: any) =>
  {
    products = [...window.structuredClone(products), window.structuredClone(product)]
    setProducts(products);

    console.log(products);
    

    localStorage.setItem(LOCAL_CART_KEY, JSON.stringify(products));
  }

  const deleteProduct = (id: number) =>
  {
    setProducts(products.filter( p => p.id != id ));
  }

  return (
    <CartContext.Provider 
      value={{ 
        products,
        addProduct,
        deleteProduct
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  
  return context;
};