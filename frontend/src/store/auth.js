import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    user: false
  }

  const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      loginCheck: (state, action) => {
        state.user = action.payload;
        // localStorage.setItem("user", JSON.stringify(action.payload));
      },
      logoutCheck: (state) => {
        state.user = null;
         //localStorage.removeItem("user");
         toast.success("You logged out successfully");
      },
    },
  });
  
  export const { loginCheck, logoutCheck } = authSlice.actions;
  //export const currentUser = user;
  
  export default authSlice.reducer;