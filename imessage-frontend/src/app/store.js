import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import chatReducer from "../features/chatSlice";
import searchReducer from "../features/searchSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    search: searchReducer,
  },
});
