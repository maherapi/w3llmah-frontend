import React, { useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import SuccessSnackbar from "./common/components/feedback/SuccessSnackbar";
import ErrorSnackbar from "./common/components/feedback/ErrorSnackbar";
import GlobalLoading from "./common/components/feedback/GlobalLoading";
import Layout from "./common/layout/Layout";
import AppRoutes from "./AppRoutes";
import { getApiCSFRToken } from "./app/data-source/client/client";
import { useStore } from "react-redux";

interface Props {}

const App: React.FC<Props> = (props) => {

  const store = useStore();

  useEffect(() => {
    getApiCSFRToken();
  }, []);

  return (
    <Router>
      <Layout>
        <AppRoutes />
      </Layout>
      <GlobalLoading />
      <ErrorSnackbar />
      <SuccessSnackbar />
    </Router>
  );
};

export default App;
