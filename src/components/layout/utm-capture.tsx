"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { captureUtmsFromSearch } from "@/lib/leads/utm";

export function UtmCapture() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    const qs = searchParams.toString();
    if (qs) captureUtmsFromSearch(`?${qs}`);
  }, [searchParams, pathname]);

  return null;
}
