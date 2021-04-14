import routesBuilder, { IRoute } from "./common/factories/routesBuilder";
import AppLinkPage from "./common/pages/AppLinkPage";
import HomePage from "./common/pages/HomePage";
import NotFoundPage from "./common/pages/NotFoundPage";
import Verification from "./features/common/Verification";
import LoginForm from "./features/login/LoginForm";
import AdminOrders from "./features/admin/orders/AdminOrders";
import AdminSingleOrder from "./features/admin/orders/AdminSingleOrder";
import RegistrationRoutes from "./features/registration/RegistrationRoutes";

const routes: IRoute[] = [
  {
    path: "/",
    component: HomePage,
    neutralAuth: true,
  },
  {
    path: "/login",
    component: LoginForm,
    needAuth: false,
    role: null,
    redirectTo: "/",
  },
  {
    path: "/register",
    component: RegistrationRoutes,
    exact: false,
    needAuth: false,
    role: null,
    redirectTo: "/",
  },
  {
    path: "/verify",
    component: Verification,
    needAuth: false,
    role: null,
    redirectTo: "/",
  },
  {
    path: "/student",
    component: AppLinkPage,
    needAuth: true,
    role: "Student",
    redirectTo: "/login",
  },
  {
    path: "/teacher",
    component: AppLinkPage,
    needAuth: true,
    role: "Teacher",
    redirectTo: "/login",
  },
  {
    path: "/admin/orders",
    component: AdminOrders,
    needAuth: true,
    role: "Admin",
    redirectTo: "/login",
  },
  {
    path: "/admin/order",
    component: AdminSingleOrder,
    needAuth: true,
    role: "Admin",
    redirectTo: "/login",
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];

const AppRoutes = routesBuilder(routes);

export default AppRoutes;
