import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useUserRegistrationMutation } from "../../../redux/features/auth/authApi";
import AuthGoolgelogin from "../../shared/OAuthlogin/Goolgelogin";

type TInputs = {
  name: string;
  email: string;
  password: string;
};

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputs>();
  const [registration, { isLoading }] = useUserRegistrationMutation();
  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    const toastID = toast.loading("We are setting things up for you");
    try {
      const response = await registration(data);
      // @ts-ignore
      if (response?.error) {
        // @ts-ignore
        throw { message: response.error.data.message };
      }
      toast.success(
        "Congratulation you are successfully registered. Please login again",
        { id: toastID }
      );
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Something Went Wrong!", { id: toastID });
    }
  };
  return (
    <div className=" h-screen w-full grid lg:grid-cols-5">
      <div className="  hidden lg:inline-block relative w-full h-full col-span-3">
        <div className="absolute top-0 w-full h-full bg-gradient-to-l from-white dark:from-black dark:to-black/25 to-white/25" />
        <img
          className=" object-cover object-center w-full h-full"
          src="/image/login/banner.jpg"
        />
      </div>
      <div className=" flex flex-col col-span-2 justify-center items-center dark:bg-black">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-5 dark:bg-slate-900 p-7 rounded-md dark:border dark:border-slate-500"
        >
          <div>
            <label
              htmlFor="email"
              className="  text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <br />
            <input
              type="text"
              placeholder="Jon doe"
              className="px-3 py-2 border rounded-sm w-full mt-1.5"
              {...register("name", { required: "name field required!" })}
            />
            {errors.name && (
              <p className=" text-red-600 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className=" mt-5">
            <label
              htmlFor="email"
              className="  text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <br />
            <input
              type="email"
              placeholder="example@gmail.com"
              className="px-3 py-2 border rounded-sm w-full mt-1.5"
              {...register("email", { required: "email field required!" })}
            />
            {errors.email && (
              <p className=" text-red-600 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className=" mt-5">
            <label
              htmlFor="email"
              className="  text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <br />
            <input
              type="password"
              placeholder="#######"
              className="px-3 py-2 border rounded-sm w-full mt-1.5"
              {...register("password", {
                required: "password field required!",
              })}
            />
            {errors.password && (
              <p className=" text-red-600 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            disabled={isLoading}
            className=" py-2 bg-[#061c3c] text-white mt-5 w-full rounded-md hover:bg-[#15243b]"
          >
            Registration
          </button>
          <div className=" text-center my-3 dark:text-white">or</div>
          <AuthGoolgelogin />
          <p className=" mt-5 text-center dark:text-gray-200">
            Alrady have an Account?{" "}
            <Link
              to="/login"
              className="underline text-[#061c3c] dark:text-blue-900 "
            >
              Login Now
            </Link>
          </p>
          {/* <div className=" flex justify-center items-center gap-x-2 mt-5">
            <div className=" h-0.5 bg-slate-600 w-full" />
            <h2>OR</h2>
            <div className=" h-0.5 bg-slate-600 w-full" />
          </div> */}
        </form>
        <Toaster />
      </div>
    </div>
  );
};

export default Registration;
