// Remove "use client" directive, making this a Server Component
import UserPageClient from "@/components/user-page-client";

// Type for server component props
type Props = {
  params: { userId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function UserPage({ params }: Props) {
  const { userId } = params;
  
  // Render the client component with the userId
  return <UserPageClient userId={userId} />;
}
