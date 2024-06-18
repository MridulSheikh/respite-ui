import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ImageInputer from "../../../../ui/ImageInputer";
import { FaRegSave } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { UpladImageCloudinary } from "../../../../../lib/utils";
import { usePostSupplyMutation } from "../../../../../redux/features/supply/supplyApi";
import { useAppSelector } from "../../../../../redux/hook";
import { useCurrentUser } from "../../../../../redux/features/auth/authSlice";

enum CategoryEnum {
  food = "food",
  hygenProducts = "hygen products",
  BabyEssentials = "baby essentials",
}

type Inputs = {
  title: string;
  rised: number;
  goal: number;
  quantity: number;
  discription: string;
  category: CategoryEnum;
};

const CreateSupply = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const user = useAppSelector(useCurrentUser);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [postSupply] = usePostSupplyMutation();
  console.log(user);
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!imageFile) {
      setImageError("Please Select a Image");
      return;
    }
    const toastID = toast.loading("posting...");
    try {
      const image = await UpladImageCloudinary(imageFile);
      const response = await postSupply({
        ...data,
        image: image,
        createBy: user?.email,
      });
      if ("data" in response && response.data.success) {
        toast.success(response.data.message, { id: toastID });
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", { id: toastID });
    }
  };
  useEffect(() => {
    if (imageFile) {
      setImageError(null);
    }
  }, [imageFile]);
  return (
    <div className=" p-5">
      <Toaster />
      <h1 className=" dark:text-gray-400">Dashboard / Create Supply</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" mt-10 grid lg:grid-cols-2 gap-x-5 dark:text-white"
      >
        <div>
          <label htmlFor="" className="">
            Image
          </label>
          <div className=" w-full h-80 ">
            <ImageInputer
              setImageFile={setImageFile as Dispatch<SetStateAction<File>>}
            />
            {imageError && (
              <p className=" text-red-600 text-sm mt-1">{imageError}</p>
            )}
          </div>
        </div>
        <div>
          <div className="">
            <label htmlFor="title">Title</label> <br />
            <input
              {...register("title", { required: "Please Enter The Tittle" })}
              className=" px-5 py-2 mt-1 rounded-sm dark:bg-slate-800 bg-white border w-full"
              placeholder="Enter the title"
            />
            {errors.title && (
              <p className=" text-red-600 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className=" mt-5 grid grid-cols-3 gap-x-3">
            <div>
              <label htmlFor="title">Rised</label> <br />
              <input
                {...register("rised", {
                  required: "Please Enter The Rised Amount",
                  valueAsNumber: true,
                })}
                type="number"
                className=" px-5 py-2 mt-1 rounded-sm dark:bg-slate-800 bg-white border w-full"
                placeholder="$"
              />
              {errors.rised && (
                <p className=" text-red-600 text-sm mt-1">
                  {errors.rised.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="title">Goal</label> <br />
              <input
                {...register("goal", {
                  required: "Please Enter The Goal Amount",
                  valueAsNumber: true,
                })}
                type="number"
                placeholder="$"
                className=" px-5 py-2 mt-1 rounded-sm dark:bg-slate-800 bg-white border w-full"
              />
              {errors.goal && (
                <p className=" text-red-600 text-sm mt-1">
                  {errors.goal.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="title">Quantity</label> <br />
              <input
                {...register("quantity", {
                  required: "Please Enter The  Quantity",
                  valueAsNumber: true,
                })}
                type="number"
                className=" px-5 py-2 mt-1 rounded-sm dark:bg-slate-800 bg-white border w-full"
                placeholder="0"
              />
              {errors.quantity && (
                <p className=" text-red-600 text-sm mt-1">
                  {errors.quantity.message}
                </p>
              )}
            </div>
          </div>
          <div className=" mt-5 flex gap-x-2 items-center">
            <label htmlFor="category">Choose a Category:</label>
            <select
              {...register("category", {
                required: "Please Select a Category",
              })}
              name="category"
              id="category"
              className=" bg-white dark:bg-slate-800 border px-5 py-2"
            >
              <option value="food">Food</option>
              <option value="hygen products">Hygen Products</option>
              <option value="baby essentials">Baby Essentials</option>
            </select>
            {errors.category && (
              <p className=" text-red-600 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className=" mt-5">
            <label htmlFor="discription">Discription:</label>
            <textarea
              {...register("discription", {
                required: "Please Enter The Discription",
              })}
              className="px-5 py-2 mt-1 rounded-sm bg-white dark:bg-slate-800 border w-full h-48 scrollbar-none "
            />
            {errors.discription && (
              <p className=" text-red-600 text-sm mt-1">
                {errors.discription.message}
              </p>
            )}
          </div>
          <div className=" flex justify-end">
            <button
              type="submit"
              className=" mt-5 px-3 py-2 bg-[#3c50e0] text-white  rounded-sm hover:opacity-90 flex items-center gap-x-1"
            >
              <FaRegSave className=" text-2xl" />
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateSupply;
