import Image from "next/image";
import { useState } from "react";

export default function LazyImage({ src }: { src: string | null }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  return (
    src && (
      <div className="group relative bg-gray-300 rounded-lg overflow-hidden my-3">
        <Image
          src={src}
          width={400}
          height={350}
          alt=""
          className={`group-hover:opacity-75 duration-700 ease-in-out cursor-pointer ${
            isLoading
              ? "grayscale blur-2xl scale-110"
              : "grayscale-0 blur-0 scale-100"
          }`}
          onLoadingComplete={() => setIsLoading((prev) => !prev)}
          onClick={() => setIsOpen((prev) => !prev)}
        />
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-30">
            <div className="modal-content">
              <span
                className="absolute top-3 right-3 text-white text-4xl font-bold cursor-pointer transition-colors duration-300 hover:text-gray-300"
                onClick={() => setIsOpen((prev) => !prev)}
              >
                &times;
              </span>
              <Image
                className="mx-auto block"
                src={src}
                alt=""
                width={800}
                height={650}
              />
            </div>
          </div>
        )}
      </div>
    )
  );
}
