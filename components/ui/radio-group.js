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
exports.RadioGroup = RadioGroup;
exports.RadioGroupItem = RadioGroupItem;
var jsx_runtime_1 = require("react/jsx-runtime");
var RadioGroupPrimitive = require("@radix-ui/react-radio-group");
var lucide_react_1 = require("lucide-react");
var utils_1 = require("@/lib/utils");
function RadioGroup(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(RadioGroupPrimitive.Root, __assign({ "data-slot": "radio-group", className: (0, utils_1.cn)("grid gap-3", className) }, props)));
}
function RadioGroupItem(_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return ((0, jsx_runtime_1.jsx)(RadioGroupPrimitive.Item, __assign({ "data-slot": "radio-group-item", className: (0, utils_1.cn)("border-input text-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 aspect-square size-4 shrink-0 rounded-full border shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className) }, props, { children: (0, jsx_runtime_1.jsx)(RadioGroupPrimitive.Indicator, { "data-slot": "radio-group-indicator", className: "relative flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(lucide_react_1.CircleIcon, { className: "fill-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2" }) }) })));
}
