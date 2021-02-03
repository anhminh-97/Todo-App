import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "400px",
    padding: "20px",
    position: "absolute",
    top: "calc(100% + 20px)",
    right: "20px",
    backgroundColor: "#3f51b5",
    zIndex: "1",
    borderRadius: "4px",
  },
}));

export default function FormLogin() {
  const classes = useStyles();
  return <div className={classes.root}></div>;
}
