import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useOAuthLoginMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "../../../redux/hook";
import { setUser } from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useGetUserMutation } from "../../../redux/features/user/userApi";
import { useState } from "react";
import CreatePasswordModal from "../../ui/modal/CreatePasswordModal";

type TAuthUserState = {
  email: string;
  name: string;
  img?: string;
};

const AuthGoolgelogin = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [authUser, setAuthUser] = useState<TAuthUserState | null>(null);
  const [getUser] = useGetUserMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useOAuthLoginMutation();

  const handlelogein = async (token: string) => {
    const toastID = toast.loading("We are setting things up for you");
    try {
      const user = jwtDecode(token);
      console.log(user);
      const { email, name, picture } = user as {
        email: string;
        name: string;
        picture: string;
      };
      const isUserExist = (await getUser(token)) as any;
      if (isUserExist.error) {
        setAuthUser({ email, name, img: picture });
        setOpenModal(true);
        toast.info("Please Create Password", { id: toastID });
        return;
      }
      const response = await login({ email, name });
      if ("data" in response) {
        toast.success("User Successfully logged in", { id: toastID });
        dispatch(
          setUser({
            user: jwtDecode(response.data.token),
            token: response.data.token,
          })
        );
        navigate("/dashboard");
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error: any) {
      toast.error(error.data.message || "Login Failed!", {
        id: toastID,
      });
    }
  };

  const handleCreateUserWithPassword = async (password: string) => {
    const toastID = toast.loading("We are setting things up for you");
    try {
      const response = await login({
        email: authUser?.email as string,
        name: authUser?.name as string,
        password,
        img: authUser?.img,
      });
      if ("data" in response) {
        toast.success("User Successfully Created", { id: toastID });
        dispatch(
          setUser({
            user: jwtDecode(response.data.token),
            token: response.data.token,
          })
        );
        navigate("/dashboard");
      } else {
        throw new Error("Create Account Faild!");
      }
    } catch (error: any) {
      toast.error(error.data.message || "Create Account Faild!", {
        id: toastID,
      });
    }
  };

  return (
    <div className="">
      <CreatePasswordModal
        setOpen={setOpenModal}
        open={openModal}
        action={handleCreateUserWithPassword}
      />
      <GoogleLogin
        size="large"
        width={"270px"}
        onSuccess={(credentialResponse) => {
          handlelogein(credentialResponse.credential as string);
        }}
        onError={() => {
          toast.error("Login Failed!");
        }}
      />
    </div>
  );
};

export default AuthGoolgelogin;
