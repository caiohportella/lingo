"use server";

import { auth, currentUser } from "@clerk/nextjs";

import { stripe } from "@/lib/stripe";

import { absoluteURL } from "@/lib/utils";

import { getUserSubscription } from "@/db/queries";

const returnURL = absoluteURL("/shop");

export const createStripeURL = async () => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) throw new Error("Unauthorized");

  const userSubscription = await getUserSubscription();

  if (userSubscription && userSubscription.stripeCustomerid) {
    const stripeSession = await stripe.billingPortal.sessions.create({
      customer: userSubscription.stripeCustomerid,
      return_url: returnURL,
    });

    return { data: stripeSession.url };
  }

  const stripeSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: user.emailAddresses[0].emailAddress,
    line_items: [
      {
        price_data: {
          currency: "brl",
          product_data: {
            name: "Lingo Pro",
            description: "Unlock unlimited hearts",
          },
          unit_amount: 1000,
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId,
    },
    success_url: returnURL,
    cancel_url: returnURL,
  });

  return { data: stripeSession.url };
};
