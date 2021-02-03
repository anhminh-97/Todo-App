import React, { useState } from "react";
import { CssBaseline, Container, makeStyles } from "@material-ui/core";
import ButtonAppBar from "./components/AppBar";
import Feature from "./components/Feature";
import FormItem from "./components/FormItem";
import Item from "./components/Item";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    position: "relative",
    marginTop: "20px",
    "& .container": {
      width: "100%",
      minHeight: "300px",
      padding: "20px",
      backgroundColor: "#ffffff",
      boxShadow:
        "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
      borderRadius: "4px",
      transition: "all .6s ease",
      position: "relative",
      zIndex: "1",
      "&.decrease": {
        width: "67%",
      },
      "& .grid": {
        width: "100%",
        display: "flex",
        padding: "10px 0",
        "&.title": {
          borderBottom: "1px solid #dddddd",
          padding: "0",
          paddingBottom: "20px",
          "& > div": {
            fontWeight: "bold",
          },
        },
        "& > div": {
          display: "flex",
          justifyContent: "center",
          transition: "all .6s ease",
          width: "100px",
          "&.content": {
            width: "calc(100% - 400px)",
          },
        },
      },
      "& .warning": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        fontSize: "32px",
        color: "#e3e3e3",
        fontWeight: "300",
      },
    },
  },
}));

export default function App() {
  const classes = useStyles();
  const [addOn, setAddOn] = useState(false);
  const [note, setAllNotes] = useState(
    localStorage.getItem("note") ? JSON.parse(localStorage.getItem("note")) : []
    // {
    //   id: 1,
    //   createAt: 1612334931141,
    //   content: "Roboto Font",
    //   level: "low",
    //   status: "doing",
    // },
    // {
    //   id: 2,
    //   createAt: 1612334931141,
    //   content: "Font Icons",
    //   level: "medium",
    //   status: "done",
    // },
    // {
    //   id: 3,
    //   createAt: 1612334931141,
    //   content: "SVG Icons",
    //   level: "high",
    //   status: "doing",
    // },
  );
  const [data, setData] = useState({
    id: 0,
    createAt: 0,
    content: "",
    level: "low",
    status: "doing",
  });
  const [editMode, setEditMode] = useState(false);
  const [querySearch, setQuerySearch] = useState("");
  const [query, setQuery] = useState({
    querySearch: "",
    sortBy: "all",
    sortDate: "",
    doing: false,
    done: false,
  });

  // Function
  const handleToggleAdd = (status) => {
    if (status) {
      setAddOn(false);
      setData({
        id: 0,
        createAt: 0,
        content: "",
        level: "low",
        status: "doing",
      });
      setEditMode(false);
    } else {
      setAddOn(true);
    }
  };
  const onChangeDoing = () => {
    setQuery({ ...query, doing: !query.doing });
  };
  const onChangeDone = () => {
    setQuery({ ...query, done: !query.done });
  };

  const onHandleChange = (event) => {
    const { value } = event.target;
    setData({ ...data, content: value });
  };
  const onHandleRadio = (event) => {
    const { value } = event.target;
    setData({ ...data, level: value });
  };
  const onHandleSelect = (item, e) => {
    const { value } = e.target;
    const changeStatus = note.map((element) => {
      if (element.id === item.id) {
        return { ...item, status: value };
      }
      return element;
    });
    setAllNotes(changeStatus);
  };
  const onHandleSubmit = (event) => {
    event.preventDefault();
    if (editMode) {
      const updateData = note.map((element) => {
        if (element.id === data.id) {
          return { ...data };
        } else return element;
      });
      setAllNotes(updateData);
      setAddOn(false);
      setEditMode(false);
      setData({
        id: 0,
        createAt: 0,
        content: "",
        level: "low",
        status: "doing",
      });
    } else {
      const id = Math.random() * 1000;
      setAllNotes([
        ...note,
        { ...data, id: id, createAt: new Date().getTime() },
      ]);
      setEditMode(false);
      setData({
        id: 0,
        createAt: 0,
        content: "",
        level: "low",
        status: "doing",
      });
    }
  };
  const onHandleEdit = (item) => {
    setAddOn(true);
    setEditMode(true);
    setData({ ...item });
  };
  const onHandleDelete = (id) => {
    const deleteData = note.filter((element) => element.id !== id);
    setAllNotes([...deleteData]);
  };
  const onHandleSearch = (e) => {
    const { value } = e.target;
    if (value !== "") {
      setQuerySearch(value);
    } else {
      setQuery({ ...query, querySearch: "" });
      setQuerySearch("");
    }
  };
  const onSubmitSearch = (e) => {
    e.preventDefault();
    setQuery({ ...query, querySearch });
  };
  const handleSortBy = (e) => {
    const { value } = e.target;
    setQuery({ ...query, sortBy: value });
  };
  const handleSortDate = (e) => {
    const { value } = e.target;
    setQuery({ ...query, sortDate: value });
  };

  // render
  const renderItems = note
    .filter((item) => {
      if (query.querySearch !== "") {
        return item.content
          .toLowerCase()
          .includes(query.querySearch.toLowerCase());
      }
      return item;
    })
    .filter((item) => {
      if (query.sortBy === "all") {
        return note;
      } else {
        return item.level === query.sortBy;
      }
    })
    .filter((item) => {
      if (query.sortDate) {
        return moment(item.createAt).format("YYYY-MM-DD") === query.sortDate;
      }
      return item;
    })
    .filter((item) => {
      if (query.done === true && query.doing === false) {
        return item.status === "done";
      }
      if (query.doing === true && query.done === false) {
        return item.status === "doing";
      }
      if (query.doing === true && query.done === true) {
        return item;
      }
      return item;
    })
    .map((item) => (
      <Item
        key={item.id}
        item={item}
        onHandleSelect={onHandleSelect}
        onHandleEdit={onHandleEdit}
        onHandleDelete={onHandleDelete}
      />
    ));
  localStorage.setItem("note", JSON.stringify(note));
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <ButtonAppBar />
        <Feature
          addOn={addOn}
          onChangeDoing={onChangeDoing}
          onChangeDone={onChangeDone}
          onToggleAdd={handleToggleAdd}
          onHandleSearch={onHandleSearch}
          onSubmitSearch={onSubmitSearch}
          valueSearch={querySearch}
          handleSortBy={handleSortBy}
          handleSortDate={handleSortDate}
        />
        <div className={classes.main}>
          <div className={`container ${addOn ? "decrease" : ""}`}>
            <div className="grid title">
              <div>Create At</div>
              <div className="content">Content</div>
              <div>Level</div>
              <div>Status</div>
              <div>Action</div>
            </div>

            {renderItems}

            {!note.length && (
              <div className="warning">
                {/*You must login for continue!*/}Empty note!
              </div>
            )}
          </div>
          <FormItem
            addOn={addOn}
            onToggleAdd={handleToggleAdd}
            onHandleChange={onHandleChange}
            onHandleRadio={onHandleRadio}
            data={data}
            onHandleSubmit={onHandleSubmit}
            editMode={editMode}
          />
        </div>
      </Container>
    </React.Fragment>
  );
}
