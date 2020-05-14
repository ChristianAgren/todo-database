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
  const [searchInput, setSearchInput] = React.useState("");

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className={classes.wrapper}>
      <Button
        className={classes.getAllBtn}
        // onClick={props.handleSearch}
      >
        <RefreshIcon fontSize="small" />
        all
      </Button>
      <div className={classes.searchBar}>
        <div className={classes.search}>
          <Button className={classes.searchIdentification}>ID</Button>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={(event) => handleInputChange(event)}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <IconButton
          // onClick={() => props.handleSearch(searchInput)}
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
