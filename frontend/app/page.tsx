"use client"; // クライアントサイドで fetch する場合必須

import { useEffect, useState } from "react";

export default function HomePage() {
  const [backendData, setBackendData] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/test"); // API Route を呼ぶ
        console.log(res);
        const data = await res.json();
        setBackendData(data.backend || JSON.stringify(data));
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Backend Response:</h1>
      <pre>{backendData}</pre>
    </div>
  );
}
