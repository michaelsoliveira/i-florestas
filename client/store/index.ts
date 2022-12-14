import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import projetoReducer from './projetoSlice'
import userReducer from './userSlice'
import messageReducer from './messageSlice'
import paginationReducer from "./paginationSlice";
import umfReducer from './umfSlice'
import upaReducer from './upaSlice'
import utReducer from './utSlice'
import { loadState } from "./browser-storage";

export const store = configureStore({
    devTools: true,
    reducer: {
        projeto: projetoReducer,
        user: userReducer,
        message: messageReducer,
        pagination: paginationReducer,
        umf: umfReducer,
        upa: upaReducer,
        ut: utReducer
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
