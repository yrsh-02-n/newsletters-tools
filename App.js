"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var themeHandler_1 = require("@/features/themeSwitcher/themeHandler");
var lucide_react_1 = require("lucide-react");
var switch_1 = require("@/components/ui/switch");
var tabs_1 = require("@/components/ui/tabs");
var WaLinkGenerator_1 = require("@/features/waLinkGenerator/WaLinkGenerator");
var sonner_1 = require("sonner");
function App() {
    var _a = (0, react_1.useState)((0, themeHandler_1.getSavedTheme)()), currentTheme = _a[0], setCurrentTheme = _a[1];
    (0, react_1.useEffect)(function () {
        document.documentElement.className = currentTheme;
        document.documentElement.setAttribute('data-theme', currentTheme);
    }, []);
    var handleThemeToggle = function () {
        var newTheme = (0, themeHandler_1.toggleTheme)(currentTheme);
        setCurrentTheme(newTheme);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "container m-auto max-w-[800px] p-5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between mb-5", children: [(0, jsx_runtime_1.jsx)("h1", { className: "font-bold text-xl sm:text-2xl", children: "Newsletters Tools" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.SunIcon, { size: 20 }), (0, jsx_runtime_1.jsx)(switch_1.Switch, { className: "ml-2 mr-2", checked: currentTheme === 'dark', onCheckedChange: handleThemeToggle }), (0, jsx_runtime_1.jsx)(lucide_react_1.MoonIcon, { size: 20 })] })] }), (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, { defaultValue: "wa-link", className: "w-full", children: [(0, jsx_runtime_1.jsxs)(tabs_1.TabsList, { className: "w-full mb-5 border-0", children: [(0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { className: "border-0", value: "wa-link", children: "WhatsApp link" }), (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, { className: "border-0", value: "calendar", disabled: true, children: "Calendar event (soon)" })] }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "wa-link", children: (0, jsx_runtime_1.jsx)(WaLinkGenerator_1.default, {}) }), (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, { value: "calendar", children: "Coming soon" })] }), (0, jsx_runtime_1.jsx)(sonner_1.Toaster, {})] }));
}
exports.default = App;
