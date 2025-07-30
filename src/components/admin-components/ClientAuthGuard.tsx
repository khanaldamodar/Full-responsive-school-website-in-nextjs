"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Loader from "../global/Loader";

export default function ClientAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
      return;
    } 
      setAuthChecked(true); // Allow rendering
  }, [router, pathname]);

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center h-full">
       <Loader/>
      </div>
    );
  }

  return <>{children}</>;
}
