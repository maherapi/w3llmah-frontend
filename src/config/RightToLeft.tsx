import React from "react";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

interface Props {}

const RightToLeftProvider: React.FC<Props> = ({ children }) => {
  return <StylesProvider jss={jss}>{children}</StylesProvider>;
};

export default RightToLeftProvider;
