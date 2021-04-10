import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { selectIsLoggedIn, selectUserRole } from "../../app/auth/authSlice";
import { UserRole } from "../../app/auth/user.interface";

export interface IRoute {
  path: string;
  component: React.FC<any>;
  componentProps?: any;
  exact?: boolean;
  auth?: boolean;
  role?: UserRole;
  redirectTo?: string;
}

const routesBuilder = (routes: IRoute[]): React.FC<{}> => () => {
  const userRole: UserRole = useSelector(selectUserRole);
  return (
    <Switch>
      {routes.map(({ exact = true, componentProps = {}, role = null, ...route }, i) => (
        <Route path={route.path} exact={exact} key={i}>
          {route.auth && role && (role !== userRole) ? (
            <Redirect
              to={{
                pathname: route.redirectTo,
              }}
            />
          ) : (
            <route.component {...componentProps} />
          )}
        </Route>
      ))}
    </Switch>
  );
};

export default routesBuilder;
