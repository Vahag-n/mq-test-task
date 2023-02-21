import { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

import { StorageConstantsEnum } from "storage/cache/types";

interface MQPublicRouteProps extends RouteProps {
  children: React.ReactNode;
  restricted?: boolean;
}

const PublicRoute: FC<MQPublicRouteProps> = ({
  children,
  restricted = false,
  ...rest
}) => {
  const authData = localStorage.getItem(StorageConstantsEnum.User);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return authData && restricted ? (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        ) : (
          children
        );
      }}
    />
  );
};

export default PublicRoute;
