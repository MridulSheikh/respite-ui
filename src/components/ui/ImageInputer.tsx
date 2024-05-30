import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { cn } from "../../lib/utils";
import { RiImageAddLine } from "react-icons/ri";

type TIamgeInput = {
  setImageFile: Dispatch<SetStateAction<File>>;
  defaultImage?: string;
};

const ImageInputer = ({ setImageFile, defaultImage }: TIamgeInput) => {
  const [image, setImage] = useState<string | null>(null);
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.currentTarget.files) return;
    const file = e.currentTarget.files[0];

    // convert file to blob
    const blob = file.slice(0, file.size, file.type) as Blob;

    // upload img on firebasestorage
    const imageUrl = URL.createObjectURL(blob);
    setImageFile(file);

    // set img url
    setImage(imageUrl);
  };
  return (
    <div className=" bg-white dark:bg-slate-800 w-full h-full border border-dashed rounded-lg mt-3 relative z-10 cursor-pointer">
      {image || defaultImage ? (
        <div className="relative w-full h-full">
          <img
            src={image || defaultImage}
            className=" object-contain h-full mx-auto"
          />
        </div>
      ) : (
        <div className=" absolute top-[45%] right-[43%] text-center">
          <RiImageAddLine className="mx-auto text-xl text-gray-400" />
          <span className=" mt-5 text-primary text-sm dark:text-gray-100">
            Click to Open
          </span>
        </div>
      )}
      <input
        accept=".png, .jpg, .jpeg"
        type="file"
        onChange={handleImageChange}
        className={cn(" w-full h-full opacity-0  z-40 cursor-pointer", {
          "absolute top-0 right-0": image || defaultImage,
        })}
      />
    </div>
  );
};

export default ImageInputer;
