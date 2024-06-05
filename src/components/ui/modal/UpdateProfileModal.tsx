import { useState } from "react";
import Modal from ".";
import { MdOutlineUpdate } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import UserAvator from "../../shared/UserAvator";
import { useAppSelector } from "../../../redux/hook";
import { useCurrentUser } from "../../../redux/features/auth/authSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { UpladImageCloudinary } from "../../../lib/utils";
import { useUpdateUserMutation } from "../../../redux/features/user/userApi";

const UpdateProfileModal = () => {
  const user = useAppSelector(useCurrentUser);
  const [imagePreview, setImagePreview] = useState(user?.img);
  const [imageFile, setImageFile] = useState<File>();
  const [openModal, setOpenModal] = useState(false);
  const [updateUser] = useUpdateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>();

  const onSubmit: SubmitHandler<{ name: string }> = async (data) => {
    const toastID = toast.loading("updating...");
    try {
      let body = { name: data.name } as { name: string; img?: string };
      if (imageFile) {
        const imageUrl = await UpladImageCloudinary(imageFile);
        body = { name: data.name, img: imageUrl };
      }
      const response = await updateUser(body);

      // @ts-ignore
      if (response.data.success) {
        // @ts-ignore
        toast.success(response.data.message, { id: toastID });
      }
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", { id: toastID });
    }
  };
  return (
    <Modal onOpen={openModal} onToogle={() => setOpenModal((prev) => !prev)}>
      <Modal.ToggleButton>
        <button className=" bg-gray-300 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 text-black font-medium px-3 rounded-sm py-2 flex items-center gap-x-2 hover:bg-gray-400">
          <MdOutlineUpdate />
          Update Profile
        </button>
      </Modal.ToggleButton>
      <Modal.Portal>
        <Modal.Body className=" p-0 animate-fade-up md:w-[600px] animate-duration-500 dark:text-white border-none rounded-md overflow-hidden dark:bg-slate-900">
          <div className=" py-2 px-5 border-b flex justify-between items-center dark:border-b-slate-800">
            <h1 className=" text-xl font-semibold">Update Profile</h1>
            <Modal.ToggleButton className=" bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-300">
              <IoMdClose className=" text-2xl text-gray-600  hover:text-[] " />
            </Modal.ToggleButton>
          </div>

          <div className="py-2 px-5">
            <div className=" flex justify-between">
              <p className=" text-md font-bold">Profile image</p>
              <button className=" text-md flex gap-x-2 items-center dark:active:bg-slate-800 relative active:bg-slate-100 p-1 rounded-md">
                <input
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      const imageFile = e.target.files[0];
                      setImagePreview(URL.createObjectURL(imageFile));
                      setImageFile(imageFile);
                    }
                  }}
                  className=" w-full h-full absolute top-0 left-0 opacity-0 z-10 dark:active:bg-slate-800 active:bg-slate-100 cursor-pointer"
                  type="file"
                  name=""
                  id="type3-3"
                />
                <FaPencilAlt /> Edit
              </button>
            </div>
            <UserAvator src={imagePreview} className=" size-20 mx-auto my-5" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className=" text-md font-bold">Profile Name</p>
              {errors.name && (
                <p className=" text-xs text-red-700">{errors.name.message}</p>
              )}
              <input
                {...register("name", { required: "Name Field Is Required !" })}
                className="px-3 py-2 border border-gray-400 rounded-md text-black dark:bg-slate-800 dark:text-gray-100 mt-3 w-full"
                placeholder="Joh Doe"
                defaultValue={user?.name}
              />
              <button className=" py-2 bg-[#061c3c] text-white mt-5 w-full rounded-md hover:bg-[#15243b]">
                Update Profile
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal.Portal>
    </Modal>
  );
};

export default UpdateProfileModal;
