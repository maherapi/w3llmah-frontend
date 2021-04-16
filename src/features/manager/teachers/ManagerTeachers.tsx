import { Card, Container, makeStyles, Paper, Tab, Typography } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectLoggedInUser } from "../../../app/auth/authSlice";
import { ITeachersItemResponse } from "../../../app/teachers/data-source/http-actions";
import { getAllTeachersManager, selectAllTeachersManager, setSingleTeacher } from "../../../app/teachers/teachersSlice";
import TeachersTable from "./tables/TeachersTable";

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

export const ManagerTeachers: React.FC<Props> = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUser);
  const teachers = useSelector(selectAllTeachersManager);

  const [currentTab, setCurrentTab] = useState("1");

  useEffect(() => {
    dispatch(getAllTeachersManager({schoolId: user.userable.school.id}));
  }, []);

  const handleTeacherDetailsClick = (teacher: ITeachersItemResponse) => {
    dispatch(setSingleTeacher(teacher));
    history.push("/manager/teacher");
  };

  return (
    <Container className={`${classes.container} fadeInUp`}>
      <Card className={classes.card}>
        <Container component="main" className={classes.innerContainer}>
          <Typography component="h1" variant="h5" align="center">
            جدول الأساتذة
          </Typography>
          <Paper className={classes.tabsContainer} variant="outlined">
            <TabContext value={currentTab}>
              <TabList onChange={(e, value) => setCurrentTab(value)} aria-label="حالة الأساتذة">
                <Tab className={`${currentTab === "1" ? classes.selectedTab : ""}`} label="النشطين" value="1" />
                <Tab className={`${currentTab === "2" ? classes.selectedTab : ""}`} label="غير النشطين" value="2" />
              </TabList>
              <TabPanel className={classes.tabPanel} value="1">
                <TeachersTable
                  teachers={teachers.filter((s) => s.user.status === "ACTIVE")}
                  areaLabel="جدول الأساتذة النشطين"
                  onTeacherDetailsClick={handleTeacherDetailsClick}
                />
              </TabPanel>
              <TabPanel className={classes.tabPanel} value="2">
                <TeachersTable
                  teachers={teachers.filter((s) => s.user.status === "NONACTIVE")}
                  areaLabel="جدول الأساتذة غير النشطين"
                  onTeacherDetailsClick={handleTeacherDetailsClick}
                />
              </TabPanel>
            </TabContext>
          </Paper>
        </Container>
      </Card>
    </Container>
  );
};

export default ManagerTeachers;
