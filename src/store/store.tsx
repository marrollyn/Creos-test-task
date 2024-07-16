import { configureStore } from '@reduxjs/toolkit';
//import designerReducer from '../slice/desinersSlice';
import {commentReducer} from '../slice/commentSlice';

export const store = configureStore({
    reducer: {
    // designer: designerReducer,
    comment: commentReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;