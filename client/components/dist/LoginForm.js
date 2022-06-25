"use strict";
exports.__esModule = true;
exports.LoginForm = exports.loginSchema = void 0;
var formik_1 = require("formik");
var Yup = require("yup");
exports.loginSchema = Yup.object().shape({
    email: Yup.string().email().required('Required'),
    password: Yup.string().required('Required').min(3, 'Too Short!')
});
exports.LoginForm = function (_a) {
    var styles = _a.styles, parentShowLogin = _a.parentShowLogin;
    return (React.createElement(formik_1.Formik, { initialValues: {
            email: '',
            password: ''
        }, validationSchema: exports.loginSchema, onSubmit: function (values) {
            alert(JSON.stringify(values, null, 2));
        } },
        React.createElement(formik_1.Form, null,
            React.createElement("label", { className: styles.label, htmlFor: 'Email' }, "Email"),
            React.createElement(formik_1.Field, { className: styles.field, id: 'email', name: 'email' }),
            React.createElement(formik_1.ErrorMessage, { component: 'a', className: styles.errorMsg, name: 'email' }),
            React.createElement("label", { className: styles.label, htmlFor: 'Email' }, "Password"),
            React.createElement(formik_1.Field, { className: styles.field, id: 'password', name: 'password' }),
            React.createElement(formik_1.ErrorMessage, { component: 'a', className: styles.errorMsg, name: 'password' }),
            React.createElement("div", { className: 'mt-8' },
                React.createElement("button", { type: 'submit', className: styles.button }, "Login")))));
};
