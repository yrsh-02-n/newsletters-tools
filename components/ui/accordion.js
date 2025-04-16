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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Accordion = Accordion;
exports.AccordionItem = AccordionItem;
exports.AccordionTrigger = AccordionTrigger;
exports.AccordionContent = AccordionContent;
var jsx_runtime_1 = require("react/jsx-runtime");
var AccordionPrimitive = require("@radix-ui/react-accordion");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
function Accordion(_a) {
    var props = __rest(_a, []);
    return (0, jsx_runtime_1.jsx)(AccordionPrimitive.Root, __assign({ "data-slot": "accordion" }, props));
}
function AccordionItem(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(AccordionPrimitive.Item, __assign({ "data-slot": "accordion-item", className: (0, utils_1.cn)("border-b last:border-b-0", className) }, props)));
}
function AccordionTrigger(_a) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    return ((0, jsx_runtime_1.jsx)(AccordionPrimitive.Header, { className: "flex", children: (0, jsx_runtime_1.jsxs)(AccordionPrimitive.Trigger, __assign({ "data-slot": "accordion-trigger", className: (0, utils_1.cn)("focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", className) }, props, { children: [children, (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDownIcon, { className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })] })) }));
}
function AccordionContent(_a) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    return ((0, jsx_runtime_1.jsx)(AccordionPrimitive.Content, __assign({ "data-slot": "accordion-content", className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm" }, props, { children: (0, jsx_runtime_1.jsx)("div", { className: (0, utils_1.cn)("pt-0 pb-4", className), children: children }) })));
}
