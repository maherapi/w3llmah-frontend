import { Card, Container, makeStyles, Paper, Tab, Typography } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectLoggedInUser } from "../../../app/auth/authSlice";
import { IStudentsItemResponse } from "../../../app/students/data-source/http-actions";
import { getAllStudentsManager, selectAllStudentsManager, setSingleStudent } from "../../../app/students/studentsSlice";
import StudentsTable from "./tables/StudentsTable";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  innerContainer: {},
  card: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  tabPanel: {
    padding: 0,
    paddingTop: theme.spacing(1),
  },
  tabsContainer: {
    marginTop: theme.spacing(2),
  },
  selectedTab: {
      backgroundColor: "#ccc5",
  }
}));

interface Props {}

export const ManagerStudents: React.FC<Props> = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUser);
  const students = useSelector(selectAllStudentsManager);

  const [currentTab, setCurrentTab] = useState("1");

  useEffect(() => {
    dispatch(getAllStudentsManager({schoolId: user.userable.school.id}));
  }, []);

  const handleStudentDetailsClick = (student: IStudentsItemResponse) => {
    dispatch(setSingleStudent(student));
    history.push("/manager/student");
  };

  return (
    <Container className={`${classes.container} fadeInUp`}>
      <Card className={classes.card}>
        <Container component="main" className={classes.innerContainer}>
          <Typography component="h1" variant="h5" align="center">
            جدول الطلاب
          </Typography>
          <Paper className={classes.tabsContainer} variant="outlined">
            <TabContext value={currentTab}>
              <TabList onChange={(e, value) => setCurrentTab(value)} aria-label="حالة الطلاب">
                <Tab className={`${currentTab === "1" ? classes.selectedTab : ""}`} label="النشطين" value="1" />
                <Tab className={`${currentTab === "2" ? classes.selectedTab : ""}`} label="غير النشطين" value="2" />
              </TabList>
              <TabPanel className={classes.tabPanel} value="1">
                <StudentsTable
                  students={students.filter((s) => s.user.status === "ACTIVE")}
                  areaLabel="جدول الطلاب النشطين"
                  onStudentDetailsClick={handleStudentDetailsClick}
                />
              </TabPanel>
              <TabPanel className={classes.tabPanel} value="2">
                <StudentsTable
                  students={students.filter((s) => s.user.status === "NONACTIVE")}
                  areaLabel="جدول الطلاب غير النشطين"
                  onStudentDetailsClick={handleStudentDetailsClick}
                />
              </TabPanel>
            </TabContext>
          </Paper>
        </Container>
      </Card>
    </Container>
  );
};

export default ManagerStudents;
