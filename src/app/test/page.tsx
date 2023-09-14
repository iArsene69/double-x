// import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";

// export default async function Test() {
//   const supabase = createServerComponentClient({ cookies });

//   const {data: threads} = await supabase.from("threads").select("*, profiles(*), likes(*), replies(*)")

//   return (
//     <>
//       <pre>{JSON.stringify(threads, null, 2)}</pre>
//     </>
//   );
// }
