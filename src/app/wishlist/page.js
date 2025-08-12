import WishListClient from "@/UI/Components/WishListClient/WishListClient";

export async function generateMetadata() {
    return {
      title: `WishList - Furniture Mecca`,
      description: `Browse our collection`,
    };
  }
  
  
  
  
  export default function LoginRegister() {
    return <WishListClient  />
  }