"use client";

import LazyImage from "@/components/image-holder";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Replies({ replies }: { replies: ReplyUnionAuthor[] }) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const channel = supabase
      .channel("real-time replies")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "replies",
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

  return replies.map((rep) => (
    <div
      key={rep.id}
      className="flex border border-gray-800 border-t-0 py-4 px-4"
    >
      <div className="h-12 w-12">
        <Image
          className="rounded-full"
          src={rep.profile.avatar_url}
          alt="user reply"
          width={45}
          height={45}
        />
      </div>
      <div className="ml-4">
        <p>
          <span className="font-bold">{rep.profile.name}</span>
          <span className="text-sm ml-2 text-gray-400">
            {rep.profile.username}
          </span>
        </p>
        <p className="max-w-full">{rep.reply}</p>
        <div className="w-fit mx-auto">
          <LazyImage src={rep.image_url} />
        </div>
      </div>
    </div>
  ));
}
