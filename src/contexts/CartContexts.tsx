import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface ProductItemProps {
  price: string;
  quantity: number;
}
export interface CartItemsProps {
  id?: string;
  name: string;
  price: string;
  imageUrl: string;
}
interface CartContextType {
  productItem: ProductItemProps[];
  setProductItem: Dispatch<SetStateAction<ProductItemProps[]>>;
  productsQuantity: number;
  setProductsQuantity: Dispatch<SetStateAction<number>>;
  cartItems: CartItemsProps[];
  setCartItems: Dispatch<SetStateAction<CartItemsProps[]>>;
}

interface CartProviderProps {
  children: ReactNode;
}
export const CartContext = createContext({} as CartContextType);

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItemsProps[]>([]);
  const [productItem, setProductItem] = useState<ProductItemProps[]>([]);
  const [productsQuantity, setProductsQuantity] = useState(0);
  return (
    <CartContext.Provider
      value={{
        productItem,
        setProductItem,
        productsQuantity,
        setProductsQuantity,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
