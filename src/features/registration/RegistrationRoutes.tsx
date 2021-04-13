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
  },
  {
    path: "/register/student",
    component: RegisterStudentForm,
  },
  {
    path: "/register/teacher",
    component: RegisterTeacherForm,
  },
  {
    path: "/register/manager",
    component: RegisterSchoolForm,
  },
  {
    path: "/register/*",
    component: NotFoundPage,
  },
];

const RegistrationRoutes = routesBuilder(routes);

export default RegistrationRoutes;
