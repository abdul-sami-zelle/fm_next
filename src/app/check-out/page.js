import CheckoutClient from "@/UI/Components/CheckoutClient/CheckoutClient";

export async function generateMetadata({ params }) {
    return {
      title: `Checkout - ${params.checkout}`,
      description: `Browse our ${params} collection`,
    };
  }


export default function Summary({ params }) {
    return <CheckoutClient params={params} />
  }