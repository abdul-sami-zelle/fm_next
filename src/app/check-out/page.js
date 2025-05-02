import CheckoutClient from "@/UI/Components/CheckoutClient/CheckoutClient";

export function generateMetadata({ params }) {
    return {
      title: `Checkout - ${params.checkout}`,
      description: `Browse our ${params} collection`,
    };
  }


export default function Summary({ params }) {
    console.log("checkout params", params)
    return <CheckoutClient params={params} />
  }