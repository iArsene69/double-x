"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { AiFillGithub } from "react-icons/ai";

export default function GithubButton() {
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };
  return (
    <button
      className="flex px-8 py-3 items-center gap-2 border-2 border-gray-500 rounded-xl hover:bg-gray-800 hover:border-transparent"
      onClick={handleSignIn}
    >
      <AiFillGithub className="w-10 h-10 text-white" />
      <span className="text-lg font-bold text-white flex-1">Github</span>
    </button>
  );
}
