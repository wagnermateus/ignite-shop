import { CartContext, CartItemsProps } from "@/contexts/CartContexts";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/components/Cart/components/product";
import Image from "next/image";
import { useContext } from "react";

export default function Product({
  name,
  imageUrl,
  price,
  defaultPriceId,
}: CartItemsProps) {
  const { removeItemFromCart } = useContext(CartContext);

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={imageUrl} width={94} height={94} alt="" />
      </ImageContainer>
      <ProductDetails>
        <p>{name}</p>
        <span>
          {Intl.NumberFormat("pt-PT", {
            style: "currency",

            currency: "KZS",
          }).format(price)}
        </span>
        <button onClick={() => removeItemFromCart(price, defaultPriceId!)}>
          Remover
        </button>
      </ProductDetails>
    </ProductContainer>
  );
}
