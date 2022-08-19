import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CardProps } from "../types/CardType";

export interface AuthState {
    author : string;
}

const initialState: AuthState = {
    author :  "",
};

export const authSlice = createSlice({
    name: "AuthState",
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.author = action.payload
        },
    },
});

export const { setName } = authSlice.actions;

export default authSlice.reducer;