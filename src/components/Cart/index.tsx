import { CartContext } from "@/contexts/CartContexts";
import {
  CloseButton,
  Content,
  Overlay,
  ProductsContainer,
  Title,
} from "@/styles/components/Cart";
import {
  PurchaseContainer,
  PurchaseDetails,
  QuantityOfProducts,
  TotalPurchaseAmount,
} from "@/styles/components/Cart/components/product";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import { X } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import Product from "./components/Product";

export default function Cart() {
  const [isCreatingCheckoutSession, setisCreatingCheckoutSession] =
    useState(false);
  const { productItem, cartItems } = useContext(CartContext);

  async function handleBuyProduct() {
    try {
      setisCreatingCheckoutSession(true);

      const response = await axios.post("/api/checkout", {
        productItems: productItem,
      });
      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (error) {
      setisCreatingCheckoutSession(false);
      //Conectar com uma ferramenta de observalidade (Datadog /Sentry)
      alert("Falha ao redirecionar ao checkout");
    }
  }

  return (
    <Dialog.Portal>
      <Overlay>
        <Content>
          <CloseButton>
            <X size={24} color="#ffffff" />
          </CloseButton>
          <Title asChild>
            <h3>Sacola de compras</h3>
          </Title>

          <ProductsContainer>
            {cartItems.map((item) => {
              return (
                <Product
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  imageUrl={item.imageUrl}
                />
              );
            })}
          </ProductsContainer>
          <PurchaseContainer>
            <PurchaseDetails>
              <QuantityOfProducts>
                <span>Quantidade</span>
                <span>3 itens</span>
              </QuantityOfProducts>
              <TotalPurchaseAmount>
                <b>Valor total</b>
                <b>R$ 270,00</b>
              </TotalPurchaseAmount>
            </PurchaseDetails>
            <button onClick={handleBuyProduct}>Finalizar compra</button>
          </PurchaseContainer>
        </Content>
      </Overlay>
    </Dialog.Portal>
  );
}
