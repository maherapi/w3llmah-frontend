import { Card, Container, makeStyles, Paper, Tab, Typography } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../../app/auth/authSlice";
import { IOrdersItemResponse } from "../../../app/orders/data-source/http-actions";
import { getAllOrders, selectAllOrders } from "../../../app/orders/ordersSlice";
import OrdersTable from "./tables/OrdersTable";

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

export const AdminOrders: React.FC<Props> = (props) => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const userId = useSelector(selectLoggedInUser)?.id;
  const orders = useSelector(selectAllOrders);

  const [currentTab, setCurrentTab] = useState("1");

  useEffect(() => {
    dispatch(getAllOrders(userId));
  }, []);

  const handleOrderDetailsClick = (order: IOrdersItemResponse) => {
    console.log(order);
  };

  return (
    <Container className={`${classes.container} fadeInUp`}>
      <Card className={classes.card}>
        <Container component="main" className={classes.innerContainer}>
          <Typography component="h1" variant="h5" align="center">
            جدول الطلبات
          </Typography>
          <Paper className={classes.tabsContainer} variant="outlined">
            <TabContext value={currentTab}>
              <TabList onChange={(e, value) => setCurrentTab(value)} aria-label="حالة الطلبات">
                <Tab className={`${currentTab === "1" ? classes.selectedTab : ""}`} label="الجديدة" value="1" />
                <Tab className={`${currentTab === "2" ? classes.selectedTab : ""}`} label="تحت المراجعة" value="2" />
                <Tab className={`${currentTab === "3" ? classes.selectedTab : ""}`} label="المقبولة" value="3" />
                <Tab className={`${currentTab === "4" ? classes.selectedTab : ""}`} label="المرفوضة" value="4" />
                <Tab className={`${currentTab === "5" ? classes.selectedTab : ""}`} label="الملغية" value="5" />
              </TabList>
              <TabPanel className={classes.tabPanel} value="1">
                <OrdersTable
                  orders={orders.filter((o) => o.state === "NEW")}
                  areaLabel="جدول الطلبات الجديدة"
                  onOrderDetailsClick={handleOrderDetailsClick}
                />
              </TabPanel>
              <TabPanel className={classes.tabPanel} value="2">
                <OrdersTable
                  orders={orders.filter((o) => o.state === "IN_PROGRESS")}
                  areaLabel="جدول الطلبات تحت المراجعة"
                  onOrderDetailsClick={handleOrderDetailsClick}
                />
              </TabPanel>
              <TabPanel className={classes.tabPanel} value="3">
                <OrdersTable
                  orders={orders.filter((o) => o.state === "ACCEPTED")}
                  areaLabel="جدول الطلبات المقبولة"
                  onOrderDetailsClick={handleOrderDetailsClick}
                />
              </TabPanel>
              <TabPanel className={classes.tabPanel} value="4">
                <OrdersTable
                  orders={orders.filter((o) => o.state === "REFUSED")}
                  areaLabel="جدول الطلبات المرفوضة"
                  onOrderDetailsClick={handleOrderDetailsClick}
                />
              </TabPanel>
              <TabPanel className={classes.tabPanel} value="5">
                <OrdersTable
                  orders={orders.filter((o) => o.state === "CANCELED")}
                  areaLabel="جدول الطلبات الملغية"
                  onOrderDetailsClick={handleOrderDetailsClick}
                />
              </TabPanel>
            </TabContext>
          </Paper>
        </Container>
      </Card>
    </Container>
  );
};

export default AdminOrders;
