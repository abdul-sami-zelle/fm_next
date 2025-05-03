import WishListClient from "@/UI/Components/WishListClient/WishListClient";

export async function generateMetadata() {
    return {
      title: `Wish List - Furniture Mecca`,
      description: `Browse our collection`,
    };
  }
  
  
  
  
  export default function LoginRegister() {
    return <WishListClient  />
  }