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
exports.AddUserToProjeto = void 0;
var AddEdit_1 = require("src/components/user/AddEdit");
var withAuthentication_1 = require("src/components/withAuthentication");
var AuthContext_1 = require("contexts/AuthContext");
var react_1 = require("react");
var styles = {
    label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
    field: 'text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',
    button: ' bg-green-600 text-white font-bold py-2 px-4 rounded hover:bg-green-500',
    errorMsg: 'text-red-500 text-sm'
};
exports.AddUserToProjeto = function () {
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var _a = react_1.useState(), roles = _a[0], setRoles = _a[1];
    var loadRoles = react_1.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, roles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.get('role')];
                case 1:
                    response = _a.sent();
                    roles = response.data.roles;
                    setRoles(roles);
                    return [2 /*return*/];
            }
        });
    }); }, [client]);
    react_1.useEffect(function () {
        loadRoles();
    }, [loadRoles]);
    return (React.createElement("div", { className: "bg-white shadow-lg rounded-xl px-4 py-2 w-1/3 mx-auto my-6" },
        React.createElement(AddEdit_1.AddEdit, { roles: roles, redirect: false })));
};
exports["default"] = withAuthentication_1["default"](exports.AddUserToProjeto);
