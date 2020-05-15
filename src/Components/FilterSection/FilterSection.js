import React from "react";

// MATERIAL UI
import {
  Button,
  IconButton,
  InputBase,
} from "@material-ui/core";

// ICONS
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";

// STYLES
import useStyles from "./FilterSectionStyles";

// -- -- --

function FilterSection(props) {
  const classes = useStyles();
  const searchValues = [{
    present: "ID",
    actual: "_id"
  }, {
    present: "USER",
    actual: "parentId"
  }, {
    present: "TITLE",
    actual: "title"
  }]

  const [searchInput, setSearchInput] = React.useState({
    key: searchValues[0],
    value: ""
  });

  const handleInputChange = (event, anchor) => {
    setSearchInput({
      ...searchInput,
      [anchor]: event.target.value
    });
  };

  const changeKeyValues = () => {
    let i = 0
    searchValues.forEach((value, index) => {
      if (value.present === searchInput.key.present) {
        i = index
      }
    })
    i++
    if (i === searchValues.length) {
      i = 0
    }
    setSearchInput({
      ...searchInput,
      key: searchValues[i]
    })
  }

  return (
    <div className={classes.wrapper}>
      <Button
        className={classes.getAllBtn}
        onClick={props.getAll}
      >
        <RefreshIcon fontSize="small" />
        all
      </Button>
      <div className={classes.searchBar}>
        <div className={classes.search}>
          <Button
            className={classes.searchIdentification}
            onClick={() => changeKeyValues()}
          >
            {searchInput.key.present}
          </Button>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            value={searchInput.value}
            onChange={(event) => handleInputChange(event, "value")}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <IconButton
          onClick={() => props.search(searchInput)}
          className={classes.searchIcon}
          edge="end"
          aria-label="search"
        >
          <SearchIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
}

export default FilterSection;
