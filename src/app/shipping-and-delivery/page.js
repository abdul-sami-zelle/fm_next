import ShippingAndDeliveryClient from "@/UI/Components/ShippingAndDeliveryClient/ShippingAndDeliveryClient";

export async function generateMetadata() {
    return {
      title: `Shipping & Delivery  - Furniture Mecca`,
      description: `Browse our Furniture Mecca collection`,
    };
  }
  
  
  
  
  export default function ShippingAndDelivery() {
    return <ShippingAndDeliveryClient  />
  }