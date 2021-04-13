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
  needAuth?: boolean;
  neutralAuth?: boolean;
  role?: UserRole;
  redirectTo?: string;
}

const routesBuilder = (routes: IRoute[]): React.FC<{}> => () => {
  const userRole: UserRole = useSelector(selectUserRole);
  const loggedIn: boolean = useSelector(selectIsLoggedIn);

  return (
    <Switch>
      {routes.map(({ neutralAuth = false, exact = true, componentProps = {}, role = null, ...route }, i) => {
        return (
          <Route path={route.path} exact={exact} key={i}>
            {neutralAuth ? (
              <route.component {...componentProps} />
            ) : (
              <>
                {route.needAuth === loggedIn && role === userRole ? (
                  <route.component {...componentProps} />
                ) : (
                  <Redirect
                    to={{
                      pathname: route.redirectTo,
                    }}
                  />
                )}
              </>
            )}
          </Route>
        );
      })}
    </Switch>
  );
};

export default routesBuilder;
