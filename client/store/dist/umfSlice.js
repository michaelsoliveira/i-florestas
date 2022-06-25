"use strict";
exports.__esModule = true;
exports.setUmf = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    id: '',
    nome: ''
};
var umfSlice = toolkit_1.createSlice({
    name: "umf",
    initialState: initialState,
    reducers: {
        setUmf: function (state, action) {
            var _a = action.payload, id = _a.id, nome = _a.nome;
            state.id = id;
            state.nome = nome;
        }
    }
});
var reducer = umfSlice.reducer, actions = umfSlice.actions;
exports.setUmf = actions.setUmf;
exports["default"] = reducer;
