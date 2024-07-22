import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IssueItem } from "../types/index.tsx";
import { getIssueApi } from "../components/Api/api.tsx";

type TInitialState = {
    issues: IssueItem[];
    loading: boolean;
    error: string | null | undefined;
};

const initialState: TInitialState = {
    issues: [],
    loading: false,
    error: null,
};

const issuetListSlice = createSlice({
    name: "issue",
    initialState,
    reducers: {},
    selectors: {
        getIssuesSelector: (state) => state.issues,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIssue.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchIssue.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchIssue.fulfilled, (state, action) => {
                state.loading = false;
                state.issues = action.payload;
            });
    },
});

export const fetchIssue = createAsyncThunk("issue/fetchIssues", async () =>
    getIssueApi()
);

export const issueReducer = issuetListSlice.reducer;
export const { getIssuesSelector } = issuetListSlice.selectors;
