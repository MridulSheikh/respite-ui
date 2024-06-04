import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import moment from "moment";
type TPostCardProps = {
  name: string;
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
  name,
  text,
  image,
  like,
  dislike,
  date,
}: TPostCardProps) => {
  return (
    <div className="bg-white mt-4 dark:bg-slate-900 dark:border-slate-700 border rounded-md">
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
          <h2 className=" text-md font-semibold dark:text-white">{name}</h2>
          <span className="text-gray-400 text-xs font-normal">
            {moment(date).fromNow()}
          </span>
        </div>
      </div>
      {text && <p className="p-3 dark:text-white">{text}</p>}

      {image.length > 2 && (
        <div className=" w-full h-full overflow-hidden relative">
          <img
            className="object-cover object-center"
            src={image}
            alt="post image"
          />
        </div>
      )}

      <div className="p-3 border-t dark:border-slate-700">
        <p className="text-sm text-gray-700 dark:text-gray-400 ">
          {like.length} People like and {dislike.length} People are dislike
        </p>
      </div>

      <div className=" p-3 flex justify-between items-center border-y dark:border-slate-700">
        <div className=" flex gap-x-5">
          <button className=" text-xl text-gray-700 dark:text-gray-400 flex gap-x-1 items-center">
            <AiOutlineLike />
            <p className=" text-sm mt-1">Like</p>
          </button>
          <button className=" text-xl text-gray-700 dark:text-gray-400 flex gap-x-1 items-center">
            <AiOutlineDislike className=" mt-1" />
            <p className=" text-sm">Dislike</p>
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default PostCard;
