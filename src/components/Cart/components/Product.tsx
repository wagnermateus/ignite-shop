import { CartItemsProps } from "@/contexts/CartContexts";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/components/Cart/components/product";
import Image from "next/image";

export default function Product({ name, imageUrl, price }: CartItemsProps) {
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={imageUrl} width={94} height={94} alt="" />
      </ImageContainer>
      <ProductDetails>
        <p>{name}</p>
        <span>{price}</span>
        <button>Remover</button>
      </ProductDetails>
    </ProductContainer>
  );
}
