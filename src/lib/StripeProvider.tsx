"use client";

import { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { CartProvider } from "use-shopping-cart";

interface StripeProviderProps {
  children: React.ReactNode;
}

const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    const fetchStripe = async () => {
      const stripeInstance = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );
      setStripe(stripeInstance);
    };

    fetchStripe();
  }, []);

  return (
    <>
      {stripe && (
        <CartProvider
          mode="payment"
          cartMode="client-only"
          stripe={process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!}
          currency="USD"
          successUrl="/success"
          cancelUrl="/cancel"
          shouldPersist={true}
        >
          {children}
        </CartProvider>
      )}
    </>
  );
};

export default StripeProvider;
