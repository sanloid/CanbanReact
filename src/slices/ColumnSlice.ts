import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CardProps } from "../types/CardType";
import { ColumnProps } from "../types/ColumnType";

export interface ColumnState {
    columns: ColumnProps[];
}

const initialState: ColumnState = {
    columns: [
        { name: 'TODO', id: '1', author: "" },
        { name: 'In Progress', id: '2', author: "" },
        { name: 'Testing', id: '3', author: "" },
        { name: 'Done', id: '4', author: "" },
    ],
};

export const columnSlice = createSlice({
    name: "ColumnState",
    initialState,
    reducers: {
        addColumn: (state, action: PayloadAction<ColumnProps>) => {
            state.columns.push(action.payload);
        },
        editColumn: (state, action: PayloadAction<ColumnProps>) => {
            state.columns = state.columns.map(e => {
                if (e.id === action.payload.id)
                    return { ...action.payload, name: action.payload.name }
                return e
            })
        },
        deleteColumn: (state, action: PayloadAction<string>) => {
            state.columns = state.columns.filter(i => i.id !== action.payload);
        }
    },
});

export const { addColumn, editColumn, deleteColumn } = columnSlice.actions;

export default columnSlice.reducer;