import PostButton from "./PostButton";
import PostFeed from "./PostFeed";

const Community = () => {
  return (
    <div className="bg-[#f4f5f6] dark:bg-black">
      <div className=" pt-5 max-w-screen-sm mx-auto px-5">
        <PostButton />
        <PostFeed />
      </div>
    </div>
  );
};

export default Community;
