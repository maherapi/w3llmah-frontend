import React from "react";
import RightToLeftProvider from "./RightToLeft";
import ThemeProvidor from "./Theme";

interface Props {}

const ConfigProvider: React.FC<Props> = ({ children }) => {
  return (
    <RightToLeftProvider>
      <ThemeProvidor>{children}</ThemeProvidor>
    </RightToLeftProvider>
  );
};

export default ConfigProvider;
