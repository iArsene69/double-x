import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "./auth-button-server";
import { redirect } from "next/navigation";
import NewThreads from "./new-threads";
import Threads from "./threads";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase
    .from("threads")
    .select("*, author: profiles(*), likes(user_id)")
    .order("created_at", {
      ascending: false,
    });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect("/login");

  const threads =
    data?.map((thread) => ({
      ...thread,
      author: Array.isArray(thread.author) ? thread.author[0] : thread.author,
      user_has_liked_tweet: !!thread.likes.find(
        (like) => like.user_id === session?.user.id
      ),
      likes: thread.likes.length,
    })) ?? [];
  return (
    <div className="max-w-xl mx-auto text-white">
      <div className="flex justify-between py-6 px-4 border-gray-800 border bg-inherit">
        <h1 className="text-xl font-bold">Home</h1>
        <AuthButtonServer />
      </div>
      <NewThreads user={session.user} />
      <Threads threads={threads} />
    </div>
  );
}

//sbp_ced01cf565032e996636d0d400876e99be0e969b
