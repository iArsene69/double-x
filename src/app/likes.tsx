"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'


export default function Likes({ threads, addOptimisticThread }: { threads: TweetUnionAuthor; addOptimisticThread: (newThread: TweetUnionAuthor) => void }) {
  const router = useRouter();
  const handleLikes = async () => {
    const supabase = createClientComponentClient<Database>();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    if (threads.user_has_liked_tweet) {
      addOptimisticThread({
        ...threads,
        likes: threads.likes - 1,
        user_has_liked_tweet: !threads.user_has_liked_tweet
      })
      await supabase.from("likes").delete().match({
        user_id: user.id,
        thread_id: threads.id,
      });
      router.refresh();
    } else {
      addOptimisticThread({
        ...threads,
        likes: threads.likes + 1,
        user_has_liked_tweet: !threads.user_has_liked_tweet
      })
      await supabase.from("likes").insert({
        user_id: user.id,
        thread_id: threads.id,
      });
      router.refresh();
    }
  };
  return <button className="group flex items-center gap-1" onClick={handleLikes}>
    {threads.user_has_liked_tweet ? <AiFillHeart className="text-red-600 stroke-red-600" /> : <AiOutlineHeart className="stroke-gray-300" />}
    <span className={`text-sm ${threads.user_has_liked_tweet ? "text-red-600" : "text-gray-500"}`}>{threads.likes}</span>
    </button>;
}
