import React from "react";

type TPostCardProps = {
  userEmail: string;
  _id: string;
  text: string;
  image: string;
  like: {
    email: string;
  }[];
  dislike: {
    email: string;
  }[];
  comment: string[];
  date: string;
};

const PostCard = ({
  userEmail,
  _id,
  text,
  image,
  like,
  dislike,
  comment,
  date,
}: TPostCardProps) => {
  return (
    <div className="bg-white mt-4 border rounded-md">
      {/* Avatar image  */}
      <div className="flex items-center gap-3 p-3">
        <div className=" size-10 overflow-hidden rounded-full relative">
          <img
            className=" object-cover object-center bg-black/40"
            src={"/image/login/user.jpg"}
            alt="user image"
          />
        </div>
        <div className="flex flex-col">
          <h2 className=" text-md font-semibold">{userEmail}</h2>
          <span className="text-gray-400 text-xs font-normal">{date}</span>
        </div>
      </div>
      {text && <p className="p-3">{text}</p>}

      {image.length > 2 && (
        <div className=" w-full h-full overflow-hidden relative">
          <img
            className="object-cover object-center"
            src={image}
            alt="post image"
          />
        </div>
      )}

      <div className=" p-3 flex justify-between items-center border-t">
        <div className=" flex gap-x-5"></div>
        <div></div>
      </div>
    </div>
  );
};

export default PostCard;
