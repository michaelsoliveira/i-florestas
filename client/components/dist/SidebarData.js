"use strict";
exports.__esModule = true;
exports.SidebarData = void 0;
var react_1 = require("react");
var FaIcons = require("react-icons/fa");
var AiIcons = require("react-icons/ai");
var IoIcons = require("react-icons/io");
var RiIcons = require("react-icons/ri");
exports.SidebarData = [
    {
        title: 'Overview',
        path: '#',
        icon: react_1["default"].createElement(AiIcons.AiFillHome, null),
        iconClosed: react_1["default"].createElement(RiIcons.RiArrowDownSFill, null),
        iconOpened: react_1["default"].createElement(RiIcons.RiArrowUpSFill, null),
        subNav: [
            {
                title: 'Users',
                path: '/',
                icon: react_1["default"].createElement(IoIcons.IoIosPaper, null)
            },
            {
                title: 'Revenue',
                path: '/login',
                icon: react_1["default"].createElement(IoIcons.IoIosPaper, null)
            }
        ]
    },
    {
        title: 'Reports',
        path: '#',
        icon: react_1["default"].createElement(IoIcons.IoIosPaper, null),
        iconClosed: react_1["default"].createElement(RiIcons.RiArrowDownSFill, null),
        iconOpened: react_1["default"].createElement(RiIcons.RiArrowUpSFill, null),
        subNav: [
            {
                title: 'Reports',
                path: '/reports',
                icon: react_1["default"].createElement(IoIcons.IoIosPaper, null),
                cName: 'sub-nav'
            },
            {
                title: 'Reports 2',
                path: '/reports',
                icon: react_1["default"].createElement(IoIcons.IoIosPaper, null),
                cName: 'sub-nav'
            },
            {
                title: 'Reports 3',
                path: '/reports',
                icon: react_1["default"].createElement(IoIcons.IoIosPaper, null)
            }
        ]
    },
    {
        title: 'Products',
        path: '/index',
        icon: react_1["default"].createElement(FaIcons.FaCartPlus, null)
    },
    {
        title: 'Team',
        path: '/team',
        icon: react_1["default"].createElement(IoIcons.IoMdPeople, null)
    },
    // {
    //   title: 'Messages',
    //   path: '/',
    //   icon: <FaIcons.FaEnvelopeOpenText />,
    //   iconClosed: <RiIcons.RiArrowDownSFill />,
    //   iconOpened: <RiIcons.RiArrowUpSFill />,
    //   subNav: [
    //     {
    //       title: 'Message 1',
    //       path: '/',
    //       icon: <IoIcons.IoIosPaper />
    //     },
    //     {
    //       title: 'Message 2',
    //       path: '/',
    //       icon: <IoIcons.IoIosPaper />
    //     }
    //   ]
    // },
    {
        title: 'Support',
        path: '/',
        icon: react_1["default"].createElement(IoIcons.IoMdHelpCircle, null)
    }
];
