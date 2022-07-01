import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    id: '',
    descricao: ''
};

export type UpaType = {
    id: string;
    descricao: string;
}

const upaSlice = createSlice({
  name: "upa",
  initialState,
  reducers: {
      setUpa: (state, action: PayloadAction<UpaType>) => {
        const { id, descricao } = action.payload
        state.id = id;  
        state.descricao = descricao;
      }
  },
  
});

const {reducer, actions} = upaSlice;

export const { setUpa } = actions;

export default reducer;
