import { stripe } from "@/lib/stripe";
import {
  ImageContainer,
  ImagesContainer,
  SuccessContainer,
} from "@/styles/pages/success";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";

interface ProductProps {
  name: string;
  price: {
    product: {
      images: string;
    };
  };
}
interface SuccessProps {
  customerName: string;
  product: ProductProps[];
}
export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efectuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <h1>Compra efectuada !</h1>
        <ImagesContainer>
          {product.map((item) => {
            return (
              <ImageContainer key={item.name}>
                <Image
                  src={item.price.product.images[0]}
                  width={120}
                  height={110}
                  alt=""
                />
              </ImageContainer>
            );
          })}
        </ImagesContainer>

        <p>
          Uhuu! <strong>{customerName}</strong>, sua compra de{" "}
          {product.length === 1
            ? `${product.length} camiseta`
            : `${product.length} camisetas`}{" "}
          já está a caminho da sua casa.
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const customerName = session.customer_details!.name;
  const product = session.line_items?.data;

  return {
    props: {
      customerName,
      product: product,
    },
  };
};
