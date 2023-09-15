import AuthButtonServer from "@/app/auth-button-server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import OriginalThreads from "../original-thread";
import NewReplies from "../new-replies";
import Replies from "../replies";
import BackButton from "../back-button";

export const dynamic = "force-dynamic"

export default async function Reply({
  params: { threadId },
}: {
  params: { threadId: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data } = await supabase
    .from("replies")
    .select(
      "*, profile: profiles(*), threads(*, likes(user_id), author: profiles(*))"
    )
    .eq("thread_id", threadId)
    .order("created_at", {
      ascending: false,
    });

    const {data: thread} = await supabase
    .from("threads")
    .select("*, author: profiles(*), likes(user_id), replies(user_id)")
    .eq("id", threadId);

  const replies =
    data?.map((reply) => ({
      ...reply,
      profile: Array.isArray(reply.profile) ? reply.profile[0] : reply.profile,
    })) ?? [];

  const threads =
    thread?.map((thread) => ({
      ...thread,
      author: Array.isArray(thread.author) ? thread.author[0] : thread.author,
      user_has_liked_tweet: !!thread.likes.find(
        (like) => like.user_id === session?.user.id
      ),
      likes: thread.likes.length,
      replies: thread.replies.length,
    })) ?? [];

  return (
    <div className="max-w-xl mx-auto text-white">
      <div className="flex justify-between py-6 px-4 border-gray-800 border bg-inherit">
        <div className="flex justify-start gap-2">
          <BackButton />
          <h1 className="text-xl font-bold">Replies</h1>
        </div>
        <AuthButtonServer />
      </div>
      <OriginalThreads threads={threads} />
      <NewReplies user={session?.user} threadId={threadId} />
      <Replies replies={replies} />
    </div>
  );
}
