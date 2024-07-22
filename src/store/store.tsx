import { configureStore } from "@reduxjs/toolkit";
import { commentReducer } from "../slice/commentSlice";
import { issueReducer } from "../slice/issueSlice";
import { designerReducer } from "../slice/desinerSlice";

export const store = configureStore({
    reducer: {
        comment: commentReducer,
        issue: issueReducer,
        designer: designerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
