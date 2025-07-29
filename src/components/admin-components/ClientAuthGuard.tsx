"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Loader from "../global/Loader";

export default function ClientAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/login");
    } else {
      setAuthChecked(true); // Allow rendering
    }
  }, []);

  if (!authChecked) {
    return (
      <div className="flex items-center justify-center h-full">
       <Loader/>
      </div>
    );
  }

  return <>{children}</>;
}
