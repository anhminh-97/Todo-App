import React from "react";
import {
  makeStyles,
  Button,
  Paper,
  InputBase,
  IconButton,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  featureGroup: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    width: "100%",
    padding: "20px",
    border: "1px solid #dddddd",
    marginTop: "20px",
    "& .toggle-btn": {
      width: "150px",
    },
    "&>div": {
      display: "flex",
      alignItems: "center",
      position: "relative",
      "& .label": {
        fontSize: "14px",
        marginRight: "10px",
      },
      "& > select": {
        padding: "0 10px",
        height: "100%",
        width: "90px",
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        borderRadius: "4px",
        color: "rgba(0, 0, 0, 0.87)",
        backgroundColor: "#ffffff",
        border: "none",
        appearance: "none",
        "&:focus": {
          outline: "none",
        },
      },
      "& .appearance": {
        position: "absolute",
        right: "10px",
        display: "inline-flex",
        pointerEvents: "none",
      },
    },
    "& .MuiFormControl-marginNormal": {
      margin: "0",
    },
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export default function Feature({
  addOn,
  onChangeDone,
  onChangeDoing,
  onToggleAdd,
  onHandleSearch,
  onSubmitSearch,
  valueSearch,
  handleSortBy,
  sort,
  handleSortDate,
}) {
  const classes = useStyles();

  return (
    <div className={classes.featureGroup}>
      <Button
        variant={addOn ? "contained" : "outlined"}
        color="primary"
        onClick={() => onToggleAdd(addOn)}
        className="toggle-btn"
      >
        {addOn ? "Cancel" : "Add note"}
      </Button>
      <Paper
        component="form"
        className={classes.root}
        onSubmit={onSubmitSearch}
      >
        <InputBase
          className={classes.input}
          placeholder="Search any notes"
          onChange={onHandleSearch}
          value={valueSearch}
          inputProps={{ "aria-label": "search any notes" }}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <div>
        <div className="label">Sort by:</div>
        <select value={sort} onChange={handleSortBy}>
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <div className="appearance">
          <ExpandMoreIcon fontSize="small" />
        </div>
      </div>
      <div>
        <TextField
          id="date"
          label="Sort by date"
          type="date"
          onChange={handleSortDate}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div>
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="Done"
          labelPlacement="start"
          name="done"
          onChange={onChangeDone}
        />
        <FormControlLabel
          control={<Checkbox color="primary" />}
          label="Doing"
          labelPlacement="start"
          name="doing"
          onChange={onChangeDoing}
        />
      </div>
    </div>
  );
}
