"use strict";
var _a;
exports.__esModule = true;
exports.selectProject = exports.reset = exports.saveProject = exports.projectSlice = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    id: 0,
    status: true,
    empresa: {
        id: 0,
        nome: '',
        responsavel: ''
    }
};
exports.projectSlice = toolkit_1.createSlice({
    name: 'project',
    initialState: initialState,
    reducers: {
        saveProject: function (state, action) {
            // const { id, status, empresa } = action.payload
            state.id = action.payload.id;
            state.status = action.payload.status;
            state.empresa = action.payload.empresa;
        },
        reset: function (state) {
            state = initialState;
        }
    }
});
exports.saveProject = (_a = exports.projectSlice.actions, _a.saveProject), exports.reset = _a.reset;
exports.selectProject = function (state) { return state.project; };
exports["default"] = exports.projectSlice.reducer;
