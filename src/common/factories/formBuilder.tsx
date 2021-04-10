import { Avatar, Button, Card, Container, Grid, Link, makeStyles, SvgIconTypeMap, Typography } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import React from "react";
import * as Yup from "yup";
import { SelectOption } from "../components/forms/CustomSelect";

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
  avatar: {
    margin: theme.spacing(1),
    marginRight: "auto",
    marginLeft: "auto",
    height: "100px",
    width: "100px",
    backgroundColor: theme.palette.secondary.main,
  },
  avatarIcon: {
    fontSize: 60,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  addButton: {
    height: "100%",
  },
}));

export interface CustomFormBuilderField {
  component: React.FC<any>;
  label: string;
  name: string;
  options?: SelectOption[];
  accept?: string;
  type?: "text" | "password" | "number" | "date";
}


export type VendorIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">>;

export interface CustomFormBuilderContents<T> {
  title: string;
  Icon: VendorIcon;
  fields: CustomFormBuilderField[];
  initialValues: T & FormikValues;
  validationSchema: Yup.AnySchema<T>;
  submitBtnText: string;
  submittingBtnText: string;
  linkTitle?: string;
  linkHref?: string;
}

interface Props<T> {
  handleSubmit: (values: T & FormikValues, helpers: FormikHelpers<T & FormikValues>) => void | Promise<T & FormikValues | any>;
  submitting: boolean;
}

export const buildForm = <T extends unknown>(formContent: CustomFormBuilderContents<T>) => (props: Props<T>) => {

  const { Icon } = formContent;
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={`${classes.container} fadeInUp`}>
      <Card className={classes.card}>
        <Container component="main" maxWidth="xs" className={classes.innerContainer}>
          <Avatar className={classes.avatar}>
            <Icon className={classes.avatarIcon} />
          </Avatar>
          <Typography component="h1" variant="h5" align="center">
            {formContent.title}
          </Typography>
          <Formik
            initialValues={formContent.initialValues}
            validateOnMount={true}
            validationSchema={formContent.validationSchema}
            onSubmit={props.handleSubmit}
          >
            {({ isValid }) => (
              <Form className={classes.form}>
                <Grid container spacing={2}>
                  {formContent.fields.map((field, i) => (
                    <Grid item xs={12} key={i}>
                      <Field {...field} />
                    </Grid>
                  ))}
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={!isValid || (props.submitting)}
                >
                  {(props.submitting) ? formContent.submittingBtnText : formContent.submitBtnText}
                </Button>

                <Grid container justify="center">
                  <Grid item>
                    <Link href={formContent.linkHref}>{formContent.linkTitle}</Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Container>
      </Card>
    </Container>
  );
};

export default buildForm;
