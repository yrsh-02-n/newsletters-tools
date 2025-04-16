"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WaLinkGenerator;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var redux_hook_1 = require("@/redux-hook");
var waLinkGeneratorSelectors_ts_1 = require("@/features/waLinkGenerator/waLinkGeneratorSelectors.ts");
var waLinkGeneratorSlice_1 = require("./waLinkGeneratorSlice");
var input_1 = require("@/components/ui/input");
var textarea_1 = require("@/components/ui/textarea");
var button_1 = require("@/components/ui/button");
var label_1 = require("@/components/ui/label");
var radio_group_1 = require("@/components/ui/radio-group");
var select_1 = require("@/components/ui/select");
var accordion_1 = require("@/components/ui/accordion");
var sonner_1 = require("sonner");
function WaLinkGenerator() {
    var dispatch = (0, redux_hook_1.useAppDispatch)();
    var _a = (0, redux_hook_1.useAppSelector)(function (state) { return state.waLinkGenerator; }), phone = _a.phone, message = _a.message, generatedLink = _a.generatedLink, errors = _a.errors;
    // radio checked state
    var _b = (0, react_1.useState)('option-one'), selectedOption = _b[0], setSelectedOption = _b[1];
    var isDisabledUserOptions = selectedOption !== 'option-one';
    // By manual message
    var _c = (0, react_1.useState)(phone), userPhone = _c[0], setUserPhone = _c[1];
    var _d = (0, react_1.useState)(message), userMessage = _d[0], setUserMessage = _d[1];
    // By template
    var _e = (0, react_1.useState)(''), unitName = _e[0], setUnitName = _e[1];
    var _f = (0, react_1.useState)(''), unitNumber = _f[0], setUnitNumber = _f[1];
    var _g = (0, react_1.useState)(''), unitLocation = _g[0], setUnitLocation = _g[1];
    var TEMPLATES = {
        'Preset-1': "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435, \u043C\u0435\u043D\u044F \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u0435\u0442 ".concat(unitName, " \u0432 ").concat(unitLocation, " \u0438\u0437 email. \u041F\u0440\u0438\u0448\u043B\u0438\u0442\u0435, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0441\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B"),
        'Preset-2': "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435, \u043C\u0435\u043D\u044F \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u0443\u0435\u0442 \u043B\u043E\u0442 \u2116".concat(unitNumber, " ").concat(unitName, " \u0432 ").concat(unitLocation, " \u0438\u0437 email. \u041F\u0440\u0438\u0448\u043B\u0438\u0442\u0435, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u0441\u0435 \u043C\u0430\u0442\u0435\u0440\u0438\u0430\u043B\u044B"),
    };
    var _h = (0, react_1.useState)(''), selectedTemplateKey = _h[0], setSelectedTemplateKey = _h[1];
    var selectedTemplate = selectedTemplateKey
        ? TEMPLATES[selectedTemplateKey]
        : '';
    var isDisabledUnitNumber = isDisabledUserOptions || selectedTemplateKey === 'Preset-1';
    // Generate message by template or manual
    var handleGenerate = function (e) {
        e.preventDefault();
        dispatch((0, waLinkGeneratorSlice_1.setPhone)(userPhone));
        // For using one field for template and manual message
        if (selectedOption === 'option-one') {
            dispatch((0, waLinkGeneratorSlice_1.setMessage)(selectedTemplate));
        }
        else {
            dispatch((0, waLinkGeneratorSlice_1.setMessage)(userMessage));
        }
        dispatch((0, waLinkGeneratorSlice_1.generateLink)());
    };
    // Get the links list and save list local
    var linksList = (0, redux_hook_1.useAppSelector)(waLinkGeneratorSelectors_ts_1.selectLinksList);
    (0, react_1.useEffect)(function () {
        localStorage.setItem('whatsapp-links', JSON.stringify(linksList));
    }, [linksList]);
    // Copy link to clipboard and run toast on click
    var runCopyToast = function (source, text) { return function (e) {
        e.preventDefault(); // Чтобы ссылка не срабатывала
        navigator.clipboard
            .writeText(source)
            .then(function () { return sonner_1.toast.message(text); })
            .catch(function () { return sonner_1.toast.message('Copy failed'); });
    }; };
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("form", { className: "mb-5 bg-(--card) p-7 rounded-lg", onSubmit: handleGenerate, children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-5", children: (0, jsx_runtime_1.jsxs)(radio_group_1.RadioGroup, { className: "flex gap-5", value: selectedOption, onValueChange: function (value) {
                                return setSelectedOption(value);
                            }, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, { value: "option-one", id: "option-one" }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "option-one", children: "By template" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)(radio_group_1.RadioGroupItem, { value: "option-two", id: "option-two" }), (0, jsx_runtime_1.jsx)(label_1.Label, { htmlFor: "option-two", children: "Manual" })] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-5", children: [(0, jsx_runtime_1.jsxs)("div", { id: "templateSelector", className: "mb-5", children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-3", children: (0, jsx_runtime_1.jsxs)(select_1.Select, { disabled: isDisabledUserOptions, value: selectedTemplateKey, onValueChange: function (value) { return setSelectedTemplateKey(value); }, children: [(0, jsx_runtime_1.jsx)(select_1.SelectTrigger, { className: "w-full bg-(--input-bg) border-0", children: (0, jsx_runtime_1.jsx)(select_1.SelectValue, { placeholder: "Select template" }) }), (0, jsx_runtime_1.jsxs)(select_1.SelectContent, { children: [(0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "Preset-1", children: "Without unit number" }), (0, jsx_runtime_1.jsx)(select_1.SelectItem, { value: "Preset-2", children: "With unit number" })] })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-3 max-[630px]:flex-col", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { disabled: isDisabledUserOptions, className: "bg-(--input-bg) border-0", type: "text", placeholder: "Unit name", value: unitName, onChange: function (e) { return setUnitName(e.target.value); } }), (0, jsx_runtime_1.jsx)(input_1.Input, { disabled: isDisabledUserOptions, className: "bg-(--input-bg) border-0", type: "text", placeholder: "Unit Location", value: unitLocation, onChange: function (e) { return setUnitLocation(e.target.value); } }), (0, jsx_runtime_1.jsx)(input_1.Input, { disabled: isDisabledUnitNumber, className: "bg-(--input-bg) border-0", type: "text", placeholder: "Unit number", value: unitNumber, onChange: function (e) { return setUnitNumber(e.target.value); } })] })] }), (0, jsx_runtime_1.jsxs)("div", { id: "manualMessage", children: [(0, jsx_runtime_1.jsx)("p", { className: "mb-2", children: "Your message" }), (0, jsx_runtime_1.jsx)("div", { className: "flex", children: (0, jsx_runtime_1.jsx)(input_1.Input, { className: "bg-(--input-bg) border-0", type: "text", value: selectedOption === 'option-one'
                                                ? selectedTemplate
                                                : userMessage, onChange: function (e) { return setUserMessage(e.target.value); } }) }), errors.messageError && ((0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-(--error)", children: errors.messageError }))] })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("p", { className: "mb-2", children: "WhatsApp phone number" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex", children: [(0, jsx_runtime_1.jsx)(input_1.Input, { className: "bg-(--input-bg) rounded-r-none border-0", type: "text", placeholder: "79999999999", value: userPhone, onChange: function (e) { return setUserPhone(e.target.value); } }), (0, jsx_runtime_1.jsx)(button_1.Button, { className: "rounded-l-none", type: "submit", children: "Generate" })] }), errors.phoneError && ((0, jsx_runtime_1.jsx)("p", { className: "mt-1 text-sm text-(--error)", children: errors.phoneError }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mb-5 bg-(--card) p-7 rounded-lg", children: [(0, jsx_runtime_1.jsx)("p", { className: "mb-2", children: "Your link will appear here" }), (0, jsx_runtime_1.jsx)(textarea_1.Textarea, { className: "min-h-30 mb-5 bg-(--input-bg} border-0 bg-(--input-bg)", value: generatedLink }), (0, jsx_runtime_1.jsx)(button_1.Button, { disabled: !generatedLink, onClick: runCopyToast(generatedLink, 'Link copied to clipboard'), children: "Copy link" })] }), (0, jsx_runtime_1.jsx)("div", { className: " bg-(--card) p-7 pt-5 pb-5 rounded-lg", children: (0, jsx_runtime_1.jsx)(accordion_1.Accordion, { type: "single", collapsible: true, children: (0, jsx_runtime_1.jsxs)(accordion_1.AccordionItem, { value: "lastLinksList", children: [(0, jsx_runtime_1.jsx)(accordion_1.AccordionTrigger, { className: "p-0 text-md font-semibold hover:no-underline", children: "Your last links" }), (0, jsx_runtime_1.jsx)(accordion_1.AccordionContent, { className: "mt-5 pt-5 border-t-2", children: (0, jsx_runtime_1.jsx)("ul", { children: linksList.map(function (link) { return ((0, jsx_runtime_1.jsxs)("li", { className: "flex justify-between not-last:mb-2", children: [(0, jsx_runtime_1.jsx)("a", { href: link.linkAddress, target: "_blank", children: link.linkDate }), (0, jsx_runtime_1.jsx)("button", { className: "cursor-pointer", onClick: runCopyToast(link.linkAddress, 'Link copied to clipboard'), children: "Copy link" })] }, link.linkDate)); }) }) })] }) }) })] }));
}
