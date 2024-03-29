import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    id: '',
    descricao: '',
    tipo: 0,
    srid: 0
};

export type UpaType = {
    id: string;
    descricao: string;
    tipo: number;
    srid: number;
}

const upaSlice = createSlice({
  name: "upa",
  initialState,
  reducers: {
      setUpa: (state, action: PayloadAction<UpaType>) => {
        const { id, descricao, tipo, srid } = action.payload
        state.id = id;  
        state.descricao = descricao;
        state.tipo = tipo;
        state.srid = srid;
      }
  },
  
});

const {reducer, actions} = upaSlice;

export const { setUpa } = actions;

export default reducer;
