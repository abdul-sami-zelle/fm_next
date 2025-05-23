import AboutUsClient from "@/UI/Components/AboutusClient/AboutusClient";

export async function generateMetadata() {
    
    return {
        title: `About Us - Furniture Mecca`,
        description: `Browse our  collection`,
    };
}




export default function AboutUs() {
    
    return <AboutUsClient  />
}