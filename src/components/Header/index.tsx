import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import logoImg from "../../assets/logo.svg";

import Cart from "../Cart";
import {
  CartButton,
  HeaderContainer,
  ItemsCount,
} from "@/styles/components/Header";

import { CartContext } from "@/contexts/CartContexts";
import { Handbag } from "phosphor-react";
import { useContextSelector } from "use-context-selector";

export function Header() {
  const cartItems = useContextSelector(CartContext, (context) => {
    return context.cartItems;
  });

  const cartIsEmpty = cartItems.length === 0;
  return (
    <HeaderContainer>
      <Image src={logoImg.src} width={129.74} height={52} alt="" />
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <CartButton disabled={cartIsEmpty}>
            {!cartIsEmpty && <ItemsCount> {cartItems.length}</ItemsCount>}
            <Handbag size={24} color="#e1e1e6" weight="bold" />
          </CartButton>
        </Dialog.Trigger>
        <Cart />
      </Dialog.Root>
    </HeaderContainer>
  );
}
