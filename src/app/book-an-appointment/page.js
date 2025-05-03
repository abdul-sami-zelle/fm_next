import BookAppointmentClient from "@/UI/Components/BookAppointmentClient/BookAppointmentClient";

export async function generateMetadata({ params }) {
    return {
      title: `Book an appointment  - ${params}`,
      description: `Browse our ${params} collection`,
    };
  }
  
  
  
  
  export default function BookAppointment({ params }) {
    return <BookAppointmentClient params={params} />
  }