import { BsSignpost2 } from "react-icons/bs";

const PostFeed = () => {
  return (
    <div>
      <div className="h-96 flex flex-col justify-center items-center">
        <BsSignpost2 className=" text-gray-300 dark:text-slate-800 text-7xl" />
        <h1 className=" text-4xl font-bold text-gray-300 dark:text-slate-800">
          Empty Feed!
        </h1>
      </div>
    </div>
  );
};

export default PostFeed;
