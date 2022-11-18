"use strict";
exports.__esModule = true;
exports.ListEqModelo = void 0;
exports.ListEqModelo = function (_a) {
    var items = _a.items, callback = _a.callback;
    return (React.createElement("div", { className: "border border-gray-300 rounded-md w-full my-2 overflow-y-auto h-58" },
        React.createElement("ul", { role: "list" }, items === null || items === void 0 ? void 0 : items.map(function (eqModelo, key) { return (React.createElement("li", { key: key, className: "grid grid-flow-row lg:grid-cols-[220px_minmax(900px,_1fr)] items-center py-1 px-4 group/item hover:bg-slate-100 h-14 w-full hover:cursor-pointer", onClick: function () { return callback(eqModelo); } },
            React.createElement("span", { className: "text-xs font-semibold" }, eqModelo.nome),
            React.createElement("span", { className: "text-xs" }, eqModelo.expressao))); }))));
};
