import { Dispatch, SetStateAction } from "react";
import Modal from ".";
import { SubmitHandler, useForm } from "react-hook-form";
import { cn } from "../../../lib/utils";

type TCreatePasswordModal = {
  action: (password: string) => Promise<void>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const CreatePasswordModal = ({
  open,
  setOpen,
  action,
}: TCreatePasswordModal) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ password: string }>();
  const onSubmit: SubmitHandler<{ password: string }> = (data) =>
    action(data.password);
  return (
    <Modal onOpen={open} onToogle={() => setOpen((prev) => !prev)}>
      <Modal.Portal>
        <Modal.Body className="animate-jump-in dark:bg-slate-900 dark:text-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className=" text-md font-bold">Please enter a secure password</p>
            <p className=" text-sm text-gray-500">
              A protected/private string of letters, numbers, and/or special
              characters used <br /> to authenticate an identity or to authorize
              access to data.
            </p>
            <input
              {...register("password", {
                required: "Please Enter The Password",
                minLength: {
                  value: 8,
                  message: "Password Minimum Length 8 Character",
                },
              })}
              className={cn(
                " w-full border border-gray-500 text-black mt-3 px-2 py-1 rounded-md",
                { "border-red-700": errors.password }
              )}
              placeholder="Enter Your private string here"
            />
            {errors.password && (
              <p className=" text-sm text-red-700 mt-2">
                {errors.password.message}
              </p>
            )}
            <button className=" py-2 bg-[#061c3c] text-white mt-5 w-full rounded-md hover:bg-[#15243b]">
              Create an Account
            </button>
          </form>
        </Modal.Body>
      </Modal.Portal>
    </Modal>
  );
};

export default CreatePasswordModal;
