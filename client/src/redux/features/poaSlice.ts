import { createSlice, PayloadAction } from "@reduxjs/toolkit";


// Action types
interface SetDateAction {
  type: 'SET_POA';
  payload: Date;
}

const initialState = {
    id: '',
    descricao: '',
    data_ultimo_plan: null,
    pmfs: '',
    situacao_poa: {
      id: '',
      nome: ''
    }
};

export interface PoaType {
    id: string;
    descricao: string;
    data_ultimo_plan: Date | null;
    pmfs: '';
    situacao_poa: {
      id: string;
      nome: string;
    }
}

const poaSlice = createSlice({
  name: "poa",
  initialState,
  reducers: {
      setPoa: (state, action: PayloadAction<PoaType>) => {
        const { id, descricao, data_ultimo_plan, pmfs, situacao_poa }: any = action.payload
        state.id = id;  
        state.descricao = descricao;
        state.data_ultimo_plan = data_ultimo_plan;
        state.pmfs = pmfs;
        state.situacao_poa = {
          id: situacao_poa?.id,
          nome: situacao_poa?.nome
        }
      }
  },
  
});

const {reducer, actions} = poaSlice;

export const { setPoa } = actions;

export default reducer;
