import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "./auth-service";

export const loginThunk = createAsyncThunk(
    "authentication/login",
    async (credentials) => {
        const user = await authService.login(credentials);
        return user;
    }
);

export const registerThunk = createAsyncThunk(
    "authentication/signup",
    async (payload) => {
        const user = await authService.register(payload);
        return user;
    }
);

export const logoutThunk = createAsyncThunk(
    "authentication/logout",
    async () => {
        return await authService.logout();
    }
);
export const updateUserThunk = createAsyncThunk(
    "authentication/updateUser",
    async (user) => {
        return user;
    }
);

