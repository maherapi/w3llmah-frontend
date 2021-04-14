import { Card, Container, makeStyles, Paper, Tab, Typography } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectLoggedInUser } from "../../../app/auth/authSlice";
import { ISchoolsItemResponse } from "../../../app/schools/data-source/http-actions";
import { getAllSchoolsAdmin, setSingleSchool, selectAllSchoolsAdmin } from "../../../app/schools/schoolsSlice";
import SchoolsTable from "./tables/SchoolsTable";

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

export const AdminSchools: React.FC<Props> = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const userId = useSelector(selectLoggedInUser)?.id;
  const schools = useSelector(selectAllSchoolsAdmin);

  const [currentTab, setCurrentTab] = useState("1");

  useEffect(() => {
    dispatch(getAllSchoolsAdmin());
  }, []);

  const handleSchoolDetailsClick = (school: ISchoolsItemResponse) => {
    dispatch(setSingleSchool(school));
    history.push("/admin/school");
  };

  return (
    <Container className={`${classes.container} fadeInUp`}>
      <Card className={classes.card}>
        <Container component="main" className={classes.innerContainer}>
          <Typography component="h1" variant="h5" align="center">
            جدول المدارس
          </Typography>
          <Paper className={classes.tabsContainer} variant="outlined">
            <TabContext value={currentTab}>
              <TabList onChange={(e, value) => setCurrentTab(value)} aria-label="حالة المدارس">
                <Tab className={`${currentTab === "1" ? classes.selectedTab : ""}`} label="النشطة" value="1" />
                <Tab className={`${currentTab === "2" ? classes.selectedTab : ""}`} label="غير النشطة" value="2" />
              </TabList>
              <TabPanel className={classes.tabPanel} value="1">
                <SchoolsTable
                  schools={schools.filter((s) => s.status === "ACTIVE")}
                  areaLabel="جدول المدارس النشطة"
                  onSchoolDetailsClick={handleSchoolDetailsClick}
                />
              </TabPanel>
              <TabPanel className={classes.tabPanel} value="2">
                <SchoolsTable
                  schools={schools.filter((s) => s.status === "NONACTIVE")}
                  areaLabel="جدول الدارس غير النشطة"
                  onSchoolDetailsClick={handleSchoolDetailsClick}
                />
              </TabPanel>
            </TabContext>
          </Paper>
        </Container>
      </Card>
    </Container>
  );
};

export default AdminSchools;
