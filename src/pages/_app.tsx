import { globalStyles } from "@/styles/global";
import { CartButton, Container, Header } from "@/styles/pages/app";
import type { AppProps } from "next/app";
import Image from "next/image";

import logoImg from "../assets/logo.svg";
import cartImg from "../assets/cart.svg";

import * as Dialog from "@radix-ui/react-dialog";
import Cart from "@/components/Cart";

globalStyles();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <Header>
        <Image src={logoImg.src} width={129.74} height={52} alt="" />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <CartButton>
              <Image src={cartImg} width={48} height={48} alt="cart" />
            </CartButton>
          </Dialog.Trigger>
          <Cart />
        </Dialog.Root>
      </Header>
      <Component {...pageProps} />
    </Container>
  );
}
