"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Main from "./main/page"; // Import the main page component

const App = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false); // New state to track mounting
  const router = useRouter();
  const pathname = usePathname(); // Use usePathname hook to get the current path
  const user = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  useEffect(() => {
    // Indicate that the component is now mounted
    setIsMounted(true);

    // Redirect to login if no user token exists
    if (!user && pathname !== '/login' && pathname !== '/signup') {
      router.replace("/login");
    }
  }, [router, pathname, user]);

  // Avoid rendering until the component is mounted to prevent hydration issues
  if (!isMounted) {
    return null;
  }

  return user ? <Main /> : <>{children}</>;
};

export default App;
