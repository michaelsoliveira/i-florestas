"use strict";
exports.__esModule = true;
exports.setCurrentPagePagination = exports.paginate = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var initialState = {
    name: '',
    perPage: 10,
    currentPage: 1,
    totalItems: 0,
    totalPages: 0,
    orderBy: 'especie.nome',
    order: 'ASC'
};
var paginationSlice = toolkit_1.createSlice({
    name: "pagination",
    initialState: initialState,
    reducers: {
        paginate: function (state, action) {
            var _a = action.payload, name = _a.name, perPage = _a.perPage, currentPage = _a.currentPage, totalItems = _a.totalItems, totalPages = _a.totalPages, orderBy = _a.orderBy, order = _a.order;
            state.name = name;
            state.perPage = perPage;
            state.currentPage = currentPage;
            state.totalItems = totalItems;
            state.totalPages = totalPages;
            state.orderBy = orderBy;
            state.order = order;
        },
        setCurrentPagePagination: function (state, action) {
            state.currentPage = action.payload.currentPage;
        }
    }
});
var reducer = paginationSlice.reducer, actions = paginationSlice.actions;
exports.paginate = actions.paginate, exports.setCurrentPagePagination = actions.setCurrentPagePagination;
exports["default"] = reducer;
