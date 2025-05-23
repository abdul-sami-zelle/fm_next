import CareersClient from "@/UI/Components/CareerClient/CareerCient";

export async function generateMetadata({ params }) {
    return {
      title: `Careers - ${params}`,
      description: `Browse our ${params} collection`,
    };
  }
  
  
  
  
  export default function Careers({ params }) {
    return <CareersClient params={params} />
  }