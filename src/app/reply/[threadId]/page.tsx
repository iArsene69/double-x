import AuthButtonServer from "@/app/auth-button-server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import OriginalThreads from "../original-thread";
import NewReplies from "../new-replies";
import { redirect } from "next/navigation";
import Replies from "../replies";

export default async function Reply({
  params: { threadId },
}: {
  params: { threadId: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const { data } = await supabase
    .from("threads")
    .select("*, author: profiles(*), likes(user_id), replies(*, profiles(*))")
    .eq("id", threadId)
    .order("created_at", {
      ascending: false,
    });

  const threads =
    data?.map((thread) => ({
      ...thread,
      author: Array.isArray(thread.author) ? thread.author[0] : thread.author,
      user_has_liked_tweet: !!thread.likes.find(
        (like) => like.user_id === session?.user.id
      ),
      likes: thread.likes.length,
      repliesNumber: thread.replies.length,
      replies: thread.replies,
    })) ?? [];

  return (
    <div className="max-w-xl mx-auto text-white">
      <div className="flex justify-between py-6 px-4 border-gray-800 border bg-inherit">
        <div className="flex justify-start gap-2">
          <button>back</button>
          <h1 className="text-xl font-bold">Replies</h1>
        </div>
        <AuthButtonServer />
      </div>
      <OriginalThreads threads={threads} />
      <NewReplies user={session?.user} threadId={threadId} />
      <Replies threads={threads} />
    </div>
  );
}
