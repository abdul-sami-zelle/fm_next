import UserDashboardClient from "@/UI/Components/UserDashClient/UserDashClient";

export async function generateMetadata() {
    return {
      title: `User Dash - Furniture Mecca`,
      description: `Browse our Furniture Mecca collection`,
    };
  }
  
  
  
  
  export default function UserDashboard({params}) {
    return <UserDashboardClient id={params.id}  />
  }