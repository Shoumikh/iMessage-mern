import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchInput: null,
  },
  reducers: {
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
  },
});

export const { setSearchInput } = searchSlice.actions;

export const selectSearchInput = (state) => state.search.searchInput;

export default searchSlice.reducer;
