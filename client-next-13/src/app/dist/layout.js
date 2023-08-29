'use client';
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
require("@/app/globals.css");
require("react-toastify/dist/ReactToastify.css");
var AuthContext_1 = require("@/context/AuthContext");
var ProjetoContext_1 = require("@/context/ProjetoContext");
var ModalContext_1 = require("@/context/ModalContext");
var LoadingContext_1 = require("@/context/LoadingContext");
var StepContext_1 = require("@/context/StepContext");
var Layout_1 = require("@/components/Layout");
var Modal_1 = require("@/components/Modal");
var nextjs_progressbar_1 = require("nextjs-progressbar");
var react_1 = require("react");
var provider_1 = require("@/redux/provider");
var react_toastify_1 = require("react-toastify");
var debounce = require("debounce").debounce;
var providers_1 = require("./providers");
function RootLayout(_a) {
    var children = _a.children;
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_b) {
            // const session = await getServerSession(authOptions)
            // store.subscribe(
            //   // we use debounce to save the state once each 800ms
            //   // for better performances in case multiple changes occur in a short time
            //   debounce(() => {
            //     saveState(store.getState());
            //   }, 800)
            // );
            return [2 /*return*/, (react_1["default"].createElement("html", { lang: "en" },
                    react_1["default"].createElement("body", null,
                        react_1["default"].createElement(provider_1.Providers, null,
                            react_1["default"].createElement(providers_1.NextAuthProvider, null,
                                react_1["default"].createElement(LoadingContext_1.LoadingProvider, null,
                                    react_1["default"].createElement(ModalContext_1.ModalProvider, null,
                                        react_1["default"].createElement(ProjetoContext_1.ProjetoProvider, null,
                                            react_1["default"].createElement(AuthContext_1.AuthProvider, null,
                                                react_1["default"].createElement(StepContext_1.StepProvider, null,
                                                    react_1["default"].createElement(Layout_1["default"], null,
                                                        react_1["default"].createElement(react_toastify_1.ToastContainer, null),
                                                        react_1["default"].createElement(nextjs_progressbar_1["default"], null),
                                                        react_1["default"].createElement(Modal_1["default"], null),
                                                        children)))))))))))];
        });
    });
}
exports["default"] = RootLayout;
