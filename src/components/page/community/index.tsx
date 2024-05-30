import { Toaster } from "sonner";
import PostButton from "./PostButton";
import PostFeed from "./PostFeed";

const Community = () => {
  return (
    <div className="bg-[#f4f5f6] dark:bg-black">
      <Toaster />
      <div className=" pt-5 lg:max-w-[500px] mx-auto px-5">
        <PostButton />
        <PostFeed />
      </div>
    </div>
  );
};

export default Community;
