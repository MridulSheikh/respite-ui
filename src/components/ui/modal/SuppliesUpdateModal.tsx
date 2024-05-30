import { FaPencilAlt, FaRegSave } from "react-icons/fa";
import Modal from ".";
import { IoMdClose } from "react-icons/io";
import ImageInputer from "../ImageInputer";
import { Dispatch, SetStateAction, useState } from "react";
import { TSupply } from "../../../types/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { UpladImageCloudinary } from "../../../lib/utils";
import { useUpdateSupplyMutation } from "../../../redux/features/supply/supplyApi";

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

const SuppliesUpdateModal = ({
  image,
  title,
  rised,
  goal,
  _id,
  quantity,
  category,
  discription,
}: TSupply) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const [updateSupply] = useUpdateSupplyMutation();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const toastID = toast.loading("updating...");
    try {
      let imageUrl = image;
      if (imageFile) {
        imageUrl = await UpladImageCloudinary(imageFile);
      }

      const response = await updateSupply({
        ...data,
        image: imageUrl,
        id: _id,
      });
      if ("data" in response && response.data.success) {
        toast.success(response.data.message, { id: toastID });
      }
    } catch (error: any) {
      toast.error(error.message || "Something went wrong", { id: toastID });
    }
  };
  return (
    <Modal>
      <Modal.ToggleButton>
        <button className=" bg-green-500 text-white px-3 rounded-sm py-2 flex items-center gap-x-2 hover:bg-green-600">
          <FaPencilAlt />
          Edite
        </button>
      </Modal.ToggleButton>
      <Modal.Portal>
        <Modal.Body className="p-0 animate-fade-up animate-duration-500 border-none rounded-md overflow-hidden">
          <div className="  lg:w-[calc(100vw-800px)] h-[calc(100vh-100px)] overflow-y-scroll scrollbar-none">
            <div className=" flex sticky top-0 w-full justify-between px-4 py-2 bg-white dark:bg-slate-900 z-20">
              <h1 className=" font-bold dark:text-white">Edite Supply</h1>
              <Modal.ToggleButton>
                <IoMdClose className=" text-2xl text-gray-600  hover:text-[] " />
              </Modal.ToggleButton>
            </div>
            <div className="bg-[#f1f5f9] dark:bg-slate-950 px-4 py-5">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className=" mt-10 grid grid-cols-1 gap-x-5"
              >
                <div>
                  <label htmlFor="" className="dark:text-gray-300">
                    Image
                  </label>
                  <div className=" w-full h-80 ">
                    <ImageInputer
                      defaultImage={image}
                      setImageFile={
                        setImageFile as Dispatch<SetStateAction<File>>
                      }
                    />
                  </div>
                </div>
                <div className=" dark:text-white">
                  <div className=" mt-7">
                    <label htmlFor="title">Title</label> <br />
                    <input
                      {...register("title", {
                        required: "Please Enter The Tittle",
                        value: title,
                      })}
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
                      <label htmlFor="rised">Rised</label> <br />
                      <input
                        {...register("rised", {
                          required: "Please Enter The Rised Amount",
                          valueAsNumber: true,
                          value: rised,
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
                          value: goal,
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
                          value: quantity,
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
                        value: category,
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
                        value: discription,
                      })}
                      className="px-5 py-2 mt-1 rounded-sm dark:bg-slate-800 bg-white border w-full h-48 scrollbar-none"
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
                      className=" mt-5 px-3 py-2 bg-[#3c50e0] text-white rounded-sm hover:opacity-90 flex items-center gap-x-1"
                    >
                      <FaRegSave className=" text-2xl" />
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal.Portal>
    </Modal>
  );
};

export default SuppliesUpdateModal;
