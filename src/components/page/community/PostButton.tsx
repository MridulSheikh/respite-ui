import PostModal from "../../ui/modal/PostModal";

const PostButton = () => {
  return (
    <div className="px-5 relative py-3 w-full rounded-md border flex items-center gap-x-2 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
      <div>
        <div className=" relative size-10 rounded-full overflow-hidden ">
          <img
            src="/image/login/user.jpg"
            className=" object-fill object-center"
          />
        </div>
      </div>
      <PostModal />
    </div>
  );
};

export default PostButton;
