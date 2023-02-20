import { CartContext } from "@/contexts/CartContexts";
import { stripe } from "@/lib/stripe";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "@/styles/pages/product";

import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import Stripe from "stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    description: string;
    defaultPriceId: string;
  };
}

export default function Product({ product }: ProductProps) {
  const { handleAddItemsToCart } = useContext(CartContext);

  function addItemsToCart(item: ProductProps) {
    const newItem = {
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      imageUrl: item.product.imageUrl,
      defaultPriceId: item.product.defaultPriceId,
    };
    handleAddItemsToCart(newItem);
  }
  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>

      <ProductContainer>
        <ImageContainer>
          <Image src={product.imageUrl} width={520} height={480} alt="" />
        </ImageContainer>
        <ProductDetails>
          <h1>{product.name}</h1>
          <span>
            {Intl.NumberFormat("pt-PT", {
              style: "currency",

              currency: "KZS",
            }).format(product.price)}
          </span>

          <p>{product.description}</p>

          <button onClick={() => addItemsToCart({ product })}>
            Adicionar ao carrinho
          </button>
        </ProductDetails>
      </ProductContainer>
    </>
  );
}
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: "prod_NLK3yZme0VhVb1" } }],
    fallback: "blocking",
  };
};
export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params!.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  const price = product.default_price as Stripe.Price;

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price.unit_amount! / 100,

        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, //1h
  };
};
