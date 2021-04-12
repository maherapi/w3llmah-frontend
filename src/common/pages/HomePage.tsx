import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectIsLoggedIn, selectUserRole } from "../../app/auth/authSlice";

interface Props {}

const HomePage: React.FC<Props> = (props) => {
  const history = useHistory();
  const loggedIn = useSelector(selectIsLoggedIn);
  const userRole = useSelector(selectUserRole);

  useEffect(() => {
    if (loggedIn) {
      // "Admin" | "Manager" | "Teacher" | "Student"
      if (userRole === "Student") {
        history.push("/student");
      } else if (userRole === "Teacher") {
        history.push("/teacher");
      }
    }
  }, [loggedIn]);
  
  return <div>Home page</div>;
};

export default HomePage;
