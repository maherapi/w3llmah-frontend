import { Card, Container, makeStyles, Paper, Tab, Typography } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { selectLoggedInUser } from "../../../app/auth/authSlice";
import { IRingsItemResponse } from "../../../app/rings/data-source/http-actions";
import { getAllRings, selectAllRings, setSingleRing } from "../../../app/rings/ringsSlice";
import { ISchoolsItemResponse } from "../../../app/schools/data-source/http-actions";
import { getAllSchoolsAdmin, setSingleSchool, selectAllSchoolsAdmin } from "../../../app/schools/schoolsSlice";
import RingsTable from "./tables/RingsTable";

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

export const ManagerRings: React.FC<Props> = (props) => {
  const classes = useStyles();

  const history = useHistory();
  const dispatch = useDispatch();

  const userId = useSelector(selectLoggedInUser)?.id;
  const rings = useSelector(selectAllRings);

  const [currentTab, setCurrentTab] = useState("1");

  useEffect(() => {
    dispatch(getAllRings(userId));
  }, []);


  const handleRingDetailsClick = (ring: IRingsItemResponse) => {
    dispatch(setSingleRing(ring));
    history.push("/manager/ring");
  };

  return (
    <Container className={`${classes.container} fadeInUp`}>
      <Card className={classes.card}>
        <Container component="main" className={classes.innerContainer}>
          <Typography component="h1" variant="h5" align="center">
            جدول الحلقات
          </Typography>
          <Paper className={classes.tabsContainer} variant="outlined">
            <TabContext value={currentTab}>
              <TabList onChange={(e, value) => setCurrentTab(value)} aria-label="حالة الحلقات">
                <Tab className={`${currentTab === "1" ? classes.selectedTab : ""}`} label="النشطة" value="1" />
                <Tab className={`${currentTab === "2" ? classes.selectedTab : ""}`} label="غير النشطة" value="2" />
              </TabList>
              <TabPanel className={classes.tabPanel} value="1">
                <RingsTable
                  rings={rings.filter((s) => s.status === "ACTIVE")}
                  onRingDetailsClick={handleRingDetailsClick}
                  areaLabel="جدول الحلقات النشطة"
                />
              </TabPanel>
              <TabPanel className={classes.tabPanel} value="2">
                <RingsTable
                  rings={rings.filter((s) => s.status === "NONACTIVE")}
                  onRingDetailsClick={handleRingDetailsClick}
                  areaLabel="جدول الحلقات غير النشطة"
                />
              </TabPanel>
            </TabContext>
          </Paper>
        </Container>
      </Card>
    </Container>
  );
};

export default ManagerRings;
