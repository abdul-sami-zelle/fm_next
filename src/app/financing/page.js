import FinancingClient from "@/UI/Components/FinancingClient/FinancingClient";

export async function generateMetadata() {
    return {
      title: `Financing - Furniture Mecca`,
      description: `Browse our collection`,
    };
  }
  
  
  
  
  export default function Category() {
    return <FinancingClient />
  }