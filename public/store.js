"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
var toolkit_1 = require("@reduxjs/toolkit");
var waLinkGeneratorSlice_1 = require("@/features/waLinkGenerator/waLinkGeneratorSlice");
var rootReducer = (0, toolkit_1.combineReducers)({
    waLinkGenerator: waLinkGeneratorSlice_1.default,
});
exports.store = (0, toolkit_1.configureStore)({
    reducer: rootReducer
});
