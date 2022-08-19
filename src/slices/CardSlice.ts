import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CardProps } from "../types/CardType";

export interface CardState {
    cards: CardProps[];
}

const initialState: CardState = {
    cards: [],
};

export const cardSlice = createSlice({
    name: "CardState",
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<CardProps>) => {
            state.cards.push(action.payload);
        },
        editCard: (state, action: PayloadAction<CardProps>) => {
            state.cards = state.cards.map((e) => {
                if (e.id === action.payload.id)
                    return action.payload;
                return e;
            })
        },
        removeCardById: (state, action: PayloadAction<string>) => {
            state.cards = state.cards.filter(i => i.id !== action.payload);
        },
        removeCardByColumnId: (state, action: PayloadAction<string>) => {
            state.cards = state.cards.filter(i => i.columnID !== action.payload);
        }
    },
});

export const { addCard, editCard, removeCardById, removeCardByColumnId } = cardSlice.actions;

export default cardSlice.reducer;