import { createSlice } from "@reduxjs/toolkit";
import {
    loginThunk,
    logoutThunk,
    registerThunk,
    updateUserThunk,
} from "../services/auth-thunks";

const authSlice = createSlice({
    name: "auth",
    initialState: { currentUser: null },
    reducers: {},
    extraReducers: {
        [logoutThunk.fulfilled]: (state) => {
            state.currentUser = null;
        },
        [updateUserThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [registerThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [loginThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
    },
});
export default authSlice.reducer;
