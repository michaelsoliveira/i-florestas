import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    columnsCsv: [],
    columnsDb: [],
    relation: [],
    data: []
};

export interface AssociationType {
    columnsCsv?: Array<any>,
    columnsDb?: Array<any>,
    relation?: any,
    data?: any
}

const associationSlice = createSlice({
  name: "association",
  initialState,
  reducers: {
    setAssociation: (state, action: PayloadAction<AssociationType>) => {
        const { columnsCsv, columnsDb, relation,data }: any = action.payload
        state.columnsCsv = columnsCsv,
        state.columnsDb = columnsDb,
        state.relation = relation,
        state.data = data
      },
    // setDataImport: (state, action: PayloadAction<AssociationType>) => {
    //   const { data }: any = action.payload
    //   state.data = data
    // }
  },
  
});

const {reducer, actions} = associationSlice;

export const { setAssociation } = actions;

export default reducer;
