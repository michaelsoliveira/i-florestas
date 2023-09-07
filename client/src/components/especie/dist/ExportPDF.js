'use client';
"use strict";
exports.__esModule = true;
// components/ExportPDF.js
var react_1 = require("react");
var renderer_1 = require("@react-pdf/renderer");
var styles = renderer_1.StyleSheet.create({
    page: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        padding: 10
    },
    text: {
        fontSize: 20,
        marginBottom: 10
    }
});
var PdfDocument = function (_a) {
    var data = _a.data;
    return (react_1["default"].createElement(renderer_1.Document, null,
        react_1["default"].createElement(renderer_1.Page, { size: "A4", style: styles.page },
            react_1["default"].createElement(renderer_1.View, null,
                react_1["default"].createElement(renderer_1.Text, { style: styles.text }, "Hello, this is a PDF generated using React and Next.js!")))));
};
var ExportPDF = function () {
    return (react_1["default"].createElement("div", { className: 'pr-2' },
        react_1["default"].createElement(renderer_1.PDFDownloadLink, { document: react_1["default"].createElement(PdfDocument, null), fileName: "especies.pdf", className: "px-6 py-2 text-white bg-green-700 hover:bg-green-800 rounded-md hover:cursor-pointer" }, function (_a) {
            var blob = _a.blob, url = _a.url, loading = _a.loading, error = _a.error;
            return (loading ? 'Loading document...' : 'Export PDF');
        })));
};
exports["default"] = ExportPDF;
