import { GiHeartPlus } from "react-icons/gi";
import Modal from ".";
import { IoMdClose } from "react-icons/io";
import { cn } from "../../../lib/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";
import { ReactNode, useState } from "react";
import { useAppSelector } from "../../../redux/hook";
import { useCurrentUser } from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { usePostDonationMutation } from "../../../redux/features/donation/donationApi";
import { toast } from "sonner";

type TDonateModal = {
  _id: string;
  title: string;
  category: string;
  image: string;
  children?: ReactNode;
};

type Inputs = {
  name: string;
  phone: string;
  address: string;
  amount: number;
};

const DonateModal = ({
  _id,
  title,
  category,
  image,
  children,
}: TDonateModal) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const user = useAppSelector(useCurrentUser);
  const [postDonation] = usePostDonationMutation();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const body = { ...data, userEmail: user?.email, supplyId: _id, category };
    const toastID = toast.loading("please wait...");
    try {
      const response = await postDonation(body).unwrap();
      if (response.data.insertedId) {
        toast.success("Thanks for your donaiton", { id: toastID });
        setIsOpen((prev) => !prev);
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", { id: toastID });
    }
  };
  const handleToggleModal = () => {
    if (!user?.email) {
      navigate("/login");
      return;
    }
    setIsOpen((prev) => !prev);
  };
  return (
    <Modal onOpen={isOpen} onToogle={handleToggleModal}>
      <Modal.ToggleButton>
        {children ? (
          children
        ) : (
          <button className=" py-1.5 px-5 bg-[#2f1793] text-white rounded-sm  ease-in-out duration-200 relative hover:scale-95 flex items-center gap-x-2 mt-5">
            <GiHeartPlus className=" text-lg" />
            Donate Now
            <div className="w-full h-full border-2 border-[#2f1793] bg-none absolute -right-1 -bottom-1 z-0" />
          </button>
        )}
      </Modal.ToggleButton>
      <Modal.Portal className=" border-none">
        <Modal.Body className="p-0 animate-fade-up animate-duration-500 border-none rounded-md">
          <div className=" w-[calc(100vw-10px)] lg:w-[calc(100vw-730px)] lg:h-[calc(100vh-100px)] border-none rounded-md overflow-x-hidden overflow-y-scroll  scrollbar-none">
            <div className=" flex sticky top-0 w-full justify-between px-4 py-2 bg-white dark:bg-slate-700 dark:text-white z-20">
              <h1 className=" font-bold">Donate</h1>
              <Modal.ToggleButton>
                <IoMdClose className=" text-2xl text-gray-600 dark:text-white  hover:text-[] " />
              </Modal.ToggleButton>
            </div>
            <div className="bg-[#f1f5f9] dark:bg-slate-900 px-4 py-5">
              <h2 className="dark:text-gray-400">Supply item:</h2>
              <div className=" px-4 py-2 rounded-sm bg-white dark:bg-slate-700 dark:border-none border  flex gap-x-3 items-start mt-5">
                <div className="flex gap-x-2">
                  <div className=" size-10 relative overflow-hidden">
                    <img
                      src={image}
                      className=" object-cover object-center w-full h-full"
                    />
                  </div>
                  <h2 className=" text-md font-semibold dark:text-gray-200">
                    {title}
                  </h2>
                </div>
                <div className=" flex items-center justify-center">
                  <span
                    className={cn(
                      "text-white py-0.5 px-2 uppercase rounded-full bg-[#f74f22] hover:bg-[#ffac00] cursor-pointer ease-in-out duration-200  text-sm",
                      {
                        "bg-green-700": category === "hygen products",
                        "bg-[#2f1793]": category === "baby essentials",
                      }
                    )}
                  >
                    {category}
                  </span>
                </div>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} action="">
                <div className=" mt-7 dark:text-gray-400">
                  <label htmlFor="name ">Name</label> <br />
                  <input
                    {...register("name", {
                      required: "Please Enter your name",
                    })}
                    className=" px-5 py-2 mt-1 rounded-sm bg-white dark:bg-slate-400 dark:border-none borde dark:text-black w-full"
                    placeholder="Enter your name here"
                  />
                  {errors.name && (
                    <p className=" text-red-600 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className=" mt-2 dark:text-gray-400">
                  <label htmlFor="address ">Address</label> <br />
                  <input
                    {...register("address", {
                      required: "Please Enter your address",
                    })}
                    className=" px-5 py-2 mt-1 rounded-sm bg-white dark:bg-slate-400 dark:border-none borde dark:text-black w-full"
                    placeholder="Enter your address here"
                  />
                  {errors.address && (
                    <p className=" text-red-600 text-sm mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>
                <div className=" mt-2 dark:text-gray-400">
                  <label htmlFor="phone ">Phone</label> <br />
                  <input
                    {...register("phone", {
                      required: "Please Enter your phone",
                    })}
                    className=" px-5 py-2 mt-1 rounded-sm bg-white dark:bg-slate-400 dark:border-none borde dark:text-black w-full"
                    placeholder="Enter your phone number here"
                  />
                  {errors.phone && (
                    <p className=" text-red-600 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className=" mt-2 dark:text-gray-400">
                  <label htmlFor="amount ">Amount</label> <br />
                  <input
                    type="number"
                    {...register("amount", {
                      required: "Please Enter The Amount",
                      valueAsNumber: true,
                      min: {
                        value: 10,
                        message: "please donate minimum $10",
                      },
                    })}
                    className=" px-5 py-2 mt-1 rounded-sm bg-white dark:bg-slate-400 dark:border-none borde dark:text-black w-full"
                    placeholder="$0.00"
                  />
                  {errors.amount && (
                    <p className=" text-red-600 text-sm mt-1">
                      {errors.amount.message}
                    </p>
                  )}
                </div>
                <div className=" flex justify-end">
                  <button
                    type="submit"
                    className=" mt-5 px-3 py-2 bg-[#3c50e0] text-white rounded-sm hover:opacity-90 flex items-center gap-x-1"
                  >
                    <FaPaperPlane className=" text-2xl" />
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal.Portal>
    </Modal>
  );
};

export default DonateModal;
