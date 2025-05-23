import LoginRegisterClient from "@/UI/Components/LoginRegisterClient/LoginRegisterClient";

export async function generateMetadata() {
    return {
      title: `Login & Reister - Furniture Mecca`,
      description: `Browse our Furniture Mecca collection`,
    };
  }
  
  
  
  
  export default function LoginRegister() {
    return <LoginRegisterClient  />
  }