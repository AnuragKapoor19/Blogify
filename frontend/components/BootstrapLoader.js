"use client"; // This makes it a Client Component

import { useEffect } from "react";

export default function BootstrapProvider() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return null; // No UI, just loading Bootstrap JS
}