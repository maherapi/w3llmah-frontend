import React, { useEffect, useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

import ChatScreen from "../components/messages/ChatScreen";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserRole } from "../../app/auth/authSlice";
import SideBar, { ISideNavLink } from "./sidebar/SideBar";
import ListAltIcon from "@material-ui/icons/ListAlt";
import SchoolIcon from "@material-ui/icons/School";
import RingIcon from "@material-ui/icons/LocalLibrary";
import TeacherIcon from '@material-ui/icons/RecordVoiceOver';
import StudentIcon from '@material-ui/icons/Face';
import NewRingIcon from '@material-ui/icons/AddBox';

import { UserRole } from "../../app/auth/user.interface";

const adminSideNaveLinks: ISideNavLink[] = [
  {
    text: "الطلبات",
    link: "/admin/orders",
    Icon: ListAltIcon,
  },
  {
    text: "المدارس",
    link: "/admin/schools",
    Icon: SchoolIcon,
  },
];

const managerSideNaveLinks: ISideNavLink[] = [
  {
    text: "الطلبات",
    link: "/manager/orders",
    Icon: ListAltIcon,
  },
  {
    text: "الحلقات",
    link: "/manager/rings",
    Icon: RingIcon,
  },
  {
    text: "الأساتذة",
    link: "/manager/teachers",
    Icon: TeacherIcon,
  },
  {
    text: "الطلاب",
    link: "/manager/students",
    Icon: StudentIcon,
  },
  {
    text: "إنشاء حلقة",
    link: "/manager/rings/new",
    Icon: NewRingIcon,
  },
];

const studentSideNaveLinks: ISideNavLink[] = [
  {
    text: "الرئيسية",
    link: "/student",
    Icon: ListAltIcon,
  },
];

const teacherSideNaveLinks: ISideNavLink[] = [
  {
    text: "الرئيسية",
    link: "/teacher",
    Icon: ListAltIcon,
  },
];

const getSideNavLinks = (userRole: UserRole) => {
  switch (userRole) {
    case "Admin":
      return adminSideNaveLinks;
    case "Manager":
      return managerSideNaveLinks;
    case "Student":
      return studentSideNaveLinks;
    case "Teacher":
      return teacherSideNaveLinks;
    default:
      return [];
  }
};

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    flexGrow: 2,
  },
  flexColumn: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
}));

interface Props {}

const Layout: React.FC<Props> = ({ children }) => {
  const classes = useStyles();
  const [sideOpen, setSideOpen] = useState(false);

  const loggedIn = useSelector(selectIsLoggedIn);
  const userRole: UserRole = useSelector(selectUserRole);

  const [sideNavLinks, setSideNavLinks] = useState(getSideNavLinks(userRole))

  useEffect(() => {
    setSideNavLinks([...getSideNavLinks(userRole)]);
  }, [userRole])

  return (
    <Box className={classes.flexColumn}>
      <Navbar onToggleSideBar={() => setSideOpen(!sideOpen)} />
      {loggedIn && (
        <SideBar
          sideNaveLinks={sideNavLinks}
          open={sideOpen}
          setOpenSideBar={(open) => setSideOpen(open)}
        />
      )}
      {loggedIn && <ChatScreen />}
      <Container className={classes.container}>
        <>{children}</>
      </Container>
      <Footer />
    </Box>
  );
};

export default Layout;
