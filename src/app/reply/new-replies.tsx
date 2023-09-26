"use client";

import AddImage from "@/components/add-image";
import ImagePlaceHolder from "@/components/place-image";
import {
  createClientComponentClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";

export default function NewReplies({
  user,
  threadId,
}: {
  user: User | undefined;
  threadId: string;
}) {
  const [reply, setReply] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File>();

  const supabase = createClientComponentClient();

  const uploadImage = async (uuid: string) => {
    if (!imageFile) return;
    const name = `public_reply_${uuid}`;
    await supabase.storage.from("images").upload(name, imageFile);

    const {
      data: { publicUrl },
    } = await supabase.storage.from("images").getPublicUrl(`/${name}`);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const publicUrl = await uploadImage(uuidv4());
    await supabase
      .from("replies")
      .insert({ reply, user_id: user?.id, thread_id: threadId, image_url: publicUrl });
    setReply("");
    setImageUrl("");
    setImageFile(undefined);
  };

  const deleteImage = () => {
    setImageUrl("");
    setImageFile(undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="border border-gray-800 border-t-0">
      <div className="flex px-4 pt-6 items-center">
        <Image
          src={user?.user_metadata.avatar_url}
          alt="user profile"
          width={48}
          height={48}
          className="rounded-full"
        />
        <input
          onChange={(e) => setReply(e.target.value)}
          type="text"
          placeholder="Wha'dya think?"
          value={reply}
          className="bg-inherit ml-4 px-2 leading-loose text-xl placeholder-gray-500 rounded-md py-2 flex-1 outline-none"
        />
      </div>
      <div className="w-fit mx-auto">
        <ImagePlaceHolder src={imageUrl} close={deleteImage} />
      </div>
      <div className="flex justify-around gap-x-52 items-center mx-5 my-3">
        <div className="flex justify-center">
          <AddImage setImageUrl={setImageUrl} setImageFile={setImageFile} />
        </div>
        <button type="submit">
          <AiOutlineSend className="text-blue-500 w-8 h-8" />
        </button>
      </div>
    </form>
  );
}
