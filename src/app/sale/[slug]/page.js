import SaleClient from "@/UI/Components/SaleClient/SaleClient";

export async function generateMetadata({params}) {
    return {
      title: `Tent Sale - My Furniture Mecca`,
      description: `Browse our ${params.sale} collection`,
    };
  }
  
  export default function ActiveCategoryPage({ params }) {
    return <SaleClient slug={params} />
  }
  