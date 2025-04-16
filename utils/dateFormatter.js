"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = void 0;
var formatDate = function (dateString) {
    if (dateString === void 0) { dateString = new Date(); }
    var locale = navigator.language || 'en-EN';
    var date = new Date(dateString);
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    });
};
exports.formatDate = formatDate;
