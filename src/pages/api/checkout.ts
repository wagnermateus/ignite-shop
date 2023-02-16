import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { productItems } = req.body;

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Meethod not allowed" });
  }

  if (!productItems) {
    return res.status(400).json({ error: "Price not found!" });
  }
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;

  const chekoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: "payment",
    line_items: productItems,
  });
  return res.status(201).json({ checkoutUrl: chekoutSession.url });
}
