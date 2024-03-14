'use client'

import Image from "next/image";
import Card from "@/components/card";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-start justify-between px-5 md:px-16 pt-28 bg-white">
      <Card />
    </main>
  );
}
