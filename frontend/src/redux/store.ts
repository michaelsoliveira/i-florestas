'use client'

import { Action, configureStore, getDefaultMiddleware, ThunkAction } from "@reduxjs/toolkit";
import projetoReducer from './features/projetoSlice'
import userReducer from './features/userSlice'
import messageReducer from './features/messageSlice'
import paginationReducer from "./features/paginationSlice";
import umfReducer from './features/umfSlice'
import upaReducer from './features/upaSlice'
import utReducer from './features/utSlice'
import poaReducer from './features/poaSlice'
import associationReducer from './features/associationSlice'
import { loadState } from "./browser-storage";

export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: true,
    reducer: {
        projeto: projetoReducer,
        user: userReducer,
        message: messageReducer,
        pagination: paginationReducer,
        umf: umfReducer,
        upa: upaReducer,
        ut: utReducer,
        poa: poaReducer,
        association: associationReducer
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
