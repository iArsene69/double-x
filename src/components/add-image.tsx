"use client";

import { SetStateAction } from "react";
import { ImFilePicture } from "react-icons/im";

export default function AddImage({
  setImageUrl, setImageFile
}: {
  setImageUrl: React.Dispatch<SetStateAction<string>>; setImageFile: React.Dispatch<SetStateAction<File | undefined>> 
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!e.target.files) return
    const image = e.target.files[0]
    setImageUrl(URL.createObjectURL(image))
    setImageFile(image)
  }
  return (
    <label>
      <input type="file" hidden onChange={handleChange} accept="image/jpg, image/png" />
      <div className="cursor-pointer">
        <ImFilePicture className="text-gray-500" />
      </div>
    </label>
  );
}
