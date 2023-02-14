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
import { X } from "phosphor-react";
import Product from "./components/Product";

export default function Cart() {
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
            <Product />
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
            <button>Finalizar compra</button>
          </PurchaseContainer>
        </Content>
      </Overlay>
    </Dialog.Portal>
  );
}
