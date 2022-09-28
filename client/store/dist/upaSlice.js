"use strict";
exports.__esModule = true;
exports.setUpa = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    id: '',
    descricao: '',
    tipo: 0
};
var upaSlice = toolkit_1.createSlice({
    name: "upa",
    initialState: initialState,
    reducers: {
        setUpa: function (state, action) {
            var _a = action.payload, id = _a.id, descricao = _a.descricao, tipo = _a.tipo;
            state.id = id;
            state.descricao = descricao;
            state.tipo = tipo;
        }
    }
});
var reducer = upaSlice.reducer, actions = upaSlice.actions;
exports.setUpa = actions.setUpa;
exports["default"] = reducer;
