"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var react_1 = require("react");
var withAuthentication_1 = require("../../components/withAuthentication");
var Pagination_1 = require("../../components/Pagination");
var AuthContext_1 = require("../../contexts/AuthContext");
var hooks_1 = require("../../store/hooks");
var paginationSlice_1 = require("../../store/paginationSlice");
var router_1 = require("next/router");
var Index_1 = require("../../components/upa/Index");
var UpaIndex = function () {
    var client = react_1.useContext(AuthContext_1.AuthContext).client;
    var _a = react_1.useState(false), loading = _a[0], setLoading = _a[1];
    var _b = react_1.useState(1), currentPage = _b[0], setCurrentPage = _b[1];
    var _c = react_1.useState(10), itemsPerPage = _c[0], setItemsPerPage = _c[1];
    var _d = react_1.useState(0), totalItems = _d[0], setTotalItems = _d[1];
    var _e = react_1.useState([]), currentUpas = _e[0], setCurrentUpas = _e[1];
    var _f = react_1.useState(0), totalPages = _f[0], setTotalPages = _f[1];
    var _g = react_1.useState('descricao'), orderBy = _g[0], setOrderBy = _g[1];
    var _h = react_1.useState('asc'), order = _h[0], setOrder = _h[1];
    var pagination = hooks_1.useAppSelector(function (state) { return state.pagination; });
    var umf = hooks_1.useAppSelector(function (state) { return state.umf; });
    var dispatch = hooks_1.useAppDispatch();
    var router = router_1.useRouter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    var loadUpas = react_1.useCallback(function (itemsPerPage, currentPage) { return __awaiter(void 0, void 0, void 0, function () {
        var currentPagePagination, url, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    currentPagePagination = (pagination.name === router.pathname && pagination.currentPage) ? pagination.currentPage : 1;
                    setCurrentPage(currentPagePagination);
                    url = "/upa?page=" + (currentPage ? currentPage : currentPagePagination) + "&perPage=" + pagination.perPage + "&orderBy=" + orderBy + "&order=" + order + "&umf=" + umf.id;
                    return [4 /*yield*/, client.get(url)];
                case 1:
                    data = (_a.sent()).data;
                    setTotalItems(data === null || data === void 0 ? void 0 : data.count);
                    setCurrentUpas(data === null || data === void 0 ? void 0 : data.upas);
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); }, [client, order, orderBy, pagination.currentPage, pagination.name, router.pathname]);
    react_1.useEffect(function () {
        loadUpas(itemsPerPage);
    }, [itemsPerPage]);
    var onPageChanged = function (paginatedData) { return __awaiter(void 0, void 0, void 0, function () {
        var name, currentPage, perPage, totalPages, orderBy, order, umf, search, url, data, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    name = paginatedData.name, currentPage = paginatedData.currentPage, perPage = paginatedData.perPage, totalPages = paginatedData.totalPages, orderBy = paginatedData.orderBy, order = paginatedData.order, umf = paginatedData.umf, search = paginatedData.search;
                    url = "/upa?page=" + currentPage + "&perPage=" + perPage + "&orderBy=" + orderBy + "&order=" + order + "&umf=" + umf + "&search=" + search;
                    if (!search) return [3 /*break*/, 2];
                    return [4 /*yield*/, client.get(url)];
                case 1:
                    data = (_a.sent()).data;
                    paginatedData = __assign(__assign({ name: name }, paginatedData), { totalPages: Math.ceil((data === null || data === void 0 ? void 0 : data.count) / perPage), totalItems: data === null || data === void 0 ? void 0 : data.count });
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, client.get("/upa?page=" + currentPage + "&perPage=" + perPage + "&orderBy=" + orderBy + "&order=" + order + "&umf=" + umf)];
                case 3:
                    data = (_a.sent()).data;
                    paginatedData = __assign(__assign({ name: name }, paginatedData), { totalPages: Math.ceil((data === null || data === void 0 ? void 0 : data.count) / perPage), totalItems: data === null || data === void 0 ? void 0 : data.count });
                    _a.label = 4;
                case 4:
                    dispatch(paginationSlice_1.paginate(paginatedData));
                    setCurrentPage(currentPage);
                    setItemsPerPage(perPage);
                    setOrderBy(orderBy);
                    setOrder(order);
                    setTotalItems(data === null || data === void 0 ? void 0 : data.count);
                    setCurrentUpas(data === null || data === void 0 ? void 0 : data.upas);
                    setTotalPages(totalPages ? totalPages : Math.ceil((data === null || data === void 0 ? void 0 : data.count) / perPage));
                    return [2 /*return*/];
            }
        });
    }); };
    var changeItemsPerPage = function (value) {
        onPageChanged({
            name: router.pathname,
            currentPage: 1,
            perPage: value,
            orderBy: orderBy,
            order: order
        });
    };
    return (React.createElement("div", null,
        React.createElement(Index_1["default"], { currentUpas: currentUpas, loading: loading, loadUpas: loadUpas, currentPage: currentPage, orderBy: orderBy, order: order, onPageChanged: onPageChanged, perPage: itemsPerPage, changeItemsPerPage: changeItemsPerPage }),
        React.createElement(Pagination_1.Pagination, { perPage: itemsPerPage, totalItems: totalItems, orderBy: orderBy, order: order, currentPage: currentPage, onPageChanged: onPageChanged, pageNeighbours: 3 })));
};
exports["default"] = withAuthentication_1["default"](UpaIndex);
