import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DesignerList } from "../types/index.tsx";
import { getDesignerApi, getNextDesignerApi } from "../components/Api/api.tsx";

type TInitialState = {
    designers: DesignerList;
    loading: boolean;
    error: string | null | undefined;
};

const initialState: TInitialState = {
    designers: {
        count: 0,
        next: "",
        previous: "",
        results: [],
    },
    loading: false,
    error: null,
};

const designerListSlice = createSlice({
    name: "designer",
    initialState,
    reducers: {
        addResult: (state, action) => {
            state.designers.results = [
                ...state.designers.results,
                action.payload.results,
                action.payload.next,
            ];
        },
    },
    selectors: {
        getDesignersSelector: (state) => state.designers,
        getNextPage: (state) => state.designers.next,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDesigners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDesigners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchDesigners.fulfilled, (state, action) => {
                state.loading = false;
                state.designers = action.payload;
            })
            .addCase(fetchNextDesigners.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNextDesigners.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchNextDesigners.fulfilled, (state, action) => {
                state.loading = false;
                state.designers.results = [
                    ...state.designers.results,
                    ...action.payload.results,
                ];
                state.designers.next = action.payload.next;
            });
    },
});

export const fetchDesigners = createAsyncThunk(
    "designers/fetchDesigners",
    async () => getDesignerApi()
);

export const fetchNextDesigners = createAsyncThunk(
    "designers/fetchNextDesigners",
    async (url: string | null) => getNextDesignerApi(url)
);

export const designerReducer = designerListSlice.reducer;
export const { getDesignersSelector, getNextPage } =
    designerListSlice.selectors;
export const { addResult } = designerListSlice.actions;
