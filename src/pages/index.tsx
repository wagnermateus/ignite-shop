import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

import Image from "next/image";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import { CartButton, HomeContainer, Product } from "../styles/pages/home";
import { GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import { Handbag } from "phosphor-react";
import { useContext } from "react";
import { CartContext } from "@/contexts/CartContexts";

interface ProductProps {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  defaultPriceId: { id: string };
}
interface HomeProps {
  products: ProductProps[];
}

export default function Home({ products }: HomeProps) {
  const { handleAddItemsToCart } = useContext(CartContext);

  const [slideRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 48,
    },
  });
  function addItemToCart(item: ProductProps) {
    const newItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      imageUrl: item.imageUrl,
      defaultPriceId: item.defaultPriceId.id,
    };

    handleAddItemsToCart(newItem);
  }
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={slideRef} className="keen-slider">
        {products.map((product) => {
          return (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              prefetch={false}
            >
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} width={520} height={480} alt="" />
                <footer>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>
                  <CartButton onClick={() => addItemToCart(product)}>
                    <Handbag size={24} color="#e1e1e6" weight="bold" />
                  </CartButton>
                </footer>
              </Product>
            </Link>
          );
        })}
      </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ["data.default_price"],
  });

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price;

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: Intl.NumberFormat("pt-PT", {
        style: "currency",

        currency: "KZS",
      }).format(price.unit_amount! / 100),
      defaultPriceId: product.default_price,
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2,
  };
};
