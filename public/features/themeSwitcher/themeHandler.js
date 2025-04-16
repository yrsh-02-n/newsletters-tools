"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSavedTheme = exports.toggleTheme = void 0;
var toggleTheme = function (currentTheme) {
    var newTheme = currentTheme === 'light' ? 'dark' : 'light';
    // Save theme
    document.documentElement.className = newTheme;
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    return newTheme;
};
exports.toggleTheme = toggleTheme;
// Get theme
var getSavedTheme = function () {
    if (typeof window === 'undefined')
        return 'light'; // Для SSR
    var savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark' ? 'dark' : 'light';
};
exports.getSavedTheme = getSavedTheme;
