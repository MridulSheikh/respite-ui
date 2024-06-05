import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setUser, useCurrentToken } from "../redux/features/auth/authSlice";
import { useGetUserMutation } from "../redux/features/user/userApi";

const useOnAuthChange = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);
  const [getUser] = useGetUserMutation();
  useEffect(() => {
    handleSetUser();
  }, []);

  const handleSetUser = async () => {
    if (token) {
      const result = (await getUser(token)) as any;
      const user = result.data.user;
      if (user) {
        dispatch(setUser({ user: user, token: token }));
      }
    }
  };
};

export default useOnAuthChange;
