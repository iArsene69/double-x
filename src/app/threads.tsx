"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Likes from "./likes";
import { experimental_useOptimistic as useOptimistic, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReplyButton from "@/components/reply-button";

export default function Threads({ threads }: { threads: TweetUnionAuthor[] }) {
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

  const router = useRouter();

  const supabase = createClientComponentClient();

  useEffect(() => {
    const channel = supabase
      .channel("real-time threads")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "threads",
        },
        (payload) => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [router, supabase]);
  return optimisticThreads.map((thr) => {
    return (
      <div
        key={thr.id}
        className="flex border border-gray-800 border-t-0 py-4 px-4"
      >
        <div className="h-12 w-12">
          <Image
            className="rounded-full"
            src={thr.author.avatar_url}
            alt="user threads"
            height={45}
            width={45}
          />
        </div>
        <div className="ml-4">
          <p>
            <span className="font-bold">{thr.author.name}</span>
            <span className="text-sm ml-2 text-gray-400">
              {thr.author.username}
            </span>
          </p>
          <p className="max-w-full">{thr.thread}</p>
          <div className="flex items-center gap-3">
            <Likes threads={thr} addOptimisticThread={addOptimisticThreads} />
            <ReplyButton threads={thr} />
          </div>
        </div>
      </div>
    );
  });
}
