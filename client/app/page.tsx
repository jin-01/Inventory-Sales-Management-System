"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Main from "./main/page"; 

const App = ({ children }: { children: React.ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false); 
  const router = useRouter();
  const pathname = usePathname(); 
  const user = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  useEffect(() => {
    
    setIsMounted(true);

    if (!user && pathname !== '/login' && pathname !== '/signup') {
      router.replace("/login");
    }
  }, [router, pathname, user]);

  if (!isMounted) {
    return null;
  }

  return user ? <Main /> : <>{children}</>;
};

export default App;
