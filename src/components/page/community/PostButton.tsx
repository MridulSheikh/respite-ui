import { useCurrentUser } from "../../../redux/features/auth/authSlice";
import { useAppSelector } from "../../../redux/hook";
import UserAvator from "../../shared/UserAvator";
import PostModal from "../../ui/modal/PostModal";

const PostButton = () => {
  const user = useAppSelector(useCurrentUser);
  return (
    <div className="px-5 relative py-3 w-full rounded-md border flex items-center gap-x-2 dark:border-slate-700 shadow-sm bg-white dark:bg-slate-900 overflow-hidden">
      <div>
        <UserAvator src={user?.img} />
      </div>
      <PostModal />
    </div>
  );
};

export default PostButton;
