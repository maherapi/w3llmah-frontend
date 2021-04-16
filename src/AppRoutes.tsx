import routesBuilder, { IRoute } from "./common/factories/routesBuilder";
import AppLinkPage from "./common/pages/AppLinkPage";
import HomePage from "./common/pages/HomePage";
import NotFoundPage from "./common/pages/NotFoundPage";
import Verification from "./features/common/Verification";
import LoginForm from "./features/login/LoginForm";
import AdminOrders from "./features/admin/orders/AdminOrders";
import AdminSingleOrder from "./features/admin/orders/AdminSingleOrder";
import RegistrationRoutes from "./features/registration/RegistrationRoutes";
import AdminSchools from "./features/admin/schools/AdminSchools";
import AdminSingleSchool from "./features/admin/schools/AdminSingleSchool";
import ManagerOrders from "./features/manager/orders/ManagerOrders";
import ManagerSingleOrderStudent from "./features/manager/orders/ManagerSingleOrderStudent";
import ManagerSingleOrderTeacher from "./features/manager/orders/ManagerSingleOrderTeacher";
import ManagerRings from "./features/manager/rings/ManagerRings";
import ManagerSingleRing from "./features/manager/rings/ManagerSingleRing";
import ManagerNewRing from "./features/manager/rings/ManagerNewRing";
import WaitForApprovePage from "./common/pages/WaitForApprovePage";
import ManagerStudents from "./features/manager/students/ManagerStudents";
import ManagerSingleStudent from "./features/manager/students/ManagerSingleStudent";
import ManagerSingleTeacher from "./features/manager/teachers/ManagerSingleTeacher";
import ManagerTeachers from "./features/manager/teachers/ManagerTeachers";

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
    path: "/admin/schools",
    component: AdminSchools,
    needAuth: true,
    role: "Admin",
    redirectTo: "/login",
  },
  {
    path: "/admin/school",
    component: AdminSingleSchool,
    needAuth: true,
    role: "Admin",
    redirectTo: "/login",
  },
  {
    path: "/manager/orders",
    component: ManagerOrders,
    needAuth: true,
    role: "Manager",
    redirectTo: "/login",
  },
  {
    path: "/manager/order/teacher",
    component: ManagerSingleOrderTeacher,
    needAuth: true,
    role: "Manager",
    redirectTo: "/login",
  },
  {
    path: "/manager/order/student",
    component: ManagerSingleOrderStudent,
    needAuth: true,
    role: "Manager",
    redirectTo: "/login",
  },
  {
    path: "/manager/rings",
    component: ManagerRings,
    needAuth: true,
    role: "Manager",
    redirectTo: "/login",
  },
  {
    path: "/manager/ring",
    component: ManagerSingleRing,
    needAuth: true,
    role: "Manager",
    redirectTo: "/login",
  },
  {
    path: "/manager/rings/new",
    component: ManagerNewRing,
    needAuth: true,
    role: "Manager",
    redirectTo: "/login",
  },
  {
    path: "/manager/teachers",
    component: ManagerTeachers,
    needAuth: true,
    role: "Manager",
    redirectTo: "/login",
  },
  {
    path: "/manager/teacher",
    component: ManagerSingleTeacher,
    needAuth: true,
    role: "Manager",
    redirectTo: "/login",
  },
  {
    path: "/manager/students",
    component: ManagerStudents,
    needAuth: true,
    role: "Manager",
    redirectTo: "/login",
  },
  {
    path: "/manager/student",
    component: ManagerSingleStudent,
    needAuth: true,
    role: "Manager",
    redirectTo: "/login",
  },
  {
    path: "/wait",
    component: WaitForApprovePage,
  },
  {
    path: "*",
    component: NotFoundPage,
  },
];

const AppRoutes = routesBuilder(routes);

export default AppRoutes;
