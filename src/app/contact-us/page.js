import ContactClient from "@/UI/Components/ContactClient/ContactClient";

export async function generateMetadata() {
    return {
        title: `Contact Us  - Furniture Mecca`,
        description: `Browse our  collection`,
    };
}

export default function Contact() {
    return <ContactClient />
}