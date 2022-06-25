import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"

import authService from "../services/user"

import type { UserData } from "../services/user"
import { useDispatch } from "react-redux"
import { setMessage } from "./messageSlice"

export const HTTP_STATUS = Object.freeze({
  PENDING: 'PENDING',
  FULFILLED: 'FULFILLED',
  REJECTED: 'REJECTED',
})

interface UserState {
    loading?: string;
    data: {
        username?: string;
        email?: string;
        password?: string;
        empresaId?: string;
    };
    errorMessage?: string
}

const initialState: UserState = {
    loading: '',
    data: {
        username: '',
        email: '',
        password: ''
    },
    errorMessage: ''
}

export const create = createAsyncThunk('user/create', async (dataRequest: UserData, thunkAPI) => {
    try {
        const { data, error, errorMessage } = await authService.create(dataRequest) as any
        
        if (error) {
            return thunkAPI.rejectWithValue({message: errorMessage})
        }

        return {
            data,
            error,
            message: errorMessage
        }
                
    } catch (error) {
        return thunkAPI.rejectWithValue({error})
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // createUser: (state, action: PayloadAction<UserData>) => {
        //     // const { id, status, empresa } = action.payload
        //     state.data.username = action.payload.username
        //     state.data.email = action.payload.email
        //     state.data.password = action.payload.password

        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(create.pending, (state) => {
                state.loading = HTTP_STATUS.PENDING
            })
            .addCase(create.fulfilled, (state, { payload }) => {
                state.loading = HTTP_STATUS.FULFILLED
                state.data = payload.data
            })
            .addCase(create.rejected, (state, { payload } : PayloadAction<any>) => {
                state.loading = HTTP_STATUS.REJECTED
                state.errorMessage = payload.errorMessage
            })
    }
})

// export const { createUser } = userSlice.actions

export default userSlice.reducer