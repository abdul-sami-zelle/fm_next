import CategoriesClient from "@/UI/Components/CategoryClient/CategoryClient";

// export function generateMetadata({ params }) {
//   return {
//     title: `Category - ${params.category}`,
//     description: `Browse our ${params.category} collection`,
//   };
// }




export default function Category({ params }) {
  // return <CategoriesClient category={params.category} />;
  return <CategoriesClient category={params.category} />
}



// export async function generateMetadata({ params }) {
//   return {
//     title: `Product - ${params} `,
//     description: `Details about `,
//   };
// }