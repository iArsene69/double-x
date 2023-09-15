"use client";

import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function BackButton() {
    const router = useRouter()
  return (
    <button onClick={() => router.push("/")}>
      <AiOutlineArrowLeft />
    </button>
  );
}
