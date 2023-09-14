"use client";

import Image from "next/image";
import { experimental_useOptimistic as useOptimistic } from "react";
import Likes from "../likes";

export default function OriginalThreads({
  threads,
}: {
  threads: TweetUnionAuthor[];
}) {
  const [optimisticThreads, addOptimisticThreads] = useOptimistic<
    TweetUnionAuthor[],
    TweetUnionAuthor
  >(threads, (currentOptimisticThreads, newThreads) => {
    const newOptimisticThreads = [...threads];
    const index = newOptimisticThreads.findIndex(
      (thread) => thread.id === newThreads.id
    );
    newOptimisticThreads[index] = newThreads;
    return newOptimisticThreads;
  });

  return optimisticThreads.map((thr) => (
    <div key={thr.id} className="flex border border-gray-800 border-t-0 py-4 px-4">
        <div className="h-12 w-12">
            <Image className="rounded-full" src={thr.author.avatar_url} alt="double-x user" height={48} width={48} />
        </div>
        <div className="ml-4">
            <p>
                <span className="font-bold">{thr.author.name}</span>
                <span className="text-sm ml-2 text-gray-400">{thr.author.username}</span>
            </p>
            <p className="max-w-full">{thr.thread}</p>
            <Likes threads={thr} addOptimisticThread={addOptimisticThreads} />
        </div>
    </div>
  ))
}
