import UserPageClient from "@/components/user-page-client";
import { Metadata } from "next";

type Props = {
  params: { userId: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `User ${params.userId}'s Tasks`,
    description: `Manage tasks for user ${params.userId}`,
  };
}

// Let Next.js infer types for page components
export default function UserPage(props: Props) {
  const { userId } = props.params;
  
  return <UserPageClient userId={userId} />;
}
