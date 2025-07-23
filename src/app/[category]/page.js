import CategoriesClient from "@/UI/Components/CategoryClient/CategoryClient";

export async function generateMetadata({ params }) {
  return {
    title: `Category - ${params.category}`,
    description: `Browse our  collection`,
  };
}

export default async function Category({ params }) {

  console.log("category param", params)
  
  return <CategoriesClient category={params.category} />
}



