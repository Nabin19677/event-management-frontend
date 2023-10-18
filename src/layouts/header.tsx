import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useApolloClient } from '@apollo/client';

const Header = () => {
  const router = useRouter();
  const client = useApolloClient();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleLogout = () => {
    router.push("/");
    localStorage.clear()
    client.clearStore();
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          Your Logo
        </Link>
        <nav className="space-x-4">
          <div className="relative group">
            <button
              onClick={toggleProfileDropdown}
              className="text-white group-hover:bg-blue-600"
            >
              Profile
            </button>
            {profileDropdownOpen && (
              <div className="absolute top-10 right-0 mt-2 w-40 bg-black border rounded-lg shadow-lg">
                <ul className="p-2 space-y-2">
                  <li>
                    <Link href="/profile">
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="hover:text-blue-600 cursor-pointer"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
