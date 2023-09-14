import { createServerActionClient,  User  } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";

export default function NewReplies({user, threadId}: {user: User; threadId: string}){
    const addReply = async (formData: FormData) => {
        "use server"
        const reply = formData.get("reply")
        const supabase = createServerActionClient({cookies})

        await supabase.from("replies").insert({reply, user_id: user?.id, thread_id: threadId})
    }

    return(
        <form action={addReply} className="border border-gray-800 border-t-0">
            <div className="flex px-4 py-6 items-center">
                <Image src={user.user_metadata.avatar_url} alt="user profile" width={48} height={48} className="rounded-full" />
                <input type="text" placeholder="Wha'dya think?" name="reply" className="bg-inherit ml-4 px-2 leading-loose text-xl placeholder-gray-500 rounded-md py-2 flex-1 outline-none" />
                <button type="submit" className="bg-blue-500 rounded-xl py-2 px-6 text-center font-semibols">Send</button>
            </div>
        </form>
    )
}