import { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { StorageConstantsEnum } from "storage/cache/types";

interface MQPrivateRouteProps extends RouteProps {
  children: React.ReactNode;
}

const PrivateRoute: FC<MQPrivateRouteProps> = ({ children, ...rest }) => {
  const authData = localStorage.getItem(StorageConstantsEnum.User);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authData ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
