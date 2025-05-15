import React, { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { auth } from "../firebase.js";  
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";  
import { Product } from "models/Product.js";

const LOCAL_CART_KEY = "gaster_blaster_cart";

interface CartContextType {
    products: Product[];
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
  const [products, setProducts] = useState<Product[] | null>([]);

  // Verificar si hay una sesión existente al cargar
  useEffect(() => {
    //
  }, []);

  const addProduct = (product: any) =>
  {
    setProducts([...products, window.structuredClone(product)]);

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