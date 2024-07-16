import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CommentList, DesignerItem } from "../types/index.tsx";
import { getСommentApi } from "../components/Api/api.tsx";
import { Dispatch } from 'redux';
import { RootState, AppDispatch } from "../store/store.tsx";

// const initialState: CommentList[] = [
//     {
//     id: 0,
// 	issue: '',
// 	designer: {
//         avatar: '',
//         username: '',
//         thumbnails: {
//             avatar: '',
//             avatar_2x: '',
//             avatar_webp: '',
//             avatar_webp_2x: ''
//     },},
// 	date_created: ''
// },]

type TInitialState = {
    comments: CommentList[],
    loading: boolean,
    error: string|null|undefined,
    };

const initialState:TInitialState = {
    comments: [],
    loading: false,
    error: null,
}

const commentListSlice = createSlice({
    name: 'comment',
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
            })
        }
    })


interface FetchCommentsAction {
    type: string;
    payload: CommentList[]; // Замените any на ожидаемый тип данных
}

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => getСommentApi()
    //return response.data; // 
    );


export const commentReducer = commentListSlice.reducer;
//export {commentReducer}
export const { getCommentsSelector } = commentListSlice.selectors;