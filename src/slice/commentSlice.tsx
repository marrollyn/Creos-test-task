import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CommentList } from "../types/index.tsx";
import { getСommentApi } from "../components/Api/api.tsx";

type TInitialState = {
    comments: CommentList[];
    loading: boolean;
    error: string | null | undefined;
};

const initialState: TInitialState = {
    comments: [],
    loading: false,
    error: null,
};

const commentListSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    selectors: {
        getCommentsSelector: (state) => state.comments,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            });
    },
});

export const fetchComments = createAsyncThunk(
    "comments/fetchComments",
    async () => getСommentApi()
);

export const commentReducer = commentListSlice.reducer;
export const { getCommentsSelector } = commentListSlice.selectors;
