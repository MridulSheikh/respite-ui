import { BsSignpost2 } from "react-icons/bs";
import { useGetPostsQuery } from "../../../redux/features/post/postApi";
import Skeleton from "../../../lib/tailwind-skeleton-react";
import { TCommunityPosts } from "../../../types/types";
import PostCard from "./PostCard";

const PostFeed = () => {
  const { data, isLoading } = useGetPostsQuery("hygen products", {
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  // @ts-ignore
  const posts = data?.posts as TCommunityPosts[];
  console.log(posts);
  if (isLoading) {
    return (
      <Skeleton.group count={6} className="">
        <div className=" mt-4 rounded-sm overflow-hidden">
          <div className=" flex gap-x-3 px-3 py-2 bg-white dark:bg-slate-800">
            <div>
              <Skeleton.item className=" size-10 rounded-full" />
            </div>
            <div className=" flex flex-col justify-center">
              <Skeleton.item className=" h-2 w-40 rounded-full" />
              <Skeleton.item className=" h-2 w-24 rounded-full" />
            </div>
          </div>
          <Skeleton.item className=" relative rounded-t-none w-full h-64 overflow-hidden" />
        </div>
      </Skeleton.group>
    );
  }
  return (
    <div>
      {posts.length === 0 ? (
        <div className="h-96 flex flex-col justify-center items-center">
          <BsSignpost2 className=" text-gray-300 dark:text-slate-800 text-7xl" />
          <h1 className=" text-4xl font-bold text-gray-300 dark:text-slate-800">
            Empty Feed!
          </h1>
        </div>
      ) : (
        <div>
          {posts.map((dt) => (
            <PostCard
              name={dt.name}
              userEmail={dt.userEmail}
              key={dt._id}
              _id={dt._id}
              text={dt.text}
              image={dt.img}
              like={dt.like}
              dislike={dt.dislike}
              comment={dt.comment}
              date={dt.date}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostFeed;
