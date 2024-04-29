"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

exports.__esModule = true;

var react_1 = require("react");

var EditableTable_1 = require("../utils/EditableTable");

var react_fontawesome_1 = require("@fortawesome/react-fontawesome");

var free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");

var ModalContext_1 = require("src/contexts/ModalContext");

var AuthContext_1 = require("src/contexts/AuthContext");

var hooks_1 = require("@/redux/provider");

var alert_1 = require("../../../services/alert");

var AddAuto = react_1.forwardRef(function AddAuto(_a, ref) {
  var _this = this;

  var maxNumUt = _a.maxNumUt,
      loadUts = _a.loadUts;
  var hideModal = ModalContext_1.useModalContext().hideModal;
  var client = react_1.useContext(AuthContext_1.AuthContext).client;
  var upa = hooks_1.useAppSelector(function (state) {
    return state.upa;
  });

  var saveUt = function saveUt() {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , client.post("/ut/create-auto?upaId=" + (upa === null || upa === void 0 ? void 0 : upa.id), data).then(function (_a) {
              var error = _a.error,
                  message = _a.message;

              if (!error) {
                alert_1["default"].success(message);
                loadUts();
                hideModal();
              } else {
                alert_1["default"].error(message);
              }
            })];

          case 1:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  var columns = [{
    Header: "ID",
    accessor: "id"
  }, {
    Header: "Número UT",
    accessor: "numero_ut",
    editEnable: true
  }, {
    Header: "Área Util",
    accessor: "area_util",
    editEnable: true
  }, {
    Header: "Área Total",
    accessor: "area_total",
    editEnable: true
  }, {
    Header: "Opções",
    id: "actions",
    disableSortBy: true,
    Cell: function Cell(_a) {
      var row = _a.row,
          column = _a.column,
          cell = _a.cell;
      return row.original.isEditing ? React.createElement(React.Fragment, null, React.createElement("button", {
        onClick: function onClick() {
          return handleButtonClick("save", row.original);
        },
        className: "px-2"
      }, "Salvar"), React.createElement("button", {
        onClick: function onClick() {
          return handleButtonClick("cancel", row.original);
        }
      }, "Cancelar")) : React.createElement(React.Fragment, null, React.createElement("button", {
        onClick: function onClick() {
          return handleButtonClick("edit", row.original);
        },
        className: "px-2"
      }, "Editar"), React.createElement("button", {
        onClick: function onClick() {
          var dataCopy = __spreadArrays(data); // It should not matter what you name tableProps. It made the most sense to me.


          dataCopy.splice(row.index, 1);
          setData(dataCopy);
        }
      }, "Excluir"));
    }
  }];

  var _b = react_1.useState([]),
      data = _b[0],
      setData = _b[1];

  var newUt = function newUt() {
    setData(__spreadArrays(data, [{
      id: data.length + 1,
      numero_ut: maxNumUt + data.length + 1,
      area_util: 100,
      area_total: 100
    }]));
  };

  var handleButtonClick = function handleButtonClick(action, row) {
    var newData = data.map(function (rowData) {
      if (rowData.id === row.id) {
        if (action === "edit") {
          return __assign(__assign({}, rowData), {
            isEditing: true,
            prevData: __assign({}, rowData)
          });
        } else if (action === "cancel") {
          return __assign(__assign(__assign({}, rowData), {
            isEditing: false
          }), rowData.prevData);
        } else if (action === "save") {
          var prevData = rowData.prevData,
              updatedRowData = __rest(rowData, ["prevData"]);

          return __assign(__assign({}, updatedRowData), {
            isEditing: false
          });
        }
      }

      return rowData;
    });
    setData(newData);
  };

  return React.createElement("div", {
    className: "flex flex-col items-center h-full"
  }, React.createElement("div", {
    onClick: newUt,
    className: "py-4"
  }, React.createElement("button", {
    className: "flex flex-row w-36 px-4 py-2 justify-around w-full space-x-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer"
  }, React.createElement("span", null, React.createElement(react_fontawesome_1.FontAwesomeIcon, {
    icon: free_solid_svg_icons_1.faPlus
  })), "Add Auto")), React.createElement(EditableTable_1["default"], {
    columns: columns,
    data: data,
    setData: setData,
    handleButtonClick: handleButtonClick
  }), React.createElement("span", {
    className: "hidden",
    ref: ref,
    onClick: saveUt
  }, "Importar"));
});
exports["default"] = AddAuto;