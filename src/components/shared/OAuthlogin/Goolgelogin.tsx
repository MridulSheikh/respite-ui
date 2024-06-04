import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useOAuthLoginMutation } from "../../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useAppDispatch } from "../../../redux/hook";
import { setUser } from "../../../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const AuthGoolgelogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useOAuthLoginMutation();
  const handlelogein = async (token: string) => {
    const toastID = toast.loading("We are setting things up for you");
    try {
      const user = jwtDecode(token);
      const { email, name } = user as { email: string; name: string };
      const response = await login({ email, name });
      toast.success("User Successfully logged in ", { id: toastID });
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
  return (
    <div className="">
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
