import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/components/Cart/components/product";

export default function Product() {
  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>
      <ProductDetails>
        <p>Camisola Byond the Limits</p>
        <span>R$ 79,90</span>
        <button>Remover</button>
      </ProductDetails>
    </ProductContainer>
  );
}
