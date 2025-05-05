import FurnitureAtEveryBudgetClient from "@/UI/Components/FurnitureForBudgetClient/FurnitureForBudgetClient";
import { Suspense } from "react";

export async function generateMetadata() {
    return {
      title: `Financing - Furniture Mecca`,
      description: `Browse our collection`,
    };
  }
  
  
  
  
  export default function FurnitureAtEveryBudget() {

    return (
      <Suspense fallback={<div>Loading...</div>}>
        <FurnitureAtEveryBudgetClient />
      </Suspense>
    )
  }