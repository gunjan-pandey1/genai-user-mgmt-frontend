import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice';
import chatReducer from './chatSlice';

export const store = configureStore({
    reducer: {
        users: usersReducer,
        chat: chatReducer,
    },
});
