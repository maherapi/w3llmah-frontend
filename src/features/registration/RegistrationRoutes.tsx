import routesBuilder, { IRoute } from "../../common/factories/routesBuilder";
import NotFoundPage from "../../common/pages/NotFoundPage";
import RegisterStudentForm from "./RegisterStudentForm";
import RegisterTeacherForm from "./RegisterTeacherForm";
import Registration from "./Registration";
import RegisterSchoolForm from "./RegisterSchoolForm";

const routes: IRoute[] = [
  {
    path: "/register",
    component: Registration,
    needAuth: false,
  },
  {
    path: "/register/student",
    component: RegisterStudentForm,
    needAuth: false,
  },
  {
    path: "/register/teacher",
    component: RegisterTeacherForm,
    needAuth: false,
  },
  {
    path: "/register/manager",
    component: RegisterSchoolForm,
    needAuth: false,
  },
  {
    path: "/register/*",
    component: NotFoundPage,
    needAuth: false,
  },
];

const RegistrationRoutes = routesBuilder(routes);

export default RegistrationRoutes;
