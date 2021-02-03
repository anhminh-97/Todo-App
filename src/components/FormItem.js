import React from "react";
import {
  makeStyles,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "calc(33% - 20px)",
    padding: "20px",
    display: "inline-flex",
    flexDirection: "column",
    right: 0,
    boxShadow:
      "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
    borderRadius: "4px",
    transform: "translate(-100%, 0)",
    position: "absolute",
    transition: "all .6s ease",
    backgroundColor: "#ffffff",
    "&.increase": {
      transform: "translate(0,0)",
    },
    "& .title": {
      display: "inline-flex",
      alignItems: "center",
      "& svg": {
        marginRight: "10px",
        color: "#3f51b5",
      },
      "& > div": {
        fontWeight: "bold",
        fontSize: "16px",
        color: "#3f51b5",
      },
    },
    "& .form": {
      marginTop: "20px",
      "& .select-level": {
        marginTop: "20px",
        "& .radio-group": {
          flexDirection: "row",
          marginTop: "10px",
        },
      },
    },
    "& .btn-group": {
      display: "flex",
      marginTop: "10px",
      "& > button": {
        marginRight: "20px",
        "&:last-child": {
          marginRight: "0",
        },
      },
    },
  },
}));

export default function FormItem({
  addOn,
  onToggleAdd,
  onHandleChange,
  onHandleRadio,
  data,
  onHandleSubmit,
  editMode,
}) {
  const classes = useStyles();

  return (
    <div className={`${classes.root} ${addOn ? "increase" : ""}`}>
      <div className="title">
        {editMode ? <EditIcon /> : <AddCircleIcon />}
        {editMode ? <div>Edit note</div> : <div>Add new note</div>}
      </div>
      <form onSubmit={onHandleSubmit}>
        <div className="form">
          <TextField
            required
            id="outlined-required"
            label="Content"
            variant="outlined"
            fullWidth
            placeholder="Enter your note here"
            onChange={onHandleChange}
            value={data.content}
          />
          <FormControl component="fieldset" className="select-level">
            <FormLabel component="legend">Select level</FormLabel>
            <RadioGroup
              aria-label="level"
              name="level1"
              className="radio-group"
              value={data.level}
            >
              <FormControlLabel
                value="low"
                control={<Radio color="primary" />}
                label="Low"
                onChange={onHandleRadio}
              />
              <FormControlLabel
                value="medium"
                control={<Radio color="primary" />}
                label="Medium"
                onChange={onHandleRadio}
              />
              <FormControlLabel
                value="high"
                control={<Radio color="primary" />}
                label="High"
                onChange={onHandleRadio}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="btn-group">
          <Button
            variant="contained"
            color="default"
            onClick={() => onToggleAdd(addOn)}
          >
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            {editMode ? "Edit" : "Confirm"}
          </Button>
        </div>
      </form>
    </div>
  );
}
