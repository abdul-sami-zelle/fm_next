import SaleClient from "@/UI/Components/SaleClient/SaleClient";

export async function generateMetadata() {
    return {
      title: `Sale - ${params.sale}`,
      description: `Browse our ${params.sale} collection`,
    };
  }
  
  export default function ActiveCategoryPage({ params }) {
    return <SaleClient slug={params} />
  }
  