import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types";

const initialState: User = { user_id: null, user_name: null, is_authenticated: false, is_admin: false, access_token: null };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      return action.payload;
    },
    logout: () => initialState,
  },
});


export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
