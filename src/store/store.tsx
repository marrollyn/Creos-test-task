import { configureStore } from '@reduxjs/toolkit';
//import designerReducer from '../slice/desinersSlice';
import {commentReducer} from '../slice/commentSlice';
import {issueReducer} from '../slice/issueSlice';

export const store = configureStore({
    reducer: {
    // designer: designerReducer,
    comment: commentReducer,
    issue: issueReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;