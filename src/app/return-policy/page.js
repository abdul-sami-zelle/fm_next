import ReturnPolicyClient from "@/UI/Components/ReturnPolicyClient/ReturnPolicyClient";

export async function generateMetadata() {
    return {
        title: `Return Policies - Furniture Mecca`,
        description: `Browse our Furniture Mecca collection`,
    };
}




export default function ReturnPolicy() {
    return <ReturnPolicyClient />
}