import UserPageClient from "@/components/user-page-client";
import { Metadata } from "next";

interface PageProps {
  params: { userId: string };
}

export async function generateMetadata({ 
  params 
}: PageProps): Promise<Metadata> {
  // This function is required for proper typing in Next.js 15
  return {
    title: `User ${params.userId}'s Tasks`,
    description: `Manage tasks for user ${params.userId}`,
  };
}

export default async function UserPage({ 
  params 
}: PageProps) {
  const { userId } = params;
  
  // Render the client component with the userId
  return <UserPageClient userId={userId} />;
}
