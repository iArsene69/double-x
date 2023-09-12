import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AuthButtonClient from "../auth-button-client";
import GithubButton from "./github-button";

export const dynamic = "force-dynamic";

export default async function Login() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) redirect("/");

  return (
    <div className="max-w-xl mx-auto text-white">
      <div className="my-16 max-w-md mx-auto">
        <div className="border-2 border-transparent bg-blue-500 rounded-2xl px-4 py-8">
          <h1 className="text-center font-bold text-2xl">Sign In With</h1>
        </div>
        <div className="flex justify-center my-12">
          <GithubButton />
        </div>
      </div>
    </div>
  );
}
