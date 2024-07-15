import { configureStore } from '@reduxjs/toolkit';
import designerReducer from '../slice/desinersSlice';

export const store = configureStore({
    reducer: {
    designer: designerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;