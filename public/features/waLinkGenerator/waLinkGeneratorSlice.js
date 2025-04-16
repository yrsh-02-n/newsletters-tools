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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLink = exports.setMessage = exports.setPhone = void 0;
var dateFormatter_1 = require("@/utils/dateFormatter");
var toolkit_1 = require("@reduxjs/toolkit");
var BASE_URL = 'https://api.whatsapp.com/send/?phone=';
var getInitialState = function () {
    if (typeof window !== 'undefined') {
        var saved = localStorage.getItem('whatsapp-links');
        return {
            generatedLink: '',
            phone: '',
            message: '',
            lastLinksList: saved ? JSON.parse(saved) : [],
            errors: { phoneError: null, messageError: null }
        };
    }
    return initialState;
};
var initialState = getInitialState();
var waLinkGeneratorSlice = (0, toolkit_1.createSlice)({
    name: 'waLinkGenerator',
    initialState: initialState,
    reducers: {
        setPhone: function (state, action) {
            state.phone = action.payload.replace(/\D/g, '');
        },
        setMessage: function (state, action) {
            state.message = action.payload;
        },
        generateLink: function (state) {
            // Fields validation checking
            if (!state.message) {
                state.errors.messageError = 'Field is empty';
                return;
            }
            if (!state.phone.match(/^\d+$/)) {
                state.errors.phoneError = 'This field should contain only numbers';
                return;
            }
            // Generate from fields values
            var encodedMessage = encodeURIComponent(state.message);
            var newGeneratedLink = "".concat(BASE_URL).concat(state.phone, "&text=").concat(encodedMessage, "&type=phone_number&app_absent=0");
            var newLink = {
                linkAddress: newGeneratedLink,
                // linkDate: new Date().toString()
                linkDate: (0, dateFormatter_1.formatDate)()
            };
            return __assign(__assign({}, state), { generatedLink: newGeneratedLink, errors: {
                    phoneError: null,
                    messageError: null
                }, lastLinksList: __spreadArray([newLink], state.lastLinksList, true).slice(0, 5) });
        },
    },
});
exports.setPhone = (_a = waLinkGeneratorSlice.actions, _a.setPhone), exports.setMessage = _a.setMessage, exports.generateLink = _a.generateLink;
exports.default = waLinkGeneratorSlice.reducer;
