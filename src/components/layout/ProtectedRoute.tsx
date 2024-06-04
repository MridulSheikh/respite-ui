import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, useCurrentToken } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../lib/utils";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  const decodedToken = verifyToken(token as string);
  const currentDate = new Date();

  if (decodedToken) {
    console.log((decodedToken?.exp as number) * 1000 < currentDate.getTime());
    if ((decodedToken?.exp as number) * 1000 < currentDate.getTime()) {
      dispatch(logout());
    }
  }
  return children;
};

export default ProtectedRoute;
