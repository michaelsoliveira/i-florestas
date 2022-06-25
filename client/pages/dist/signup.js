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
exports.getServerSideProps = void 0;
var router_1 = require("next/router");
var RegisterForm_1 = require("../components/RegisterForm");
var Logo_1 = require("../components/Logo");
var react_1 = require("next-auth/react");
var link_1 = require("next/link");
var defaultStyles_1 = require("../components/helpers/defaultStyles");
var Pagelogin = function (_a) {
    var csrfToken = _a.csrfToken;
    var router = router_1.useRouter();
    return (React.createElement("div", { className: "min-h-full flex items-center justify-center my-24 px-4 sm:px-6 lg:px-8" },
        React.createElement("div", { className: "max-w-md flex flex-col justify-center items-center w-full space-y-4 px-8 py-4 border rounded-md shadow-2xl" },
            React.createElement("div", { className: 'flex bg-gray-50 border absolute top-20 border-green-700 justify-center items-center rounded-full shadow-lg w-36 h-36' },
                React.createElement("div", { className: 'relative flex flex-col items-center justify-center' },
                    React.createElement(Logo_1["default"], { width: 'w-16', height: 'h-16' }),
                    React.createElement("h1", { className: 'font-roboto text-xl font-semibold text-green-700' }, "iFlorestal"))),
            React.createElement("div", { className: 'w-full pt-10' },
                React.createElement(RegisterForm_1.RegisterForm, { styles: defaultStyles_1.styles })),
            React.createElement("div", { className: 'w-full border-b border-gray-200 flex items-center' },
                React.createElement("p", { className: 'text-xs py-4 flex items-center text-center' }, "Ao se cadastrar, voc\u00EA concordar com nossos Termos de Uso e com a Pol\u00EDtica de Privacidade")),
            React.createElement("p", { className: 'flex items-center text-center text-sm' },
                "J\u00E1 tem conta?\u00A0",
                React.createElement("span", { className: 'underline font-bold text-green-700' },
                    " ",
                    React.createElement(link_1["default"], { href: '/login' }, "Fa\u00E7a login"))))));
};
exports.getServerSideProps = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var session, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, react_1.getSession(ctx)];
            case 1:
                session = _c.sent();
                if (session) {
                    return [2 /*return*/, {
                            redirect: {
                                destination: '/',
                                permanent: false
                            }
                        }];
                }
                _a = {};
                _b = {};
                return [4 /*yield*/, react_1.getCsrfToken(ctx)];
            case 2: return [2 /*return*/, (_a.props = (_b.csrfToken = _c.sent(),
                    _b),
                    _a)];
        }
    });
}); };
exports["default"] = Pagelogin;
