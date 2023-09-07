'use client';
"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var react_1 = require("react");
var CsvImport = function (_a) {
    var delimiter = _a.delimiter, encoding = _a.encoding;
    var _b = react_1.useState(), file = _b[0], setFile = _b[1];
    var _c = react_1.useState([]), array = _c[0], setArray = _c[1];
    var fileReader = new FileReader();
    var handleOnChangeImport = function (e) {
        setFile(e.target.files[0]);
    };
    var csvFileToArray = function (data) {
        var csvHeader = data.slice(0, data.indexOf("\n")).split(delimiter);
        var csvRows = data.slice(data.indexOf("\n") + 1).split("\n");
        var array = csvRows.map(function (i) {
            var values = i.split(delimiter);
            var obj = csvHeader.reduce(function (object, header, index) {
                object[header] = values[index];
                return object;
            }, {});
            return obj;
        });
        setArray(array);
    };
    var handleOnSubmitImport = function (e) {
        e.preventDefault();
        if (file) {
            fileReader.onload = function (event) {
                var data = event.target.result;
                csvFileToArray(data);
            };
            fileReader.readAsText(file, encoding);
        }
    };
    var headerKeys = Object.keys(Object.assign.apply(Object, __spreadArrays([{}], array)));
    return {
        headerKeys: headerKeys, handleOnSubmitImport: handleOnSubmitImport, handleOnChangeImport: handleOnChangeImport,
        dataImported: array
    };
    // return (
    //     <div style={{ textAlign: "center" }}>
    //       <h1>REACTJS CSV IMPORT EXAMPLE </h1>
    //       <form>
    //         <input
    //           type={"file"}
    //           id={"csvFileInput"}
    //           accept={".csv"}
    //           onChange={handleOnChangeImport}
    //         />
    //         <button
    //           onClick={(e) => {
    //             handleOnSubmitImport(e);
    //           }}
    //         >
    //           IMPORT CSV
    //         </button>
    //       </form>
    //       <br />
    //       <table>
    //         <thead>
    //           <tr key={"header"}>
    //             {headerKeys.map((key: any) => (
    //               <th key={key}>{key}</th>
    //             ))}
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {array.map((item: any) => (
    //             <tr key={item.id}>
    //               {Object.values(item).map((val: any) => (
    //                 <td key={val}>{val}</td>
    //               ))}
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   );
};
exports["default"] = CsvImport;
