import { Card, Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";

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
}));

interface Props {
    
}

export const AdminOrders: React.FC<Props> = (props) => {

  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={`${classes.container} fadeInUp`}>
      <Card className={classes.card}>
        <Container component="main" maxWidth="xs" className={classes.innerContainer}>
          <Typography component="h1" variant="h5" align="center">
            جدول الطلبات
          </Typography>
          
        </Container>
      </Card>
    </Container>
  );
};

export default AdminOrders;
