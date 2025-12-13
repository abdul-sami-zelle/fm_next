import UserDashboardWrapper from "@/UI/Components/UserDashClient/UserDashboardWrapper";
import UserDashboardClient from "@/UI/Components/UserDashClient/UserDashClient";

export async function generateMetadata() {
  return {
    title: `User Dash - Furniture Mecca`,
    description: `Browse our Furniture Mecca collection`,
  };
}

export default async function UserDashboard({ params }) {
  const resolvedParam = await params
  return <UserDashboardWrapper id={resolvedParam.id} />
}