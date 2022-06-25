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
var image_1 = require("next/image");
var react_1 = require("next-auth/react");
var Tabs_1 = require("../components/Tabs");
var Carousel_1 = require("../components/home/Carousel");
var Hero_1 = require("../components/home/Hero");
function Dashboard(_a) {
    var localSession = _a.localSession;
    return (React.createElement("div", { className: "w-full" },
        React.createElement("div", { className: "relative flex flex-row lg:flex-col lg:overflow-hidden" },
            React.createElement("div", { className: "mx-auto mt-10 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-12" },
                React.createElement("div", { className: "w-full relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-6xl lg:pb-16" },
                    React.createElement("div", { className: 'flex flex-col lg:flex-row border shadow-lg' },
                        React.createElement("div", { className: 'flex flex-row mx-auto' },
                            React.createElement(Hero_1["default"], { session: localSession })),
                        React.createElement("div", { className: "mx-auto text-center items-center inset-y-0 h-full my-auto py-4 px-4" },
                            React.createElement(image_1["default"], { className: "object-cover object-center", src: "/web_devices.svg", alt: "", width: 400, height: 300 }))),
                    React.createElement("div", { className: "text-center lg:flex lg:flex-col py-4" },
                        React.createElement("h2", { className: "text-3xl leading-8 font-semibold mt-5 text-green-800" }, "Recursos"),
                        React.createElement(Carousel_1.Carousel, null)),
                    React.createElement("div", { className: 'max-w-md lg:max-w-lg md:max-w-md sm:text-center mx-auto' }, !localSession &&
                        (React.createElement("div", null,
                            React.createElement("h2", { className: "text-3xl leading-8 font-semibold mt-2 text-green-800" }, "Vamos testar!"),
                            React.createElement(Tabs_1["default"], null)))))))));
}
exports["default"] = Dashboard;
exports.getServerSideProps = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var session;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, react_1.getSession(ctx)];
            case 1:
                session = _a.sent();
                return [2 /*return*/, {
                        props: {
                            localSession: session
                        }
                    }];
        }
    });
}); };
