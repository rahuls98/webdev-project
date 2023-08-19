import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
    name: "navigation",
    initialState: { page: -1 },
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
});

const { actions, reducer } = navigationSlice;
export const { setPage } = actions;
export default reducer;
