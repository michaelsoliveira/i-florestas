import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    columnsCsv: [],
    columnsDb: [],
    data: []
};

export interface AssociationType {
    columnsCsv: Array<any>,
    columnsDb: Array<any>,
    data: any
}

const associationSlice = createSlice({
  name: "association",
  initialState,
  reducers: {
    setAssociation: (state, action: PayloadAction<AssociationType>) => {
        const { columnsCsv, columnsDb, data }: any = action.payload
        state.columnsCsv = columnsCsv,
        state.columnsDb = columnsDb,
        state.data = data
      }
  },
  
});

const {reducer, actions} = associationSlice;

export const { setAssociation } = actions;

export default reducer;
