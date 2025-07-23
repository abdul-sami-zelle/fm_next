import LastCallClient from "@/UI/Components/LastCallClient/LastCallClient";
import SaleClient from "@/UI/Components/SaleClient/SaleClient";

export async function generateMetadata({ params }) {
    return {
        title: `Active Sale`,
        description: `Browse our ${params.sale} collection`,
    };
}

export default function LastCall({ params }) {
    return <LastCallClient slug={params} />
}
