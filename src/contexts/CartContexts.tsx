import produce from "immer";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { createContext } from "use-context-selector";

interface SessionDataProps {
  price: string;
  quantity: number;
}
export interface CartItemsProps {
  id?: string;
  name: string;
  price: number;
  imageUrl: string;
  defaultPriceId?: string;
}
interface CartContextType {
  sessionData: SessionDataProps[];
  setSessionData: Dispatch<SetStateAction<SessionDataProps[]>>;
  cartItems: CartItemsProps[];
  setCartItems: Dispatch<SetStateAction<CartItemsProps[]>>;
  handleAddItemsToCart: (item: CartItemsProps) => void;
  removeItemFromCart: (price: number, priceId: string) => void;
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
    let isItemInCart = false;

    cartItems.map((element) => {
      if (element.price === item.price) {
        alert("Já adicionou este item ao carrinho!");
        isItemInCart = true;
        return;
      }
    });
    if (!isItemInCart) {
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
  }

  function removeItemFromCart(price: number, priceId: string) {
    const cartWithoutThisItem = cartItems.filter((item) => {
      return item.price !== price;
    });

    const sessiontWithoutThisItem = sessionData.filter((item) => {
      return item.price != priceId;
    });
    setCartItems(cartWithoutThisItem);
    setSessionData(sessiontWithoutThisItem);
  }
  return (
    <CartContext.Provider
      value={{
        sessionData,
        setSessionData,
        cartItems,
        setCartItems,
        handleAddItemsToCart,
        removeItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
