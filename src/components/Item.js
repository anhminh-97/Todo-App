import React from "react";
import { makeStyles, Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  btnGroup: {
    display: "flex",
    maxHeight: "30px",
  },
  btn: {
    padding: "0",
    minWidth: "unset",
    marginRight: "10px",
    "&:last-child": {
      marginRight: "0",
    },
  },
  tag: {
    maxHeight: "30px",
    "& >div": {
      padding: "5px 10px",
      borderRadius: "4px",
      fontWeight: "bold",
      color: "#ffffff",
      "&.low": {
        backgroundColor: "#3f51b5",
      },
      "&.medium": {
        backgroundColor: "#5bc0de",
      },
      "&.high": {
        backgroundColor: "#bb2124",
      },
    },
  },
  status: {
    maxHeight: "30px",
    "& > select": {
      appearance: "none",
      padding: "5px 10px",
      borderRadius: "4px",
      border: "none",
      color: "#ffffff",
      fontWeight: "bold",
      height: "100%",
      "&.doing": {
        backgroundColor: "#f0ad4e",
      },
      "&.done": {
        backgroundColor: "#22bb33",
      },
      "&:focus": {
        outline: "none",
      },
    },
  },
}));

export default function Item({
  item,
  onHandleSelect,
  onHandleEdit,
  onHandleDelete,
}) {
  const classes = useStyles();
  return (
    <div className="grid">
      <div>{moment(item.createAt).format("DD/MM/YYYY")}</div>
      <div className="content">{item.content}</div>
      <div className={classes.tag}>
        <div className={item.level}>
          {item.level.replace(item.level[0], item.level[0].toUpperCase())}
        </div>
      </div>
      <div className={classes.status}>
        <select
          className={item.status}
          value={item.status}
          onChange={(e) => onHandleSelect(item, e)}
        >
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className={classes.btnGroup}>
        <Button
          color="inherit"
          className={classes.btn}
          onClick={() => onHandleEdit(item)}
        >
          <EditIcon />
        </Button>
        <Button
          color="inherit"
          className={classes.btn}
          onClick={() => onHandleDelete(item.id)}
        >
          <DeleteForeverIcon />
        </Button>
      </div>
    </div>
  );
}
