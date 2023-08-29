"use strict";
exports.__esModule = true;
var image_1 = require("next/image");
var Carousel_1 = require("src/components/home/Carousel");
var Hero_1 = require("src/components/home/Hero");
var react_1 = require("next-auth/react");
var Team_1 = require("src/components/home/Team");
function Dashboard() {
    var session = react_1.useSession().data;
    return (React.createElement("div", { className: "w-full" },
        React.createElement("div", { className: "relative flex flex-row lg:flex-col lg:overflow-hidden" },
            React.createElement("div", { className: "mx-auto mt-10 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-12" },
                React.createElement("div", { className: "w-full relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 max-w-sm md:max-w-3xl lg:max-w-5xl xl:max-w-6xl lg:pb-16" },
                    React.createElement("div", { className: 'flex flex-col lg:flex-row border shadow-lg' },
                        React.createElement("div", { className: 'flex flex-row mx-auto' },
                            React.createElement(Hero_1["default"], { session: session })),
                        React.createElement("div", { className: "mx-auto text-center items-center inset-y-0 h-full my-auto py-4 px-4" },
                            React.createElement(image_1["default"], { className: "object-cover object-center", src: "/web_devices.svg", alt: "", width: 400, height: 300 }))),
                    React.createElement("div", { className: "text-center lg:flex lg:flex-col py-4" },
                        React.createElement("h2", { className: "text-3xl leading-8 font-semibold mt-5 text-green-800" }, "Recursos"),
                        React.createElement(Carousel_1.Carousel, null)),
                    !session &&
                        (React.createElement("div", null,
                            React.createElement("div", { className: "text-center lg:flex lg:flex-col py-4" },
                                React.createElement(Team_1["default"], null)))))))));
}
exports["default"] = Dashboard;
