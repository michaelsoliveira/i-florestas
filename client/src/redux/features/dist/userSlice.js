"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.userSlice = exports.create = exports.HTTP_STATUS = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var user_1 = require("@/services/user");
exports.HTTP_STATUS = Object.freeze({
    PENDING: 'PENDING',
    FULFILLED: 'FULFILLED',
    REJECTED: 'REJECTED'
});
var initialState = {
    loading: '',
    data: {
        username: '',
        email: '',
        password: '',
        id_projeto: '',
        id_role: ''
    },
    errorMessage: ''
};
exports.create = toolkit_1.createAsyncThunk('user/create', function (dataRequest, thunkAPI) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error, message, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_1["default"].create(dataRequest)];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error, message = _a.message;
                if (error) {
                    return [2 /*return*/, thunkAPI.rejectWithValue({ message: message })];
                }
                return [2 /*return*/, {
                        data: data,
                        error: error,
                        message: message
                    }];
            case 2:
                error_1 = _b.sent();
                return [2 /*return*/, thunkAPI.rejectWithValue({ error: error_1 })];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.userSlice = toolkit_1.createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
    // createUser: (state, action: PayloadAction<UserData>) => {
    //     // const { id, status, empresa } = action.payload
    //     state.data.username = action.payload.username
    //     state.data.email = action.payload.email
    //     state.data.password = action.payload.password
    // },
    },
    extraReducers: function (builder) {
        builder
            .addCase(exports.create.pending, function (state) {
            state.loading = exports.HTTP_STATUS.PENDING;
        })
            .addCase(exports.create.fulfilled, function (state, _a) {
            var payload = _a.payload;
            state.loading = exports.HTTP_STATUS.FULFILLED;
            state.data = payload.data;
        })
            .addCase(exports.create.rejected, function (state, _a) {
            var payload = _a.payload;
            state.loading = exports.HTTP_STATUS.REJECTED;
            state.errorMessage = payload.errorMessage;
        });
    }
});
// export const { createUser } = userSlice.actions
exports["default"] = exports.userSlice.reducer;
