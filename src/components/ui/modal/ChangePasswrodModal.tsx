import { useState } from "react";
import Modal from ".";
import { IoMdClose, IoMdKey } from "react-icons/io";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdatePasswordMutation } from "../../../redux/features/auth/authApi";

type TInputsTypes = {
  oldPassword: string;
  newPassword: string;
  reEnterPassword: string;
};

const ChangePasswrodModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [changePassword] = useUpdatePasswordMutation();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TInputsTypes>();
  const onSubmit: SubmitHandler<TInputsTypes> = async (data) => {
    const toastID = toast.loading("updating...");
    try {
      if (data.newPassword != data.reEnterPassword) {
        setError("reEnterPassword", {
          type: "manual",
          message: "Re-entered password didn't match with new password",
        });
        toast.error("Re-entered password didn't match with new password", {
          id: toastID,
        });
        return;
      }
      const response = (await changePassword({
        password: data.oldPassword,
        newPassword: data.newPassword,
      })) as any;
      if (response.error) {
        toast.error(response.error.data.message, { id: toastID });
        return;
      }
      toast.success("password successfully changed", { id: toastID });
      setOpenModal(false);
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", { id: toastID });
    }
  };
  return (
    <Modal onOpen={openModal} onToogle={() => setOpenModal((prev) => !prev)}>
      <Modal.ToggleButton>
        <button className=" bg-gray-300 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800 text-black font-medium px-3 rounded-sm py-2 flex items-center gap-x-2 hover:bg-gray-400">
          <IoMdKey />
          Change Password
        </button>
      </Modal.ToggleButton>
      <Modal.Portal>
        <Modal.Body className=" p-0 animate-fade-up md:w-[600px] animate-duration-500 dark:text-white border-none rounded-md overflow-hidden dark:bg-slate-900">
          <div className=" py-2 px-5 border-b flex justify-between items-center dark:border-b-slate-800">
            <h1 className=" text-xl font-semibold">Change Password</h1>
            <Modal.ToggleButton className=" bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-300">
              <IoMdClose className=" text-2xl text-gray-600  hover:text-[] " />
            </Modal.ToggleButton>
          </div>
          <div className="py-2 px-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <p className=" text-md font-bold">Old Password</p>
                {errors.oldPassword && (
                  <p className=" text-xs text-red-700">
                    {errors.oldPassword.message}
                  </p>
                )}
                <input
                  {...register("oldPassword", {
                    required: "Please enter your old password",
                    minLength: {
                      value: 8,
                      message: "minimum 8 character required",
                    },
                  })}
                  className="px-3 py-2 border border-gray-400 rounded-md text-black dark:bg-slate-800 dark:text-gray-100 mt-3 w-full"
                  placeholder="Enter The Password"
                  type="password"
                />
              </div>
              <div className="mt-2">
                <p className=" text-md font-bold">New Password</p>
                {errors.newPassword && (
                  <p className=" text-xs text-red-700">
                    {errors.newPassword.message}
                  </p>
                )}
                <input
                  {...register("newPassword", {
                    required: "Please enter your new password",
                    minLength: {
                      value: 8,
                      message: "minimum 8 character required",
                    },
                  })}
                  className="px-3 py-2 border border-gray-400 rounded-md text-black dark:bg-slate-800 dark:text-gray-100 mt-3 w-full"
                  placeholder="Enter The New Password"
                  type="password"
                />
              </div>
              <div className="mt-2">
                <p className=" text-md font-bold">Re-enter Password</p>
                {errors.reEnterPassword && (
                  <p className=" text-xs text-red-700">
                    {errors.reEnterPassword.message}
                  </p>
                )}
                <input
                  {...register("reEnterPassword", {
                    required: "Please re-enter your new password",
                    minLength: {
                      value: 8,
                      message: "minimum 8 character required",
                    },
                  })}
                  className="px-3 py-2 border border-gray-400 rounded-md text-black dark:bg-slate-800 dark:text-gray-100 mt-3 w-full"
                  placeholder="Re-enter The New Password"
                  type="password"
                />
              </div>
              <button className=" py-2 bg-[#061c3c] text-white mt-5 w-full rounded-md hover:bg-[#15243b]">
                Confirm
              </button>
            </form>
          </div>
        </Modal.Body>
      </Modal.Portal>
    </Modal>
  );
};

export default ChangePasswrodModal;
