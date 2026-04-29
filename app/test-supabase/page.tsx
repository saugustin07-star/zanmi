"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TestSupabasePage() {
  const [status, setStatus] = useState("Checking connection...");

  useEffect(() => {
    async function testConnection() {
      const { error } = await supabase.from("surveys").select("*").limit(1);

      if (error) {
        setStatus(`Error: ${error.message}`);
      } else {
        setStatus("Supabase is connected successfully.");
      }
    }

    testConnection();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Zanmi Backend Test</h1>
      <p>{status}</p>
    </div>
  );
}