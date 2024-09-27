"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function Navbar() {
  const router = useRouter(); // Initialize the router

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');

    // Redirect to the login page using Next.js router
    router.push('/login');
  };

  return (
    <nav className="bg-blue-600 text-white py-4 px-8 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Inventory Management</h1>
        <div className="flex gap-4 items-center">
          <Link href="/" className="hover:text-gray-200 transition duration-300">
            Home
          </Link>
          <Link href="/pages/products" className="hover:text-gray-200 transition duration-300">
            Products
          </Link>
          <Link href="/pages/sales" className="hover:text-gray-200 transition duration-300">
            Sales
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-gray-200 transition duration-300 bg-transparent border-none cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
