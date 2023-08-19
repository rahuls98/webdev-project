import {createSlice} from "@reduxjs/toolkit";
import {verifyExpertThunk, getUnverifiedExpertsThunk} from "../services/unverified-experts-thunk";


const unverifiedExpertSlice = createSlice({
        name: "unverifiedExpert",
        initialState: {unverifiedExperts: []},
        reducers: {},
        extraReducers: {
            [verifyExpertThunk.fulfilled]: (state , {payload}) => {
                console.log(payload)
            },
            [getUnverifiedExpertsThunk.fulfilled]: (state, {payload}) => {
                state.unverifiedExperts = payload;
            }
        },
    })
;
export default unverifiedExpertSlice.reducer;