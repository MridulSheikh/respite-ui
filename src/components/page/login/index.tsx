import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { useLoginUserMutation } from "../../../redux/features/auth/authApi";
import { useAppDispatch } from "../../../redux/hook";
import { setUser } from "../../../redux/features/auth/authSlice";
import { verifyToken } from "../../../lib/utils";

type TInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputs>();
  const navigate = useNavigate();
  const [login] = useLoginUserMutation();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<TInputs> = async (data) => {
    const toastID = toast.loading("We are setting things up for you");
    try {
      const response = await login(data).unwrap();
      const user = verifyToken(response.token);
      toast.success("User Successfully logged in ", { id: toastID });
      dispatch(setUser({ user: user, token: response.token }));
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.data.message || "Something Went Wrong!", {
        id: toastID,
      });
    }
  };
  return (
    <div className="bg-[#f4f5f6] dark:bg-black">
      <Toaster />
      <div className=" flex justify-center items-center h-[calc(100vh-80px)]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="  mx-auto bg-white dark:bg-slate-900 p-7 rounded-md border dark:border-slate-500"
        >
          <div>
            <label
              htmlFor="email"
              className="  text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <br />
            <input
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
          <p className=" text-right  text-sm mt-3 text-[#061c3c] dark:text-blue-300 hover:underline cursor-pointer font-medium">
            Forgot Password?
          </p>
          <button className=" py-2 bg-[#061c3c] text-white mt-5 w-full rounded-md hover:bg-[#15243b]">
            Login
          </button>
          <p className=" mt-5 text-center dark:text-gray-300">
            Are you new?{" "}
            <Link
              to="/register"
              className="underline text-[#061c3c] dark:text-blue-300 "
            >
              Create an Account
            </Link>
          </p>
          {/* <div className=" flex justify-center items-center gap-x-2 mt-5">
            <div className=" h-0.5 bg-slate-600 w-full" />
            <h2>OR</h2>
            <div className=" h-0.5 bg-slate-600 w-full" />
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
