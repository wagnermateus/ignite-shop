import produce from "immer";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface SessionDataProps {
  price: string;
  quantity: number;
}
export interface CartItemsProps {
  id?: string;
  name: string;
  price: string;
  imageUrl: string;
  defaultPriceId?: string;
}
interface CartContextType {
  sessionData: SessionDataProps[];
  setSessionData: Dispatch<SetStateAction<SessionDataProps[]>>;
  cartItems: CartItemsProps[];
  setCartItems: Dispatch<SetStateAction<CartItemsProps[]>>;
  handleAddItemsToCart: (item: CartItemsProps) => void;
}

export interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description?: string;
    defaultPriceId: string;
  };
}
interface CartProviderProps {
  children: ReactNode;
}
export const CartContext = createContext({} as CartContextType);

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItemsProps[]>([]);
  const [sessionData, setSessionData] = useState<SessionDataProps[]>([]);

  function handleAddItemsToCart(item: CartItemsProps) {
    setSessionData(
      produce((draft) => {
        draft.push({ price: item.defaultPriceId!, quantity: 1 });
      })
    );

    setCartItems(
      produce((draft) => {
        draft.push(item);
      })
    );
  }

  return (
    <CartContext.Provider
      value={{
        sessionData,
        setSessionData,
        cartItems,
        setCartItems,
        handleAddItemsToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
