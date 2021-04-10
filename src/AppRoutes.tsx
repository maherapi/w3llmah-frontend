import routesBuilder, { IRoute } from "./common/factories/routesBuilder";
import HomePage from "./common/pages/HomePage";
import NotFoundPage from "./common/pages/NotFoundPage";
import Verification from "./features/common/Verification";
import LoginForm from "./features/login/LoginForm";
import RegistrationRoutes from "./features/registration/RegistrationRoutes";

const routes: IRoute[] = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginForm,
    auth: true,
    role: null,
    redirectTo: "/"
  },
  {
    path: "/register",
    component: RegistrationRoutes,
    exact: false,
    auth: true,
    role: null,
    redirectTo: "/"
  },
  {
    path: "/verify",
    component: Verification,
    auth: true,
    role: null,
    redirectTo: "/"
  },
  {
    path: "*",
    component: NotFoundPage
  }
];

const AppRoutes = routesBuilder(routes);

export default AppRoutes;