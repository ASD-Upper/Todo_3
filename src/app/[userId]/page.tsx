import UserPageClient from "@/components/user-page-client";
import { Metadata } from "next";

type Params = {
  params: {
    userId: string;
  };
  searchParams?: Record<string, string | string[]>;
};

export async function generateMetadata({ 
  params 
}: Params): Promise<Metadata> {
  // This function is required for proper typing in Next.js 15
  return {
    title: `User ${params.userId}'s Tasks`,
    description: `Manage tasks for user ${params.userId}`,
  };
}

export default function UserPage({ 
  params 
}: Params) {
  const { userId } = params;
  
  // Render the client component with the userId
  return <UserPageClient userId={userId} />;
}
