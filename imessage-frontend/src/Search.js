import React from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import { selectSearchInput, setSearchInput } from "./features/searchSlice";
import { useDispatch, useSelector } from "react-redux";

function Search() {
  const searchInput = useSelector(selectSearchInput); //this will import user from userSlice
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    dispatch(setSearchInput(e.target.value));
  };
  return (
    <div className="search">
      <SearchIcon />
      <input
        placeholder="search"
        type="text"
        value={searchInput}
        onChange={handleChange}
      />
      {console.log(searchInput)}
    </div>
  );
}

export default Search;
