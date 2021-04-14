import React, { useState } from "react";
import { Box, Container, makeStyles } from "@material-ui/core";
import Navbar from "./navbar/Navbar";
import Footer from "./footer/Footer";

import ChatScreen from "../components/messages/ChatScreen";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectUserRole } from "../../app/auth/authSlice";
import SideBar, { ISideNavLink } from "./sidebar/SideBar";
import ListAltIcon from "@material-ui/icons/ListAlt";
import SchoolIcon from "@material-ui/icons/School";
import { UserRole } from "../../app/auth/user.interface";

const adminSideNaveLinks: ISideNavLink[] = [
  {
    text: "الطلبات",
    link: "/admin/orders",
    Icon: ListAltIcon,
  },
  {
    text: "المدارس",
    link: "/admin/orders",
    Icon: SchoolIcon,
  },
];

const managerSideNaveLinks: ISideNavLink[] = [
  {
    text: "الطلبات",
    link: "",
    Icon: ListAltIcon,
  },
  {
    text: "الحلقات",
    link: "",
    Icon: SchoolIcon,
  },
  {
    text: "الأساتذة",
    link: "",
    Icon: SchoolIcon,
  },
  {
    text: "الطلاب",
    link: "",
    Icon: SchoolIcon,
  },
  {
    text: "إنشاء حلقة",
    link: "",
    Icon: SchoolIcon,
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

  return (
    <Box className={classes.flexColumn}>
      <Navbar onToggleSideBar={() => setSideOpen(!sideOpen)} />
      {loggedIn && (
        <SideBar
          sideNaveLinks={getSideNavLinks(userRole)}
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
