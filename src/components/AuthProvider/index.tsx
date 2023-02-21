import { FC, ReactNode, useEffect } from "react";
import {
  authenticateThunk,
  authLoadingStateSelector,
} from "storage/slices/auth";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import MQSpinner from "modules/MQSpinner";

type AuthProviderProps = {
  children?: ReactNode;
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const authLoading = useAppSelector(({ auth }) =>
    authLoadingStateSelector(auth)
  );

  useEffect(() => {
    dispatch(authenticateThunk());
  }, [dispatch]);

  if (authLoading.isPending) {
    return <MQSpinner animation="border" centered />;
  }

  return <>{children}</>;
};

export default AuthProvider;