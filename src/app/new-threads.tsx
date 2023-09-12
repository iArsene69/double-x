import { User, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default function NewThreads({ user }: { user: User }) {
  const addThreads = async (formData: FormData) => {
    "use server";
    const thread = String(formData.get("thread"));
    const supabase = createServerActionClient<Database>({ cookies });
    
    await supabase.from("threads").insert({ thread, user_id: user?.id });
  };
  return (
    <form action={addThreads} className="border border-gray-800 border-t-0">
      <div className="flex px-4 py-6 items-center">
        <Image src={user.user_metadata.avatar_url} alt="user profile" width={48} height={48} className="rounded-full" />
        <input
          placeholder="Whatsup'"
          type="text"
          name="thread"
          className="bg-inherit ml-4 px-2 leading-loose text-xl placeholder-gray-500 rounded-md py-2 flex-1 outline-none"
        />
        <button type="submit" className="bg-blue-500 rounded-xl py-2 px-6 text-center font-semibold">Send</button>
      </div>
    </form>
  );
}
