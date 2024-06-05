import { useAppSelector } from "../../../redux/hook";
import { useCurrentUser } from "../../../redux/features/auth/authSlice";
import UserAvator from "../../shared/UserAvator";
import UpdateProfileModal from "../../ui/modal/UpdateProfileModal";
import { Toaster } from "sonner";
import ChangePasswrodModal from "../../ui/modal/ChangePasswrodModal";

const ProfileManageMent = () => {
  const user = useAppSelector(useCurrentUser);
  return (
    <div className="p-5">
      <Toaster />
      <div className=" flex justify-between items-center dark:text-white">
        <h1 className=" text-2xl font-semibold ">Accounts</h1>
      </div>
      <div className=" mt-10 md:flex justify-between items-center">
        <div className="flex gap-x-4 items-center">
          <UserAvator src={user?.img} className=" size-20" />
          <div>
            <h1 className=" text-xl  font-semibold uppercase dark:text-white">
              {user?.name}
            </h1>
            <h3 className=" text-gray-500 text-sm">{user?.email}</h3>
          </div>
        </div>

        <div className=" flex gap-x-1 lg:gap-x-2 mt-5">
          <UpdateProfileModal />
          <ChangePasswrodModal />
        </div>
      </div>
    </div>
  );
};

export default ProfileManageMent;
