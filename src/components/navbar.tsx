import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTodoStore } from "@/lib/store";
import { useLanguage } from "@/lib/language-context";

interface NavbarProps {
  activeUserId?: string;
}

const Navbar: React.FC<NavbarProps> = ({ activeUserId }) => {
  const pathname = usePathname();
  const { users } = useTodoStore();
  const { isRTL } = useLanguage();

  return (
    <nav className="bg-white shadow-md mb-8 rounded-xl overflow-hidden border border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row">
          <Link
            href="/"
            className={`px-5 py-4 text-center sm:text-left font-medium transition-all duration-200 ${
              pathname === "/"
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            <span className="flex items-center justify-center sm:justify-start gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
              {isRTL ? "الرئيسية" : "Dashboard"}
            </span>
          </Link>

          {users.map((user) => (
            <Link
              key={user.id}
              href={`/${user.id}`}
              className={`px-5 py-4 text-center sm:text-left font-medium transition-all duration-200 ${
                pathname === `/${user.id}` || activeUserId === user.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              <span className="flex items-center justify-center sm:justify-start gap-2">
                {user.avatar ? (
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={100}
                    height={100}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                {isRTL ? `المستخدم ${user.name.split(" ")[1]}` : user.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
