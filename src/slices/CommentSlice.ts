import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CommnetProp } from "../types/CommentType";

export interface CommentState {
    comments: CommnetProp[];
}

const initialState: CommentState = {
    comments: [],
};

export const commentSlice = createSlice({
    name: "CommentState",
    initialState,
    reducers: {
        addComment: (state, action: PayloadAction<CommnetProp>) => {
            state.comments.push(action.payload);
        },
        deleteComment: (state, action: PayloadAction<string>) => {
            state.comments = state.comments.filter(i => i.commnetID !== action.payload);
        },
        editComment : (state, action: PayloadAction<CommnetProp>) =>{
            state.comments = state.comments.map( e=> {
                if(e.commnetID === action.payload.commnetID)
                    return action.payload
                return e
            })
        }
    },
});

export const { addComment, deleteComment, editComment } = commentSlice.actions;

export default commentSlice.reducer;