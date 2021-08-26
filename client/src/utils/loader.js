import React from "react";
import { CircularProgress } from "@material-ui/core";

const Loader = ({ full }) => (
  <div className={`root_loader ${full ? "full" : ""}`}>
    <CircularProgress />
  </div>
);

export default Loader;
