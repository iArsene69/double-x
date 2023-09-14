"use client";

import { useRouter } from "next/navigation";
import { AiOutlineMessage } from "react-icons/ai";

export default function ReplyButton({ threads }: { threads: TweetUnionAuthor }) {
  const url = `/reply/${threads.id}`;
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(url);
  };

  return (
    <button className="group flex items-center gap-1" onClick={handleClick}>
      <AiOutlineMessage className="stroke-gray-300" />
      <span className="text-sm text-gray-500">{threads.replies}</span>
    </button>
  );
}
