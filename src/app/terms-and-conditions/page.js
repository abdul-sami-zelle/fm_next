import TermsAndConditionsClient from "@/UI/Components/TermsAndConditionsClient/TermsAndConditionsClient";

export async function generateMetadata() {
    return {
      title: `Terms And Conditions  - Furniture Mecca`,
      description: `Browse our Furniture Mecca collection`,
    };
  }
  
  
  
  
  export default function TermsAndConditions() {
    return <TermsAndConditionsClient />
  }