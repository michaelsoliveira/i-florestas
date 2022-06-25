import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import projectReducer from './umfSlice'
import userReducer from './userSlice'
import messageReducer from './messageSlice'
import paginationReducer from "./paginationSlice";
import umfReducer from './umfSlice'
import { loadState } from "./browser-storage";

export const store = configureStore({
    devTools: true,
    reducer: {
        project: projectReducer,
        user: userReducer,
        message: messageReducer,
        pagination: paginationReducer,
        umf: umfReducer
    },
    preloadedState: loadState()
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<String>
>
