import {createAsyncThunk} from "@reduxjs/toolkit";
import * as unverifiedExpertService from "./unverified-expert-service";

export const verifyExpertThunk = createAsyncThunk(
    "authentication/verifyExperts",
    async (expertId) => {
        try {
            const expertIdVerified = await unverifiedExpertService.verifyExpert(expertId);
            return expertIdVerified;
        } catch (error) {
            console.log(error);
        }
    }
);

export const getUnverifiedExpertsThunk = createAsyncThunk(
    "authentication/getUnverifiedExperts",
    async () => {
        try {
            const unverifiedExperts = await unverifiedExpertService.getUnverifiedExperts();
            return unverifiedExperts;
        } catch (error) {
            console.log(error);
        }
    }
);


