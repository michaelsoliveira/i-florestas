import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    id: '',
    descricao: '',
    data_ultimo_plan: new Date(0),
    pmfs: ''
};

export type PoaType = {
    id: string;
    descricao: string;
    data_ultimo_plan: Date;
    pmfs: '';
}

const poaSlice = createSlice({
  name: "poa",
  initialState,
  reducers: {
      setPoa: (state, action: PayloadAction<PoaType>) => {
        const { id, descricao, data_ultimo_plan, pmfs } = action.payload
        state.id = id;  
        state.descricao = descricao;
        state.data_ultimo_plan = data_ultimo_plan;
        state.pmfs = pmfs;
      }
  },
  
});

const {reducer, actions} = poaSlice;

export const { setPoa } = actions;

export default reducer;
